import _ from 'lodash';
import flatten from 'grafana/app/core/utils/flatten';
import TimeSeries from 'grafana/app/core/time_series2';
import TableModel from 'grafana/app/core/table_model';

const transformers = {};

// Returns true if both rows have matching non-empty fields as well as matching
// indexes where one field is empty and the other is not
function areRowsMatching(columns, row, otherRow) {
  let foundFieldToMatch = false;
  for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
    if (row[columnIndex] !== undefined && otherRow[columnIndex] !== undefined) {
      if (row[columnIndex] !== otherRow[columnIndex]) {
        return false;
      }
    } else if (row[columnIndex] === undefined || otherRow[columnIndex] === undefined) {
      foundFieldToMatch = true;
    }
  }
  return foundFieldToMatch;
}

export function mergeTablesIntoModel(dst?: TableModel, ...tables: TableModel[]): TableModel {
  const model = dst || new TableModel();

  if (arguments.length === 1) {
    return model;
  }
  // Single query returns data columns and rows as is
  if (arguments.length === 2) {
    model.columns = tables[0].hasOwnProperty('columns') ? [...tables[0].columns] : [];
    model.rows = tables[0].hasOwnProperty('rows') ? [...tables[0].rows] : [];
    return model;
  }

  // Track column indexes of union: name -> index
  const columnNames = {};

  // Union of all non-value columns
  const columnsUnion = tables.slice().reduce((acc, series) => {
    series.columns.forEach((col: any) => {
      const { text } = col;
      if (columnNames[text] === undefined) {
        columnNames[text] = acc.length;
        acc.push(col);
      }
    });
    return acc;
  }, [] as any[]);

  // Map old column index to union index per series, e.g.,
  // given columnNames {A: 0, B: 1} and
  // data [{columns: [{ text: 'A' }]}, {columns: [{ text: 'B' }]}] => [[0], [1]]
  const columnIndexMapper = tables.map(series => series.columns.map(col => columnNames[col.text]));

  // Flatten rows of all series and adjust new column indexes
  const flattenedRows = tables.reduce((acc, series, seriesIndex) => {
    const mapper = columnIndexMapper[seriesIndex];
    series.rows.forEach(row => {
      const alteredRow: any[] = [];
      // Shifting entries according to index mapper
      mapper.forEach((to, from) => {
        alteredRow[to] = row[from];
      });
      acc.push(alteredRow);
    });
    return acc;
  }, [] as any[]);

  // Merge rows that have same values for columns
  const mergedRows = {};
  const compactedRows = flattenedRows.reduce((acc, row, rowIndex) => {
    if (!mergedRows[rowIndex]) {
      // Look from current row onwards
      let offset = rowIndex + 1;
      // More than one row can be merged into current row
      while (offset < flattenedRows.length) {
        // Find next row that could be merged
        const match = _.findIndex(flattenedRows, otherRow => areRowsMatching(columnsUnion, row, otherRow), offset);
        if (match > -1) {
          const matchedRow = flattenedRows[match];
          // Merge values from match into current row if there is a gap in the current row
          for (let columnIndex = 0; columnIndex < columnsUnion.length; columnIndex++) {
            if (row[columnIndex] === undefined && matchedRow[columnIndex] !== undefined) {
              row[columnIndex] = matchedRow[columnIndex];
            }
          }
          // Don't visit this row again
          mergedRows[match] = matchedRow;
          // Keep looking for more rows to merge
          offset = match + 1;
        } else {
          // No match found, stop looking
          break;
        }
      }
      acc.push(row);
    }
    return acc;
  }, []);

  model.columns = columnsUnion;
  model.rows = compactedRows;
  return model;
}

transformers['timeseries_to_rows'] = {
  description: 'Time series to rows',
  getColumns: () => {
    return [];
  },
  transform: (data, panel, model) => {
    model.columns = [{ text: 'Time', type: 'date' }, { text: 'Metric' }, { text: 'Value' }];

    for (let i = 0; i < data.length; i++) {
      const series = data[i];
      for (let y = 0; y < series.datapoints.length; y++) {
        const dp = series.datapoints[y];
        model.rows.push([dp[1], series.target, dp[0]]);
      }
    }
  },
};

transformers['timeseries_to_columns'] = {
  description: 'Time series to columns',
  getColumns: () => {
    return [];
  },
  transform: (data, panel, model) => {
    model.columns.push({ text: 'Time', type: 'date' });

    // group by time
    const points = {};

    for (let i = 0; i < data.length; i++) {
      const series = data[i];
      model.columns.push({ text: series.target });

      for (let y = 0; y < series.datapoints.length; y++) {
        const dp = series.datapoints[y];
        const timeKey = dp[1].toString();

        if (!points[timeKey]) {
          points[timeKey] = { time: dp[1] };
          points[timeKey][i] = dp[0];
        } else {
          points[timeKey][i] = dp[0];
        }
      }
    }

    for (const time in points) {
      const point = points[time];
      const values = [point.time];

      for (let i = 0; i < data.length; i++) {
        const value = point[i];
        values.push(value);
      }

      model.rows.push(values);
    }
  },
};

