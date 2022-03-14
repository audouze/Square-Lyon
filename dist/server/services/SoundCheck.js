'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _server = require('soundworks/server');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVICE_ID = 'service:sound-check';

var SoundCheck = function (_Service) {
  (0, _inherits3.default)(SoundCheck, _Service);

  function SoundCheck() {
    (0, _classCallCheck3.default)(this, SoundCheck);
    return (0, _possibleConstructorReturn3.default)(this, (SoundCheck.__proto__ || (0, _getPrototypeOf2.default)(SoundCheck)).call(this, SERVICE_ID)); // need a server counterpart
  }

  (0, _createClass3.default)(SoundCheck, [{
    key: 'start',
    value: function start() {
      (0, _get3.default)(SoundCheck.prototype.__proto__ || (0, _getPrototypeOf2.default)(SoundCheck.prototype), 'start', this).call(this);

      this.ready();
    }
  }, {
    key: 'stop',
    value: function stop() {
      (0, _get3.default)(SoundCheck.prototype.__proto__ || (0, _getPrototypeOf2.default)(SoundCheck.prototype), 'stop', this).call(this);
    }
  }, {
    key: 'connect',
    value: function connect(client) {
      this.receive(client, 'results', function (results) {
        _fs2.default.appendFileSync('sound-check-results.txt', (0, _stringify2.default)(results) + '\n');
      });
    }
  }]);
  return SoundCheck;
}(_server.Service);

_server.serviceManager.register(SERVICE_ID, SoundCheck);

exports.default = SoundCheck;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNvdW5kQ2hlY2suanMiXSwibmFtZXMiOlsiU0VSVklDRV9JRCIsIlNvdW5kQ2hlY2siLCJyZWFkeSIsImNsaWVudCIsInJlY2VpdmUiLCJyZXN1bHRzIiwiZnMiLCJhcHBlbmRGaWxlU3luYyIsIlNlcnZpY2UiLCJzZXJ2aWNlTWFuYWdlciIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGFBQWEscUJBQW5COztJQUVNQyxVOzs7QUFDSix3QkFBYztBQUFBO0FBQUEseUlBQ05ELFVBRE0sSUFDTztBQUNwQjs7Ozs0QkFFTztBQUNOOztBQUVBLFdBQUtFLEtBQUw7QUFDRDs7OzJCQUVNO0FBQ0w7QUFDRDs7OzRCQUVPQyxNLEVBQVE7QUFDZCxXQUFLQyxPQUFMLENBQWFELE1BQWIsRUFBcUIsU0FBckIsRUFBZ0MsVUFBQ0UsT0FBRCxFQUFhO0FBQzNDQyxxQkFBR0MsY0FBSCxDQUFrQix5QkFBbEIsRUFBNkMseUJBQWVGLE9BQWYsSUFBMEIsSUFBdkU7QUFDRCxPQUZEO0FBR0Q7OztFQW5Cc0JHLGU7O0FBc0J6QkMsdUJBQWVDLFFBQWYsQ0FBd0JWLFVBQXhCLEVBQW9DQyxVQUFwQzs7a0JBRWVBLFUiLCJmaWxlIjoiU291bmRDaGVjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2UsIHNlcnZpY2VNYW5hZ2VyIH0gZnJvbSAnc291bmR3b3Jrcy9zZXJ2ZXInO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuY29uc3QgU0VSVklDRV9JRCA9ICdzZXJ2aWNlOnNvdW5kLWNoZWNrJztcblxuY2xhc3MgU291bmRDaGVjayBleHRlbmRzIFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihTRVJWSUNFX0lEKTsgLy8gbmVlZCBhIHNlcnZlciBjb3VudGVycGFydFxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTtcblxuICAgIHRoaXMucmVhZHkoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgc3VwZXIuc3RvcCgpO1xuICB9XG5cbiAgY29ubmVjdChjbGllbnQpIHtcbiAgICB0aGlzLnJlY2VpdmUoY2xpZW50LCAncmVzdWx0cycsIChyZXN1bHRzKSA9PiB7XG4gICAgICBmcy5hcHBlbmRGaWxlU3luYygnc291bmQtY2hlY2stcmVzdWx0cy50eHQnLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzKSArICdcXG4nKTtcbiAgICB9KTtcbiAgfVxufVxuXG5zZXJ2aWNlTWFuYWdlci5yZWdpc3RlcihTRVJWSUNFX0lELCBTb3VuZENoZWNrKTtcblxuZXhwb3J0IGRlZmF1bHQgU291bmRDaGVjaztcbiJdfQ==