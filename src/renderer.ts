import _ from 'lodash';
import moment from 'moment';
import kbn from 'grafana/app/core/utils/kbn';
import { getValueFormat, getColorFromHexRgbOrName, GrafanaThemeType } from '@grafana/ui';

export class TableRenderer {
  formatters: any[];
  colorState: any;

  constructor(
    private panel,
    private table,
    private isUtc,
    private sanitize,
    private templateSrv,
    private theme?: GrafanaThemeType
  ) {
    this.initColumns();
  }

  setTable(table) {
    this.table = table;

    this.initColumns();
  }

  initColumns() {
    this.formatters = [];
    this.colorState = {};

    for (let colIndex = 0; colIndex < this.table.columns.length; colIndex++) {
      const column = this.table.columns[colIndex];
      column.title = column.text;

      for (let i = 0; i < this.panel.styles.length; i++) {
        const style = this.panel.styles[i];

        const regex = kbn.stringToJsRegex(style.pattern);
        if (column.text.match(regex)) {
          column.style = style;

          if (style.alias) {
            column.title = column.text.replace(regex, style.alias);
          }

          break;
        }
      }

      this.formatters[colIndex] = this.createColumnFormatter(column);
    }
  }

  getColorForValue(value, style) {
    if (!style.thresholds) {
      return null;
    }
    for (let i = style.thresholds.length; i > 0; i--) {
      if (value >= style.thresholds[i - 1]) {
        return getColorFromHexRgbOrName(style.colors[i], this.theme);
      }
    }
    return getColorFromHexRgbOrName(style.colors[0], this.theme);
  }

  defaultCellFormatter(v, style) {
    if (v === null || v === void 0 || v === undefined) {
      return '';
    }

    if (_.isArray(v)) {
      v = v.join(', ');
    }

    if (style && style.sanitize) {
      return this.sanitize(v);
    } else {
      return _.escape(v);
    }
  }

  createColumnFormatter(column) {
    if (!column.style) {
      return this.defaultCellFormatter;
    }

    if (column.style.type === 'hidden') {
      return v => {
        return undefined;
      };
    }

    if (column.style.type === 'date') {
      return v => {
        if (v === undefined || v === null) {
          return '-';
        }

        if (_.isArray(v)) {
          v = v[0];
        }

        // if is an epoch (numeric string and len > 12)
        if (_.isString(v) && !isNaN(Number(v)) && v.length > 12) {
          v = parseInt(v, 10);
        }

        let date = moment(v);

        if (this.isUtc) {
          date = date.utc();
        }
        column.style.rawValue = v;
        return date.format(column.style.dateFormat);
      };
    }

    if (column.style.type === 'string') {
      return v => {
        if (_.isArray(v)) {
          v = v.join(', ');
        }

        const mappingType = column.style.mappingType || 0;

        if (mappingType === 1 && column.style.valueMaps) {
          for (let i = 0; i < column.style.valueMaps.length; i++) {
            const map = column.style.valueMaps[i];

            if (v === null) {
              if (map.value === 'null') {
                return map.text;
              }
              continue;
            }

            // Allow both numeric and string values to be mapped
            if ((!_.isString(v) && Number(map.value) === Number(v)) || map.value === v) {
              this.setColorState(v, column.style);
              return this.defaultCellFormatter(map.text, column.style);
            }
          }
        }

        if (mappingType === 2 && column.style.rangeMaps) {
          for (let i = 0; i < column.style.rangeMaps.length; i++) {
            const map = column.style.rangeMaps[i];

            if (v === null) {
              if (map.from === 'null' && map.to === 'null') {
                return map.text;
              }
              continue;
            }

            if (Number(map.from) <= Number(v) && Number(map.to) >= Number(v)) {
              this.setColorState(v, column.style);
              return this.defaultCellFormatter(map.text, column.style);
            }
          }
        }

        if (v === null || v === void 0) {
          return '-';
        }

        this.setColorState(v, column.style);
        return this.defaultCellFormatter(v, column.style);
      };
    }

    if (column.style.type === 'number') {
      const valueFormatter = getValueFormat(column.unit || column.style.unit);

      return v => {
        column.style.rawValue = v;
        if (v === null || v === void 0) {
          return '-';
        }

        if (_.isString(v) || _.isArray(v)) {
          return this.defaultCellFormatter(v, column.style);
        }

        this.setColorState(v, column.style);
        return valueFormatter(v, column.style.decimals, null);
      };
    }

    return value => {
      column.style.rawValue = value;
      return this.defaultCellFormatter(value, column.style);
    };
  }

  setColorState(value, style) {
    if (!style.colorMode) {
      return;
    }

    if (value === null || value === void 0 || _.isArray(value)) {
      return;
    }

    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      return;
    }

