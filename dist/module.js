define(["@grafana/ui","app/core/config","app/core/table_model","app/core/time_series2","app/core/utils/flatten","app/core/utils/kbn","app/plugins/sdk","jquery","lodash","moment"], function(__WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_config__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_table_model__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_time_series2__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_flatten__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_jquery__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_moment__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
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
      text: 'Delta',
      value: 'delta'
    }, {
      text: 'String',
      value: 'string'
    }, {
      text: 'Date',
      value: 'date'
    }, {
      text: 'Hidden',
      value: 'hidden'
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

    if (subItem.value === 'percentunit') {
      column.display = 'val';
    }

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
      mappingType: 1
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

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelCtrl = exports.TablePanelCtrl = undefined;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _jquery = __webpack_require__(/*! jquery */ "jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _sdk = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");

var _config = __webpack_require__(/*! grafana/app/core/config */ "grafana/app/core/config");

var _config2 = _interopRequireDefault(_config);

var _transformers = __webpack_require__(/*! ./transformers */ "./transformers.ts");

var _editor = __webpack_require__(/*! ./editor */ "./editor.ts");

var _column_options = __webpack_require__(/*! ./column_options */ "./column_options.ts");

var _renderer = __webpack_require__(/*! ./renderer */ "./renderer.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TablePanelCtrl =
/** @class */
function (_super) {
  __extends(TablePanelCtrl, _super);
  /** @ngInject */


  function TablePanelCtrl($scope, $injector, templateSrv, annotationsSrv, $sanitize, variableSrv) {
    var _this = _super.call(this, $scope, $injector) || this;

    _this.annotationsSrv = annotationsSrv;
    _this.$sanitize = $sanitize;
    _this.variableSrv = variableSrv;
    _this.panelDefaults = {
      targets: [{}],
      transform: 'timeseries_to_columns',
      pageSize: null,
      showHeader: true,
      styles: [{
        type: 'date',
        pattern: 'Time',
        alias: 'Time',
        dateFormat: 'YYYY-MM-DD HH:mm:ss'
      }, {
        unit: 'short',
        type: 'number',
        alias: '',
        decimals: 2,
        colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
        colorMode: null,
        pattern: '/.*/',
        thresholds: []
      }],
      columns: [],
      scroll: true,
      fontSize: '100%',
      sort: {
        col: 0,
        desc: true
      }
    };
    _this.pageIndex = 0;

    if (_this.panel.styles === void 0) {
      _this.panel.styles = _this.panel.columns;
      _this.panel.columns = _this.panel.fields;
      delete _this.panel.columns;
      delete _this.panel.fields;
    }

    _lodash2.default.defaults(_this.panel, _this.panelDefaults);

    _this.events.on('data-received', _this.onDataReceived.bind(_this));

    _this.events.on('data-error', _this.onDataError.bind(_this));

    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

    _this.events.on('init-panel-actions', _this.onInitPanelActions.bind(_this));

    return _this;
  }

  TablePanelCtrl.prototype.onInitEditMode = function () {
    this.addEditorTab('Options', _editor.tablePanelEditor, 2);
    this.addEditorTab('Column Styles', _column_options.columnOptionsTab, 3);
  };

  TablePanelCtrl.prototype.onInitPanelActions = function (actions) {
    actions.push({
      text: 'Export CSV',
      click: 'ctrl.exportCsv()'
    });
  };

  TablePanelCtrl.prototype.issueQueries = function (datasource) {
    this.pageIndex = 0;

    if (this.panel.transform === 'annotations') {
      return this.annotationsSrv.getAnnotations({
        dashboard: this.dashboard,
        panel: this.panel,
        range: this.range
      }).then(function (annotations) {
        return {
          data: annotations
        };
      });
    }

    return _super.prototype.issueQueries.call(this, datasource);
  };

  TablePanelCtrl.prototype.onDataError = function (err) {
    this.dataRaw = [];
    this.render();
  };

  TablePanelCtrl.prototype.onDataReceived = function (dataList) {
    this.dataRaw = dataList;
    this.pageIndex = 0; // automatically correct transform mode based on data

    if (this.dataRaw && this.dataRaw.length) {
      if (this.dataRaw[0].type === 'table') {
        this.panel.transform = 'table';
      } else {
        if (this.dataRaw[0].type === 'docs') {
          this.panel.transform = 'json';
        } else {
          if (this.panel.transform === 'table' || this.panel.transform === 'json') {
            this.panel.transform = 'timeseries_to_rows';
          }
        }
      }
    }

    this.render();
  };

  TablePanelCtrl.prototype.render = function () {
    this.table = (0, _transformers.transformDataToTable)(this.dataRaw, this.panel);
    this.table.sort(this.panel.sort);
    this.renderer = new _renderer.TableRenderer(this.panel, this.table, this.dashboard.isTimezoneUtc(), this.$sanitize, this.templateSrv, _config2.default.theme.type);
    return _super.prototype.render.call(this, this.table);
  };

  TablePanelCtrl.prototype.toggleColumnSort = function (col, colIndex) {
    // remove sort flag from current column
    if (this.table.columns[this.panel.sort.col]) {
      this.table.columns[this.panel.sort.col].sort = false;
    }

    if (this.panel.sort.col === colIndex) {
      if (this.panel.sort.desc) {
        this.panel.sort.desc = false;
      } else {
        this.panel.sort.col = null;
      }
    } else {
      this.panel.sort.col = colIndex;
      this.panel.sort.desc = true;
    }

    this.render();
  };

  TablePanelCtrl.prototype.exportCsv = function () {
    var scope = this.$scope.$new(true);
    scope.tableData = this.renderer.render_values();
    scope.panel = 'table';
    this.publishAppEvent('show-modal', {
      templateHtml: '<export-data-modal panel="panel" data="tableData"></export-data-modal>',
      scope: scope,
      modalClass: 'modal--narrow'
    });
  };

  TablePanelCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
    var data;
    var panel = ctrl.panel;
    var pageCount = 0;

    function getTableHeight() {
      var panelHeight = ctrl.height;

      if (pageCount > 1) {
        panelHeight -= 26;
      }

      return panelHeight - 31 + 'px';
    }

    function appendTableRows(tbodyElem) {
      ctrl.renderer.setTable(data);
      tbodyElem.empty();
      tbodyElem.html(ctrl.renderer.render(ctrl.pageIndex));
    }

    function switchPage(e) {
      var el = (0, _jquery2.default)(e.currentTarget);
      ctrl.pageIndex = parseInt(el.text(), 10) - 1;
      renderPanel();
    }

    function appendPaginationControls(footerElem) {
      footerElem.empty();
      var pageSize = panel.pageSize || 100;
      pageCount = Math.ceil(data.rows.length / pageSize);

      if (pageCount === 1) {
        return;
      }

      var startPage = Math.max(ctrl.pageIndex - 3, 0);
      var endPage = Math.min(pageCount, startPage + 9);
      var paginationList = (0, _jquery2.default)('<ul></ul>');

      for (var i = startPage; i < endPage; i++) {
        var activeClass = i === ctrl.pageIndex ? 'active' : '';
        var pageLinkElem = (0, _jquery2.default)('<li><a class="table-panel-page-link pointer ' + activeClass + '">' + (i + 1) + '</a></li>');
        paginationList.append(pageLinkElem);
      }

      footerElem.append(paginationList);
    }

    function renderPanel() {
      var panelElem = elem.parents('.panel-content');
      var rootElem = elem.find('.table-panel-scroll');
      var tbodyElem = elem.find('tbody');
      var footerElem = elem.find('.table-panel-footer');
      elem.css({
        'font-size': panel.fontSize
      });
      panelElem.addClass('table-panel-content');
      appendTableRows(tbodyElem);
      appendPaginationControls(footerElem);
      rootElem.css({
        'max-height': panel.scroll ? getTableHeight() : ''
      });
    } // hook up link tooltips


    elem.tooltip({
      selector: '[data-link-tooltip]'
    });

    function addFilterClicked(e) {
      var filterData = (0, _jquery2.default)(e.currentTarget).data();
      var options = {
        datasource: panel.datasource,
        key: data.columns[filterData.column].text,
        value: data.rows[filterData.row][filterData.column],
        operator: filterData.operator
      };
      ctrl.variableSrv.setAdhocFilter(options);
    }

    elem.on('click', '.table-panel-page-link', switchPage);
    elem.on('click', '.table-panel-filter-link', addFilterClicked);
    var unbindDestroy = scope.$on('$destroy', function () {
      elem.off('click', '.table-panel-page-link');
      elem.off('click', '.table-panel-filter-link');
      unbindDestroy();
    });
    ctrl.events.on('render', function (renderData) {
      data = renderData || data;

      if (data) {
        renderPanel();
      }

      ctrl.renderingCompleted();
    });
  };

  TablePanelCtrl.templateUrl = 'module.html';
  return TablePanelCtrl;
}(_sdk.MetricsPanelCtrl);

(0, _sdk.loadPluginCss)({
  dark: 'plugins/tradelab-bidder-table/dark-bidder-panel.css',
  light: 'plugins/tradelab-bidder-table/light-bidder-panel.css'
});
exports.TablePanelCtrl = TablePanelCtrl;
exports.PanelCtrl = TablePanelCtrl;

/***/ }),

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

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "grafana/app/core/config":
/*!**********************************!*\
  !*** external "app/core/config" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_config__;

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

/***/ "grafana/app/core/utils/kbn":
/*!*************************************!*\
  !*** external "app/core/utils/kbn" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jquery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;

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
//# sourceMappingURL=module.js.map