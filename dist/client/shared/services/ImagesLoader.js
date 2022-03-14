'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var SERVICE_ID = 'service:images-loader';

function prefixPaths(pathList, prefix) {
  // test absolute urls (or protocol relative)
  var isAbsolute = /^https?:\/\/|^\/\//i;

  pathList = pathList.map(function (path) {
    if (isAbsolute.test(path) || prefix === '/') return path;else return prefix + path;
  });

  return pathList;
}

var ImagesLoader = function (_Service) {
  (0, _inherits3.default)(ImagesLoader, _Service);

  function ImagesLoader() {
    (0, _classCallCheck3.default)(this, ImagesLoader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImagesLoader.__proto__ || (0, _getPrototypeOf2.default)(ImagesLoader)).call(this, SERVICE_ID, false));

    var defaults = {
      files: [],
      viewPriority: 3,
      assetsDomain: ''
    };

    _this.configure(defaults);
    return _this;
  }

  (0, _createClass3.default)(ImagesLoader, [{
    key: 'start',
    value: function start() {
      (0, _get3.default)(ImagesLoader.prototype.__proto__ || (0, _getPrototypeOf2.default)(ImagesLoader.prototype), 'start', this).call(this);
      this.show();

      this.loadImages();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.hide();
      (0, _get3.default)(ImagesLoader.prototype.__proto__ || (0, _getPrototypeOf2.default)(ImagesLoader.prototype), 'stop', this).call(this);
    }
  }, {
    key: 'loadImages',
    value: function loadImages() {
      var _this2 = this;

      var images = prefixPaths(this.options.files, this.options.assetsDomain);

      var promises = images.map(function (src) {
        return new _promise2.default(function (resolve, reject) {
          var $img = new Image();
          $img.src = src;
          $img.onload = function () {
            return resolve();
          };
        });
      });

      _promise2.default.all(promises).then(function () {
        return _this2.ready();
      });
    }
  }]);
  return ImagesLoader;
}(_client.Service);

_client.serviceManager.register(SERVICE_ID, ImagesLoader);

