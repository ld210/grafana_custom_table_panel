define(["app/core/table_model","app/core/time_series2","app/core/utils/flatten","lodash"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_core_table_model__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_time_series2__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_flatten__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./editor.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./editor.ts":
/*!*******************!*\
  !*** ./editor.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TablePanelEditorCtrl = undefined;
exports.tablePanelEditor = tablePanelEditor;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _transformers = __webpack_require__(/*! ./transformers */ "./transformers.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TablePanelEditorCtrl =
/** @class */
function () {
  /** @ngInject */
  function TablePanelEditorCtrl($scope, $q, uiSegmentSrv) {
    this.$q = $q;
    this.uiSegmentSrv = uiSegmentSrv;
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.transformers = _transformers.transformers;
    this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
    this.addColumnSegment = uiSegmentSrv.newPlusButton();
    this.updateTransformHints();
  }

  TablePanelEditorCtrl.prototype.updateTransformHints = function () {
    this.canSetColumns = false;
    this.columnsHelpMessage = '';

    switch (this.panel.transform) {
      case 'timeseries_aggregations':
        {
          this.canSetColumns = true;
          break;
        }

      case 'json':
        {
          this.canSetColumns = true;
          break;
        }

      case 'table':
        {
          this.columnsHelpMessage = 'Columns and their order are determined by the data query';
        }
    }
  };

  TablePanelEditorCtrl.prototype.getColumnOptions = function () {
    var _this = this;

    if (!this.panelCtrl.dataRaw) {
      return this.$q.when([]);
    }

    var columns = this.transformers[this.panel.transform].getColumns(this.panelCtrl.dataRaw);

    var segments = _lodash2.default.map(columns, function (c) {
      return _this.uiSegmentSrv.newSegment({
        value: c.text
      });
    });

    return this.$q.when(segments);
  };

  TablePanelEditorCtrl.prototype.addColumn = function () {
    var columns = _transformers.transformers[this.panel.transform].getColumns(this.panelCtrl.dataRaw);

    var column = _lodash2.default.find(columns, {
      text: this.addColumnSegment.value
    });

    if (column) {
      this.panel.columns.push(column);
      this.render();
    }

    var plusButton = this.uiSegmentSrv.newPlusButton();
    this.addColumnSegment.html = plusButton.html;
    this.addColumnSegment.value = plusButton.value;
  };

  TablePanelEditorCtrl.prototype.transformChanged = function () {
    this.panel.columns = [];

    if (this.panel.transform === 'timeseries_aggregations') {
      this.panel.columns.push({
        text: 'Avg',
        value: 'avg'
      });
    }

    this.updateTransformHints();
    this.render();
  };

  TablePanelEditorCtrl.prototype.render = function () {
    this.panelCtrl.render();
  };

  TablePanelEditorCtrl.prototype.removeColumn = function (column) {
    this.panel.columns = _lodash2.default.without(this.panel.columns, column);
    this.panelCtrl.render();
  };

  return TablePanelEditorCtrl;
}();

exports.TablePanelEditorCtrl = TablePanelEditorCtrl;
/** @ngInject */

function tablePanelEditor($q, uiSegmentSrv) {
  'use strict';

  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/plugins/tradelab-bidder-table/editor.html',
    controller: TablePanelEditorCtrl
  };
}

/***/ }),

/***/ "./transformers.ts":
/*!*************************!*\
  !*** ./transformers.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformDataToTable = exports.transformers = undefined;
exports.mergeTablesIntoModel = mergeTablesIntoModel;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _flatten = __webpack_require__(/*! grafana/app/core/utils/flatten */ "grafana/app/core/utils/flatten");

var _flatten2 = _interopRequireDefault(_flatten);

var _time_series = __webpack_require__(/*! grafana/app/core/time_series2 */ "grafana/app/core/time_series2");

var _time_series2 = _interopRequireDefault(_time_series);

var _table_model = __webpack_require__(/*! grafana/app/core/table_model */ "grafana/app/core/table_model");