transformers['timeseries_aggregations'] = {
  description: 'Time series aggregations',
  getColumns: () => {
    return [
      { text: 'Avg', value: 'avg' },
      { text: 'Min', value: 'min' },
      { text: 'Max', value: 'max' },
      { text: 'Total', value: 'total' },
      { text: 'Current', value: 'current' },
      { text: 'Count', value: 'count' },
    ];
  },
  transform: (data, panel, model) => {
    let i, y;
    model.columns.push({ text: 'Metric' });

    for (i = 0; i < panel.columns.length; i++) {
      model.columns.push({ text: panel.columns[i].text });
    }

    for (i = 0; i < data.length; i++) {
      const series = new TimeSeries({
        datapoints: data[i].datapoints,
        alias: data[i].target,
      });

      series.getFlotPairs('connected');
      const cells = [series.alias];

      for (y = 0; y < panel.columns.length; y++) {
        cells.push(series.stats[panel.columns[y].value]);
      }

      model.rows.push(cells);
    }
  },
};

transformers['annotations'] = {
  description: 'Annotations',
  getColumns: () => {
    return [];
  },
  transform: (data, panel, model) => {
    model.columns.push({ text: 'Time', type: 'date' });
    model.columns.push({ text: 'Title' });
    model.columns.push({ text: 'Text' });
    model.columns.push({ text: 'Tags' });

    if (!data || !data.annotations || data.annotations.length === 0) {
      return;
    }

    for (let i = 0; i < data.annotations.length; i++) {
      const evt = data.annotations[i];
      model.rows.push([evt.time, evt.title, evt.text, evt.tags]);
    }
  },
};

transformers['table'] = {
  description: 'Table',
  getColumns: data => {
    if (!data || data.length === 0) {
      return [];
    }

    // Single query returns data columns as is
    if (data.length === 1) {
      return [...data[0].columns];
    }

    // Track column indexes: name -> index
    const columnNames = {};

    // Union of all columns
    const columns = data.reduce((acc, series) => {
      series.columns.forEach(col => {
        const { text } = col;
        if (columnNames[text] === undefined) {
          columnNames[text] = acc.length;
          acc.push(col);
        }
      });
      return acc;
    }, []);

    return columns;
  },
  transform: (data, panel, model) => {
    if (!data || data.length === 0) {
      return;
    }

    const noTableIndex = _.findIndex(data, (d: any) => d.type !== 'table');
    if (noTableIndex > -1) {
      throw {
        message: `Result of query #${String.fromCharCode(
          65 + noTableIndex
        )} is not in table format, try using another transform.`,
      };
    }

    mergeTablesIntoModel(model, ...data);
  },
};

transformers['json'] = {
  description: 'JSON Data',
  getColumns: data => {
    if (!data || data.length === 0) {
      return [];
    }

    const names: any = {};
    for (let i = 0; i < data.length; i++) {
      const series = data[i];
      if (series.type !== 'docs') {
        continue;
      }

      // only look at 100 docs
      const maxDocs = Math.min(series.datapoints.length, 100);
      for (let y = 0; y < maxDocs; y++) {
        const doc = series.datapoints[y];
        const flattened = flatten(doc, null);
        for (const propName in flattened) {
          names[propName] = true;
        }
      }
    }

    return _.map(names, (value, key) => {
      return { text: key, value: key };
    });
  },
  transform: (data, panel, model) => {
    let i, y, z;

    for (const column of panel.columns) {
      const tableCol: any = { text: column.text };

      // if filterable data then set columns to filterable
      if (data.length > 0 && data[0].filterable) {
        tableCol.filterable = true;
      }

      model.columns.push(tableCol);
    }

    if (model.columns.length === 0) {
      model.columns.push({ text: 'JSON' });
    }

    for (i = 0; i < data.length; i++) {
      const series = data[i];

      for (y = 0; y < series.datapoints.length; y++) {
        const dp = series.datapoints[y];
        const values: any[] = [];

        if (_.isObject(dp) && panel.columns.length > 0) {
          const flattened = flatten(dp, null);
          for (z = 0; z < panel.columns.length; z++) {
            values.push(flattened[panel.columns[z].value]);
          }
        } else {
          values.push(JSON.stringify(dp));
        }

        model.rows.push(values);
      }
    }
  },
};

function transformDataToTable(data, panel) {
  const model = new TableModel();

  if (!data || data.length === 0) {
    return model;
  }

  const transformer = transformers[panel.transform];
  if (!transformer) {
    throw { message: 'Transformer ' + panel.transform + ' not found' };
  }

  transformer.transform(data, panel, model);
  return model;
}

export { transformers, transformDataToTable };