exports.default = ImagesLoader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkltYWdlc0xvYWRlci5qcyJdLCJuYW1lcyI6WyJTRVJWSUNFX0lEIiwicHJlZml4UGF0aHMiLCJwYXRoTGlzdCIsInByZWZpeCIsImlzQWJzb2x1dGUiLCJtYXAiLCJwYXRoIiwidGVzdCIsIkltYWdlc0xvYWRlciIsImRlZmF1bHRzIiwiZmlsZXMiLCJ2aWV3UHJpb3JpdHkiLCJhc3NldHNEb21haW4iLCJjb25maWd1cmUiLCJzaG93IiwibG9hZEltYWdlcyIsImhpZGUiLCJpbWFnZXMiLCJvcHRpb25zIiwicHJvbWlzZXMiLCJyZXNvbHZlIiwicmVqZWN0IiwiJGltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwiYWxsIiwidGhlbiIsInJlYWR5IiwiU2VydmljZSIsInNlcnZpY2VNYW5hZ2VyIiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLGFBQWEsdUJBQW5COztBQUdBLFNBQVNDLFdBQVQsQ0FBcUJDLFFBQXJCLEVBQStCQyxNQUEvQixFQUF1QztBQUNyQztBQUNBLE1BQU1DLGFBQWEscUJBQW5COztBQUVBRixhQUFXQSxTQUFTRyxHQUFULENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ2hDLFFBQUlGLFdBQVdHLElBQVgsQ0FBZ0JELElBQWhCLEtBQXlCSCxXQUFXLEdBQXhDLEVBQ0UsT0FBT0csSUFBUCxDQURGLEtBR0UsT0FBT0gsU0FBU0csSUFBaEI7QUFDSCxHQUxVLENBQVg7O0FBT0EsU0FBT0osUUFBUDtBQUNEOztJQUdLTSxZOzs7QUFDSiwwQkFBYztBQUFBOztBQUFBLGtKQUNOUixVQURNLEVBQ00sS0FETjs7QUFHWixRQUFNUyxXQUFXO0FBQ2ZDLGFBQU8sRUFEUTtBQUVmQyxvQkFBYyxDQUZDO0FBR2ZDLG9CQUFjO0FBSEMsS0FBakI7O0FBTUEsVUFBS0MsU0FBTCxDQUFlSixRQUFmO0FBVFk7QUFVYjs7Ozs0QkFFTztBQUNOO0FBQ0EsV0FBS0ssSUFBTDs7QUFFQSxXQUFLQyxVQUFMO0FBQ0Q7OzsyQkFFTTtBQUNMLFdBQUtDLElBQUw7QUFDQTtBQUNEOzs7aUNBRVk7QUFBQTs7QUFDWCxVQUFNQyxTQUFTaEIsWUFBWSxLQUFLaUIsT0FBTCxDQUFhUixLQUF6QixFQUFnQyxLQUFLUSxPQUFMLENBQWFOLFlBQTdDLENBQWY7O0FBRUEsVUFBTU8sV0FBV0YsT0FBT1osR0FBUCxDQUFXLGVBQU87QUFDakMsZUFBTyxzQkFBWSxVQUFDZSxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsY0FBTUMsT0FBTyxJQUFJQyxLQUFKLEVBQWI7QUFDQUQsZUFBS0UsR0FBTCxHQUFXQSxHQUFYO0FBQ0FGLGVBQUtHLE1BQUwsR0FBYztBQUFBLG1CQUFNTCxTQUFOO0FBQUEsV0FBZDtBQUNELFNBSk0sQ0FBUDtBQUtELE9BTmdCLENBQWpCOztBQVFBLHdCQUFRTSxHQUFSLENBQVlQLFFBQVosRUFBc0JRLElBQXRCLENBQTJCO0FBQUEsZUFBTSxPQUFLQyxLQUFMLEVBQU47QUFBQSxPQUEzQjtBQUNEOzs7RUFyQ3dCQyxlOztBQXdDM0JDLHVCQUFlQyxRQUFmLENBQXdCL0IsVUFBeEIsRUFBb0NRLFlBQXBDOztrQkFFZUEsWSIsImZpbGUiOiJJbWFnZXNMb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2aWNlLCBzZXJ2aWNlTWFuYWdlciB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuY29uc3QgU0VSVklDRV9JRCA9ICdzZXJ2aWNlOmltYWdlcy1sb2FkZXInO1xuXG5cbmZ1bmN0aW9uIHByZWZpeFBhdGhzKHBhdGhMaXN0LCBwcmVmaXgpIHtcbiAgLy8gdGVzdCBhYnNvbHV0ZSB1cmxzIChvciBwcm90b2NvbCByZWxhdGl2ZSlcbiAgY29uc3QgaXNBYnNvbHV0ZSA9IC9eaHR0cHM/OlxcL1xcL3xeXFwvXFwvL2k7XG5cbiAgcGF0aExpc3QgPSBwYXRoTGlzdC5tYXAoKHBhdGgpID0+IHtcbiAgICBpZiAoaXNBYnNvbHV0ZS50ZXN0KHBhdGgpIHx8IHByZWZpeCA9PT0gJy8nKVxuICAgICAgcmV0dXJuIHBhdGg7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHByZWZpeCArIHBhdGg7XG4gIH0pO1xuXG4gIHJldHVybiBwYXRoTGlzdDtcbn1cblxuXG5jbGFzcyBJbWFnZXNMb2FkZXIgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoU0VSVklDRV9JRCwgZmFsc2UpO1xuXG4gICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICBmaWxlczogW10sXG4gICAgICB2aWV3UHJpb3JpdHk6IDMsXG4gICAgICBhc3NldHNEb21haW46ICcnLFxuICAgIH07XG5cbiAgICB0aGlzLmNvbmZpZ3VyZShkZWZhdWx0cyk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpO1xuICAgIHRoaXMuc2hvdygpO1xuXG4gICAgdGhpcy5sb2FkSW1hZ2VzKCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuaGlkZSgpO1xuICAgIHN1cGVyLnN0b3AoKTtcbiAgfVxuXG4gIGxvYWRJbWFnZXMoKSB7XG4gICAgY29uc3QgaW1hZ2VzID0gcHJlZml4UGF0aHModGhpcy5vcHRpb25zLmZpbGVzLCB0aGlzLm9wdGlvbnMuYXNzZXRzRG9tYWluKTtcblxuICAgIGNvbnN0IHByb21pc2VzID0gaW1hZ2VzLm1hcChzcmMgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgJGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAkaW1nLnNyYyA9IHNyYztcbiAgICAgICAgJGltZy5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHRoaXMucmVhZHkoKSk7XG4gIH1cbn1cblxuc2VydmljZU1hbmFnZXIucmVnaXN0ZXIoU0VSVklDRV9JRCwgSW1hZ2VzTG9hZGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VzTG9hZGVyO1xuIl19