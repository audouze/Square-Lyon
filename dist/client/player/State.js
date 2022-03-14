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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _StereoPanner = require('./audio/StereoPanner');

var _StereoPanner2 = _interopRequireDefault(_StereoPanner);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audio = soundworks.audio;
var audioContext = soundworks.audioContext;

var EventEngine = function (_audio$TimeEngine) {
  (0, _inherits3.default)(EventEngine, _audio$TimeEngine);

  function EventEngine(state, events) {
    (0, _classCallCheck3.default)(this, EventEngine);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EventEngine.__proto__ || (0, _getPrototypeOf2.default)(EventEngine)).call(this));

    _this.state = state;
    // maybe sort by time to make sure everything is ok
    _this.events = events;
    _this.currentIndex = 0;
    return _this;
  }

  (0, _createClass3.default)(EventEngine, [{
    key: 'advancePosition',
    value: function advancePosition(time, position) {
      var _this2 = this;

      var currentEvent = this.events[this.currentIndex];
      var now = audioContext.currentTime;
      var dt = time - now;
      var currentIndex = this.currentIndex; // copy for setTimeout
      // defer execution to be more precise
      setTimeout(function () {
        _this2.state.handleEvent(currentEvent, currentIndex);
      }, dt * 1000);

      this.currentIndex += 1;

      if (this.events[this.currentIndex]) return this.events[this.currentIndex].time;else return Infinity;
    }
  }, {
    key: 'syncPosition',
    value: function syncPosition(time, position) {
      // go to beginning of previous event
      for (var i = 0; i < this.events.length; i++) {
        var event = this.events[i];
        var next = this.events[i + 1];

        if (position >= event.time) {
          // apply event silently, and test next event
          if (next && position > next.time) {
            // recreate whole time line from beginning of the state
            this.state.handleEvent(event, i, true);

            // if several event at same position, we pass here too
          } else {
            // we found the current index
            this.currentIndex = i;
            break;
          }
        }
      }

      return this.events[this.currentIndex].time;
    }
  }]);
  return EventEngine;
}(audio.TimeEngine);

