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

var StereoPanner = function () {
  function StereoPanner() {
    (0, _classCallCheck3.default)(this, StereoPanner);

    // locals
    this.inversed = false;

    // init channel splitter / merger used in audio panning
    this.splitter = _client.audioContext.createChannelSplitter(2);
    this.merger = _client.audioContext.createChannelMerger(2);
    this.gainLL = _client.audioContext.createGain();
    this.gainLR = _client.audioContext.createGain();
    this.gainRL = _client.audioContext.createGain();
    this.gainRR = _client.audioContext.createGain();
    this.gainLL.gain.value = 1.0;
    this.gainLR.gain.value = 0.0;
    this.gainRL.gain.value = 0.0;
    this.gainRR.gain.value = 1.0;

    // connect graph
    this.splitter.connect(this.gainLL, 0);
    this.splitter.connect(this.gainLR, 0);
    this.splitter.connect(this.gainRL, 1);
    this.splitter.connect(this.gainRR, 1);

    this.gainLL.connect(this.merger, 0, 0);
    this.gainLR.connect(this.merger, 0, 1);
    this.gainRL.connect(this.merger, 0, 0);
    this.gainRR.connect(this.merger, 0, 1);
  }

  (0, _createClass3.default)(StereoPanner, [{
    key: 'connect',
    value: function connect(audioNode) {
      this.merger.connect(audioNode);
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      this.merger.disconnect();
    }
  }, {
    key: 'inverseChannels',
    value: function inverseChannels(onOff) {
      if (onOff && !this.inversed) {
        this.rampGain(this.gainLL, 0);
        this.rampGain(this.gainLR, 1);
        this.rampGain(this.gainRL, 1);
        this.rampGain(this.gainRR, 0);
        this.inversed = true;
      } else if (!onOff && this.inversed) {
        this.rampGain(this.gainLL, 1);
        this.rampGain(this.gainLR, 0);
        this.rampGain(this.gainRL, 0);
        this.rampGain(this.gainRR, 1);
        this.inversed = false;
      }
    }
  }, {
    key: 'rampGain',
    value: function rampGain(gNode, oneZero) {
      var rampDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4.0;

      // handle envelope
      var now = _client.audioContext.currentTime;
      gNode.gain.cancelScheduledValues(now);
      gNode.gain.setValueAtTime(gNode.gain.value, now);
      gNode.gain.linearRampToValueAtTime(oneZero, now + rampDuration);
    }
  }, {
    key: 'input',
    get: function get() {
      return this.splitter;
    }
  }]);
  return StereoPanner;
}();