    this.colorState[style.colorMode] = this.getColorForValue(numericValue, style);
  }

  renderRowVariables(rowIndex) {
    const scopedVars = {};
    let cellVariable;
    const row = this.table.rows[rowIndex];
    for (let i = 0; i < row.length; i++) {
      cellVariable = `__cell_${i}`;
      scopedVars[cellVariable] = { value: row[i] };
    }
    return scopedVars;
  }

  formatColumnValue(colIndex, value) {
    return this.formatters[colIndex] ? this.formatters[colIndex](value) : value;
  }

  renderCell(columnIndex, rowIndex, value, addWidthHack = false) {
    value = this.formatColumnValue(columnIndex, value);

    const column = this.table.columns[columnIndex];
    let cellStyle = '';
    let textStyle = '';
    const cellClasses: any[] = [];
    let cellClass = '';

    if (this.colorState.cell) {
      cellStyle = ' style="background-color:' + this.colorState.cell + '"';
      cellClasses.push('table-panel-color-cell');
      this.colorState.cell = null;
    } else if (this.colorState.value) {
      textStyle = ' style="color:' + this.colorState.value + '"';
      this.colorState.value = null;
    }
    // because of the fixed table headers css only solution
    // there is an issue if header cell is wider the cell
    // this hack adds header content to cell (not visible)
    let columnHtml = '';
    if (addWidthHack) {
      columnHtml = '<div class="table-panel-width-hack">' + this.table.columns[columnIndex].title + '</div>';
    }

    if (value === undefined) {
      cellStyle = ' style="display:none;"';
      column.hidden = true;
    } else {
      column.hidden = false;
    }

    if (column.hidden === true) {
      return '';
    }

    if (column.style && column.style.preserveFormat) {
      cellClasses.push('table-panel-cell-pre');
    }

    if (column.style && column.style.link) {
      // Render cell as link
      const scopedVars = this.renderRowVariables(rowIndex);
      scopedVars['__cell'] = { value: value };

      const cellLink = this.templateSrv.replace(column.style.linkUrl, scopedVars, encodeURIComponent);
      const cellLinkTooltip = this.templateSrv.replace(column.style.linkTooltip, scopedVars);
      const cellTarget = column.style.linkTargetBlank ? '_blank' : '';

      cellClasses.push('table-panel-cell-link');

      columnHtml += `
        <a href="${cellLink}" target="${cellTarget}" data-link-tooltip data-original-title="${cellLinkTooltip}" data-placement="right"${textStyle}>
          ${value}
        </a>
      `;
    } else {
      columnHtml += value;
    }

    if (column.filterable) {
      cellClasses.push('table-panel-cell-filterable');
      columnHtml += `
        <a class="table-panel-filter-link" data-link-tooltip data-original-title="Filter out value" data-placement="bottom"
           data-row="${rowIndex}" data-column="${columnIndex}" data-operator="!=">
          <i class="fa fa-search-minus"></i>
        </a>
        <a class="table-panel-filter-link" data-link-tooltip data-original-title="Filter for value" data-placement="bottom"
           data-row="${rowIndex}" data-column="${columnIndex}" data-operator="=">
          <i class="fa fa-search-plus"></i>
        </a>`;
    }

    if (cellClasses.length) {
      cellClass = ' class="' + cellClasses.join(' ') + '"';
    }

    if (column.style && column.style.type === 'flags') {
      const code = column.style.rawValue.toLowerCase();
      columnHtml = column.style.display === 'flagicon' ? `<span class="flag-icon flag-icon-${code}"></span>` : value;
    }

    if (column.style && column.style.display === 'delta') {
      const num = Number(column.style.rawValue);
      const icon = num > 0 ? 'up' : num < 0 ? 'down' : undefined;
      const colors = column.style.colors;
      const color = icon === 'up' ? colors[colors.length - 1] : icon === 'down' ? colors[0] : '#ffffff';

      const html = `
        <td style="padding:0;background-color:#212124;">
          <div class="arrow-container" style="color:${color};">
            <i class="grafana-tip fa fa-arrow-${icon}"></i>
            <span class="bidder-tooltip">${value}</span>
          </div>
        </td>
      `;

      return icon ? html : '<td' + cellClass + cellStyle + textStyle + '></td>';
    }

    if (column.style && column.style.display === 'progressbar') {
      const color = this.getColorForValue(Number(column.style.rawValue), column.style);
      const pbarStyle = `display:block;width:${value};max-width:100%;height:100%;padding:5px 0;background-color:${color}`;

      columnHtml = `
      <td style="padding:0;background-color:#212124;">
        <div style="${pbarStyle}"><span style="padding-left:15px;">${value}</span></div>
      </td>`;
    } else {
      columnHtml = column.style && column.style.display === 'stealth' ? `<td style="display:none;">${columnHtml}</td>` : '<td' + cellClass + cellStyle + textStyle + '>' + columnHtml + '</td>';
    }
    return columnHtml;
  }

  render(page) {
    const pageSize = this.panel.pageSize || 100;
    const startPos = page * pageSize;
    const endPos = Math.min(startPos + pageSize, this.table.rows.length);
    let html = '';
    const rowClasses: any[] = [];
    let rowClass = '';

    for (let y = startPos; y < endPos; y++) {
      const row = this.table.rows[y];
      let cellHtml = '';
      let rowStyle = '';
      for (let i = 0; i < this.table.columns.length; i++) {
        cellHtml += this.renderCell(i, y, row[i], y === startPos);
      }

      if (this.colorState.row) {
        rowStyle = ' style="background-color:' + this.colorState.row + '"';
        rowClasses.push('table-panel-color-row');
        this.colorState.row = null;
      }

      if (rowClasses.length) {
        rowClass = ' class="' + rowClasses.join(' ') + '"';
      }

      html += '<tr ' + rowClass + rowStyle + '>' + cellHtml + '</tr>';
    }

    return html;
  }

  render_values() {
    const rows: any[] = [];

    for (let y = 0; y < this.table.rows.length; y++) {
      const row = this.table.rows[y];
      const newRow: any[] = [];
      for (let i = 0; i < this.table.columns.length; i++) {
        newRow.push(this.formatColumnValue(i, row[i]));
      }
      rows.push(newRow);
    }
    return {
      columns: this.table.columns,
      rows: rows,
    };
  }
}