var State = function () {
  function State(index, experience, stateConfig, commonConfig, isLast) {
    (0, _classCallCheck3.default)(this, State);

    this.index = index;
    this.experience = experience;
    this.stateConfig = stateConfig;
    this.commonConfig = commonConfig;
    this.isLast = isLast;

    this.eventEngine = new EventEngine(this, this.stateConfig.events);

    this.initialOrientation = null;
    this.motionInputCallback = this.motionInputCallback.bind(this);

    this._createStream(0);
  }

  (0, _createClass3.default)(State, [{
    key: '_createStream',
    value: function _createStream() {
      var _this3 = this;

      this.audioStream = this.experience.audioStreamManager.getAudioStream();
      this.audioStream.sync = false;
      this.audioStream.loop = this.stateConfig.stream.loop;
      this.audioStream.url = this.stateConfig.stream.id;
      this.audioStream.periodic = !!this.stateConfig.stream.period;

      this.audioStream.onended = function () {
        _this3.audioStream.url = _this3.commonConfig.fallbackStream.id;
        _this3.audioStream.loop = true;
        _this3.audioStream.sync = false;
        _this3.audioStream.start(0);
      };

      this.stereoPanner = new _StereoPanner2.default();

      this.audioStream.connect(this.stereoPanner.input);
      this.stereoPanner.connect(audioContext.destination);
    }
  }, {
    key: 'enter',
    value: function enter() {
      var _experience = this.experience,
          playControl = _experience.playControl,
          transport = _experience.transport,
          view = _experience.view,
          motionInput = _experience.motionInput;


      view.setId(this.index);
      transport.add(this.eventEngine);
      playControl.start();

      if (this.stateConfig.stream.period) {
        var syncTime = this.experience.sync.getSyncTime();
        var offset = syncTime % this.stateConfig.stream.period;
        this.audioStream.start(offset);
      } else {
        this.audioStream.start(0);
      }

      if (motionInput.isAvailable('deviceorientation')) motionInput.addListener('deviceorientation', this.motionInputCallback);
    }
  }, {
    key: 'exit',
    value: function exit() {
      var _experience2 = this.experience,
          playControl = _experience2.playControl,
          transport = _experience2.transport,
          motionInput = _experience2.motionInput;

      playControl.stop();

      if (this.eventEngine.master) transport.remove(this.eventEngine);

      if (motionInput.isAvailable('deviceorientation')) motionInput.removeListener('deviceorientation', this.motionInputCallback);

      this.audioStream.stop(0);
      this.stereoPanner.disconnect();
    }
  }, {
    key: 'seek',
    value: function seek(eventIndex) {
      var position = this.stateConfig.events[eventIndex].time;
      this.experience.playControl.seek(position);

      this.audioStream.stop(0);
      this.stereoPanner.disconnect();

      this._createStream();
      this.audioStream.start(position);
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(event, eventIndex) {
      var _this4 = this;

      var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var view = this.experience.view;

      switch (event.type) {
        case 'background-color':
          view.setBackgroundColor(event.placeholder, event.color);
          break;
        case 'background-image':
          view.setBackgroundImage(event.placeholder, event.url);
          break;
        case 'text-subtitle':
          if (this.commonConfig.enableSubtitles) {
            view.setTextContent(event.placeholder, event.content, event.classes);
          }
          break;
        case 'text':
          view.setTextContent(event.placeholder, event.content, event.classes);
          break;
        case 'fade-in':
          var fadeInDuration = silent ? 0 : event.duration;
          view.fadeIn(event.placeholder, fadeInDuration);
          break;
        case 'fade-out':
          var fadeOutDuration = silent ? 0 : event.duration;
          view.fadeOut(event.placeholder, fadeOutDuration);
          break;
        case 'trigger-next-state':
          if (!silent) {
            view.setEvent(event.placeholder, function () {
              _this4.experience.setState(_this4.index + 1);

              if (event.triggerAudio) _this4.experience.simplePlayer.trigger(event.triggerAudio.id);
            });
          }
          break;
        case 'trigger-audio':
          if (!silent) this.experience.simplePlayer.trigger(event.id);
          break;
        case 'vibrate':
          if (!silent) {
            // check for vibrate API (not in Safari)
            if (window.navigator.vibrate !== undefined) window.navigator.vibrate(event.pattern);
          }
          break;
      }

      // for 'trigger-next-state' event type, we wait for the interaction
      if (event.type !== 'trigger-next-state' && !silent) {
        if (event.triggerAudio) this.experience.simplePlayer.trigger(event.triggerAudio.id);
      }

      // is we are in the last state, we delete the saved progression
      if (!silent) {
        if (!this.isLast) this.experience.saveProgression(this.index, eventIndex);else this.experience.deleteProgression();
      }
    }
  }, {
    key: 'motionInputCallback',
    value: function motionInputCallback(data) {
      var orientation = data[0];

      if (this.initialOrientation === null) this.initialOrientation = orientation;

      // get reverse orientation state (is subject facing opposite dir.
      // from when current state started)
      var inverseChannels = Math.cos((orientation - this.initialOrientation) / 180 * Math.PI) < 0;
      this.stereoPanner.inverseChannels(inverseChannels);
    }
  }]);
  return State;
}();

exports.default = State;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0YXRlLmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJhdWRpbyIsImF1ZGlvQ29udGV4dCIsIkV2ZW50RW5naW5lIiwic3RhdGUiLCJldmVudHMiLCJjdXJyZW50SW5kZXgiLCJ0aW1lIiwicG9zaXRpb24iLCJjdXJyZW50RXZlbnQiLCJub3ciLCJjdXJyZW50VGltZSIsImR0Iiwic2V0VGltZW91dCIsImhhbmRsZUV2ZW50IiwiSW5maW5pdHkiLCJpIiwibGVuZ3RoIiwiZXZlbnQiLCJuZXh0IiwiVGltZUVuZ2luZSIsIlN0YXRlIiwiaW5kZXgiLCJleHBlcmllbmNlIiwic3RhdGVDb25maWciLCJjb21tb25Db25maWciLCJpc0xhc3QiLCJldmVudEVuZ2luZSIsImluaXRpYWxPcmllbnRhdGlvbiIsIm1vdGlvbklucHV0Q2FsbGJhY2siLCJiaW5kIiwiX2NyZWF0ZVN0cmVhbSIsImF1ZGlvU3RyZWFtIiwiYXVkaW9TdHJlYW1NYW5hZ2VyIiwiZ2V0QXVkaW9TdHJlYW0iLCJzeW5jIiwibG9vcCIsInN0cmVhbSIsInVybCIsImlkIiwicGVyaW9kaWMiLCJwZXJpb2QiLCJvbmVuZGVkIiwiZmFsbGJhY2tTdHJlYW0iLCJzdGFydCIsInN0ZXJlb1Bhbm5lciIsIlN0ZXJlb1Bhbm5lciIsImNvbm5lY3QiLCJpbnB1dCIsImRlc3RpbmF0aW9uIiwicGxheUNvbnRyb2wiLCJ0cmFuc3BvcnQiLCJ2aWV3IiwibW90aW9uSW5wdXQiLCJzZXRJZCIsImFkZCIsInN5bmNUaW1lIiwiZ2V0U3luY1RpbWUiLCJvZmZzZXQiLCJpc0F2YWlsYWJsZSIsImFkZExpc3RlbmVyIiwic3RvcCIsIm1hc3RlciIsInJlbW92ZSIsInJlbW92ZUxpc3RlbmVyIiwiZGlzY29ubmVjdCIsImV2ZW50SW5kZXgiLCJzZWVrIiwic2lsZW50IiwidHlwZSIsInNldEJhY2tncm91bmRDb2xvciIsInBsYWNlaG9sZGVyIiwiY29sb3IiLCJzZXRCYWNrZ3JvdW5kSW1hZ2UiLCJlbmFibGVTdWJ0aXRsZXMiLCJzZXRUZXh0Q29udGVudCIsImNvbnRlbnQiLCJjbGFzc2VzIiwiZmFkZUluRHVyYXRpb24iLCJkdXJhdGlvbiIsImZhZGVJbiIsImZhZGVPdXREdXJhdGlvbiIsImZhZGVPdXQiLCJzZXRFdmVudCIsInNldFN0YXRlIiwidHJpZ2dlckF1ZGlvIiwic2ltcGxlUGxheWVyIiwidHJpZ2dlciIsIndpbmRvdyIsIm5hdmlnYXRvciIsInZpYnJhdGUiLCJ1bmRlZmluZWQiLCJwYXR0ZXJuIiwic2F2ZVByb2dyZXNzaW9uIiwiZGVsZXRlUHJvZ3Jlc3Npb24iLCJkYXRhIiwib3JpZW50YXRpb24iLCJpbnZlcnNlQ2hhbm5lbHMiLCJNYXRoIiwiY29zIiwiUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBQVlBLFU7O0FBQ1o7Ozs7Ozs7O0FBRUEsSUFBTUMsUUFBUUQsV0FBV0MsS0FBekI7QUFDQSxJQUFNQyxlQUFlRixXQUFXRSxZQUFoQzs7SUFFTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUJDLE1BQW5CLEVBQTJCO0FBQUE7O0FBQUE7O0FBR3pCLFVBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBO0FBQ0EsVUFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQU55QjtBQU8xQjs7OztvQ0FFZUMsSSxFQUFNQyxRLEVBQVU7QUFBQTs7QUFDOUIsVUFBTUMsZUFBZSxLQUFLSixNQUFMLENBQVksS0FBS0MsWUFBakIsQ0FBckI7QUFDQSxVQUFNSSxNQUFNUixhQUFhUyxXQUF6QjtBQUNBLFVBQU1DLEtBQUtMLE9BQU9HLEdBQWxCO0FBQ0EsVUFBTUosZUFBZSxLQUFLQSxZQUExQixDQUo4QixDQUlVO0FBQ3hDO0FBQ0FPLGlCQUFXLFlBQU07QUFDZixlQUFLVCxLQUFMLENBQVdVLFdBQVgsQ0FBdUJMLFlBQXZCLEVBQXFDSCxZQUFyQztBQUNELE9BRkQsRUFFR00sS0FBSyxJQUZSOztBQUlBLFdBQUtOLFlB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MUUsTUFBTW1ELElBQU4sS0FBZSxvQkFBZixJQUF1QyxDQUFDRCxNQUE1QyxFQUFvRDtBQUNsRCxZQUFJbEQsTUFBTW1FLFlBQVYsRUFDRSxLQUFLOUQsVUFBTCxDQUFnQitELFlBQWhCLENBQTZCQyxPQUE3QixDQUFxQ3JFLE1BQU1tRSxZQUFOLENBQW1COUMsRUFBeEQ7QUFDSDs7QUFFRDtBQUNBLFVBQUksQ0FBQzZCLE1BQUwsRUFBYTtBQUNYLFlBQUksQ0FBQyxLQUFLMUMsTUFBVixFQUNFLEtBQUtILFVBQUwsQ0FBZ0JzRSxlQUFoQixDQUFnQyxLQUFLdkUsS0FBckMsRUFBNEM0QyxVQUE1QyxFQURGLEtBR0UsS0FBSzNDLFVBQUwsQ0FBZ0J1RSxpQkFBaEI7QUFDSDtBQUNGOzs7d0NBRW1CQyxJLEVBQU07QUFDeEIsVUFBTUMsY0FBY0QsS0FBSyxDQUFMLENBQXBCOztBQUVBLFVBQUksS0FBS25FLGtCQUFMLEtBQTRCLElBQWhDLEVBQ0UsS0FBS0Esa0JBQUwsR0FBMEJvRSxXQUExQjs7QUFFRjtBQUNBO0FBQ0EsVUFBTUMsa0JBQWtCQyxLQUFLQyxHQUFMLENBQVMsQ0FBQ0gsY0FBYyxLQUFLcEUsa0JBQXBCLElBQTBDLEdBQTFDLEdBQWdEc0UsS0FBS0UsRUFBOUQsSUFBb0UsQ0FBNUY7QUFDQSxXQUFLdkQsWUFBTCxDQUFrQm9ELGVBQWxCLENBQWtDQSxlQUFsQztBQUNEOzs7OztrQkFHWTVFLEsiLCJmaWxlIjoiU3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmltcG9ydCBTdGVyZW9QYW5uZXIgZnJvbSAnLi9hdWRpby9TdGVyZW9QYW5uZXInO1xuXG5jb25zdCBhdWRpbyA9IHNvdW5kd29ya3MuYXVkaW87XG5jb25zdCBhdWRpb0NvbnRleHQgPSBzb3VuZHdvcmtzLmF1ZGlvQ29udGV4dDtcblxuY2xhc3MgRXZlbnRFbmdpbmUgZXh0ZW5kcyBhdWRpby5UaW1lRW5naW5lIHtcbiAgY29uc3RydWN0b3Ioc3RhdGUsIGV2ZW50cykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgLy8gbWF5YmUgc29ydCBieSB0aW1lIHRvIG1ha2Ugc3VyZSBldmVyeXRoaW5nIGlzIG9rXG4gICAgdGhpcy5ldmVudHMgPSBldmVudHM7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICB9XG5cbiAgYWR2YW5jZVBvc2l0aW9uKHRpbWUsIHBvc2l0aW9uKSB7XG4gICAgY29uc3QgY3VycmVudEV2ZW50ID0gdGhpcy5ldmVudHNbdGhpcy5jdXJyZW50SW5kZXhdO1xuICAgIGNvbnN0IG5vdyA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcbiAgICBjb25zdCBkdCA9IHRpbWUgLSBub3c7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXg7IC8vIGNvcHkgZm9yIHNldFRpbWVvdXRcbiAgICAvLyBkZWZlciBleGVjdXRpb24gdG8gYmUgbW9yZSBwcmVjaXNlXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmhhbmRsZUV2ZW50KGN1cnJlbnRFdmVudCwgY3VycmVudEluZGV4KTtcbiAgICB9LCBkdCAqIDEwMDApO1xuXG4gICAgdGhpcy5jdXJyZW50SW5kZXggKz0gMTtcblxuICAgIGlmICh0aGlzLmV2ZW50c1t0aGlzLmN1cnJlbnRJbmRleF0pXG4gICAgICByZXR1cm4gdGhpcy5ldmVudHNbdGhpcy5jdXJyZW50SW5kZXhdLnRpbWU7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG5cbiAgc3luY1Bvc2l0aW9uKHRpbWUsIHBvc2l0aW9uKSB7XG4gICAgLy8gZ28gdG8gYmVnaW5uaW5nIG9mIHByZXZpb3VzIGV2ZW50XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tpXTtcbiAgICAgIGNvbnN0IG5leHQgPSB0aGlzLmV2ZW50c1tpICsgMV07XG5cbiAgICAgIGlmIChwb3NpdGlvbiA+PSBldmVudC50aW1lKSB7XG4gICAgICAgIC8vIGFwcGx5IGV2ZW50IHNpbGVudGx5LCBhbmQgdGVzdCBuZXh0IGV2ZW50XG4gICAgICAgIGlmIChuZXh0ICYmIHBvc2l0aW9uID4gbmV4dC50aW1lKSB7XG4gICAgICAgICAgLy8gcmVjcmVhdGUgd2hvbGUgdGltZSBsaW5lIGZyb20gYmVnaW5uaW5nIG9mIHRoZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuc3RhdGUuaGFuZGxlRXZlbnQoZXZlbnQsIGksIHRydWUpO1xuXG4gICAgICAgIC8vIGlmIHNldmVyYWwgZXZlbnQgYXQgc2FtZSBwb3NpdGlvbiwgd2UgcGFzcyBoZXJlIHRvb1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdlIGZvdW5kIHRoZSBjdXJyZW50IGluZGV4XG4gICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRzW3RoaXMuY3VycmVudEluZGV4XS50aW1lO1xuICB9XG59XG5cbmNsYXNzIFN0YXRlIHtcbiAgY29uc3RydWN0b3IoaW5kZXgsIGV4cGVyaWVuY2UsIHN0YXRlQ29uZmlnLCBjb21tb25Db25maWcsIGlzTGFzdCkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLmV4cGVyaWVuY2UgPSBleHBlcmllbmNlO1xuICAgIHRoaXMuc3RhdGVDb25maWcgPSBzdGF0ZUNvbmZpZztcbiAgICB0aGlzLmNvbW1vbkNvbmZpZyA9IGNvbW1vbkNvbmZpZztcbiAgICB0aGlzLmlzTGFzdCA9IGlzTGFzdDtcblxuICAgIHRoaXMuZXZlbnRFbmdpbmUgPSBuZXcgRXZlbnRFbmdpbmUodGhpcywgdGhpcy5zdGF0ZUNvbmZpZy5ldmVudHMpO1xuXG4gICAgdGhpcy5pbml0aWFsT3JpZW50YXRpb24gPSBudWxsO1xuICAgIHRoaXMubW90aW9uSW5wdXRDYWxsYmFjayA9IHRoaXMubW90aW9uSW5wdXRDYWxsYmFjay5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5fY3JlYXRlU3RyZWFtKDApO1xuICB9XG5cbiAgX2NyZWF0ZVN0cmVhbSgpIHtcbiAgICB0aGlzLmF1ZGlvU3RyZWFtID0gdGhpcy5leHBlcmllbmNlLmF1ZGlvU3RyZWFtTWFuYWdlci5nZXRBdWRpb1N0cmVhbSgpO1xuICAgIHRoaXMuYXVkaW9TdHJlYW0uc3luYyA9IGZhbHNlO1xuICAgIHRoaXMuYXVkaW9TdHJlYW0ubG9vcCA9IHRoaXMuc3RhdGVDb25maWcuc3RyZWFtLmxvb3A7XG4gICAgdGhpcy5hdWRpb1N0cmVhbS51cmwgPSB0aGlzLnN0YXRlQ29uZmlnLnN0cmVhbS5pZDtcbiAgICB0aGlzLmF1ZGlvU3RyZWFtLnBlcmlvZGljID0gISF0aGlzLnN0YXRlQ29uZmlnLnN0cmVhbS5wZXJpb2Q7XG5cbiAgICB0aGlzLmF1ZGlvU3RyZWFtLm9uZW5kZWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmF1ZGlvU3RyZWFtLnVybCA9IHRoaXMuY29tbW9uQ29uZmlnLmZhbGxiYWNrU3RyZWFtLmlkO1xuICAgICAgdGhpcy5hdWRpb1N0cmVhbS5sb29wID0gdHJ1ZTtcbiAgICAgIHRoaXMuYXVkaW9TdHJlYW0uc3luYyA9IGZhbHNlO1xuICAgICAgdGhpcy5hdWRpb1N0cmVhbS5zdGFydCgwKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdGVyZW9QYW5uZXIgPSBuZXcgU3RlcmVvUGFubmVyKCk7XG5cbiAgICB0aGlzLmF1ZGlvU3RyZWFtLmNvbm5lY3QodGhpcy5zdGVyZW9QYW5uZXIuaW5wdXQpO1xuICAgIHRoaXMuc3RlcmVvUGFubmVyLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIGVudGVyKCkge1xuICAgIGNvbnN0IHsgcGxheUNvbnRyb2wsIHRyYW5zcG9ydCwgdmlldywgbW90aW9uSW5wdXQgfSA9IHRoaXMuZXhwZXJpZW5jZTtcblxuICAgIHZpZXcuc2V0SWQodGhpcy5pbmRleCk7XG4gICAgdHJhbnNwb3J0LmFkZCh0aGlzLmV2ZW50RW5naW5lKTtcbiAgICBwbGF5Q29udHJvbC5zdGFydCgpO1xuXG4gICAgaWYgKHRoaXMuc3RhdGVDb25maWcuc3RyZWFtLnBlcmlvZCkge1xuICAgICAgY29uc3Qgc3luY1RpbWUgPSB0aGlzLmV4cGVyaWVuY2Uuc3luYy5nZXRTeW5jVGltZSgpO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gc3luY1RpbWUgJSB0aGlzLnN0YXRlQ29uZmlnLnN0cmVhbS5wZXJpb2Q7XG4gICAgICB0aGlzLmF1ZGlvU3RyZWFtLnN0YXJ0KG9mZnNldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXVkaW9TdHJlYW0uc3RhcnQoMCk7XG4gICAgfVxuXG4gICAgaWYgKG1vdGlvbklucHV0LmlzQXZhaWxhYmxlKCdkZXZpY2VvcmllbnRhdGlvbicpKVxuICAgICAgbW90aW9uSW5wdXQuYWRkTGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy5tb3Rpb25JbnB1dENhbGxiYWNrKTtcbiAgfVxuXG4gIGV4aXQoKSB7XG4gICAgY29uc3QgeyBwbGF5Q29udHJvbCwgdHJhbnNwb3J0LCBtb3Rpb25JbnB1dCB9ID0gdGhpcy5leHBlcmllbmNlO1xuICAgIHBsYXlDb250cm9sLnN0b3AoKTtcblxuICAgIGlmICh0aGlzLmV2ZW50RW5naW5lLm1hc3RlcilcbiAgICAgIHRyYW5zcG9ydC5yZW1vdmUodGhpcy5ldmVudEVuZ2luZSk7XG5cbiAgICBpZiAobW90aW9uSW5wdXQuaXNBdmFpbGFibGUoJ2RldmljZW9yaWVudGF0aW9uJykpXG4gICAgICBtb3Rpb25JbnB1dC5yZW1vdmVMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLm1vdGlvbklucHV0Q2FsbGJhY2spO1xuXG4gICAgdGhpcy5hdWRpb1N0cmVhbS5zdG9wKDApO1xuICAgIHRoaXMuc3RlcmVvUGFubmVyLmRpc2Nvbm5lY3QoKTtcbiAgfVxuXG4gIHNlZWsoZXZlbnRJbmRleCkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5zdGF0ZUNvbmZpZy5ldmVudHNbZXZlbnRJbmRleF0udGltZTtcbiAgICB0aGlzLmV4cGVyaWVuY2UucGxheUNvbnRyb2wuc2Vlayhwb3NpdGlvbik7XG5cbiAgICB0aGlzLmF1ZGlvU3RyZWFtLnN0b3AoMCk7XG4gICAgdGhpcy5zdGVyZW9QYW5uZXIuZGlzY29ubmVjdCgpO1xuXG4gICAgdGhpcy5fY3JlYXRlU3RyZWFtKCk7XG4gICAgdGhpcy5hdWRpb1N0cmVhbS5zdGFydChwb3NpdGlvbik7XG4gIH1cblxuICBoYW5kbGVFdmVudChldmVudCwgZXZlbnRJbmRleCwgc2lsZW50ID0gZmFsc2UpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5leHBlcmllbmNlLnZpZXc7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2JhY2tncm91bmQtY29sb3InOlxuICAgICAgICB2aWV3LnNldEJhY2tncm91bmRDb2xvcihldmVudC5wbGFjZWhvbGRlciwgZXZlbnQuY29sb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JhY2tncm91bmQtaW1hZ2UnOlxuICAgICAgICB2aWV3LnNldEJhY2tncm91bmRJbWFnZShldmVudC5wbGFjZWhvbGRlciwgZXZlbnQudXJsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0ZXh0LXN1YnRpdGxlJzpcbiAgICAgICAgaWYgKHRoaXMuY29tbW9uQ29uZmlnLmVuYWJsZVN1YnRpdGxlcyl7XG4gICAgICAgICAgdmlldy5zZXRUZXh0Q29udGVudChldmVudC5wbGFjZWhvbGRlciwgZXZlbnQuY29udGVudCwgZXZlbnQuY2xhc3Nlcyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgdmlldy5zZXRUZXh0Q29udGVudChldmVudC5wbGFjZWhvbGRlciwgZXZlbnQuY29udGVudCwgZXZlbnQuY2xhc3Nlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmFkZS1pbic6XG4gICAgICAgIGNvbnN0IGZhZGVJbkR1cmF0aW9uID0gc2lsZW50ID8gMCA6IGV2ZW50LmR1cmF0aW9uO1xuICAgICAgICB2aWV3LmZhZGVJbihldmVudC5wbGFjZWhvbGRlciwgZmFkZUluRHVyYXRpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ZhZGUtb3V0JzpcbiAgICAgICAgY29uc3QgZmFkZU91dER1cmF0aW9uID0gc2lsZW50ID8gMCA6IGV2ZW50LmR1cmF0aW9uO1xuICAgICAgICB2aWV3LmZhZGVPdXQoZXZlbnQucGxhY2Vob2xkZXIsIGZhZGVPdXREdXJhdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJpZ2dlci1uZXh0LXN0YXRlJzpcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICB2aWV3LnNldEV2ZW50KGV2ZW50LnBsYWNlaG9sZGVyLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2Uuc2V0U3RhdGUodGhpcy5pbmRleCArIDEpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQudHJpZ2dlckF1ZGlvKVxuICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2Uuc2ltcGxlUGxheWVyLnRyaWdnZXIoZXZlbnQudHJpZ2dlckF1ZGlvLmlkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RyaWdnZXItYXVkaW8nOlxuICAgICAgICBpZiAoIXNpbGVudClcbiAgICAgICAgICB0aGlzLmV4cGVyaWVuY2Uuc2ltcGxlUGxheWVyLnRyaWdnZXIoZXZlbnQuaWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpYnJhdGUnOlxuICAgICAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICAgIC8vIGNoZWNrIGZvciB2aWJyYXRlIEFQSSAobm90IGluIFNhZmFyaSlcbiAgICAgICAgICBpZiAod2luZG93Lm5hdmlnYXRvci52aWJyYXRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnZpYnJhdGUoZXZlbnQucGF0dGVybik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gZm9yICd0cmlnZ2VyLW5leHQtc3RhdGUnIGV2ZW50IHR5cGUsIHdlIHdhaXQgZm9yIHRoZSBpbnRlcmFjdGlvblxuICAgIGlmIChldmVudC50eXBlICE9PSAndHJpZ2dlci1uZXh0LXN0YXRlJyAmJiAhc2lsZW50KSB7XG4gICAgICBpZiAoZXZlbnQudHJpZ2dlckF1ZGlvKVxuICAgICAgICB0aGlzLmV4cGVyaWVuY2Uuc2ltcGxlUGxheWVyLnRyaWdnZXIoZXZlbnQudHJpZ2dlckF1ZGlvLmlkKTtcbiAgICB9XG5cbiAgICAvLyBpcyB3ZSBhcmUgaW4gdGhlIGxhc3Qgc3RhdGUsIHdlIGRlbGV0ZSB0aGUgc2F2ZWQgcHJvZ3Jlc3Npb25cbiAgICBpZiAoIXNpbGVudCnCoHtcbiAgICAgIGlmICghdGhpcy5pc0xhc3QpXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZS5zYXZlUHJvZ3Jlc3Npb24odGhpcy5pbmRleCwgZXZlbnRJbmRleCk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZS5kZWxldGVQcm9ncmVzc2lvbigpO1xuICAgIH1cbiAgfVxuXG4gIG1vdGlvbklucHV0Q2FsbGJhY2soZGF0YSkge1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZGF0YVswXTtcblxuICAgIGlmICh0aGlzLmluaXRpYWxPcmllbnRhdGlvbiA9PT0gbnVsbClcbiAgICAgIHRoaXMuaW5pdGlhbE9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICAvLyBnZXQgcmV2ZXJzZSBvcmllbnRhdGlvbiBzdGF0ZSAoaXMgc3ViamVjdCBmYWNpbmcgb3Bwb3NpdGUgZGlyLlxuICAgIC8vIGZyb20gd2hlbiBjdXJyZW50IHN0YXRlIHN0YXJ0ZWQpXG4gICAgY29uc3QgaW52ZXJzZUNoYW5uZWxzID0gTWF0aC5jb3MoKG9yaWVudGF0aW9uIC0gdGhpcy5pbml0aWFsT3JpZW50YXRpb24pIC8gMTgwICogTWF0aC5QSSkgPCAwO1xuICAgIHRoaXMuc3RlcmVvUGFubmVyLmludmVyc2VDaGFubmVscyhpbnZlcnNlQ2hhbm5lbHMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xuIl19