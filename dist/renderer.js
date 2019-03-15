define(["@grafana/ui","app/core/utils/kbn","lodash","moment"], function(__WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_moment__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./renderer.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./renderer.ts":
/*!*********************!*\
  !*** ./renderer.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableRenderer = undefined;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

var _kbn = __webpack_require__(/*! grafana/app/core/utils/kbn */ "grafana/app/core/utils/kbn");

var _kbn2 = _interopRequireDefault(_kbn);

var _ui = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRenderer =
/** @class */
function () {
  function TableRenderer(panel, table, isUtc, sanitize, templateSrv, theme) {
    this.panel = panel;
    this.table = table;
    this.isUtc = isUtc;
    this.sanitize = sanitize;
    this.templateSrv = templateSrv;
    this.theme = theme;
    this.initColumns();
  }

  TableRenderer.prototype.setTable = function (table) {
    this.table = table;
    this.initColumns();
  };

  TableRenderer.prototype.initColumns = function () {
    this.formatters = [];
    this.colorState = {};

    for (var colIndex = 0; colIndex < this.table.columns.length; colIndex++) {
      var column = this.table.columns[colIndex];
      column.title = column.text;

      for (var i = 0; i < this.panel.styles.length; i++) {
        var style = this.panel.styles[i];

        var regex = _kbn2.default.stringToJsRegex(style.pattern);

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
  };

  TableRenderer.prototype.getColorForValue = function (value, style) {
    if (!style.thresholds) {
      return null;
    }

    for (var i = style.thresholds.length; i > 0; i--) {
      if (value >= style.thresholds[i - 1]) {
        return (0, _ui.getColorFromHexRgbOrName)(style.colors[i], this.theme);
      }
    }

    return (0, _ui.getColorFromHexRgbOrName)(style.colors[0], this.theme);
  };

  TableRenderer.prototype.defaultCellFormatter = function (v, style) {
    if (v === null || v === void 0 || v === undefined) {
      return '';
    }

    if (_lodash2.default.isArray(v)) {
      v = v.join(', ');
    }

    if (style && style.sanitize) {
      return this.sanitize(v);
    } else {
      return _lodash2.default.escape(v);
    }
  };

  TableRenderer.prototype.createColumnFormatter = function (column) {
    var _this = this;

    if (!column.style) {
      return this.defaultCellFormatter;
    }

    if (column.style.type === 'hidden') {
      return function (v) {
        return undefined;
      };
    }

    if (column.style.type === 'date') {
      return function (v) {
        if (v === undefined || v === null) {
          return '-';
        }

        if (_lodash2.default.isArray(v)) {
          v = v[0];
        } // if is an epoch (numeric string and len > 12)


        if (_lodash2.default.isString(v) && !isNaN(Number(v)) && v.length > 12) {
          v = parseInt(v, 10);
        }

        var date = (0, _moment2.default)(v);

        if (_this.isUtc) {
          date = date.utc();
        }

        column.style.rawValue = v;
        return date.format(column.style.dateFormat);
      };
    }

    if (column.style.type === 'string') {
      return function (v) {
        if (_lodash2.default.isArray(v)) {
          v = v.join(', ');
        }

        var mappingType = column.style.mappingType || 0;

        if (mappingType === 1 && column.style.valueMaps) {
          for (var i = 0; i < column.style.valueMaps.length; i++) {
            var map = column.style.valueMaps[i];

            if (v === null) {
              if (map.value === 'null') {
                return map.text;
              }

              continue;
            } // Allow both numeric and string values to be mapped


            if (!_lodash2.default.isString(v) && Number(map.value) === Number(v) || map.value === v) {
              _this.setColorState(v, column.style);

              return _this.defaultCellFormatter(map.text, column.style);
            }
          }
        }

        if (mappingType === 2 && column.style.rangeMaps) {
          for (var i = 0; i < column.style.rangeMaps.length; i++) {
            var map = column.style.rangeMaps[i];

            if (v === null) {
              if (map.from === 'null' && map.to === 'null') {
                return map.text;
              }

              continue;
            }

            if (Number(map.from) <= Number(v) && Number(map.to) >= Number(v)) {
              _this.setColorState(v, column.style);

              return _this.defaultCellFormatter(map.text, column.style);
            }
          }
        }

        if (v === null || v === void 0) {
          return '-';
        }

        _this.setColorState(v, column.style);

        return _this.defaultCellFormatter(v, column.style);
      };
    }

    if (column.style.type === 'number') {
      var valueFormatter_1 = (0, _ui.getValueFormat)(column.unit || column.style.unit);
      return function (v) {
        column.style.rawValue = v;

        if (v === null || v === void 0) {
          return '-';
        }

        if (_lodash2.default.isString(v) || _lodash2.default.isArray(v)) {
          return _this.defaultCellFormatter(v, column.style);
        }

        _this.setColorState(v, column.style);

        return valueFormatter_1(v, column.style.decimals, null);
      };
    }

    return function (value) {
      column.style.rawValue = value;
      return _this.defaultCellFormatter(value, column.style);
    };
  };

  TableRenderer.prototype.setColorState = function (value, style) {
    if (!style.colorMode) {
      return;
    }

    if (value === null || value === void 0 || _lodash2.default.isArray(value)) {
      return;
    }

    var numericValue = Number(value);

    if (isNaN(numericValue)) {
      return;
    }

    this.colorState[style.colorMode] = this.getColorForValue(numericValue, style);
  };

  TableRenderer.prototype.renderRowVariables = function (rowIndex) {
    var scopedVars = {};
    var cellVariable;
    var row = this.table.rows[rowIndex];

    for (var i = 0; i < row.length; i++) {
      cellVariable = "__cell_" + i;
      scopedVars[cellVariable] = {
        value: row[i]
      };
    }

    return scopedVars;
  };

  TableRenderer.prototype.formatColumnValue = function (colIndex, value) {
    return this.formatters[colIndex] ? this.formatters[colIndex](value) : value;
  };

  TableRenderer.prototype.renderCell = function (columnIndex, rowIndex, value, addWidthHack) {
    if (addWidthHack === void 0) {
      addWidthHack = false;
    }

    value = this.formatColumnValue(columnIndex, value);
    var column = this.table.columns[columnIndex];
    var cellStyle = '';
    var textStyle = '';
    var cellClasses = [];
    var cellClass = '';

    if (this.colorState.cell) {
      cellStyle = ' style="background-color:' + this.colorState.cell + '"';
      cellClasses.push('table-panel-color-cell');
      this.colorState.cell = null;
    } else if (this.colorState.value) {
      textStyle = ' style="color:' + this.colorState.value + '"';
      this.colorState.value = null;
    } // because of the fixed table headers css only solution
    // there is an issue if header cell is wider the cell
    // this hack adds header content to cell (not visible)


    var columnHtml = '';

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
      var scopedVars = this.renderRowVariables(rowIndex);
      scopedVars['__cell'] = {
        value: value
      };
      var cellLink = this.templateSrv.replace(column.style.linkUrl, scopedVars, encodeURIComponent);
      var cellLinkTooltip = this.templateSrv.replace(column.style.linkTooltip, scopedVars);
      var cellTarget = column.style.linkTargetBlank ? '_blank' : '';
      cellClasses.push('table-panel-cell-link');
      columnHtml += "\n        <a href=\"" + cellLink + "\" target=\"" + cellTarget + "\" data-link-tooltip data-original-title=\"" + cellLinkTooltip + "\" data-placement=\"right\"" + textStyle + ">\n          " + value + "\n        </a>\n      ";
    } else {
      columnHtml += value;
    }

    if (column.filterable) {
      cellClasses.push('table-panel-cell-filterable');
      columnHtml += "\n        <a class=\"table-panel-filter-link\" data-link-tooltip data-original-title=\"Filter out value\" data-placement=\"bottom\"\n           data-row=\"" + rowIndex + "\" data-column=\"" + columnIndex + "\" data-operator=\"!=\">\n          <i class=\"fa fa-search-minus\"></i>\n        </a>\n        <a class=\"table-panel-filter-link\" data-link-tooltip data-original-title=\"Filter for value\" data-placement=\"bottom\"\n           data-row=\"" + rowIndex + "\" data-column=\"" + columnIndex + "\" data-operator=\"=\">\n          <i class=\"fa fa-search-plus\"></i>\n        </a>";
    }

    if (cellClasses.length) {
      cellClass = ' class="' + cellClasses.join(' ') + '"';
    }

    if (column.style && column.style.type === 'delta') {
      var num = Number(column.style.rawValue);
      var icon = num > 0 ? 'up' : num < 0 ? 'down' : undefined;
      var colors = column.style.colors;
      var color = icon === 'up' ? colors[colors.length - 1] : icon === 'down' ? colors[0] : '#ffffff';
      var html = "\n        <div class=\"arrow-container\" style=\"display:block;width:25px;height:25px;color:" + color + ";font-size:20px;line-height:25px;\">\n          <i class=\"grafana-tip fa fa-arrow-" + icon + "\" bs-tooltip=\"" + value + "\" data-original-title title=\"" + value + "\"></i>\n          <span class=\"bidder-tooltip\">" + value + "</span>\n        </div>\n      ";
      columnHtml = icon ? html : '-';
    }

    if (column.style && column.style.display === 'progressbar') {
      var color = this.getColorForValue(Number(column.style.rawValue), column.style);
      var pbarStyle = "display:block;width:" + value + ";max-width:100%;height:100%;padding:5px 0;background-color:" + color;
      columnHtml = "\n      <td style=\"padding:0;background-color:#212124;\">\n        <div style=\"" + pbarStyle + "\"><span style=\"padding-left:15px;\">" + value + "</span></div>\n      </td>";
    } else {
      columnHtml = '<td' + cellClass + cellStyle + textStyle + '>' + columnHtml + '</td>';
    }

    return columnHtml;
  };

  TableRenderer.prototype.render = function (page) {
    var pageSize = this.panel.pageSize || 100;
    var startPos = page * pageSize;
    var endPos = Math.min(startPos + pageSize, this.table.rows.length);
    var html = '';
    var rowClasses = [];
    var rowClass = '';

    for (var y = startPos; y < endPos; y++) {
      var row = this.table.rows[y];
      var cellHtml = '';
      var rowStyle = '';

      for (var i = 0; i < this.table.columns.length; i++) {
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
  };

  TableRenderer.prototype.render_values = function () {
    var rows = [];

    for (var y = 0; y < this.table.rows.length; y++) {
      var row = this.table.rows[y];
      var newRow = [];

      for (var i = 0; i < this.table.columns.length; i++) {
        newRow.push(this.formatColumnValue(i, row[i]));
      }

      rows.push(newRow);
    }

    return {
      columns: this.table.columns,
      rows: rows
    };
  };

  return TableRenderer;
}();

exports.TableRenderer = TableRenderer;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "grafana/app/core/utils/kbn":
/*!*************************************!*\
  !*** external "app/core/utils/kbn" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_moment__;

/***/ })

/******/ })});;
//# sourceMappingURL=renderer.js.map