var _table_model2 = _interopRequireDefault(_table_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformers = {}; // Returns true if both rows have matching non-empty fields as well as matching
// indexes where one field is empty and the other is not

function areRowsMatching(columns, row, otherRow) {
  var foundFieldToMatch = false;

  for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
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

function mergeTablesIntoModel(dst) {
  var tables = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    tables[_i - 1] = arguments[_i];
  }

  var model = dst || new _table_model2.default();

  if (arguments.length === 1) {
    return model;
  } // Single query returns data columns and rows as is


  if (arguments.length === 2) {
    model.columns = tables[0].hasOwnProperty('columns') ? tables[0].columns.slice() : [];
    model.rows = tables[0].hasOwnProperty('rows') ? tables[0].rows.slice() : [];
    return model;
  } // Track column indexes of union: name -> index


  var columnNames = {}; // Union of all non-value columns

  var columnsUnion = tables.slice().reduce(function (acc, series) {
    series.columns.forEach(function (col) {
      var text = col.text;

      if (columnNames[text] === undefined) {
        columnNames[text] = acc.length;
        acc.push(col);
      }
    });
    return acc;
  }, []); // Map old column index to union index per series, e.g.,
  // given columnNames {A: 0, B: 1} and
  // data [{columns: [{ text: 'A' }]}, {columns: [{ text: 'B' }]}] => [[0], [1]]

  var columnIndexMapper = tables.map(function (series) {
    return series.columns.map(function (col) {
      return columnNames[col.text];
    });
  }); // Flatten rows of all series and adjust new column indexes

  var flattenedRows = tables.reduce(function (acc, series, seriesIndex) {
    var mapper = columnIndexMapper[seriesIndex];
    series.rows.forEach(function (row) {
      var alteredRow = []; // Shifting entries according to index mapper

      mapper.forEach(function (to, from) {
        alteredRow[to] = row[from];
      });
      acc.push(alteredRow);
    });
    return acc;
  }, []); // Merge rows that have same values for columns

  var mergedRows = {};
  var compactedRows = flattenedRows.reduce(function (acc, row, rowIndex) {
    if (!mergedRows[rowIndex]) {
      // Look from current row onwards
      var offset = rowIndex + 1; // More than one row can be merged into current row

      while (offset < flattenedRows.length) {
        // Find next row that could be merged
        var match = _lodash2.default.findIndex(flattenedRows, function (otherRow) {
          return areRowsMatching(columnsUnion, row, otherRow);
        }, offset);

        if (match > -1) {
          var matchedRow = flattenedRows[match]; // Merge values from match into current row if there is a gap in the current row

          for (var columnIndex = 0; columnIndex < columnsUnion.length; columnIndex++) {
            if (row[columnIndex] === undefined && matchedRow[columnIndex] !== undefined) {
              row[columnIndex] = matchedRow[columnIndex];
            }
          } // Don't visit this row again


          mergedRows[match] = matchedRow; // Keep looking for more rows to merge

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
  getColumns: function getColumns() {
    return [];
  },
  transform: function transform(data, panel, model) {
    model.columns = [{
      text: 'Time',
      type: 'date'
    }, {
      text: 'Metric'
    }, {
      text: 'Value'
    }];

    for (var i = 0; i < data.length; i++) {
      var series = data[i];

      for (var y = 0; y < series.datapoints.length; y++) {
        var dp = series.datapoints[y];
        model.rows.push([dp[1], series.target, dp[0]]);
      }
    }
  }
};
transformers['timeseries_to_columns'] = {
  description: 'Time series to columns',
  getColumns: function getColumns() {
    return [];
  },
  transform: function transform(data, panel, model) {
    model.columns.push({
      text: 'Time',
      type: 'date'
    }); // group by time

    var points = {};

    for (var i = 0; i < data.length; i++) {
      var series = data[i];
      model.columns.push({
        text: series.target
      });

      for (var y = 0; y < series.datapoints.length; y++) {
        var dp = series.datapoints[y];
        var timeKey = dp[1].toString();

        if (!points[timeKey]) {
          points[timeKey] = {
            time: dp[1]
          };
          points[timeKey][i] = dp[0];
        } else {
          points[timeKey][i] = dp[0];
        }
      }
    }

    for (var time in points) {
      var point = points[time];
      var values = [point.time];

      for (var i = 0; i < data.length; i++) {
        var value = point[i];
        values.push(value);
      }

      model.rows.push(values);
    }
  }
};
transformers['timeseries_aggregations'] = {
  description: 'Time series aggregations',
  getColumns: function getColumns() {
    return [{
      text: 'Avg',
      value: 'avg'
    }, {
      text: 'Min',
      value: 'min'
    }, {
      text: 'Max',
      value: 'max'
    }, {
      text: 'Total',
      value: 'total'
    }, {
      text: 'Current',
      value: 'current'
    }, {
      text: 'Count',
      value: 'count'
    }];
  },
  transform: function transform(data, panel, model) {
    var i, y;
    model.columns.push({
      text: 'Metric'
    });

    for (i = 0; i < panel.columns.length; i++) {
      model.columns.push({
        text: panel.columns[i].text
      });
    }

    for (i = 0; i < data.length; i++) {
      var series = new _time_series2.default({
        datapoints: data[i].datapoints,
        alias: data[i].target
      });
      series.getFlotPairs('connected');
      var cells = [series.alias];

      for (y = 0; y < panel.columns.length; y++) {
        cells.push(series.stats[panel.columns[y].value]);
      }

      model.rows.push(cells);
    }
  }
};
transformers['annotations'] = {
  description: 'Annotations',
  getColumns: function getColumns() {
    return [];
  },
  transform: function transform(data, panel, model) {
    model.columns.push({
      text: 'Time',
      type: 'date'
    });
    model.columns.push({
      text: 'Title'
    });
    model.columns.push({
      text: 'Text'
    });
    model.columns.push({
      text: 'Tags'
    });

    if (!data || !data.annotations || data.annotations.length === 0) {
      return;
    }

    for (var i = 0; i < data.annotations.length; i++) {
      var evt = data.annotations[i];
      model.rows.push([evt.time, evt.title, evt.text, evt.tags]);
    }
  }
};
transformers['table'] = {
  description: 'Table',
  getColumns: function getColumns(data) {
    if (!data || data.length === 0) {
      return [];
    } // Single query returns data columns as is


    if (data.length === 1) {
      return data[0].columns.slice();
    } // Track column indexes: name -> index


    var columnNames = {}; // Union of all columns

    var columns = data.reduce(function (acc, series) {
      series.columns.forEach(function (col) {
        var text = col.text;

        if (columnNames[text] === undefined) {
          columnNames[text] = acc.length;
          acc.push(col);
        }
      });
      return acc;
    }, []);
    return columns;
  },
  transform: function transform(data, panel, model) {
    if (!data || data.length === 0) {
      return;
    }

    var noTableIndex = _lodash2.default.findIndex(data, function (d) {
      return d.type !== 'table';
    });

    if (noTableIndex > -1) {
      throw {
        message: "Result of query #" + String.fromCharCode(65 + noTableIndex) + " is not in table format, try using another transform."
      };
    }

    mergeTablesIntoModel.apply(void 0, [model].concat(data));
  }
};
transformers['json'] = {
  description: 'JSON Data',
  getColumns: function getColumns(data) {
    if (!data || data.length === 0) {
      return [];
    }

    var names = {};

    for (var i = 0; i < data.length; i++) {
      var series = data[i];

      if (series.type !== 'docs') {
        continue;
      } // only look at 100 docs


      var maxDocs = Math.min(series.datapoints.length, 100);

      for (var y = 0; y < maxDocs; y++) {
        var doc = series.datapoints[y];
        var flattened = (0, _flatten2.default)(doc, null);

        for (var propName in flattened) {
          names[propName] = true;
        }
      }
    }

    return _lodash2.default.map(names, function (value, key) {
      return {
        text: key,
        value: key
      };
    });
  },
  transform: function transform(data, panel, model) {
    var i, y, z;

    for (var _i = 0, _a = panel.columns; _i < _a.length; _i++) {
      var column = _a[_i];
      var tableCol = {
        text: column.text
      }; // if filterable data then set columns to filterable

      if (data.length > 0 && data[0].filterable) {
        tableCol.filterable = true;
      }

      model.columns.push(tableCol);
    }

    if (model.columns.length === 0) {
      model.columns.push({
        text: 'JSON'
      });
    }

    for (i = 0; i < data.length; i++) {
      var series = data[i];

      for (y = 0; y < series.datapoints.length; y++) {
        var dp = series.datapoints[y];
        var values = [];

        if (_lodash2.default.isObject(dp) && panel.columns.length > 0) {
          var flattened = (0, _flatten2.default)(dp, null);

          for (z = 0; z < panel.columns.length; z++) {
            values.push(flattened[panel.columns[z].value]);
          }
        } else {
          values.push(JSON.stringify(dp));
        }

        model.rows.push(values);
      }
    }
  }
};

function transformDataToTable(data, panel) {
  var model = new _table_model2.default();

  if (!data || data.length === 0) {
    return model;
  }

  var transformer = transformers[panel.transform];

  if (!transformer) {
    throw {
      message: 'Transformer ' + panel.transform + ' not found'
    };
  }

  transformer.transform(data, panel, model);
  return model;
}

exports.transformers = transformers;
exports.transformDataToTable = transformDataToTable;

/***/ }),

/***/ "grafana/app/core/table_model":
/*!***************************************!*\
  !*** external "app/core/table_model" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_table_model__;

/***/ }),

/***/ "grafana/app/core/time_series2":
/*!****************************************!*\
  !*** external "app/core/time_series2" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_time_series2__;

/***/ }),

/***/ "grafana/app/core/utils/flatten":
/*!*****************************************!*\
  !*** external "app/core/utils/flatten" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_flatten__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })});;
//# sourceMappingURL=editor.js.map