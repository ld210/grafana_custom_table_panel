define(["@grafana/ui","lodash"], function(__WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./column_options.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./column_options.ts":
/*!***************************!*\
  !*** ./column_options.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnOptionsCtrl = undefined;
exports.columnOptionsTab = columnOptionsTab;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _ui = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColumnOptionsCtrl =
/** @class */
function () {
  /** @ngInject */
  function ColumnOptionsCtrl($scope) {
    var _this = this;

    $scope.editor = this;
    this.activeStyleIndex = 0;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.unitFormats = (0, _ui.getValueFormats)();
    this.colorModes = [{
      text: 'Disabled',
      value: null
    }, {
      text: 'Cell',
      value: 'cell'
    }, {
      text: 'Value',
      value: 'value'
    }, {
      text: 'Row',
      value: 'row'
    }];
    this.columnTypes = [{
      text: 'Number',
      value: 'number'
    }, {
      text: 'String',
      value: 'string'
    }, {
      text: 'Country code',
      value: 'flags'
    }, {
      text: 'Date',
      value: 'date'
    }, {
      text: 'Hidden',
      value: 'hidden'
    }];
    this.displayOptions = [{
      text: 'Value',
      value: 'val'
    }, {
      text: 'Progress Bar',
      value: 'progressbar'
    }, {
      text: 'Delta',
      value: 'delta'
    }, {
      text: 'Stealth mode',
      value: 'stealth'
    }];
    this.countryDisplayOptions = [{
      text: 'ISO Code',
      value: 'iso'
    }, {
      text: 'Flag icon',
      value: 'flagicon'
    }];
    this.stringDisplayOptions = [{
      text: 'Value',
      value: 'val'
    }, {
      text: 'Stealth mode',
      value: 'stealth'
    }];
    this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
    this.dateFormats = [{
      text: 'YYYY-MM-DD HH:mm:ss',
      value: 'YYYY-MM-DD HH:mm:ss'
    }, {
      text: 'YYYY-MM-DD HH:mm:ss.SSS',
      value: 'YYYY-MM-DD HH:mm:ss.SSS'
    }, {
      text: 'MM/DD/YY h:mm:ss a',
      value: 'MM/DD/YY h:mm:ss a'
    }, {
      text: 'MMMM D, YYYY LT',
      value: 'MMMM D, YYYY LT'
    }, {
      text: 'YYYY-MM-DD',
      value: 'YYYY-MM-DD'
    }];
    this.mappingTypes = [{
      text: 'Value to text',
      value: 1
    }, {
      text: 'Range to text',
      value: 2
    }];

    this.getColumnNames = function () {
      if (!_this.panelCtrl.table) {
        return [];
      }

      return _lodash2.default.map(_this.panelCtrl.table.columns, function (col) {
        return col.text;
      });
    };

    this.onColorChange = this.onColorChange.bind(this);
  }

  ColumnOptionsCtrl.prototype.render = function () {
    this.panelCtrl.render();
  };

  ColumnOptionsCtrl.prototype.setUnitFormat = function (column, subItem) {
    column.unit = subItem.value;
    this.panelCtrl.render();
  };

  ColumnOptionsCtrl.prototype.addColumnStyle = function () {
    var newStyleRule = {
      unit: 'short',
      type: 'number',
      alias: '',
      decimals: 2,
      colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
      colorMode: null,
      pattern: '',
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      thresholds: [],
      mappingType: 1,
      display: 'val'
    };
    var styles = this.panel.styles;
    var stylesCount = styles.length;
    var indexToInsert = stylesCount; // check if last is a catch all rule, then add it before that one

    if (stylesCount > 0) {
      var last = styles[stylesCount - 1];

      if (last.pattern === '/.*/') {
        indexToInsert = stylesCount - 1;
      }
    }

    styles.splice(indexToInsert, 0, newStyleRule);
    this.activeStyleIndex = indexToInsert;
  };

  ColumnOptionsCtrl.prototype.removeColumnStyle = function (style) {
    this.panel.styles = _lodash2.default.without(this.panel.styles, style);
  };

  ColumnOptionsCtrl.prototype.invertColorOrder = function (index) {
    var ref = this.panel.styles[index].colors;
    var copy = ref[0];
    ref[0] = ref[2];
    ref[2] = copy;
    this.panelCtrl.render();
  };

  ColumnOptionsCtrl.prototype.onColorChange = function (styleIndex, colorIndex) {
    var _this = this;

    return function (newColor) {
      _this.panel.styles[styleIndex].colors[colorIndex] = newColor;

      _this.render();
    };
  };

  ColumnOptionsCtrl.prototype.addValueMap = function (style) {
    if (!style.valueMaps) {
      style.valueMaps = [];
    }

    style.valueMaps.push({
      value: '',
      text: ''
    });
    this.panelCtrl.render();
  };

  ColumnOptionsCtrl.prototype.removeValueMap = function (style, index) {
    style.valueMaps.splice(index, 1);
    this.panelCtrl.render();
  };

  ColumnOptionsCtrl.prototype.addRangeMap = function (style) {
    if (!style.rangeMaps) {
      style.rangeMaps = [];
    }

    style.rangeMaps.push({
      from: '',
      to: '',
      text: ''
    });
    this.panelCtrl.render();
  };

  ColumnOptionsCtrl.prototype.removeRangeMap = function (style, index) {
    style.rangeMaps.splice(index, 1);
    this.panelCtrl.render();
  };

  return ColumnOptionsCtrl;
}();

exports.ColumnOptionsCtrl = ColumnOptionsCtrl;
/** @ngInject */

function columnOptionsTab($q, uiSegmentSrv) {
  'use strict';

  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/plugins/tradelab-bidder-table/column_options.html',
    controller: ColumnOptionsCtrl
  };
}

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

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
//# sourceMappingURL=column_options.js.map