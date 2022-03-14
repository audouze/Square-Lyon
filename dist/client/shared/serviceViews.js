'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// --------------------------- example
/**
 * Interface for the view of the `audio-buffer-manager` service.
 *
 * @interface AbstractAudioBufferManagerView
 * @extends module:soundworks/client.View
 */
/**
 * Method called when a new information about the currently loaded assets
 * is received.
 *
 * @function
 * @name AbstractAudioBufferManagerView.onProgress
 * @param {Number} percent - The purcentage of loaded assets.
 */
// ------------------------------------

var noop = function noop() {};

var serviceViews = {
  // ------------------------------------------------
  // AudioBufferManager
  // ------------------------------------------------
  'service:audio-buffer-manager': function (_SegmentedView) {
    (0, _inherits3.default)(AudioBufferManagerView, _SegmentedView);

    function AudioBufferManagerView() {
      (0, _classCallCheck3.default)(this, AudioBufferManagerView);

      var _this = (0, _possibleConstructorReturn3.default)(this, (AudioBufferManagerView.__proto__ || (0, _getPrototypeOf2.default)(AudioBufferManagerView)).call(this));

      _this.template = '\n        <div class="section-top flex-middle">\n          <p><%= msg[status] %></p>\n        </div>\n        <div class="section-center flex-center">\n          <% if (showProgress) { %>\n          <div class="progress-wrap">\n            <div class="progress-bar"></div>\n          </div>\n          <% } %>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this.model = {
        status: 'loading',
        showProgress: true,
        msg: {
          loading: 'Chargement des fichiers audio...',
          decoding: 'Décodage...'
        }
      };
      return _this;
    }

    (0, _createClass3.default)(AudioBufferManagerView, [{
      key: 'onRender',
      value: function onRender() {
        (0, _get3.default)(AudioBufferManagerView.prototype.__proto__ || (0, _getPrototypeOf2.default)(AudioBufferManagerView.prototype), 'onRender', this).call(this);
        this.$progressBar = this.$el.querySelector('.progress-bar');
      }
    }, {
      key: 'onProgress',
      value: function onProgress(ratio) {
        var percent = Math.round(ratio * 100);

        if (percent === 100) {
          this.model.status = 'decoding';
          this.render('.section-top');
        }

        if (this.model.showProgress) this.$progressBar.style.width = percent + '%';
      }
    }]);
    return AudioBufferManagerView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Auth
  // ------------------------------------------------
  'service:auth': function (_SegmentedView2) {
    (0, _inherits3.default)(AuthView, _SegmentedView2);

    function AuthView() {
      (0, _classCallCheck3.default)(this, AuthView);

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (AuthView.__proto__ || (0, _getPrototypeOf2.default)(AuthView)).call(this));

      _this2.template = '\n        <% if (!rejected) { %>\n          <div class="section-top flex-middle">\n            <p><%= instructions %></p>\n          </div>\n          <div class="section-center flex-center">\n            <div>\n              <input type="password" id="password" />\n              <button class="btn" id="send"><%= send %></button>\n            </div>\n          </div>\n          <div class="section-bottom flex-middle">\n            <button id="reset" class="btn"><%= reset %></button>\n          </div>\n        <% } else { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= rejectMessage %></p>\n          </div>\n          <div class="section-bottom flex-middle">\n            <button id="reset" class="btn"><%= reset %></button>\n          </div>\n        <% } %>\n      ';

      _this2.model = {
        instructions: 'Login',
        send: 'Send',
        reset: 'Reset',
        rejectMessage: 'Sorry, you don\'t have access to this client',
        rejected: false
      };

      _this2._sendPasswordCallback = noop;
      _this2._resetCallback = noop;
      return _this2;
    }

    (0, _createClass3.default)(AuthView, [{
      key: 'onRender',
      value: function onRender() {
        var _this3 = this;

        (0, _get3.default)(AuthView.prototype.__proto__ || (0, _getPrototypeOf2.default)(AuthView.prototype), 'onRender', this).call(this);

        this.installEvents({
          'click #send': function clickSend() {
            var password = _this3.$el.querySelector('#password').value;

            if (password !== '') _this3._sendPasswordCallback(password);
          },
          'click #reset': function clickReset() {
            return _this3._resetCallback();
          }
        });
      }
    }, {
      key: 'setSendPasswordCallback',
      value: function setSendPasswordCallback(callback) {
        this._sendPasswordCallback = callback;
      }
    }, {
      key: 'setResetCallback',
      value: function setResetCallback(callback) {
        this._resetCallback = callback;
      }
    }, {
      key: 'updateRejectedStatus',
      value: function updateRejectedStatus(value) {
        this.model.rejected = value;
        this.render();
      }
    }]);
    return AuthView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Checkin
  // ------------------------------------------------
  'service:checkin': function (_SegmentedView3) {
    (0, _inherits3.default)(CheckinView, _SegmentedView3);

    function CheckinView() {
      (0, _classCallCheck3.default)(this, CheckinView);

      var _this4 = (0, _possibleConstructorReturn3.default)(this, (CheckinView.__proto__ || (0, _getPrototypeOf2.default)(CheckinView)).call(this));

      _this4.template = '\n        <% if (label) { %>\n          <div class="section-top flex-middle">\n            <p class="big"><%= labelPrefix %></p>\n          </div>\n          <div class="section-center flex-center">\n            <div class="checkin-label">\n              <p class="huge bold"><%= label %></p>\n            </div>\n          </div>\n          <div class="section-bottom flex-middle">\n            <p class="small"><%= labelPostfix %></p>\n          </div>\n        <% } else { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= error ? errorMessage : wait %></p>\n          </div>\n          <div class="section-bottom"></div>\n        <% } %>\n      ';

      _this4.model = {
        labelPrefix: 'Go to',
        labelPostfix: 'Touch the screen<br class="portrait-only" />when you are ready.',
        error: false,
        errorMessage: 'Sorry,<br/>no place available',
        wait: 'Connection...',
        label: ''
      };

      _this4._readyCallback = null;
      return _this4;
    }

    (0, _createClass3.default)(CheckinView, [{
      key: 'onRender',
      value: function onRender() {
        var _this5 = this;

        (0, _get3.default)(CheckinView.prototype.__proto__ || (0, _getPrototypeOf2.default)(CheckinView.prototype), 'onRender', this).call(this);

        var eventName = this.options.interaction === 'mouse' ? 'click' : 'touchstart';

        this.installEvents((0, _defineProperty3.default)({}, eventName, function () {
          return _this5._readyCallback();
        }));
      }
    }, {
      key: 'setReadyCallback',
      value: function setReadyCallback(callback) {
        this._readyCallback = callback;
      }
    }, {
      key: 'updateLabel',
      value: function updateLabel(value) {
        this.model.label = value;
        this.render();
      }
    }, {
      key: 'updateErrorStatus',
      value: function updateErrorStatus(value) {
        this.model.error = value;
        this.render();
      }
    }]);
    return CheckinView;
  }(_client.SegmentedView),

  'service:language': function (_SegmentedView4) {
    (0, _inherits3.default)(LanguageView, _SegmentedView4);

    function LanguageView() {
      (0, _classCallCheck3.default)(this, LanguageView);

      var _this6 = (0, _possibleConstructorReturn3.default)(this, (LanguageView.__proto__ || (0, _getPrototypeOf2.default)(LanguageView)).call(this));

      _this6.template = '\n        <div class="section-top"></div>\n        <div class="section-center">\n          <% for (let key in options) { %>\n            <button class="btn" data-id="<%= key %>"><%= options[key] %></button>\n          <% } %>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this6.model = {};

      _this6._selectionCallback = noop;
      return _this6;
    }

    (0, _createClass3.default)(LanguageView, [{
      key: 'onRender',
      value: function onRender() {
        var _this7 = this;

        (0, _get3.default)(LanguageView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LanguageView.prototype), 'onRender', this).call(this);

        var eventName = this.options.interaction === 'mouse' ? 'click' : 'touchstart';
        this.installEvents((0, _defineProperty3.default)({}, eventName + ' .btn', function undefined(e) {
          var target = e.target;
          var id = target.getAttribute('data-id');
          _this7._selectionCallback(id);
        }));
      }
    }, {
      key: 'setSelectionCallback',
      value: function setSelectionCallback(callback) {
        this._selectionCallback = callback;
      }
    }]);
    return LanguageView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Locator
  // ------------------------------------------------
  'service:locator': function (_SquaredView) {
    (0, _inherits3.default)(LocatorView, _SquaredView);

    function LocatorView() {
      (0, _classCallCheck3.default)(this, LocatorView);

      var _this8 = (0, _possibleConstructorReturn3.default)(this, (LocatorView.__proto__ || (0, _getPrototypeOf2.default)(LocatorView)).call(this));

      _this8.template = '\n        <div class="section-square"></div>\n        <div class="section-float flex-middle">\n          <% if (!showBtn) { %>\n            <p class="small"><%= instructions %></p>\n          <% } else { %>\n            <button class="btn"><%= send %></button>\n          <% } %>\n        </div>\n      ';

      _this8.model = {
        instructions: 'Define your position in the area',
        send: 'Send',
        showBtn: false
      };

      _this8.area = null;
      _this8._selectCallback = noop;

      _this8._onAreaTouchStart = _this8._onAreaTouchStart.bind(_this8);
      _this8._onAreaTouchMove = _this8._onAreaTouchMove.bind(_this8);
      return _this8;
    }

    (0, _createClass3.default)(LocatorView, [{
      key: 'show',
      value: function show() {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'show', this).call(this);
        this.selector.show();
      }
    }, {
      key: 'onRender',
      value: function onRender() {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'onRender', this).call(this);
        this.$areaContainer = this.$el.querySelector('.section-square');
      }
    }, {
      key: 'setArea',
      value: function setArea(area) {
        this._area = area;
        this._renderArea();
      }
    }, {
      key: 'setSelectCallback',
      value: function setSelectCallback(callback) {
        this._selectCallback = callback;
      }
    }, {
      key: 'remove',
      value: function remove() {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'remove', this).call(this);

        this.surface.removeListener('touchstart', this._onAreaTouchStart);
        this.surface.removeListener('touchmove', this._onAreaTouchMove);
      }
    }, {
      key: 'onResize',
      value: function onResize(viewportWidth, viewportHeight, orientation) {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'onResize', this).call(this, viewportWidth, viewportHeight, orientation);

        if (this.selector) this.selector.onResize(viewportWidth, viewportHeight, orientation);
      }
    }, {
      key: '_renderArea',
      value: function _renderArea() {
        this.selector = new _client.SpaceView();
        this.selector.setArea(this._area);

        this.selector.render();
        this.selector.appendTo(this.$areaContainer);
        this.selector.onRender();

        this.surface = new _client.TouchSurface(this.selector.$svgContainer);
        this.surface.addListener('touchstart', this._onAreaTouchStart);
        this.surface.addListener('touchmove', this._onAreaTouchMove);
      }
    }, {
      key: '_onAreaTouchStart',
      value: function _onAreaTouchStart(id, normX, normY) {
        var _this9 = this;

        if (!this.position) {
          this._createPosition(normX, normY);

          this.model.showBtn = true;
          this.render('.section-float');
          this.installEvents({
            'click .btn': function clickBtn(e) {
              return _this9._selectCallback(_this9.position.x, _this9.position.y);
            }
          });
        } else {
          this._updatePosition(normX, normY);
        }
      }
    }, {
      key: '_onAreaTouchMove',
      value: function _onAreaTouchMove(id, normX, normY) {
        this._updatePosition(normX, normY);
      }
    }, {
      key: '_createPosition',
      value: function _createPosition(normX, normY) {
        this.position = {
          id: 'locator',
          x: normX * this._area.width,
          y: normY * this._area.height
        };

        this.selector.addPoint(this.position);
      }
    }, {
      key: '_updatePosition',
      value: function _updatePosition(normX, normY) {
        this.position.x = normX * this._area.width;
        this.position.y = normY * this._area.height;

        this.selector.updatePoint(this.position);
      }
    }]);
    return LocatorView;
  }(_client.SquaredView),

  // ------------------------------------------------
  // Placer
  // ------------------------------------------------
  'service:placer': function (_SquaredView2) {
    (0, _inherits3.default)(PlacerViewList, _SquaredView2);

    function PlacerViewList() {
      (0, _classCallCheck3.default)(this, PlacerViewList);

      var _this10 = (0, _possibleConstructorReturn3.default)(this, (PlacerViewList.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList)).call(this));

      _this10.template = '\n        <div class="section-square flex-middle">\n          <% if (rejected) { %>\n          <div class="fit-container flex-middle">\n            <p><%= reject %></p>\n          </div>\n          <% } %>\n        </div>\n        <div class="section-float flex-middle">\n          <% if (!rejected) { %>\n            <% if (showBtn) { %>\n              <button class="btn"><%= send %></button>\n            <% } %>\n          <% } %>\n        </div>\n      ';

      _this10.model = {
        instructions: 'Select your position',
        send: 'Send',
        reject: 'Sorry, no place is available',
        showBtn: false,
        rejected: false
      };

      _this10._onSelectionChange = _this10._onSelectionChange.bind(_this10);
      return _this10;
    }

    (0, _createClass3.default)(PlacerViewList, [{
      key: 'show',
      value: function show() {
        (0, _get3.default)(PlacerViewList.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList.prototype), 'show', this).call(this);
        this.selector.show();
      }
    }, {
      key: '_onSelectionChange',
      value: function _onSelectionChange(e) {
        var _this11 = this;

        this.model.showBtn = true;
        this.render('.section-float');

        this.installEvents({
          'click .btn': function clickBtn(e) {
            var position = _this11.selector.value;

            if (position) _this11._onSelect(position.index, position.label, position.coordinates);
          }
        });
      }
    }, {
      key: 'setArea',
      value: function setArea(area) {/* no need for area */}
    }, {
      key: 'onRender',
      value: function onRender() {
        (0, _get3.default)(PlacerViewList.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList.prototype), 'onRender', this).call(this);
        this.$selectorContainer = this.$el.querySelector('.section-square');
      }
    }, {
      key: 'onResize',
      value: function onResize(viewportWidth, viewportHeight, orientation) {
        (0, _get3.default)(PlacerViewList.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList.prototype), 'onResize', this).call(this, viewportWidth, viewportHeight, orientation);

        if (this.selector) this.selector.onResize(viewportWidth, viewportHeight, orientation);
      }
    }, {
      key: 'displayPositions',
      value: function displayPositions(capacity) {
        var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var coordinates = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var maxClientsPerPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        this.positions = [];
        this.numberPositions = capacity / maxClientsPerPosition;

        for (var index = 0; index < this.numberPositions; index++) {
          var label = labels !== null ? labels[index] : (index + 1).toString();
          var position = { index: index, label: label };

          if (coordinates) position.coordinates = coordinates[index];

          this.positions.push(position);
        }

        this.selector = new _client.SelectView({
          instructions: this.model.instructions,
          entries: this.positions
        });

        this.selector.render();
        this.selector.appendTo(this.$selectorContainer);
        this.selector.onRender();

        this.selector.installEvents({
          'change': this._onSelectionChange
        });
      }
    }, {
      key: 'updateDisabledPositions',
      value: function updateDisabledPositions(indexes) {
        for (var index = 0; index < this.numberPositions; index++) {
          if (indexes.indexOf(index) === -1) this.selector.enableIndex(index);else this.selector.disableIndex(index);
        }
      }
    }, {
      key: 'setSelectCallack',
      value: function setSelectCallack(callback) {
        this._onSelect = callback;
      }
    }, {
      key: 'reject',
      value: function reject(disabledPositions) {
        this.model.rejected = true;
        this.render();
      }
    }]);
    return PlacerViewList;
  }(_client.SquaredView),

  // graphic placer flavor for predetermined coordinates
  // 'service:placer': class PlacerViewGraphic extends SquaredView {
  //   constructor() {
  //     super();

  //     this.template = `
  //       <div class="section-square flex-middle">
  //         <% if (rejected) { %>
  //         <div class="fit-container flex-middle">
  //           <p><%= reject %></p>
  //         </div>
  //         <% } %>
  //       </div>
  //       <div class="section-float flex-middle">
  //         <% if (!rejected) { %>
  //           <% if (showBtn) { %>
  //             <button class="btn"><%= send %></button>
  //           <% } %>
  //         <% } %>
  //       </div>
  //     `;

  //     this.model = {
  //       instructions: 'Select your position',
  //       send: 'Send',
  //       reject: 'Sorry, no place is available',
  //       showBtn: false,
  //       rejected: false,
  //     };

  //     this._area = null;
  //     this._disabledPositions = [];
  //     this._onSelectionChange = this._onSelectionChange.bind(this);
  //   }

  //   show() {
  //     super.show();
  //     this.selector.show();
  //   }

  //   onRender() {
  //     super.onRender();
  //     this.$selectorContainer = this.$el.querySelector('.section-square');
  //   }

  //   onResize(viewportWidth, viewportHeight, orientation) {
  //     super.onResize(viewportWidth, viewportHeight, orientation);

  //     if (this.selector)
  //       this.selector.onResize(viewportWidth, viewportHeight, orientation);
  //   }

  //   _onSelectionChange(e) {
  //     const position = this.selector.shapePointMap.get(e.target);
  //     const disabledIndex = this._disabledPositions.indexOf(position.index);

  //     if (disabledIndex === -1)
  //       this._onSelect(position.id, position.label, [position.x, position.y]);
  //   }

  //   setArea(area) {
  //     this._area = area;
  //   }

  //   displayPositions(capacity, labels = null, coordinates = null, maxClientsPerPosition = 1) {
  //     this.numberPositions = capacity / maxClientsPerPosition;
  //     this.positions = [];

  //     for (let i = 0; i < this.numberPositions; i++) {
  //       const label = labels !== null ? labels[i] : (i + 1).toString();
  //       const position = { id: i, label: label };
  //       const coords = coordinates[i];
  //       position.x = coords[0];
  //       position.y = coords[1];

  //       this.positions.push(position);
  //     }

  //     this.selector = new SpaceView();
  //     this.selector.setArea(this._area);
  //     this.selector.render();
  //     this.selector.appendTo(this.$selectorContainer);
  //     this.selector.onRender();
  //     this.selector.setPoints(this.positions);

  //     this.selector.installEvents({
  //       'click .point': this._onSelectionChange
  //     });
  //   }

  //   updateDisabledPositions(indexes) {
  //     this._disabledPositions = indexes;

  //     for (let index = 0; index < this.numberPositions; index++) {
  //       const position = this.positions[index];
  //       const isDisabled = indexes.indexOf(index) !== -1;
  //       position.selected = isDisabled ? true : false;
  //       this.selector.updatePoint(position);
  //     }
  //   }

  //   setSelectCallack(callback) {
  //     this._onSelect = callback;
  //   }

  //   reject(disabledPositions) {
  //     this.model.rejected = true;
  //     this.render();
  //   }
  // },

  // ------------------------------------------------
  // Platform
  // ------------------------------------------------
  'service:platform': function (_SegmentedView5) {
    (0, _inherits3.default)(PlatformView, _SegmentedView5);

    function PlatformView() {
      (0, _classCallCheck3.default)(this, PlatformView);

      var _this12 = (0, _possibleConstructorReturn3.default)(this, (PlatformView.__proto__ || (0, _getPrototypeOf2.default)(PlatformView)).call(this));

      _this12.template = '\n        <% if (isCompatible === false) { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= errorCompatibleMessage %></p>\n          </div>\n          <div class="section-bottom"></div>\n        <% } else if (hasAuthorizations === false) { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= errorHooksMessage %></p>\n          </div>\n          <div class="section-bottom"></div>\n        <% } else { %>\n          <div class="section-top flex-middle">\n              <p>\n                <span class="title"><%= globals.title %></span>\n                <span class="subtitle"><%= globals.subtitle %></span>\n              </p>\n          </div>\n          <div class="section-center flex-center">\n            <div>\n              <ul class="instructions soft-blink">\n                <% for (var key in globals.instructions) { %>\n                  <li class="instruction"><%= globals.instructions[key] %></li>\n                <% } %>\n              </ul>\n              <p class="use-headphones"><%= globals.useHeadphones %></p>\n            </div>\n          </div>\n          <div class="section-bottom flex-middle">\n            <% if (checking === true) { %>\n            <p class="small soft-blink"><%= checkingMessage %></p>\n            <% } else if (hasAuthorizations === true) { %>\n            <p class="small soft-blink"><%= globals.touchToStart %></p>\n            <% } %>\n          </div>\n        <% } %>\n      ';

      _this12.model = {
        isCompatible: null,
        hasAuthorizations: null,
        checking: false,
        checkingMessage: 'Please wait while checking compatiblity',
        errorCompatibleMessage: 'Sorry,<br />Your device is not compatible with the application.',
        errorHooksMessage: 'Sorry,<br />The application didn\'t obtain the necessary authorizations.'
      };

      _this12.ratios = {
        '.section-top': 0.2,
        '.section-center': 0.5,
        '.section-bottom': 0.3
      };

      _this12._touchstartCallback = noop;
      _this12._mousedownCallback = noop;
      return _this12;
    }

    (0, _createClass3.default)(PlatformView, [{
      key: 'onRender',
      value: function onRender() {
        var _this13 = this;

        (0, _get3.default)(PlatformView.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlatformView.prototype), 'onRender', this).call(this);

        this.installEvents({
          'mousedown': function mousedown(e) {
            return _this13._mousedownCallback(e);
          },
          'touchstart': function touchstart(e) {
            return _this13._touchstartCallback(e);
          }
        });
      }
    }, {
      key: 'setTouchStartCallback',
      value: function setTouchStartCallback(callback) {
        this._touchstartCallback = callback;
      }
    }, {
      key: 'setMouseDownCallback',
      value: function setMouseDownCallback(callback) {
        this._mousedownCallback = callback;
      }
    }, {
      key: 'updateCheckingStatus',
      value: function updateCheckingStatus(value) {
        this.model.checking = value;
        this.render();
      }
    }, {
      key: 'updateIsCompatibleStatus',
      value: function updateIsCompatibleStatus(value) {
        this.model.isCompatible = value;
        this.render();
      }
    }, {
      key: 'updateHasAuthorizationsStatus',
      value: function updateHasAuthorizationsStatus(value) {
        this.model.hasAuthorizations = value;
        this.render();
      }
    }]);
    return PlatformView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Sound-Check
  // ------------------------------------------------
  'service:sound-check': function (_SegmentedView6) {
    (0, _inherits3.default)(SoundCheckView, _SegmentedView6);

    function SoundCheckView() {
      (0, _classCallCheck3.default)(this, SoundCheckView);

      var _this14 = (0, _possibleConstructorReturn3.default)(this, (SoundCheckView.__proto__ || (0, _getPrototypeOf2.default)(SoundCheckView)).call(this));

      _this14.template = '\n        <div class="section-top flex-middle">\n          <p class="small"><%= globals.question %></p>\n        </div>\n        <div class="section-center flex-center">\n          <button class="check-yes"><%= globals.yes %></button>\n        </div>\n        <div class="section-bottom flex-center">\n          <button class="check-no"><%= globals.no %></button>\n        </div>\n      ';

      _this14.ratios = {
        '.section-top': 0.3,
        '.section-center': 0.35,
        '.section-bottom': 0.35
      };
      return _this14;
    }

    (0, _createClass3.default)(SoundCheckView, [{
      key: 'onRender',
      value: function onRender() {
        var _this15 = this;

        (0, _get3.default)(SoundCheckView.prototype.__proto__ || (0, _getPrototypeOf2.default)(SoundCheckView.prototype), 'onRender', this).call(this);

        this.installEvents({
          'click .check-yes': function clickCheckYes() {
            return _this15._checkCallback(true);
          },
          'click .check-no': function clickCheckNo() {
            return _this15._checkCallback(false);
          }
        });
      }
    }, {
      key: 'setCheckCallback',
      value: function setCheckCallback(callback) {
        this._checkCallback = callback;
      }
    }]);
    return SoundCheckView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Raw-Socket
  // ------------------------------------------------
  'service:raw-socket': function (_SegmentedView7) {
    (0, _inherits3.default)(RawSocketView, _SegmentedView7);

    function RawSocketView() {
      (0, _classCallCheck3.default)(this, RawSocketView);

      var _this16 = (0, _possibleConstructorReturn3.default)(this, (RawSocketView.__proto__ || (0, _getPrototypeOf2.default)(RawSocketView)).call(this));

      _this16.template = '\n        <div class="section-top"></div>\n        <div class="section-center flex-center">\n          <p class="soft-blink"><%= wait %></p>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this16.model = {
        wait: 'Opening socket,<br />stand by&hellip;'
      };
      return _this16;
    }

    return RawSocketView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Sync
  // ------------------------------------------------
  'service:sync': function (_SegmentedView8) {
    (0, _inherits3.default)(RawSocketView, _SegmentedView8);

    function RawSocketView() {
      (0, _classCallCheck3.default)(this, RawSocketView);

      var _this17 = (0, _possibleConstructorReturn3.default)(this, (RawSocketView.__proto__ || (0, _getPrototypeOf2.default)(RawSocketView)).call(this));

      _this17.template = '\n        <div class="section-top"></div>\n        <div class="section-center flex-center">\n          <p class="soft-blink"><%= wait %></p>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this17.model = {
        wait: 'synchronisation'
      };
      return _this17;
    }

    return RawSocketView;
  }(_client.SegmentedView),

  // public API
  has: function has(id) {
    return !!this[id];
  },
  get: function get(id, config) {
    var ctor = this[id];
    var view = new ctor();
    // additionnal configuration
    view.model.globals = (0, _assign2.default)({}, config);
    view.options.id = id.replace(/\:/g, '-');

    return view;
  }
};

