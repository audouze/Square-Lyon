'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _client = require('soundworks/client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimplePlayer = function () {
  function SimplePlayer(bufferList) {
    (0, _classCallCheck3.default)(this, SimplePlayer);

    this.bufferList = bufferList;
  }

  // connect(destination) {}

  (0, _createClass3.default)(SimplePlayer, [{
    key: 'trigger',
    value: function trigger(bufferId) {
      var buffer = this.bufferList[bufferId];

      var src = _client.audioContext.createBufferSource();
      src.connect(_client.audioContext.destination);
      src.buffer = buffer;
      src.start(_client.audioContext.currentTime);
    }
  }]);
  return SimplePlayer;
}();

exports.default = SimplePlayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVBsYXllci5qcyJdLCJuYW1lcyI6WyJTaW1wbGVQbGF5ZXIiLCJidWZmZXJMaXN0IiwiYnVmZmVySWQiLCJidWZmZXIiLCJzcmMiLCJhdWRpb0NvbnRleHQiLCJjcmVhdGVCdWZmZXJTb3VyY2UiLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJzdGFydCIsImN1cnJlbnRUaW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBRU1BLFk7QUFDSix3QkFBWUMsVUFBWixFQUF3QjtBQUFBOztBQUN0QixTQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUNEOztBQUVEOzs7OzRCQUVRQyxRLEVBQVU7QUFDaEIsVUFBTUMsU0FBUyxLQUFLRixVQUFMLENBQWdCQyxRQUFoQixDQUFmOztBQUVBLFVBQU1FLE1BQU1DLHFCQUFhQyxrQkFBYixFQUFaO0FBQ0FGLFVBQUlHLE9BQUosQ0FBWUYscUJBQWFHLFdBQXpCO0FBQ0FKLFVBQUlELE1BQUosR0FBYUEsTUFBYjtBQUNBQyxVQUFJSyxLQUFKLENBQVVKLHFCQUFhSyxXQUF2QjtBQUNEOzs7OztrQkFHWVYsWSIsImZpbGUiOiJTaW1wbGVQbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdWRpb0NvbnRleHQgfSBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbmNsYXNzIFNpbXBsZVBsYXllciB7XG4gIGNvbnN0cnVjdG9yKGJ1ZmZlckxpc3QpIHtcbiAgICB0aGlzLmJ1ZmZlckxpc3QgPSBidWZmZXJMaXN0O1xuICB9XG5cbiAgLy8gY29ubmVjdChkZXN0aW5hdGlvbikge31cblxuICB0cmlnZ2VyKGJ1ZmZlcklkKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXJMaXN0W2J1ZmZlcklkXTtcblxuICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHNyYy5idWZmZXIgPSBidWZmZXI7XG4gICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlUGxheWVyO1xuIl19