exports.default = StereoPanner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0ZXJlb1Bhbm5lci5qcyJdLCJuYW1lcyI6WyJTdGVyZW9QYW5uZXIiLCJpbnZlcnNlZCIsInNwbGl0dGVyIiwiYXVkaW9Db250ZXh0IiwiY3JlYXRlQ2hhbm5lbFNwbGl0dGVyIiwibWVyZ2VyIiwiY3JlYXRlQ2hhbm5lbE1lcmdlciIsImdhaW5MTCIsImNyZWF0ZUdhaW4iLCJnYWluTFIiLCJnYWluUkwiLCJnYWluUlIiLCJnYWluIiwidmFsdWUiLCJjb25uZWN0IiwiYXVkaW9Ob2RlIiwiZGlzY29ubmVjdCIsIm9uT2ZmIiwicmFtcEdhaW4iLCJnTm9kZSIsIm9uZVplcm8iLCJyYW1wRHVyYXRpb24iLCJub3ciLCJjdXJyZW50VGltZSIsImNhbmNlbFNjaGVkdWxlZFZhbHVlcyIsInNldFZhbHVlQXRUaW1lIiwibGluZWFyUmFtcFRvVmFsdWVBdFRpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFTUEsWTtBQUNKLDBCQUFjO0FBQUE7O0FBQ1o7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCOztBQUVBO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkMscUJBQWFDLHFCQUFiLENBQW1DLENBQW5DLENBQWhCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjRixxQkFBYUcsbUJBQWIsQ0FBaUMsQ0FBakMsQ0FBZDtBQUNBLFNBQUtDLE1BQUwsR0FBY0oscUJBQWFLLFVBQWIsRUFBZDtBQUNBLFNBQUtDLE1BQUwsR0FBY04scUJBQWFLLFVBQWIsRUFBZDtBQUNBLFNBQUtFLE1BQUwsR0FBY1AscUJBQWFLLFVBQWIsRUFBZDtBQUNBLFNBQUtHLE1BQUwsR0FBY1IscUJBQWFLLFVBQWIsRUFBZDtBQUNBLFNBQUtELE1BQUwsQ0FBWUssSUFBWixDQUFpQkMsS0FBakIsR0FBeUIsR0FBekI7QUFDQSxTQUFLSixNQUFMLENBQVlHLElBQVosQ0FBaUJDLEtBQWpCLEdBQXlCLEdBQXpCO0FBQ0EsU0FBS0gsTUFBTCxDQUFZRSxJQUFaLENBQWlCQyxLQUFqQixHQUF5QixHQUF6QjtBQUNBLFNBQUtGLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkMsS0FBakIsR0FBeUIsR0FBekI7O0FBRUE7QUFDQSxTQUFLWCxRQUFMLENBQWNZLE9BQWQsQ0FBc0IsS0FBS1AsTUFBM0IsRUFBbUMsQ0FBbkM7QUFDQSxTQUFLTCxRQUFMLENBQWNZLE9BQWQsQ0FBc0IsS0FBS0wsTUFBM0IsRUFBbUMsQ0FBbkM7QUFDQSxTQUFLUCxRQUFMLENBQWNZLE9BQWQsQ0FBc0IsS0FBS0osTUFBM0IsRUFBbUMsQ0FBbkM7QUFDQSxTQUFLUixRQUFMLENBQWNZLE9BQWQsQ0FBc0IsS0FBS0gsTUFBM0IsRUFBbUMsQ0FBbkM7O0FBRUEsU0FBS0osTUFBTCxDQUFZTyxPQUFaLENBQW9CLEtBQUtULE1BQXpCLEVBQWlDLENBQWpDLEVBQW9DLENBQXBDO0FBQ0EsU0FBS0ksTUFBTCxDQUFZSyxPQUFaLENBQW9CLEtBQUtULE1BQXpCLEVBQWlDLENBQWpDLEVBQW9DLENBQXBDO0FBQ0EsU0FBS0ssTUFBTCxDQUFZSSxPQUFaLENBQW9CLEtBQUtULE1BQXpCLEVBQWlDLENBQWpDLEVBQW9DLENBQXBDO0FBQ0EsU0FBS00sTUFBTCxDQUFZRyxPQUFaLENBQW9CLEtBQUtULE1BQXpCLEVBQWlDLENBQWpDLEVBQW9DLENBQXBDO0FBQ0Q7Ozs7NEJBTU9VLFMsRUFBVztBQUNqQixXQUFLVixNQUFMLENBQVlTLE9BQVosQ0FBb0JDLFNBQXBCO0FBQ0Q7OztpQ0FFWTtBQUNYLFdBQUtWLE1BQUwsQ0FBWVcsVUFBWjtBQUNEOzs7b0NBRWVDLEssRUFBTztBQUNyQixVQUFJQSxTQUFTLENBQUMsS0FBS2hCLFFBQW5CLEVBQTZCO0FBQzNCLGFBQUtpQixRQUFMLENBQWMsS0FBS1gsTUFBbkIsRUFBMkIsQ0FBM0I7QUFDQSxhQUFLVyxRQUFMLENBQWMsS0FBS1QsTUFBbkIsRUFBMkIsQ0FBM0I7QUFDQSxhQUFLUyxRQUFMLENBQWMsS0FBS1IsTUFBbkIsRUFBMkIsQ0FBM0I7QUFDQSxhQUFLUSxRQUFMLENBQWMsS0FBS1AsTUFBbkIsRUFBMkIsQ0FBM0I7QUFDQSxhQUFLVixRQUFMLEdBQWdCLElBQWhCO0FBQ0QsT0FORCxNQU1PLElBQUksQ0FBQ2dCLEtBQUQsSUFBVSxLQUFLaEIsUUFBbkIsRUFBNkI7QUFDbEMsYUFBS2lCLFFBQUwsQ0FBYyxLQUFLWCxNQUFuQixFQUEyQixDQUEzQjtBQUNBLGFBQUtXLFFBQUwsQ0FBYyxLQUFLVCxNQUFuQixFQUEyQixDQUEzQjtBQUNBLGFBQUtTLFFBQUwsQ0FBYyxLQUFLUixNQUFuQixFQUEyQixDQUEzQjtBQUNBLGFBQUtRLFFBQUwsQ0FBYyxLQUFLUCxNQUFuQixFQUEyQixDQUEzQjtBQUNBLGFBQUtWLFFBQUwsR0FBZ0IsS0FBaEI7QUFDRDtBQUNGOzs7NkJBRVFrQixLLEVBQU9DLE8sRUFBNkI7QUFBQSxVQUFwQkMsWUFBb0IsdUVBQUwsR0FBSzs7QUFDM0M7QUFDQSxVQUFJQyxNQUFNbkIscUJBQWFvQixXQUF2QjtBQUNBSixZQUFNUCxJQUFOLENBQVdZLHFCQUFYLENBQWlDRixHQUFqQztBQUNBSCxZQUFNUCxJQUFOLENBQVdhLGNBQVgsQ0FBMEJOLE1BQU1QLElBQU4sQ0FBV0MsS0FBckMsRUFBNENTLEdBQTVDO0FBQ0FILFlBQU1QLElBQU4sQ0FBV2MsdUJBQVgsQ0FBbUNOLE9BQW5DLEVBQTRDRSxNQUFNRCxZQUFsRDtBQUNEOzs7d0JBbENXO0FBQ1YsYUFBTyxLQUFLbkIsUUFBWjtBQUNEOzs7OztrQkFtQ1lGLFkiLCJmaWxlIjoiU3RlcmVvUGFubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXVkaW9Db250ZXh0IH0gZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG5jbGFzcyBTdGVyZW9QYW5uZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBsb2NhbHNcbiAgICB0aGlzLmludmVyc2VkID0gZmFsc2U7XG5cbiAgICAvLyBpbml0IGNoYW5uZWwgc3BsaXR0ZXIgLyBtZXJnZXIgdXNlZCBpbiBhdWRpbyBwYW5uaW5nXG4gICAgdGhpcy5zcGxpdHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVDaGFubmVsU3BsaXR0ZXIoMik7XG4gICAgdGhpcy5tZXJnZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQ2hhbm5lbE1lcmdlcigyKTtcbiAgICB0aGlzLmdhaW5MTCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5nYWluTFIgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIHRoaXMuZ2FpblJMID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLmdhaW5SUiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5nYWluTEwuZ2Fpbi52YWx1ZSA9IDEuMDtcbiAgICB0aGlzLmdhaW5MUi5nYWluLnZhbHVlID0gMC4wO1xuICAgIHRoaXMuZ2FpblJMLmdhaW4udmFsdWUgPSAwLjA7XG4gICAgdGhpcy5nYWluUlIuZ2Fpbi52YWx1ZSA9IDEuMDtcblxuICAgIC8vIGNvbm5lY3QgZ3JhcGhcbiAgICB0aGlzLnNwbGl0dGVyLmNvbm5lY3QodGhpcy5nYWluTEwsIDApO1xuICAgIHRoaXMuc3BsaXR0ZXIuY29ubmVjdCh0aGlzLmdhaW5MUiwgMCk7XG4gICAgdGhpcy5zcGxpdHRlci5jb25uZWN0KHRoaXMuZ2FpblJMLCAxKTtcbiAgICB0aGlzLnNwbGl0dGVyLmNvbm5lY3QodGhpcy5nYWluUlIsIDEpO1xuXG4gICAgdGhpcy5nYWluTEwuY29ubmVjdCh0aGlzLm1lcmdlciwgMCwgMCk7XG4gICAgdGhpcy5nYWluTFIuY29ubmVjdCh0aGlzLm1lcmdlciwgMCwgMSk7XG4gICAgdGhpcy5nYWluUkwuY29ubmVjdCh0aGlzLm1lcmdlciwgMCwgMCk7XG4gICAgdGhpcy5nYWluUlIuY29ubmVjdCh0aGlzLm1lcmdlciwgMCwgMSk7XG4gIH1cblxuICBnZXQgaW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BsaXR0ZXI7XG4gIH1cblxuICBjb25uZWN0KGF1ZGlvTm9kZSkge1xuICAgIHRoaXMubWVyZ2VyLmNvbm5lY3QoYXVkaW9Ob2RlKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5tZXJnZXIuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgaW52ZXJzZUNoYW5uZWxzKG9uT2ZmKSB7XG4gICAgaWYgKG9uT2ZmICYmICF0aGlzLmludmVyc2VkKSB7XG4gICAgICB0aGlzLnJhbXBHYWluKHRoaXMuZ2FpbkxMLCAwKTtcbiAgICAgIHRoaXMucmFtcEdhaW4odGhpcy5nYWluTFIsIDEpO1xuICAgICAgdGhpcy5yYW1wR2Fpbih0aGlzLmdhaW5STCwgMSk7XG4gICAgICB0aGlzLnJhbXBHYWluKHRoaXMuZ2FpblJSLCAwKTtcbiAgICAgIHRoaXMuaW52ZXJzZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIW9uT2ZmICYmIHRoaXMuaW52ZXJzZWQpIHtcbiAgICAgIHRoaXMucmFtcEdhaW4odGhpcy5nYWluTEwsIDEpO1xuICAgICAgdGhpcy5yYW1wR2Fpbih0aGlzLmdhaW5MUiwgMCk7XG4gICAgICB0aGlzLnJhbXBHYWluKHRoaXMuZ2FpblJMLCAwKTtcbiAgICAgIHRoaXMucmFtcEdhaW4odGhpcy5nYWluUlIsIDEpO1xuICAgICAgdGhpcy5pbnZlcnNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJhbXBHYWluKGdOb2RlLCBvbmVaZXJvLCByYW1wRHVyYXRpb24gPSA0LjApIHtcbiAgICAvLyBoYW5kbGUgZW52ZWxvcGVcbiAgICBsZXQgbm93ID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuICAgIGdOb2RlLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKG5vdyk7XG4gICAgZ05vZGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZShnTm9kZS5nYWluLnZhbHVlLCBub3cpO1xuICAgIGdOb2RlLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUob25lWmVybywgbm93ICsgcmFtcER1cmF0aW9uKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGVyZW9QYW5uZXI7XG4iXX0=