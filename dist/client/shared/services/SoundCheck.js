'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _wavesAudio = require('waves-audio');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVICE_ID = 'service:sound-check';

var SoundCheck = function (_Service) {
  (0, _inherits3.default)(SoundCheck, _Service);

  function SoundCheck() {
    (0, _classCallCheck3.default)(this, SoundCheck);

    // need a server counterpart

    var _this = (0, _possibleConstructorReturn3.default)(this, (SoundCheck.__proto__ || (0, _getPrototypeOf2.default)(SoundCheck)).call(this, SERVICE_ID));

    _this.platform = _this.require('platform');
    _this.audioBufferManager = _this.require('audio-buffer-manager');

    var defaults = {
      viewPriority: 5
    };

    _this.onCheckResult = _this.onCheckResult.bind(_this);

    _this.configure(defaults);
    return _this;
  }

  (0, _createClass3.default)(SoundCheck, [{
    key: 'start',
    value: function start() {
      (0, _get3.default)(SoundCheck.prototype.__proto__ || (0, _getPrototypeOf2.default)(SoundCheck.prototype), 'start', this).call(this);
      this.show();

      this.view.setCheckCallback(this.onCheckResult);

      this.audioStartTime = _wavesAudio.audioContext.currentTime;
      this.dateStartTime = new Date().getTime() / 1000;
      this.deltaStart = this.dateStartTime - this.audioStartTime;

      // play sound and display buttons
      this.testSrc = _wavesAudio.audioContext.createBufferSource();
      this.testSrc.buffer = this.audioBufferManager.data.testFile;
      this.testSrc.connect(_wavesAudio.audioContext.destination);
      this.testSrc.start();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.testSrc.stop();
      this.hide();

      (0, _get3.default)(SoundCheck.prototype.__proto__ || (0, _getPrototypeOf2.default)(SoundCheck.prototype), 'stop', this).call(this);
    }
  }, {
    key: 'onCheckResult',
    value: function onCheckResult(result) {
      var audioStopTime = _wavesAudio.audioContext.currentTime;
      var clockStopTime = new Date().getTime() / 1000;
      var deltaStop = clockStopTime - audioStopTime;

      var results = {
        result: result,
        audioStartTime: this.audioStartTime,
        dateStartTime: this.dateStartTime,
        deltaStart: this.deltaStart,
        audioStopTime: audioStopTime,
        clockStopTime: clockStopTime,
        deltaStop: deltaStop
      };

      this.send('results', results);

      if (result === false) {
        window.location.reload(true);
      } else {
        this.ready();
      }
    }
  }]);
  return SoundCheck;
}(_client.Service);

_client.serviceManager.register(SERVICE_ID, SoundCheck);