exports.default = serviceViews;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VWaWV3cy5qcyJdLCJuYW1lcyI6WyJub29wIiwic2VydmljZVZpZXdzIiwidGVtcGxhdGUiLCJtb2RlbCIsInN0YXR1cyIsInNob3dQcm9ncmVzcyIsIm1zZyIsImxvYWRpbmciLCJkZWNvZGluZyIsIiRwcm9ncmVzc0JhciIsIiRlbCIsInF1ZXJ5U2VsZWN0b3IiLCJyYXRpbyIsInBlcmNlbnQiLCJNYXRoIiwicm91bmQiLCJyZW5kZXIiLCJzdHlsZSIsIndpZHRoIiwiU2VnbWVudGVkVmlldyIsImluc3RydWN0aW9ucyIsInNlbmQiLCJyZXNldCIsInJlamVjdE1lc3NhZ2UiLCJyZWplY3RlZCIsIl9zZW5kUGFzc3dvcmRDYWxsYmFjayIsIl9yZXNldENhbGxiYWNrIiwiaW5zdGFsbEV2ZW50cyIsInBhc3N3b3JkIiwidmFsdWUiLCJjYWxsYmFjayIsImxhYmVsUHJlZml4IiwibGFiZWxQb3N0Zml4IiwiZXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJ3YWl0IiwibGFiZWwiLCJfcmVhZHlDYWxsYmFjayIsImV2ZW50TmFtZSIsIm9wdGlvbnMiLCJpbnRlcmFjdGlvbiIsIl9zZWxlY3Rpb25DYWxsYmFjayIsImUiLCJ0YXJnZXQiLCJpZCIsImdldEF0dHJpYnV0ZSIsInNob3dCdG4iLCJhcmVhIiwiX3NlbGVjdENhbGxiYWNrIiwiX29uQXJlYVRvdWNoU3RhcnQiLCJiaW5kIiwiX29uQXJlYVRvdWNoTW92ZSIsInNlbGVjdG9yIiwic2hvdyIsIiRhcmVhQ29udGFpbmVyIiwiX2FyZWEiLCJfcmVuZGVyQXJlYSIsInN1cmZhY2UiLCJyZW1vdmVMaXN0ZW5lciIsInZpZXdwb3J0V2lkdGgiLCJ2aWV3cG9ydEhlaWdodCIsIm9yaWVudGF0aW9uIiwib25SZXNpemUiLCJTcGFjZVZpZXciLCJzZXRBcmVhIiwiYXBwZW5kVG8iLCJvblJlbmRlciIsIlRvdWNoU3VyZmFjZSIsIiRzdmdDb250YWluZXIiLCJhZGRMaXN0ZW5lciIsIm5vcm1YIiwibm9ybVkiLCJwb3NpdGlvbiIsIl9jcmVhdGVQb3NpdGlvbiIsIngiLCJ5IiwiX3VwZGF0ZVBvc2l0aW9uIiwiaGVpZ2h0IiwiYWRkUG9pbnQiLCJ1cGRhdGVQb2ludCIsIlNxdWFyZWRWaWV3IiwicmVqZWN0IiwiX29uU2VsZWN0aW9uQ2hhbmdlIiwiX29uU2VsZWN0IiwiaW5kZXgiLCJjb29yZGluYXRlcyIsIiRzZWxlY3RvckNvbnRhaW5lciIsImNhcGFjaXR5IiwibGFiZWxzIiwibWF4Q2xpZW50c1BlclBvc2l0aW9uIiwicG9zaXRpb25zIiwibnVtYmVyUG9zaXRpb25zIiwidG9TdHJpbmciLCJwdXNoIiwiU2VsZWN0VmlldyIsImVudHJpZXMiLCJpbmRleGVzIiwiaW5kZXhPZiIsImVuYWJsZUluZGV4IiwiZGlzYWJsZUluZGV4IiwiZGlzYWJsZWRQb3NpdGlvbnMiLCJpc0NvbXBhdGlibGUiLCJoYXNBdXRob3JpemF0aW9ucyIsImNoZWNraW5nIiwiY2hlY2tpbmdNZXNzYWdlIiwiZXJyb3JDb21wYXRpYmxlTWVzc2FnZSIsImVycm9ySG9va3NNZXNzYWdlIiwicmF0aW9zIiwiX3RvdWNoc3RhcnRDYWxsYmFjayIsIl9tb3VzZWRvd25DYWxsYmFjayIsIl9jaGVja0NhbGxiYWNrIiwiaGFzIiwiZ2V0IiwiY29uZmlnIiwiY3RvciIsInZpZXciLCJnbG9iYWxzIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQVFBO0FBQ0E7Ozs7OztBQU1BOzs7Ozs7OztBQVFBOztBQUVBLElBQU1BLE9BQU8sU0FBUEEsSUFBTyxHQUFNLENBQUUsQ0FBckI7O0FBRUEsSUFBTUMsZUFBZTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUNFLHNDQUFxQjtBQUFBOztBQUFBOztBQUduQixZQUFLQyxRQUFMOztBQWNBLFlBQUtDLEtBQUwsR0FBYTtBQUNYQyxnQkFBUSxTQURHO0FBRVhDLHNCQUFjLElBRkg7QUFHWEMsYUFBSztBQUNIQyxtQkFBUyxrQ0FETjtBQUVIQyxvQkFBVTtBQUZQO0FBSE0sT0FBYjtBQWpCbUI7QUF5QnBCOztBQTFCSDtBQUFBO0FBQUEsaUNBNEJhO0FBQ1Q7QUFDQSxhQUFLQyxZQUFMLEdBQW9CLEtBQUtDLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QixlQUF2QixDQUFwQjtBQUNEO0FBL0JIO0FBQUE7QUFBQSxpQ0FpQ2FDLEtBakNiLEVBaUNvQjtBQUNoQixZQUFNQyxVQUFVQyxLQUFLQyxLQUFMLENBQVdILFFBQVEsR0FBbkIsQ0FBaEI7O0FBRUEsWUFBSUMsWUFBWSxHQUFoQixFQUFxQjtBQUNuQixlQUFLVixLQUFMLENBQVdDLE1BQVgsR0FBb0IsVUFBcEI7QUFDQSxlQUFLWSxNQUFMLENBQVksY0FBWjtBQUNEOztBQUVELFlBQUksS0FBS2IsS0FBTCxDQUFXRSxZQUFmLEVBQ0UsS0FBS0ksWUFBTCxDQUFrQlEsS0FBbEIsQ0FBd0JDLEtBQXhCLEdBQW1DTCxPQUFuQztBQUNIO0FBM0NIO0FBQUE7QUFBQSxJQUFxRU0scUJBQXJFLENBSm1COztBQWtEbkI7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFDRSx3QkFBYztBQUFBOztBQUFBOztBQUdaLGFBQUtqQixRQUFMOztBQXlCQSxhQUFLQyxLQUFMLEdBQWE7QUFDWGlCLHNCQUFjLE9BREg7QUFFWEMsY0FBTSxNQUZLO0FBR1hDLGVBQU8sT0FISTtBQUlYQyxxRUFKVztBQUtYQyxrQkFBVTtBQUxDLE9BQWI7O0FBUUEsYUFBS0MscUJBQUwsR0FBNkJ6QixJQUE3QjtBQUNBLGFBQUswQixjQUFMLEdBQXNCMUIsSUFBdEI7QUFyQ1k7QUFzQ2I7O0FBdkNIO0FBQUE7QUFBQSxpQ0F5Q2E7QUFBQTs7QUFDVDs7QUFFQSxhQUFLMkIsYUFBTCxDQUFtQjtBQUNqQix5QkFBZSxxQkFBTTtBQUNuQixnQkFBTUMsV0FBVyxPQUFLbEIsR0FBTCxDQUFTQyxhQUFULENBQXVCLFdBQXZCLEVBQW9Da0IsS0FBckQ7O0FBRUEsZ0JBQUlELGFBQWEsRUFBakIsRUFDRSxPQUFLSCxxQkFBTCxDQUEyQkcsUUFBM0I7QUFDSCxXQU5nQjtBQU9qQiwwQkFBZ0I7QUFBQSxtQkFBTSxPQUFLRixjQUFMLEVBQU47QUFBQTtBQVBDLFNBQW5CO0FBU0Q7QUFyREg7QUFBQTtBQUFBLDhDQXVEMEJJLFFBdkQxQixFQXVEb0M7QUFDaEMsYUFBS0wscUJBQUwsR0FBNkJLLFFBQTdCO0FBQ0Q7QUF6REg7QUFBQTtBQUFBLHVDQTJEbUJBLFFBM0RuQixFQTJENkI7QUFDekIsYUFBS0osY0FBTCxHQUFzQkksUUFBdEI7QUFDRDtBQTdESDtBQUFBO0FBQUEsMkNBK0R1QkQsS0EvRHZCLEVBK0Q4QjtBQUMxQixhQUFLMUIsS0FBTCxDQUFXcUIsUUFBWCxHQUFzQkssS0FBdEI7QUFDQSxhQUFLYixNQUFMO0FBQ0Q7QUFsRUg7QUFBQTtBQUFBLElBQXVDRyxxQkFBdkMsQ0FyRG1COztBQTBIbkI7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFDRSwyQkFBYztBQUFBOztBQUFBOztBQUdaLGFBQUtqQixRQUFMOztBQXNCQSxhQUFLQyxLQUFMLEdBQWE7QUFDWDRCLHFCQUFhLE9BREY7QUFFWEMsc0JBQWMsaUVBRkg7QUFHWEMsZUFBTyxLQUhJO0FBSVhDLHNCQUFjLCtCQUpIO0FBS1hDLGNBQU0sZUFMSztBQU1YQyxlQUFPO0FBTkksT0FBYjs7QUFTQSxhQUFLQyxjQUFMLEdBQXNCLElBQXRCO0FBbENZO0FBbUNiOztBQXBDSDtBQUFBO0FBQUEsaUNBc0NhO0FBQUE7O0FBQ1Q7O0FBRUEsWUFBTUMsWUFBWSxLQUFLQyxPQUFMLENBQWFDLFdBQWIsS0FBNkIsT0FBN0IsR0FBdUMsT0FBdkMsR0FBaUQsWUFBbkU7O0FBRUEsYUFBS2IsYUFBTCxtQ0FDR1csU0FESCxFQUNlO0FBQUEsaUJBQU0sT0FBS0QsY0FBTCxFQUFOO0FBQUEsU0FEZjtBQUdEO0FBOUNIO0FBQUE7QUFBQSx1Q0FnRG1CUCxRQWhEbkIsRUFnRDZCO0FBQ3pCLGFBQUtPLGNBQUwsR0FBc0JQLFFBQXRCO0FBQ0Q7QUFsREg7QUFBQTtBQUFBLGtDQW9EY0QsS0FwRGQsRUFvRHFCO0FBQ2pCLGFBQUsxQixLQUFMLENBQVdpQyxLQUFYLEdBQW1CUCxLQUFuQjtBQUNBLGFBQUtiLE1BQUw7QUFDRDtBQXZESDtBQUFBO0FBQUEsd0NBeURvQmEsS0F6RHBCLEVBeUQyQjtBQUN2QixhQUFLMUIsS0FBTCxDQUFXOEIsS0FBWCxHQUFtQkosS0FBbkI7QUFDQSxhQUFLYixNQUFMO0FBQ0Q7QUE1REg7QUFBQTtBQUFBLElBQTZDRyxxQkFBN0MsQ0E3SG1COztBQTRMbkI7QUFBQTs7QUFDRSw0QkFBYztBQUFBOztBQUFBOztBQUdaLGFBQUtqQixRQUFMOztBQVVBLGFBQUtDLEtBQUwsR0FBYSxFQUFiOztBQUVBLGFBQUtzQyxrQkFBTCxHQUEwQnpDLElBQTFCO0FBZlk7QUFnQmI7O0FBakJIO0FBQUE7QUFBQSxpQ0FtQmE7QUFBQTs7QUFDVDs7QUFFQSxZQUFNc0MsWUFBWSxLQUFLQyxPQUFMLENBQWFDLFdBQWIsS0FBNkIsT0FBN0IsR0FBdUMsT0FBdkMsR0FBaUQsWUFBbkU7QUFDQSxhQUFLYixhQUFMLG1DQUNNVyxTQUROLFlBQ3lCLG1CQUFDSSxDQUFELEVBQU87QUFDNUIsY0FBTUMsU0FBU0QsRUFBRUMsTUFBakI7QUFDQSxjQUFNQyxLQUFLRCxPQUFPRSxZQUFQLENBQW9CLFNBQXBCLENBQVg7QUFDQSxpQkFBS0osa0JBQUwsQ0FBd0JHLEVBQXhCO0FBQ0QsU0FMSDtBQU9EO0FBOUJIO0FBQUE7QUFBQSwyQ0FnQ3VCZCxRQWhDdkIsRUFnQ2lDO0FBQzdCLGFBQUtXLGtCQUFMLEdBQTBCWCxRQUExQjtBQUNEO0FBbENIO0FBQUE7QUFBQSxJQUErQ1gscUJBQS9DLENBNUxtQjs7QUFpT25CO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBQ0UsMkJBQWM7QUFBQTs7QUFBQTs7QUFHWixhQUFLakIsUUFBTDs7QUFXQSxhQUFLQyxLQUFMLEdBQWE7QUFDWGlCLHNCQUFjLGtDQURIO0FBRVhDLGNBQU0sTUFGSztBQUdYeUIsaUJBQVM7QUFIRSxPQUFiOztBQU1BLGFBQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBS0MsZUFBTCxHQUF1QmhELElBQXZCOztBQUVBLGFBQUtpRCxpQkFBTCxHQUF5QixPQUFLQSxpQkFBTCxDQUF1QkMsSUFBdkIsUUFBekI7QUFDQSxhQUFLQyxnQkFBTCxHQUF3QixPQUFLQSxnQkFBTCxDQUFzQkQsSUFBdEIsUUFBeEI7QUF4Qlk7QUF5QmI7O0FBMUJIO0FBQUE7QUFBQSw2QkE0QlM7QUFDTDtBQUNBLGFBQUtFLFFBQUwsQ0FBY0MsSUFBZDtBQUNEO0FBL0JIO0FBQUE7QUFBQSxpQ0FpQ2E7QUFDVDtBQUNBLGFBQUtDLGNBQUwsR0FBc0IsS0FBSzVDLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QixpQkFBdkIsQ0FBdEI7QUFDRDtBQXBDSDtBQUFBO0FBQUEsOEJBc0NVb0MsSUF0Q1YsRUFzQ2dCO0FBQ1osYUFBS1EsS0FBTCxHQUFhUixJQUFiO0FBQ0EsYUFBS1MsV0FBTDtBQUNEO0FBekNIO0FBQUE7QUFBQSx3Q0EyQ29CMUIsUUEzQ3BCLEVBMkM4QjtBQUMxQixhQUFLa0IsZUFBTCxHQUF1QmxCLFFBQXZCO0FBQ0Q7QUE3Q0g7QUFBQTtBQUFBLCtCQStDVztBQUNQOztBQUVBLGFBQUsyQixPQUFMLENBQWFDLGNBQWIsQ0FBNEIsWUFBNUIsRUFBMEMsS0FBS1QsaUJBQS9DO0FBQ0EsYUFBS1EsT0FBTCxDQUFhQyxjQUFiLENBQTRCLFdBQTVCLEVBQXlDLEtBQUtQLGdCQUE5QztBQUNEO0FBcERIO0FBQUE7QUFBQSwrQkFzRFdRLGFBdERYLEVBc0QwQkMsY0F0RDFCLEVBc0QwQ0MsV0F0RDFDLEVBc0R1RDtBQUNuRCxpSkFBZUYsYUFBZixFQUE4QkMsY0FBOUIsRUFBOENDLFdBQTlDOztBQUVBLFlBQUksS0FBS1QsUUFBVCxFQUNFLEtBQUtBLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QkgsYUFBdkIsRUFBc0NDLGNBQXRDLEVBQXNEQyxXQUF0RDtBQUNIO0FBM0RIO0FBQUE7QUFBQSxvQ0E2RGdCO0FBQ1osYUFBS1QsUUFBTCxHQUFnQixJQUFJVyxpQkFBSixFQUFoQjtBQUNBLGFBQUtYLFFBQUwsQ0FBY1ksT0FBZCxDQUFzQixLQUFLVCxLQUEzQjs7QUFFQSxhQUFLSCxRQUFMLENBQWNwQyxNQUFkO0FBQ0EsYUFBS29DLFFBQUwsQ0FBY2EsUUFBZCxDQUF1QixLQUFLWCxjQUE1QjtBQUNBLGFBQUtGLFFBQUwsQ0FBY2MsUUFBZDs7QUFFQSxhQUFLVCxPQUFMLEdBQWUsSUFBSVUsb0JBQUosQ0FBaUIsS0FBS2YsUUFBTCxDQUFjZ0IsYUFBL0IsQ0FBZjtBQUNBLGFBQUtYLE9BQUwsQ0FBYVksV0FBYixDQUF5QixZQUF6QixFQUF1QyxLQUFLcEIsaUJBQTVDO0FBQ0EsYUFBS1EsT0FBTCxDQUFhWSxXQUFiLENBQXlCLFdBQXpCLEVBQXNDLEtBQUtsQixnQkFBM0M7QUFDRDtBQXhFSDtBQUFBO0FBQUEsd0NBMEVvQlAsRUExRXBCLEVBMEV3QjBCLEtBMUV4QixFQTBFK0JDLEtBMUUvQixFQTBFc0M7QUFBQTs7QUFDbEMsWUFBSSxDQUFDLEtBQUtDLFFBQVYsRUFBb0I7QUFDbEIsZUFBS0MsZUFBTCxDQUFxQkgsS0FBckIsRUFBNEJDLEtBQTVCOztBQUVBLGVBQUtwRSxLQUFMLENBQVcyQyxPQUFYLEdBQXFCLElBQXJCO0FBQ0EsZUFBSzlCLE1BQUwsQ0FBWSxnQkFBWjtBQUNBLGVBQUtXLGFBQUwsQ0FBbUI7QUFDakIsMEJBQWMsa0JBQUNlLENBQUQ7QUFBQSxxQkFBTyxPQUFLTSxlQUFMLENBQXFCLE9BQUt3QixRQUFMLENBQWNFLENBQW5DLEVBQXNDLE9BQUtGLFFBQUwsQ0FBY0csQ0FBcEQsQ0FBUDtBQUFBO0FBREcsV0FBbkI7QUFHRCxTQVJELE1BUU87QUFDTCxlQUFLQyxlQUFMLENBQXFCTixLQUFyQixFQUE0QkMsS0FBNUI7QUFDRDtBQUNGO0FBdEZIO0FBQUE7QUFBQSx1Q0F3Rm1CM0IsRUF4Rm5CLEVBd0Z1QjBCLEtBeEZ2QixFQXdGOEJDLEtBeEY5QixFQXdGcUM7QUFDakMsYUFBS0ssZUFBTCxDQUFxQk4sS0FBckIsRUFBNEJDLEtBQTVCO0FBQ0Q7QUExRkg7QUFBQTtBQUFBLHNDQTRGa0JELEtBNUZsQixFQTRGeUJDLEtBNUZ6QixFQTRGZ0M7QUFDNUIsYUFBS0MsUUFBTCxHQUFnQjtBQUNkNUIsY0FBSSxTQURVO0FBRWQ4QixhQUFHSixRQUFRLEtBQUtmLEtBQUwsQ0FBV3JDLEtBRlI7QUFHZHlELGFBQUdKLFFBQVEsS0FBS2hCLEtBQUwsQ0FBV3NCO0FBSFIsU0FBaEI7O0FBTUEsYUFBS3pCLFFBQUwsQ0FBYzBCLFFBQWQsQ0FBdUIsS0FBS04sUUFBNUI7QUFDRDtBQXBHSDtBQUFBO0FBQUEsc0NBc0drQkYsS0F0R2xCLEVBc0d5QkMsS0F0R3pCLEVBc0dnQztBQUM1QixhQUFLQyxRQUFMLENBQWNFLENBQWQsR0FBa0JKLFFBQVEsS0FBS2YsS0FBTCxDQUFXckMsS0FBckM7QUFDQSxhQUFLc0QsUUFBTCxDQUFjRyxDQUFkLEdBQWtCSixRQUFRLEtBQUtoQixLQUFMLENBQVdzQixNQUFyQzs7QUFFQSxhQUFLekIsUUFBTCxDQUFjMkIsV0FBZCxDQUEwQixLQUFLUCxRQUEvQjtBQUNEO0FBM0dIO0FBQUE7QUFBQSxJQUE2Q1EsbUJBQTdDLENBcE9tQjs7QUFrVm5CO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBQ0UsOEJBQWM7QUFBQTs7QUFBQTs7QUFHWixjQUFLOUUsUUFBTDs7QUFpQkEsY0FBS0MsS0FBTCxHQUFhO0FBQ1hpQixzQkFBYyxzQkFESDtBQUVYQyxjQUFNLE1BRks7QUFHWDRELGdCQUFRLDhCQUhHO0FBSVhuQyxpQkFBUyxLQUpFO0FBS1h0QixrQkFBVTtBQUxDLE9BQWI7O0FBUUEsY0FBSzBELGtCQUFMLEdBQTBCLFFBQUtBLGtCQUFMLENBQXdCaEMsSUFBeEIsU0FBMUI7QUE1Qlk7QUE2QmI7O0FBOUJIO0FBQUE7QUFBQSw2QkFnQ1M7QUFDTDtBQUNBLGFBQUtFLFFBQUwsQ0FBY0MsSUFBZDtBQUNEO0FBbkNIO0FBQUE7QUFBQSx5Q0FxQ3FCWCxDQXJDckIsRUFxQ3dCO0FBQUE7O0FBQ3BCLGFBQUt2QyxLQUFMLENBQVcyQyxPQUFYLEdBQXFCLElBQXJCO0FBQ0EsYUFBSzlCLE1BQUwsQ0FBWSxnQkFBWjs7QUFFQSxhQUFLVyxhQUFMLENBQW1CO0FBQ2pCLHdCQUFjLGtCQUFDZSxDQUFELEVBQU87QUFDbkIsZ0JBQU04QixXQUFXLFFBQUtwQixRQUFMLENBQWN2QixLQUEvQjs7QUFFQSxnQkFBSTJDLFFBQUosRUFDRSxRQUFLVyxTQUFMLENBQWVYLFNBQVNZLEtBQXhCLEVBQStCWixTQUFTcEMsS0FBeEMsRUFBK0NvQyxTQUFTYSxXQUF4RDtBQUNIO0FBTmdCLFNBQW5CO0FBUUQ7QUFqREg7QUFBQTtBQUFBLDhCQW1EVXRDLElBbkRWLEVBbURnQixDQUFFLHNCQUF3QjtBQW5EMUM7QUFBQTtBQUFBLGlDQXFEYTtBQUNUO0FBQ0EsYUFBS3VDLGtCQUFMLEdBQTBCLEtBQUs1RSxHQUFMLENBQVNDLGFBQVQsQ0FBdUIsaUJBQXZCLENBQTFCO0FBQ0Q7QUF4REg7QUFBQTtBQUFBLCtCQTBEV2dELGFBMURYLEVBMEQwQkMsY0ExRDFCLEVBMEQwQ0MsV0ExRDFDLEVBMER1RDtBQUNuRCx1SkFBZUYsYUFBZixFQUE4QkMsY0FBOUIsRUFBOENDLFdBQTlDOztBQUVBLFlBQUksS0FBS1QsUUFBVCxFQUNFLEtBQUtBLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QkgsYUFBdkIsRUFBc0NDLGNBQXRDLEVBQXNEQyxXQUF0RDtBQUNIO0FBL0RIO0FBQUE7QUFBQSx1Q0FpRW1CMEIsUUFqRW5CLEVBaUUyRjtBQUFBLFlBQTlEQyxNQUE4RCx1RUFBckQsSUFBcUQ7QUFBQSxZQUEvQ0gsV0FBK0MsdUVBQWpDLElBQWlDO0FBQUEsWUFBM0JJLHFCQUEyQix1RUFBSCxDQUFHOztBQUN2RixhQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsYUFBS0MsZUFBTCxHQUF1QkosV0FBV0UscUJBQWxDOztBQUVBLGFBQUssSUFBSUwsUUFBUSxDQUFqQixFQUFvQkEsUUFBUSxLQUFLTyxlQUFqQyxFQUFrRFAsT0FBbEQsRUFBMkQ7QUFDekQsY0FBTWhELFFBQVFvRCxXQUFXLElBQVgsR0FBa0JBLE9BQU9KLEtBQVAsQ0FBbEIsR0FBa0MsQ0FBQ0EsUUFBUSxDQUFULEVBQVlRLFFBQVosRUFBaEQ7QUFDQSxjQUFNcEIsV0FBVyxFQUFFWSxPQUFPQSxLQUFULEVBQWdCaEQsT0FBT0EsS0FBdkIsRUFBakI7O0FBRUEsY0FBSWlELFdBQUosRUFDRWIsU0FBU2EsV0FBVCxHQUF1QkEsWUFBWUQsS0FBWixDQUF2Qjs7QUFFRixlQUFLTSxTQUFMLENBQWVHLElBQWYsQ0FBb0JyQixRQUFwQjtBQUNEOztBQUVELGFBQUtwQixRQUFMLEdBQWdCLElBQUkwQyxrQkFBSixDQUFlO0FBQzdCMUUsd0JBQWMsS0FBS2pCLEtBQUwsQ0FBV2lCLFlBREk7QUFFN0IyRSxtQkFBUyxLQUFLTDtBQUZlLFNBQWYsQ0FBaEI7O0FBS0EsYUFBS3RDLFFBQUwsQ0FBY3BDLE1BQWQ7QUFDQSxhQUFLb0MsUUFBTCxDQUFjYSxRQUFkLENBQXVCLEtBQUtxQixrQkFBNUI7QUFDQSxhQUFLbEMsUUFBTCxDQUFjYyxRQUFkOztBQUVBLGFBQUtkLFFBQUwsQ0FBY3pCLGFBQWQsQ0FBNEI7QUFDMUIsb0JBQVUsS0FBS3VEO0FBRFcsU0FBNUI7QUFHRDtBQTNGSDtBQUFBO0FBQUEsOENBNkYwQmMsT0E3RjFCLEVBNkZtQztBQUMvQixhQUFLLElBQUlaLFFBQVEsQ0FBakIsRUFBb0JBLFFBQVEsS0FBS08sZUFBakMsRUFBa0RQLE9BQWxELEVBQTJEO0FBQ3pELGNBQUlZLFFBQVFDLE9BQVIsQ0FBZ0JiLEtBQWhCLE1BQTJCLENBQUMsQ0FBaEMsRUFDRSxLQUFLaEMsUUFBTCxDQUFjOEMsV0FBZCxDQUEwQmQsS0FBMUIsRUFERixLQUdFLEtBQUtoQyxRQUFMLENBQWMrQyxZQUFkLENBQTJCZixLQUEzQjtBQUNIO0FBQ0Y7QUFwR0g7QUFBQTtBQUFBLHVDQXNHbUJ0RCxRQXRHbkIsRUFzRzZCO0FBQ3pCLGFBQUtxRCxTQUFMLEdBQWlCckQsUUFBakI7QUFDRDtBQXhHSDtBQUFBO0FBQUEsNkJBMEdTc0UsaUJBMUdULEVBMEc0QjtBQUN4QixhQUFLakcsS0FBTCxDQUFXcUIsUUFBWCxHQUFzQixJQUF0QjtBQUNBLGFBQUtSLE1BQUw7QUFDRDtBQTdHSDtBQUFBO0FBQUEsSUFBK0NnRSxtQkFBL0MsQ0FyVm1COztBQXFjbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBQ0UsNEJBQWM7QUFBQTs7QUFBQTs7QUFHWixjQUFLOUUsUUFBTDs7QUF3Q0EsY0FBS0MsS0FBTCxHQUFhO0FBQ1hrRyxzQkFBYyxJQURIO0FBRVhDLDJCQUFtQixJQUZSO0FBR1hDLGtCQUFVLEtBSEM7QUFJWEMseUJBQWlCLHlDQUpOO0FBS1hDLGdDQUF3QixpRUFMYjtBQU1YQztBQU5XLE9BQWI7O0FBU0EsY0FBS0MsTUFBTCxHQUFjO0FBQ1osd0JBQWdCLEdBREo7QUFFWiwyQkFBbUIsR0FGUDtBQUdaLDJCQUFtQjtBQUhQLE9BQWQ7O0FBTUEsY0FBS0MsbUJBQUwsR0FBMkI1RyxJQUEzQjtBQUNBLGNBQUs2RyxrQkFBTCxHQUEwQjdHLElBQTFCO0FBM0RZO0FBNERiOztBQTdESDtBQUFBO0FBQUEsaUNBK0RhO0FBQUE7O0FBQ1Q7O0FBRUEsYUFBSzJCLGFBQUwsQ0FBbUI7QUFDakIsdUJBQWEsbUJBQUNlLENBQUQ7QUFBQSxtQkFBTyxRQUFLbUUsa0JBQUwsQ0FBd0JuRSxDQUF4QixDQUFQO0FBQUEsV0FESTtBQUVqQix3QkFBYyxvQkFBQ0EsQ0FBRDtBQUFBLG1CQUFPLFFBQUtrRSxtQkFBTCxDQUF5QmxFLENBQXpCLENBQVA7QUFBQTtBQUZHLFNBQW5CO0FBSUQ7QUF0RUg7QUFBQTtBQUFBLDRDQXdFd0JaLFFBeEV4QixFQXdFa0M7QUFDOUIsYUFBSzhFLG1CQUFMLEdBQTJCOUUsUUFBM0I7QUFDRDtBQTFFSDtBQUFBO0FBQUEsMkNBNEV1QkEsUUE1RXZCLEVBNEVpQztBQUM3QixhQUFLK0Usa0JBQUwsR0FBMEIvRSxRQUExQjtBQUNEO0FBOUVIO0FBQUE7QUFBQSwyQ0FnRnVCRCxLQWhGdkIsRUFnRjhCO0FBQzFCLGFBQUsxQixLQUFMLENBQVdvRyxRQUFYLEdBQXNCMUUsS0FBdEI7QUFDQSxhQUFLYixNQUFMO0FBQ0Q7QUFuRkg7QUFBQTtBQUFBLCtDQXFGMkJhLEtBckYzQixFQXFGa0M7QUFDOUIsYUFBSzFCLEtBQUwsQ0FBV2tHLFlBQVgsR0FBMEJ4RSxLQUExQjtBQUNBLGFBQUtiLE1BQUw7QUFDRDtBQXhGSDtBQUFBO0FBQUEsb0RBMEZnQ2EsS0ExRmhDLEVBMEZ1QztBQUNuQyxhQUFLMUIsS0FBTCxDQUFXbUcsaUJBQVgsR0FBK0J6RSxLQUEvQjtBQUNBLGFBQUtiLE1BQUw7QUFDRDtBQTdGSDtBQUFBO0FBQUEsSUFBK0NHLHFCQUEvQyxDQXZqQm1COztBQXVwQm5CO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBQ0UsOEJBQWM7QUFBQTs7QUFBQTs7QUFHWixjQUFLakIsUUFBTDs7QUFZQSxjQUFLeUcsTUFBTCxHQUFjO0FBQ1osd0JBQWdCLEdBREo7QUFFWiwyQkFBbUIsSUFGUDtBQUdaLDJCQUFtQjtBQUhQLE9BQWQ7QUFmWTtBQW9CYjs7QUFyQkg7QUFBQTtBQUFBLGlDQXVCYTtBQUFBOztBQUNUOztBQUVBLGFBQUtoRixhQUFMLENBQW1CO0FBQ2pCLDhCQUFvQjtBQUFBLG1CQUFNLFFBQUttRixjQUFMLENBQW9CLElBQXBCLENBQU47QUFBQSxXQURIO0FBRWpCLDZCQUFtQjtBQUFBLG1CQUFNLFFBQUtBLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBTjtBQUFBO0FBRkYsU0FBbkI7QUFJRDtBQTlCSDtBQUFBO0FBQUEsdUNBZ0NtQmhGLFFBaENuQixFQWdDNkI7QUFDekIsYUFBS2dGLGNBQUwsR0FBc0JoRixRQUF0QjtBQUNEO0FBbENIO0FBQUE7QUFBQSxJQUFvRFgscUJBQXBELENBMXBCbUI7O0FBZ3NCbkI7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFDRSw2QkFBYztBQUFBOztBQUFBOztBQUdaLGNBQUtqQixRQUFMOztBQVFBLGNBQUtDLEtBQUwsR0FBYTtBQUNYZ0M7QUFEVyxPQUFiO0FBWFk7QUFjYjs7QUFmSDtBQUFBLElBQWtEaEIscUJBQWxELENBbnNCbUI7O0FBcXRCbkI7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFDRSw2QkFBYztBQUFBOztBQUFBOztBQUdaLGNBQUtqQixRQUFMOztBQVFBLGNBQUtDLEtBQUwsR0FBYTtBQUNYZ0M7QUFEVyxPQUFiO0FBWFk7QUFjYjs7QUFmSDtBQUFBLElBQTRDaEIscUJBQTVDLENBeHRCbUI7O0FBMnVCbkI7QUFDQTRGLEtBNXVCbUIsZUE0dUJmbkUsRUE1dUJlLEVBNHVCWDtBQUNOLFdBQU8sQ0FBQyxDQUFDLEtBQUtBLEVBQUwsQ0FBVDtBQUNELEdBOXVCa0I7QUFndkJuQm9FLEtBaHZCbUIsZUFndkJmcEUsRUFodkJlLEVBZ3ZCWHFFLE1BaHZCVyxFQWd2Qkg7QUFDZCxRQUFNQyxPQUFPLEtBQUt0RSxFQUFMLENBQWI7QUFDQSxRQUFNdUUsT0FBTyxJQUFJRCxJQUFKLEVBQWI7QUFDQTtBQUNBQyxTQUFLaEgsS0FBTCxDQUFXaUgsT0FBWCxHQUFxQixzQkFBYyxFQUFkLEVBQWtCSCxNQUFsQixDQUFyQjtBQUNBRSxTQUFLNUUsT0FBTCxDQUFhSyxFQUFiLEdBQWtCQSxHQUFHeUUsT0FBSCxDQUFXLEtBQVgsRUFBa0IsR0FBbEIsQ0FBbEI7O0FBRUEsV0FBT0YsSUFBUDtBQUNEO0FBeHZCa0IsQ0FBckI7O2tCQTJ2QmVsSCxZIiwiZmlsZSI6InNlcnZpY2VWaWV3cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNlZ21lbnRlZFZpZXcsXG4gIFNlbGVjdFZpZXcsXG4gIFNwYWNlVmlldyxcbiAgU3F1YXJlZFZpZXcsXG4gIFRvdWNoU3VyZmFjZSxcbn0gZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZXhhbXBsZVxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHRoZSB2aWV3IG9mIHRoZSBgYXVkaW8tYnVmZmVyLW1hbmFnZXJgIHNlcnZpY2UuXG4gKlxuICogQGludGVyZmFjZSBBYnN0cmFjdEF1ZGlvQnVmZmVyTWFuYWdlclZpZXdcbiAqIEBleHRlbmRzIG1vZHVsZTpzb3VuZHdvcmtzL2NsaWVudC5WaWV3XG4gKi9cbi8qKlxuICogTWV0aG9kIGNhbGxlZCB3aGVuIGEgbmV3IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50bHkgbG9hZGVkIGFzc2V0c1xuICogaXMgcmVjZWl2ZWQuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBBYnN0cmFjdEF1ZGlvQnVmZmVyTWFuYWdlclZpZXcub25Qcm9ncmVzc1xuICogQHBhcmFtIHtOdW1iZXJ9IHBlcmNlbnQgLSBUaGUgcHVyY2VudGFnZSBvZiBsb2FkZWQgYXNzZXRzLlxuICovXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5jb25zdCBzZXJ2aWNlVmlld3MgPSB7XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdWRpb0J1ZmZlck1hbmFnZXJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOmF1ZGlvLWJ1ZmZlci1tYW5hZ2VyJzogY2xhc3MgQXVkaW9CdWZmZXJNYW5hZ2VyVmlldyBleHRlbmRzIFNlZ21lbnRlZFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgIDxwPjwlPSBtc2dbc3RhdHVzXSAlPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgIDwlIGlmIChzaG93UHJvZ3Jlc3MpIHsgJT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3Mtd3JhcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwlIH0gJT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgc3RhdHVzOiAnbG9hZGluZycsXG4gICAgICAgIHNob3dQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgbXNnOiB7XG4gICAgICAgICAgbG9hZGluZzogJ0NoYXJnZW1lbnQgZGVzIGZpY2hpZXJzIGF1ZGlvLi4uJyxcbiAgICAgICAgICBkZWNvZGluZzogJ0TDqWNvZGFnZS4uLicsXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICBzdXBlci5vblJlbmRlcigpO1xuICAgICAgdGhpcy4kcHJvZ3Jlc3NCYXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MtYmFyJyk7XG4gICAgfVxuXG4gICAgb25Qcm9ncmVzcyhyYXRpbykge1xuICAgICAgY29uc3QgcGVyY2VudCA9IE1hdGgucm91bmQocmF0aW8gKiAxMDApO1xuXG4gICAgICBpZiAocGVyY2VudCA9PT0gMTAwKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc3RhdHVzID0gJ2RlY29kaW5nJztcbiAgICAgICAgdGhpcy5yZW5kZXIoJy5zZWN0aW9uLXRvcCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5tb2RlbC5zaG93UHJvZ3Jlc3MpXG4gICAgICAgIHRoaXMuJHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF1dGhcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOmF1dGgnOiBjbGFzcyBBdXRoVmlldyBleHRlbmRzIFNlZ21lbnRlZFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IGBcbiAgICAgICAgPCUgaWYgKCFyZWplY3RlZCkgeyAlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgICAgPHA+PCU9IGluc3RydWN0aW9ucyAlPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgLz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIGlkPVwic2VuZFwiPjwlPSBzZW5kICU+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b20gZmxleC1taWRkbGVcIj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZXNldFwiIGNsYXNzPVwiYnRuXCI+PCU9IHJlc2V0ICU+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwlIH0gZWxzZSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICA8cD48JT0gcmVqZWN0TWVzc2FnZSAlPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b20gZmxleC1taWRkbGVcIj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZXNldFwiIGNsYXNzPVwiYnRuXCI+PCU9IHJlc2V0ICU+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwlIH0gJT5cbiAgICAgIGA7XG5cbiAgICAgIHRoaXMubW9kZWwgPSB7XG4gICAgICAgIGluc3RydWN0aW9uczogJ0xvZ2luJyxcbiAgICAgICAgc2VuZDogJ1NlbmQnLFxuICAgICAgICByZXNldDogJ1Jlc2V0JyxcbiAgICAgICAgcmVqZWN0TWVzc2FnZTogYFNvcnJ5LCB5b3UgZG9uJ3QgaGF2ZSBhY2Nlc3MgdG8gdGhpcyBjbGllbnRgLFxuICAgICAgICByZWplY3RlZDogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9zZW5kUGFzc3dvcmRDYWxsYmFjayA9IG5vb3A7XG4gICAgICB0aGlzLl9yZXNldENhbGxiYWNrID0gbm9vcDtcbiAgICB9XG5cbiAgICBvblJlbmRlcigpIHtcbiAgICAgIHN1cGVyLm9uUmVuZGVyKCk7XG5cbiAgICAgIHRoaXMuaW5zdGFsbEV2ZW50cyh7XG4gICAgICAgICdjbGljayAjc2VuZCc6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJyNwYXNzd29yZCcpLnZhbHVlO1xuXG4gICAgICAgICAgaWYgKHBhc3N3b3JkICE9PSAnJylcbiAgICAgICAgICAgIHRoaXMuX3NlbmRQYXNzd29yZENhbGxiYWNrKHBhc3N3b3JkKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NsaWNrICNyZXNldCc6ICgpID0+IHRoaXMuX3Jlc2V0Q2FsbGJhY2soKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFNlbmRQYXNzd29yZENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9zZW5kUGFzc3dvcmRDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIHNldFJlc2V0Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX3Jlc2V0Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICB1cGRhdGVSZWplY3RlZFN0YXR1cyh2YWx1ZSkge1xuICAgICAgdGhpcy5tb2RlbC5yZWplY3RlZCA9IHZhbHVlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENoZWNraW5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOmNoZWNraW4nOiBjbGFzcyBDaGVja2luVmlldyBleHRlbmRzIFNlZ21lbnRlZFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IGBcbiAgICAgICAgPCUgaWYgKGxhYmVsKSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImJpZ1wiPjwlPSBsYWJlbFByZWZpeCAlPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGVja2luLWxhYmVsXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiaHVnZSBib2xkXCI+PCU9IGxhYmVsICU+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInNtYWxsXCI+PCU9IGxhYmVsUG9zdGZpeCAlPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCUgfSBlbHNlIHsgJT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3BcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxwPjwlPSBlcnJvciA/IGVycm9yTWVzc2FnZSA6IHdhaXQgJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tXCI+PC9kaXY+XG4gICAgICAgIDwlIH0gJT5cbiAgICAgIGA7XG5cbiAgICAgIHRoaXMubW9kZWwgPSB7XG4gICAgICAgIGxhYmVsUHJlZml4OiAnR28gdG8nLFxuICAgICAgICBsYWJlbFBvc3RmaXg6ICdUb3VjaCB0aGUgc2NyZWVuPGJyIGNsYXNzPVwicG9ydHJhaXQtb25seVwiIC8+d2hlbiB5b3UgYXJlIHJlYWR5LicsXG4gICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiAnU29ycnksPGJyLz5ubyBwbGFjZSBhdmFpbGFibGUnLFxuICAgICAgICB3YWl0OiAnQ29ubmVjdGlvbi4uLicsXG4gICAgICAgIGxhYmVsOiAnJyxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX3JlYWR5Q2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgc3VwZXIub25SZW5kZXIoKTtcblxuICAgICAgY29uc3QgZXZlbnROYW1lID0gdGhpcy5vcHRpb25zLmludGVyYWN0aW9uID09PSAnbW91c2UnID8gJ2NsaWNrJyA6ICd0b3VjaHN0YXJ0JztcblxuICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgW2V2ZW50TmFtZV06ICgpID0+IHRoaXMuX3JlYWR5Q2FsbGJhY2soKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFJlYWR5Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX3JlYWR5Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICB1cGRhdGVMYWJlbCh2YWx1ZSkge1xuICAgICAgdGhpcy5tb2RlbC5sYWJlbCA9IHZhbHVlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVFcnJvclN0YXR1cyh2YWx1ZSkge1xuICAgICAgdGhpcy5tb2RlbC5lcnJvciA9IHZhbHVlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH0sXG5cbiAgJ3NlcnZpY2U6bGFuZ3VhZ2UnOiBjbGFzcyBMYW5ndWFnZVZpZXcgZXh0ZW5kcyBTZWdtZW50ZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXJcIj5cbiAgICAgICAgICA8JSBmb3IgKGxldCBrZXkgaW4gb3B0aW9ucykgeyAlPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIGRhdGEtaWQ9XCI8JT0ga2V5ICU+XCI+PCU9IG9wdGlvbnNba2V5XSAlPjwvYnV0dG9uPlxuICAgICAgICAgIDwlIH0gJT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHt9O1xuXG4gICAgICB0aGlzLl9zZWxlY3Rpb25DYWxsYmFjayA9IG5vb3A7XG4gICAgfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICBzdXBlci5vblJlbmRlcigpO1xuXG4gICAgICBjb25zdCBldmVudE5hbWUgPSB0aGlzLm9wdGlvbnMuaW50ZXJhY3Rpb24gPT09ICdtb3VzZScgPyAnY2xpY2snIDogJ3RvdWNoc3RhcnQnO1xuICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgW2Ake2V2ZW50TmFtZX0gLmJ0bmBdOiAoZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgIGNvbnN0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbkNhbGxiYWNrKGlkKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgc2V0U2VsZWN0aW9uQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbkNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuICB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBMb2NhdG9yXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAnc2VydmljZTpsb2NhdG9yJzogY2xhc3MgTG9jYXRvclZpZXcgZXh0ZW5kcyBTcXVhcmVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1zcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tZmxvYXQgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICA8JSBpZiAoIXNob3dCdG4pIHsgJT5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwic21hbGxcIj48JT0gaW5zdHJ1Y3Rpb25zICU+PC9wPlxuICAgICAgICAgIDwlIH0gZWxzZSB7ICU+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCI+PCU9IHNlbmQgJT48L2J1dHRvbj5cbiAgICAgICAgICA8JSB9ICU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zOiAnRGVmaW5lIHlvdXIgcG9zaXRpb24gaW4gdGhlIGFyZWEnLFxuICAgICAgICBzZW5kOiAnU2VuZCcsXG4gICAgICAgIHNob3dCdG46IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hcmVhID0gbnVsbDtcbiAgICAgIHRoaXMuX3NlbGVjdENhbGxiYWNrID0gbm9vcDtcblxuICAgICAgdGhpcy5fb25BcmVhVG91Y2hTdGFydCA9IHRoaXMuX29uQXJlYVRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuX29uQXJlYVRvdWNoTW92ZSA9IHRoaXMuX29uQXJlYVRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICBzdXBlci5zaG93KCk7XG4gICAgICB0aGlzLnNlbGVjdG9yLnNob3coKTtcbiAgICB9XG5cbiAgICBvblJlbmRlcigpIHtcbiAgICAgIHN1cGVyLm9uUmVuZGVyKCk7XG4gICAgICB0aGlzLiRhcmVhQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tc3F1YXJlJyk7XG4gICAgfVxuXG4gICAgc2V0QXJlYShhcmVhKSB7XG4gICAgICB0aGlzLl9hcmVhID0gYXJlYTtcbiAgICAgIHRoaXMuX3JlbmRlckFyZWEoKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgdGhpcy5fc2VsZWN0Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICBzdXBlci5yZW1vdmUoKTtcblxuICAgICAgdGhpcy5zdXJmYWNlLnJlbW92ZUxpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fb25BcmVhVG91Y2hTdGFydCk7XG4gICAgICB0aGlzLnN1cmZhY2UucmVtb3ZlTGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uQXJlYVRvdWNoTW92ZSk7XG4gICAgfVxuXG4gICAgb25SZXNpemUodmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIG9yaWVudGF0aW9uKSB7XG4gICAgICBzdXBlci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RvcilcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuICAgIH1cblxuICAgIF9yZW5kZXJBcmVhKCkge1xuICAgICAgdGhpcy5zZWxlY3RvciA9IG5ldyBTcGFjZVZpZXcoKTtcbiAgICAgIHRoaXMuc2VsZWN0b3Iuc2V0QXJlYSh0aGlzLl9hcmVhKTtcblxuICAgICAgdGhpcy5zZWxlY3Rvci5yZW5kZXIoKTtcbiAgICAgIHRoaXMuc2VsZWN0b3IuYXBwZW5kVG8odGhpcy4kYXJlYUNvbnRhaW5lcik7XG4gICAgICB0aGlzLnNlbGVjdG9yLm9uUmVuZGVyKCk7XG5cbiAgICAgIHRoaXMuc3VyZmFjZSA9IG5ldyBUb3VjaFN1cmZhY2UodGhpcy5zZWxlY3Rvci4kc3ZnQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuc3VyZmFjZS5hZGRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uQXJlYVRvdWNoU3RhcnQpO1xuICAgICAgdGhpcy5zdXJmYWNlLmFkZExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9vbkFyZWFUb3VjaE1vdmUpO1xuICAgIH1cblxuICAgIF9vbkFyZWFUb3VjaFN0YXJ0KGlkLCBub3JtWCwgbm9ybVkpIHtcbiAgICAgIGlmICghdGhpcy5wb3NpdGlvbikge1xuICAgICAgICB0aGlzLl9jcmVhdGVQb3NpdGlvbihub3JtWCwgbm9ybVkpO1xuXG4gICAgICAgIHRoaXMubW9kZWwuc2hvd0J0biA9IHRydWU7XG4gICAgICAgIHRoaXMucmVuZGVyKCcuc2VjdGlvbi1mbG9hdCcpO1xuICAgICAgICB0aGlzLmluc3RhbGxFdmVudHMoe1xuICAgICAgICAgICdjbGljayAuYnRuJzogKGUpID0+IHRoaXMuX3NlbGVjdENhbGxiYWNrKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbihub3JtWCwgbm9ybVkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9vbkFyZWFUb3VjaE1vdmUoaWQsIG5vcm1YLCBub3JtWSkge1xuICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb24obm9ybVgsIG5vcm1ZKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlUG9zaXRpb24obm9ybVgsIG5vcm1ZKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICBpZDogJ2xvY2F0b3InLFxuICAgICAgICB4OiBub3JtWCAqIHRoaXMuX2FyZWEud2lkdGgsXG4gICAgICAgIHk6IG5vcm1ZICogdGhpcy5fYXJlYS5oZWlnaHQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNlbGVjdG9yLmFkZFBvaW50KHRoaXMucG9zaXRpb24pO1xuICAgIH1cblxuICAgIF91cGRhdGVQb3NpdGlvbihub3JtWCwgbm9ybVkpIHtcbiAgICAgIHRoaXMucG9zaXRpb24ueCA9IG5vcm1YICogdGhpcy5fYXJlYS53aWR0aDtcbiAgICAgIHRoaXMucG9zaXRpb24ueSA9IG5vcm1ZICogdGhpcy5fYXJlYS5oZWlnaHQ7XG5cbiAgICAgIHRoaXMuc2VsZWN0b3IudXBkYXRlUG9pbnQodGhpcy5wb3NpdGlvbik7XG4gICAgfVxuICB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQbGFjZXJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOnBsYWNlcic6IGNsYXNzIFBsYWNlclZpZXdMaXN0IGV4dGVuZHMgU3F1YXJlZFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tc3F1YXJlIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgPCUgaWYgKHJlamVjdGVkKSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZpdC1jb250YWluZXIgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICAgIDxwPjwlPSByZWplY3QgJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCUgfSAlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tZmxvYXQgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICA8JSBpZiAoIXJlamVjdGVkKSB7ICU+XG4gICAgICAgICAgICA8JSBpZiAoc2hvd0J0bikgeyAlPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCI+PCU9IHNlbmQgJT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwlIH0gJT5cbiAgICAgICAgICA8JSB9ICU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zOiAnU2VsZWN0IHlvdXIgcG9zaXRpb24nLFxuICAgICAgICBzZW5kOiAnU2VuZCcsXG4gICAgICAgIHJlamVjdDogJ1NvcnJ5LCBubyBwbGFjZSBpcyBhdmFpbGFibGUnLFxuICAgICAgICBzaG93QnRuOiBmYWxzZSxcbiAgICAgICAgcmVqZWN0ZWQ6IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5fb25TZWxlY3Rpb25DaGFuZ2UgPSB0aGlzLl9vblNlbGVjdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICBzdXBlci5zaG93KCk7XG4gICAgICB0aGlzLnNlbGVjdG9yLnNob3coKTtcbiAgICB9XG5cbiAgICBfb25TZWxlY3Rpb25DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5tb2RlbC5zaG93QnRuID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVuZGVyKCcuc2VjdGlvbi1mbG9hdCcpO1xuXG4gICAgICB0aGlzLmluc3RhbGxFdmVudHMoe1xuICAgICAgICAnY2xpY2sgLmJ0bic6IChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnNlbGVjdG9yLnZhbHVlO1xuXG4gICAgICAgICAgaWYgKHBvc2l0aW9uKVxuICAgICAgICAgICAgdGhpcy5fb25TZWxlY3QocG9zaXRpb24uaW5kZXgsIHBvc2l0aW9uLmxhYmVsLCBwb3NpdGlvbi5jb29yZGluYXRlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEFyZWEoYXJlYSkgeyAvKiBubyBuZWVkIGZvciBhcmVhICovIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgc3VwZXIub25SZW5kZXIoKTtcbiAgICAgIHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tc3F1YXJlJyk7XG4gICAgfVxuXG4gICAgb25SZXNpemUodmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIG9yaWVudGF0aW9uKSB7XG4gICAgICBzdXBlci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RvcilcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuICAgIH1cblxuICAgIGRpc3BsYXlQb3NpdGlvbnMoY2FwYWNpdHksIGxhYmVscyA9IG51bGwsIGNvb3JkaW5hdGVzID0gbnVsbCwgbWF4Q2xpZW50c1BlclBvc2l0aW9uID0gMSkge1xuICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMubnVtYmVyUG9zaXRpb25zID0gY2FwYWNpdHkgLyBtYXhDbGllbnRzUGVyUG9zaXRpb247XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm51bWJlclBvc2l0aW9uczsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGxhYmVscyAhPT0gbnVsbCA/IGxhYmVsc1tpbmRleF0gOiAoaW5kZXggKyAxKS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHsgaW5kZXg6IGluZGV4LCBsYWJlbDogbGFiZWwgfTtcblxuICAgICAgICBpZiAoY29vcmRpbmF0ZXMpXG4gICAgICAgICAgcG9zaXRpb24uY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc1tpbmRleF07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VsZWN0b3IgPSBuZXcgU2VsZWN0Vmlldyh7XG4gICAgICAgIGluc3RydWN0aW9uczogdGhpcy5tb2RlbC5pbnN0cnVjdGlvbnMsXG4gICAgICAgIGVudHJpZXM6IHRoaXMucG9zaXRpb25zLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2VsZWN0b3IucmVuZGVyKCk7XG4gICAgICB0aGlzLnNlbGVjdG9yLmFwcGVuZFRvKHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuc2VsZWN0b3Iub25SZW5kZXIoKTtcblxuICAgICAgdGhpcy5zZWxlY3Rvci5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgJ2NoYW5nZSc6IHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzYWJsZWRQb3NpdGlvbnMoaW5kZXhlcykge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubnVtYmVyUG9zaXRpb25zOyBpbmRleCsrKSB7XG4gICAgICAgIGlmIChpbmRleGVzLmluZGV4T2YoaW5kZXgpID09PSAtMSlcbiAgICAgICAgICB0aGlzLnNlbGVjdG9yLmVuYWJsZUluZGV4KGluZGV4KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMuc2VsZWN0b3IuZGlzYWJsZUluZGV4KGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTZWxlY3RDYWxsYWNrKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9vblNlbGVjdCA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIHJlamVjdChkaXNhYmxlZFBvc2l0aW9ucykge1xuICAgICAgdGhpcy5tb2RlbC5yZWplY3RlZCA9IHRydWU7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfSxcblxuICAvLyBncmFwaGljIHBsYWNlciBmbGF2b3IgZm9yIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXNcbiAgLy8gJ3NlcnZpY2U6cGxhY2VyJzogY2xhc3MgUGxhY2VyVmlld0dyYXBoaWMgZXh0ZW5kcyBTcXVhcmVkVmlldyB7XG4gIC8vICAgY29uc3RydWN0b3IoKSB7XG4gIC8vICAgICBzdXBlcigpO1xuXG4gIC8vICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAvLyAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1zcXVhcmUgZmxleC1taWRkbGVcIj5cbiAgLy8gICAgICAgICA8JSBpZiAocmVqZWN0ZWQpIHsgJT5cbiAgLy8gICAgICAgICA8ZGl2IGNsYXNzPVwiZml0LWNvbnRhaW5lciBmbGV4LW1pZGRsZVwiPlxuICAvLyAgICAgICAgICAgPHA+PCU9IHJlamVjdCAlPjwvcD5cbiAgLy8gICAgICAgICA8L2Rpdj5cbiAgLy8gICAgICAgICA8JSB9ICU+XG4gIC8vICAgICAgIDwvZGl2PlxuICAvLyAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1mbG9hdCBmbGV4LW1pZGRsZVwiPlxuICAvLyAgICAgICAgIDwlIGlmICghcmVqZWN0ZWQpIHsgJT5cbiAgLy8gICAgICAgICAgIDwlIGlmIChzaG93QnRuKSB7ICU+XG4gIC8vICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIj48JT0gc2VuZCAlPjwvYnV0dG9uPlxuICAvLyAgICAgICAgICAgPCUgfSAlPlxuICAvLyAgICAgICAgIDwlIH0gJT5cbiAgLy8gICAgICAgPC9kaXY+XG4gIC8vICAgICBgO1xuXG4gIC8vICAgICB0aGlzLm1vZGVsID0ge1xuICAvLyAgICAgICBpbnN0cnVjdGlvbnM6ICdTZWxlY3QgeW91ciBwb3NpdGlvbicsXG4gIC8vICAgICAgIHNlbmQ6ICdTZW5kJyxcbiAgLy8gICAgICAgcmVqZWN0OiAnU29ycnksIG5vIHBsYWNlIGlzIGF2YWlsYWJsZScsXG4gIC8vICAgICAgIHNob3dCdG46IGZhbHNlLFxuICAvLyAgICAgICByZWplY3RlZDogZmFsc2UsXG4gIC8vICAgICB9O1xuXG4gIC8vICAgICB0aGlzLl9hcmVhID0gbnVsbDtcbiAgLy8gICAgIHRoaXMuX2Rpc2FibGVkUG9zaXRpb25zID0gW107XG4gIC8vICAgICB0aGlzLl9vblNlbGVjdGlvbkNoYW5nZSA9IHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlLmJpbmQodGhpcyk7XG4gIC8vICAgfVxuXG4gIC8vICAgc2hvdygpIHtcbiAgLy8gICAgIHN1cGVyLnNob3coKTtcbiAgLy8gICAgIHRoaXMuc2VsZWN0b3Iuc2hvdygpO1xuICAvLyAgIH1cblxuICAvLyAgIG9uUmVuZGVyKCkge1xuICAvLyAgICAgc3VwZXIub25SZW5kZXIoKTtcbiAgLy8gICAgIHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tc3F1YXJlJyk7XG4gIC8vICAgfVxuXG4gIC8vICAgb25SZXNpemUodmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIG9yaWVudGF0aW9uKSB7XG4gIC8vICAgICBzdXBlci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuXG4gIC8vICAgICBpZiAodGhpcy5zZWxlY3RvcilcbiAgLy8gICAgICAgdGhpcy5zZWxlY3Rvci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuICAvLyAgIH1cblxuICAvLyAgIF9vblNlbGVjdGlvbkNoYW5nZShlKSB7XG4gIC8vICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuc2VsZWN0b3Iuc2hhcGVQb2ludE1hcC5nZXQoZS50YXJnZXQpO1xuICAvLyAgICAgY29uc3QgZGlzYWJsZWRJbmRleCA9IHRoaXMuX2Rpc2FibGVkUG9zaXRpb25zLmluZGV4T2YocG9zaXRpb24uaW5kZXgpO1xuXG4gIC8vICAgICBpZiAoZGlzYWJsZWRJbmRleCA9PT0gLTEpXG4gIC8vICAgICAgIHRoaXMuX29uU2VsZWN0KHBvc2l0aW9uLmlkLCBwb3NpdGlvbi5sYWJlbCwgW3Bvc2l0aW9uLngsIHBvc2l0aW9uLnldKTtcbiAgLy8gICB9XG5cbiAgLy8gICBzZXRBcmVhKGFyZWEpIHtcbiAgLy8gICAgIHRoaXMuX2FyZWEgPSBhcmVhO1xuICAvLyAgIH1cblxuICAvLyAgIGRpc3BsYXlQb3NpdGlvbnMoY2FwYWNpdHksIGxhYmVscyA9IG51bGwsIGNvb3JkaW5hdGVzID0gbnVsbCwgbWF4Q2xpZW50c1BlclBvc2l0aW9uID0gMSkge1xuICAvLyAgICAgdGhpcy5udW1iZXJQb3NpdGlvbnMgPSBjYXBhY2l0eSAvIG1heENsaWVudHNQZXJQb3NpdGlvbjtcbiAgLy8gICAgIHRoaXMucG9zaXRpb25zID0gW107XG5cbiAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJQb3NpdGlvbnM7IGkrKykge1xuICAvLyAgICAgICBjb25zdCBsYWJlbCA9IGxhYmVscyAhPT0gbnVsbCA/IGxhYmVsc1tpXSA6IChpICsgMSkudG9TdHJpbmcoKTtcbiAgLy8gICAgICAgY29uc3QgcG9zaXRpb24gPSB7IGlkOiBpLCBsYWJlbDogbGFiZWwgfTtcbiAgLy8gICAgICAgY29uc3QgY29vcmRzID0gY29vcmRpbmF0ZXNbaV07XG4gIC8vICAgICAgIHBvc2l0aW9uLnggPSBjb29yZHNbMF07XG4gIC8vICAgICAgIHBvc2l0aW9uLnkgPSBjb29yZHNbMV07XG5cbiAgLy8gICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gIC8vICAgICB9XG5cbiAgLy8gICAgIHRoaXMuc2VsZWN0b3IgPSBuZXcgU3BhY2VWaWV3KCk7XG4gIC8vICAgICB0aGlzLnNlbGVjdG9yLnNldEFyZWEodGhpcy5fYXJlYSk7XG4gIC8vICAgICB0aGlzLnNlbGVjdG9yLnJlbmRlcigpO1xuICAvLyAgICAgdGhpcy5zZWxlY3Rvci5hcHBlbmRUbyh0aGlzLiRzZWxlY3RvckNvbnRhaW5lcik7XG4gIC8vICAgICB0aGlzLnNlbGVjdG9yLm9uUmVuZGVyKCk7XG4gIC8vICAgICB0aGlzLnNlbGVjdG9yLnNldFBvaW50cyh0aGlzLnBvc2l0aW9ucyk7XG5cbiAgLy8gICAgIHRoaXMuc2VsZWN0b3IuaW5zdGFsbEV2ZW50cyh7XG4gIC8vICAgICAgICdjbGljayAucG9pbnQnOiB0aGlzLl9vblNlbGVjdGlvbkNoYW5nZVxuICAvLyAgICAgfSk7XG4gIC8vICAgfVxuXG4gIC8vICAgdXBkYXRlRGlzYWJsZWRQb3NpdGlvbnMoaW5kZXhlcykge1xuICAvLyAgICAgdGhpcy5fZGlzYWJsZWRQb3NpdGlvbnMgPSBpbmRleGVzO1xuXG4gIC8vICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5udW1iZXJQb3NpdGlvbnM7IGluZGV4KyspIHtcbiAgLy8gICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uc1tpbmRleF07XG4gIC8vICAgICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBpbmRleGVzLmluZGV4T2YoaW5kZXgpICE9PSAtMTtcbiAgLy8gICAgICAgcG9zaXRpb24uc2VsZWN0ZWQgPSBpc0Rpc2FibGVkID8gdHJ1ZSA6IGZhbHNlO1xuICAvLyAgICAgICB0aGlzLnNlbGVjdG9yLnVwZGF0ZVBvaW50KHBvc2l0aW9uKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gICBzZXRTZWxlY3RDYWxsYWNrKGNhbGxiYWNrKSB7XG4gIC8vICAgICB0aGlzLl9vblNlbGVjdCA9IGNhbGxiYWNrO1xuICAvLyAgIH1cblxuICAvLyAgIHJlamVjdChkaXNhYmxlZFBvc2l0aW9ucykge1xuICAvLyAgICAgdGhpcy5tb2RlbC5yZWplY3RlZCA9IHRydWU7XG4gIC8vICAgICB0aGlzLnJlbmRlcigpO1xuICAvLyAgIH1cbiAgLy8gfSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUGxhdGZvcm1cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOnBsYXRmb3JtJzogY2xhc3MgUGxhdGZvcm1WaWV3IGV4dGVuZHMgU2VnbWVudGVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8JSBpZiAoaXNDb21wYXRpYmxlID09PSBmYWxzZSkgeyAlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgICAgPHA+PCU9IGVycm9yQ29tcGF0aWJsZU1lc3NhZ2UgJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tXCI+PC9kaXY+XG4gICAgICAgIDwlIH0gZWxzZSBpZiAoaGFzQXV0aG9yaXphdGlvbnMgPT09IGZhbHNlKSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICA8cD48JT0gZXJyb3JIb29rc01lc3NhZ2UgJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tXCI+PC9kaXY+XG4gICAgICAgIDwlIH0gZWxzZSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj48JT0gZ2xvYmFscy50aXRsZSAlPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN1YnRpdGxlXCI+PCU9IGdsb2JhbHMuc3VidGl0bGUgJT48L3NwYW4+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDx1bCBjbGFzcz1cImluc3RydWN0aW9ucyBzb2Z0LWJsaW5rXCI+XG4gICAgICAgICAgICAgICAgPCUgZm9yICh2YXIga2V5IGluIGdsb2JhbHMuaW5zdHJ1Y3Rpb25zKSB7ICU+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJpbnN0cnVjdGlvblwiPjwlPSBnbG9iYWxzLmluc3RydWN0aW9uc1trZXldICU+PC9saT5cbiAgICAgICAgICAgICAgICA8JSB9ICU+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwidXNlLWhlYWRwaG9uZXNcIj48JT0gZ2xvYmFscy51c2VIZWFkcGhvbmVzICU+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgICA8JSBpZiAoY2hlY2tpbmcgPT09IHRydWUpIHsgJT5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwic21hbGwgc29mdC1ibGlua1wiPjwlPSBjaGVja2luZ01lc3NhZ2UgJT48L3A+XG4gICAgICAgICAgICA8JSB9IGVsc2UgaWYgKGhhc0F1dGhvcml6YXRpb25zID09PSB0cnVlKSB7ICU+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInNtYWxsIHNvZnQtYmxpbmtcIj48JT0gZ2xvYmFscy50b3VjaFRvU3RhcnQgJT48L3A+XG4gICAgICAgICAgICA8JSB9ICU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwlIH0gJT5cbiAgICAgIGA7XG5cbiAgICAgIHRoaXMubW9kZWwgPSB7XG4gICAgICAgIGlzQ29tcGF0aWJsZTogbnVsbCxcbiAgICAgICAgaGFzQXV0aG9yaXphdGlvbnM6IG51bGwsXG4gICAgICAgIGNoZWNraW5nOiBmYWxzZSxcbiAgICAgICAgY2hlY2tpbmdNZXNzYWdlOiAnUGxlYXNlIHdhaXQgd2hpbGUgY2hlY2tpbmcgY29tcGF0aWJsaXR5JyxcbiAgICAgICAgZXJyb3JDb21wYXRpYmxlTWVzc2FnZTogJ1NvcnJ5LDxiciAvPllvdXIgZGV2aWNlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIGFwcGxpY2F0aW9uLicsXG4gICAgICAgIGVycm9ySG9va3NNZXNzYWdlOiBgU29ycnksPGJyIC8+VGhlIGFwcGxpY2F0aW9uIGRpZG4ndCBvYnRhaW4gdGhlIG5lY2Vzc2FyeSBhdXRob3JpemF0aW9ucy5gLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5yYXRpb3MgPSB7XG4gICAgICAgICcuc2VjdGlvbi10b3AnOiAwLjIsXG4gICAgICAgICcuc2VjdGlvbi1jZW50ZXInOiAwLjUsXG4gICAgICAgICcuc2VjdGlvbi1ib3R0b20nOiAwLjMsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLl90b3VjaHN0YXJ0Q2FsbGJhY2sgPSBub29wO1xuICAgICAgdGhpcy5fbW91c2Vkb3duQ2FsbGJhY2sgPSBub29wO1xuICAgIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgc3VwZXIub25SZW5kZXIoKTtcblxuICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgJ21vdXNlZG93bic6IChlKSA9PiB0aGlzLl9tb3VzZWRvd25DYWxsYmFjayhlKSxcbiAgICAgICAgJ3RvdWNoc3RhcnQnOiAoZSkgPT4gdGhpcy5fdG91Y2hzdGFydENhbGxiYWNrKGUpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0VG91Y2hTdGFydENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl90b3VjaHN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBzZXRNb3VzZURvd25DYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgdGhpcy5fbW91c2Vkb3duQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICB1cGRhdGVDaGVja2luZ1N0YXR1cyh2YWx1ZSkge1xuICAgICAgdGhpcy5tb2RlbC5jaGVja2luZyA9IHZhbHVlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJc0NvbXBhdGlibGVTdGF0dXModmFsdWUpIHtcbiAgICAgIHRoaXMubW9kZWwuaXNDb21wYXRpYmxlID0gdmFsdWU7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhhc0F1dGhvcml6YXRpb25zU3RhdHVzKHZhbHVlKSB7XG4gICAgICB0aGlzLm1vZGVsLmhhc0F1dGhvcml6YXRpb25zID0gdmFsdWU7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU291bmQtQ2hlY2tcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOnNvdW5kLWNoZWNrJzogY2xhc3MgU291bmRDaGVja1ZpZXcgZXh0ZW5kcyBTZWdtZW50ZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwic21hbGxcIj48JT0gZ2xvYmFscy5xdWVzdGlvbiAlPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjaGVjay15ZXNcIj48JT0gZ2xvYmFscy55ZXMgJT48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbSBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjaGVjay1ub1wiPjwlPSBnbG9iYWxzLm5vICU+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5yYXRpb3MgPSB7XG4gICAgICAgICcuc2VjdGlvbi10b3AnOiAwLjMsXG4gICAgICAgICcuc2VjdGlvbi1jZW50ZXInOiAwLjM1LFxuICAgICAgICAnLnNlY3Rpb24tYm90dG9tJzogMC4zNSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICBzdXBlci5vblJlbmRlcigpO1xuXG4gICAgICB0aGlzLmluc3RhbGxFdmVudHMoe1xuICAgICAgICAnY2xpY2sgLmNoZWNrLXllcyc6ICgpID0+IHRoaXMuX2NoZWNrQ2FsbGJhY2sodHJ1ZSksXG4gICAgICAgICdjbGljayAuY2hlY2stbm8nOiAoKSA9PiB0aGlzLl9jaGVja0NhbGxiYWNrKGZhbHNlKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldENoZWNrQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX2NoZWNrQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gIH0sXG5cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUmF3LVNvY2tldFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgJ3NlcnZpY2U6cmF3LXNvY2tldCc6IGNsYXNzIFJhd1NvY2tldFZpZXcgZXh0ZW5kcyBTZWdtZW50ZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInNvZnQtYmxpbmtcIj48JT0gd2FpdCAlPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgd2FpdDogYE9wZW5pbmcgc29ja2V0LDxiciAvPnN0YW5kIGJ5JmhlbGxpcDtgLFxuICAgICAgfTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN5bmNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOnN5bmMnOiBjbGFzcyBSYXdTb2NrZXRWaWV3IGV4dGVuZHMgU2VnbWVudGVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3BcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzb2Z0LWJsaW5rXCI+PCU9IHdhaXQgJT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b21cIj48L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIHRoaXMubW9kZWwgPSB7XG4gICAgICAgIHdhaXQ6IGBzeW5jaHJvbmlzYXRpb25gLFxuICAgICAgfTtcbiAgICB9XG4gIH0sXG5cblxuICAvLyBwdWJsaWMgQVBJXG4gIGhhcyhpZCkge1xuICAgIHJldHVybiAhIXRoaXNbaWRdO1xuICB9LFxuXG4gIGdldChpZCwgY29uZmlnKSB7XG4gICAgY29uc3QgY3RvciA9IHRoaXNbaWRdO1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgY3RvcigpO1xuICAgIC8vIGFkZGl0aW9ubmFsIGNvbmZpZ3VyYXRpb25cbiAgICB2aWV3Lm1vZGVsLmdsb2JhbHMgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIHZpZXcub3B0aW9ucy5pZCA9IGlkLnJlcGxhY2UoL1xcOi9nLCAnLScpO1xuXG4gICAgcmV0dXJuIHZpZXc7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzZXJ2aWNlVmlld3M7XG4iXX0=