exports.default = SoundCheck;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNvdW5kQ2hlY2suanMiXSwibmFtZXMiOlsiU0VSVklDRV9JRCIsIlNvdW5kQ2hlY2siLCJwbGF0Zm9ybSIsInJlcXVpcmUiLCJhdWRpb0J1ZmZlck1hbmFnZXIiLCJkZWZhdWx0cyIsInZpZXdQcmlvcml0eSIsIm9uQ2hlY2tSZXN1bHQiLCJiaW5kIiwiY29uZmlndXJlIiwic2hvdyIsInZpZXciLCJzZXRDaGVja0NhbGxiYWNrIiwiYXVkaW9TdGFydFRpbWUiLCJhdWRpb0NvbnRleHQiLCJjdXJyZW50VGltZSIsImRhdGVTdGFydFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImRlbHRhU3RhcnQiLCJ0ZXN0U3JjIiwiY3JlYXRlQnVmZmVyU291cmNlIiwiYnVmZmVyIiwiZGF0YSIsInRlc3RGaWxlIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwic3RhcnQiLCJzdG9wIiwiaGlkZSIsInJlc3VsdCIsImF1ZGlvU3RvcFRpbWUiLCJjbG9ja1N0b3BUaW1lIiwiZGVsdGFTdG9wIiwicmVzdWx0cyIsInNlbmQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsInJlYWR5IiwiU2VydmljZSIsInNlcnZpY2VNYW5hZ2VyIiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUEsYUFBYSxxQkFBbkI7O0lBRU1DLFU7OztBQUNKLHdCQUFjO0FBQUE7O0FBQ087O0FBRFAsOElBQ05ELFVBRE07O0FBR1osVUFBS0UsUUFBTCxHQUFnQixNQUFLQyxPQUFMLENBQWEsVUFBYixDQUFoQjtBQUNBLFVBQUtDLGtCQUFMLEdBQTBCLE1BQUtELE9BQUwsQ0FBYSxzQkFBYixDQUExQjs7QUFFQSxRQUFNRSxXQUFXO0FBQ2ZDLG9CQUFjO0FBREMsS0FBakI7O0FBSUEsVUFBS0MsYUFBTCxHQUFxQixNQUFLQSxhQUFMLENBQW1CQyxJQUFuQixPQUFyQjs7QUFFQSxVQUFLQyxTQUFMLENBQWVKLFFBQWY7QUFaWTtBQWFiOzs7OzRCQUVPO0FBQ047QUFDQSxXQUFLSyxJQUFMOztBQUVBLFdBQUtDLElBQUwsQ0FBVUMsZ0JBQVYsQ0FBMkIsS0FBS0wsYUFBaEM7O0FBRUEsV0FBS00sY0FBTCxHQUFzQkMseUJBQWFDLFdBQW5DO0FBQ0EsV0FBS0MsYUFBTCxHQUFxQixJQUFJQyxJQUFKLEdBQVdDLE9BQVgsS0FBdUIsSUFBNUM7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLEtBQUtILGFBQUwsR0FBcUIsS0FBS0gsY0FBNUM7O0FBRUE7QUFDQSxXQUFLTyxPQUFMLEdBQWVOLHlCQUFhTyxrQkFBYixFQUFmO0FBQ0EsV0FBS0QsT0FBTCxDQUFhRSxNQUFiLEdBQXNCLEtBQUtsQixrQkFBTCxDQUF3Qm1CLElBQXhCLENBQTZCQyxRQUFuRDtBQUNBLFdBQUtKLE9BQUwsQ0FBYUssT0FBYixDQUFxQlgseUJBQWFZLFdBQWxDO0FBQ0EsV0FBS04sT0FBTCxDQUFhTyxLQUFiO0FBQ0Q7OzsyQkFFTTtBQUNMLFdBQUtQLE9BQUwsQ0FBYVEsSUFBYjtBQUNBLFdBQUtDLElBQUw7O0FBRUE7QUFDRDs7O2tDQUVhQyxNLEVBQVE7QUFDcEIsVUFBTUMsZ0JBQWdCakIseUJBQWFDLFdBQW5DO0FBQ0EsVUFBTWlCLGdCQUFnQixJQUFJZixJQUFKLEdBQVdDLE9BQVgsS0FBdUIsSUFBN0M7QUFDQSxVQUFNZSxZQUFZRCxnQkFBZ0JELGFBQWxDOztBQUVBLFVBQU1HLFVBQVU7QUFDZEosc0JBRGM7QUFFZGpCLHdCQUFnQixLQUFLQSxjQUZQO0FBR2RHLHVCQUFlLEtBQUtBLGFBSE47QUFJZEcsb0JBQVksS0FBS0EsVUFKSDtBQUtkWSxvQ0FMYztBQU1kQyxvQ0FOYztBQU9kQztBQVBjLE9BQWhCOztBQVVBLFdBQUtFLElBQUwsQ0FBVSxTQUFWLEVBQXFCRCxPQUFyQjs7QUFFQSxVQUFJSixXQUFXLEtBQWYsRUFBc0I7QUFDcEJNLGVBQU9DLFFBQVAsQ0FBZ0JDLE1BQWhCLENBQXVCLElBQXZCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS0MsS0FBTDtBQUNEO0FBQ0Y7OztFQTlEc0JDLGU7O0FBaUV6QkMsdUJBQWVDLFFBQWYsQ0FBd0IxQyxVQUF4QixFQUFvQ0MsVUFBcEM7O2tCQUVlQSxVIiwiZmlsZSI6IlNvdW5kQ2hlY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2aWNlLCBzZXJ2aWNlTWFuYWdlciB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmltcG9ydCB7wqBhdWRpb0NvbnRleHQgfSBmcm9tICd3YXZlcy1hdWRpbyc7XG5cbmNvbnN0IFNFUlZJQ0VfSUQgPSAnc2VydmljZTpzb3VuZC1jaGVjayc7XG5cbmNsYXNzIFNvdW5kQ2hlY2sgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoU0VSVklDRV9JRCk7IC8vIG5lZWQgYSBzZXJ2ZXIgY291bnRlcnBhcnRcblxuICAgIHRoaXMucGxhdGZvcm0gPSB0aGlzLnJlcXVpcmUoJ3BsYXRmb3JtJyk7XG4gICAgdGhpcy5hdWRpb0J1ZmZlck1hbmFnZXIgPSB0aGlzLnJlcXVpcmUoJ2F1ZGlvLWJ1ZmZlci1tYW5hZ2VyJyk7XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHZpZXdQcmlvcml0eTogNSxcbiAgICB9XG5cbiAgICB0aGlzLm9uQ2hlY2tSZXN1bHQgPSB0aGlzLm9uQ2hlY2tSZXN1bHQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuY29uZmlndXJlKGRlZmF1bHRzKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgdGhpcy5zaG93KCk7XG5cbiAgICB0aGlzLnZpZXcuc2V0Q2hlY2tDYWxsYmFjayh0aGlzLm9uQ2hlY2tSZXN1bHQpO1xuXG4gICAgdGhpcy5hdWRpb1N0YXJ0VGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcbiAgICB0aGlzLmRhdGVTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XG4gICAgdGhpcy5kZWx0YVN0YXJ0ID0gdGhpcy5kYXRlU3RhcnRUaW1lIC0gdGhpcy5hdWRpb1N0YXJ0VGltZTtcblxuICAgIC8vIHBsYXkgc291bmQgYW5kIGRpc3BsYXkgYnV0dG9uc1xuICAgIHRoaXMudGVzdFNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICB0aGlzLnRlc3RTcmMuYnVmZmVyID0gdGhpcy5hdWRpb0J1ZmZlck1hbmFnZXIuZGF0YS50ZXN0RmlsZTtcbiAgICB0aGlzLnRlc3RTcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHRoaXMudGVzdFNyYy5zdGFydCgpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnRlc3RTcmMuc3RvcCgpO1xuICAgIHRoaXMuaGlkZSgpO1xuXG4gICAgc3VwZXIuc3RvcCgpO1xuICB9XG5cbiAgb25DaGVja1Jlc3VsdChyZXN1bHQpIHtcbiAgICBjb25zdCBhdWRpb1N0b3BUaW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuICAgIGNvbnN0IGNsb2NrU3RvcFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XG4gICAgY29uc3QgZGVsdGFTdG9wID0gY2xvY2tTdG9wVGltZSAtIGF1ZGlvU3RvcFRpbWU7XG5cbiAgICBjb25zdCByZXN1bHRzID0ge1xuICAgICAgcmVzdWx0LFxuICAgICAgYXVkaW9TdGFydFRpbWU6IHRoaXMuYXVkaW9TdGFydFRpbWUsXG4gICAgICBkYXRlU3RhcnRUaW1lOiB0aGlzLmRhdGVTdGFydFRpbWUsXG4gICAgICBkZWx0YVN0YXJ0OiB0aGlzLmRlbHRhU3RhcnQsXG4gICAgICBhdWRpb1N0b3BUaW1lLFxuICAgICAgY2xvY2tTdG9wVGltZSxcbiAgICAgIGRlbHRhU3RvcCxcbiAgICB9XG5cbiAgICB0aGlzLnNlbmQoJ3Jlc3VsdHMnLCByZXN1bHRzKTtcblxuICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlYWR5KCk7XG4gICAgfVxuICB9XG59XG5cbnNlcnZpY2VNYW5hZ2VyLnJlZ2lzdGVyKFNFUlZJQ0VfSUQsIFNvdW5kQ2hlY2spO1xuXG5leHBvcnQgZGVmYXVsdCBTb3VuZENoZWNrO1xuIl19