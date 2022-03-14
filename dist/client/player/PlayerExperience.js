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

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _slugify = require('slugify');

var _slugify2 = _interopRequireDefault(_slugify);

var _SimplePlayer = require('./audio/SimplePlayer');

var _SimplePlayer2 = _interopRequireDefault(_SimplePlayer);

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _PlayerView = require('./PlayerView');

var _PlayerView2 = _interopRequireDefault(_PlayerView);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioContext = soundworks.audioContext;
var client = soundworks.client;
var audio = soundworks.audio;
// should be somewhere else, even if not a big deal
var localStorageId = 'lbh-square';

var PlayerExperience = function (_soundworks$Experienc) {
  (0, _inherits3.default)(PlayerExperience, _soundworks$Experienc);

  function PlayerExperience(envConfig, projectConfig) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this));

    _this.envConfig = envConfig;
    _this.projectConfig = projectConfig;

    var features = ['web-audio', 'vibrate'];

    if (projectConfig.environment.wakeLock) {
      features.push('wake-lock');
    }

    // services
    _this.platform = _this.require('platform', { features: features });
    _this.sync = _this.require('sync');
    _this.checkin = _this.require('checkin', { showDialog: false });
    _this.sharedParams = _this.require('shared-params');
    _this.motionInput = _this.require('motion-input', {
      descriptors: ['deviceorientation']
    });

    var assetsPath = _this.envConfig.assetsDomain + 'assets/';

    _this.audioStreamManager = _this.require('audio-stream-manager', {
      assetsDomain: assetsPath,
      monitorInterval: 1,
      requiredAdvanceThreshold: 10
    });

    var triggerAudioBuffers = {};
    var backgroundImages = [];

    //
    _this.projectConfig.states.forEach(function (state) {
      state.events.forEach(function (event) {
        if (event.triggerAudio) triggerAudioBuffers[event.triggerAudio.id] = event.triggerAudio.file;

        // background image domain or sub location are not abstracted by
        // a service, so override the url
        if (event.type === 'background-image') {
          event.url = assetsPath + event.url;
          backgroundImages.push(event.url);
        }
      });
    });

    triggerAudioBuffers.testFile = _this.projectConfig.txt.soundCheck.testFile;

    _this.audioBufferManager = _this.require('audio-buffer-manager', {
      assetsDomain: assetsPath,
      files: triggerAudioBuffers
    });

    _this.imagesLoader = _this.require('images-loader', {
      // assetsDomain: assetsPath, // is already overriden...
      files: backgroundImages
    });

    _this.soundCheck = _this.require('sound-check');
    return _this;
  }

  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'start', this).call(this);

      this.simplePlayer = new _SimplePlayer2.default(this.audioBufferManager.data);
      this.view = new _PlayerView2.default({
        state: 'experience',
        txt: this.projectConfig.txt.restartPage
      });

      this.show().then(function () {
        _this2.transport = new audio.Transport();
        _this2.playControl = new audio.PlayControl(_this2.transport);

        _this2.currentStateIndex = null;
        _this2.state = null;

        // init debug - listen for controller for debugging / test
        _this2.debugMode = false;

        _this2.sharedParams.addParamListener('debug-mode', function (value) {
          _this2.debugMode = value;
        });

        _this2.projectConfig.states.forEach(function (state, stateIndex) {
          var name = (0, _slugify2.default)(state.title);

          _this2.sharedParams.addParamListener(name, function (value) {
            if (!_this2.debugMode || !value) return;

            // get event index from value
            var getPrefix = /^\[[0-9]+\]/;
            var cleanPrefix = /\[|\]/g;
            var prefix = getPrefix.exec(value)[0];
            var eventIndex = parseInt(prefix.replace(cleanPrefix, ''));

            _this2.setState(stateIndex, eventIndex);
          });
        });

        var progression = _this2.retrieveProgression();

        if (!_this2.debugMode) {
          if (progression !== null) {
            _this2.view.model.state = 'choice';
            _this2.view.render();

            _this2.view.installEvents({
              'click #restart': function clickRestart() {
                _this2.view.installEvents({}, true);
                _this2.view.model.state = 'experience';
                _this2.view.render();
                _this2.setState(0);
              },
              'click #continue': function clickContinue() {
                _this2.view.installEvents({}, true);
                _this2.view.model.state = 'experience';
                _this2.view.render();
                _this2.setState(progression.stateIndex, progression.eventIndex);
              }
            }, true);
          } else {
            _this2.setState(0);
          }
        }
      });
    }

    // setup and start introduction (text + reading voice)

  }, {
    key: 'setState',
    value: function setState(stateIndex) {
      var eventIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this.currentStateIndex = stateIndex;
      var config = this.projectConfig;

      if (this.state) {
        this.state.exit();
        this.view.clear();
      }

      var stateConfig = config.states[stateIndex];
      var commonConfig = config.common;
      var isLast = stateIndex === config.states.length - 1;

      this.state = new _State2.default(stateIndex, this, stateConfig, commonConfig, isLast);
      this.state.enter();

      if (eventIndex !== 0) this.state.seek(eventIndex);
    }
  }, {
    key: 'saveProgression',
    value: function saveProgression(stateIndex, eventIndex) {
      var store = (0, _stringify2.default)({ stateIndex: stateIndex, eventIndex: eventIndex });
      window.localStorage.setItem(localStorageId, store);
    }
  }, {
    key: 'retrieveProgression',
    value: function retrieveProgression() {
      var store = null;

      try {
        store = JSON.parse(window.localStorage.getItem(localStorageId));
      } catch (err) {}

      return store;
    }
  }, {
    key: 'deleteProgression',
    value: function deleteProgression() {
      window.localStorage.removeItem(localStorageId);
    }
  }]);
  return PlayerExperience;
}(soundworks.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsic291bmR3b3JrcyIsImF1ZGlvQ29udGV4dCIsImNsaWVudCIsImF1ZGlvIiwibG9jYWxTdG9yYWdlSWQiLCJQbGF5ZXJFeHBlcmllbmNlIiwiZW52Q29uZmlnIiwicHJvamVjdENvbmZpZyIsImZlYXR1cmVzIiwiZW52aXJvbm1lbnQiLCJ3YWtlTG9jayIsInB1c2giLCJwbGF0Zm9ybSIsInJlcXVpcmUiLCJzeW5jIiwiY2hlY2tpbiIsInNob3dEaWFsb2ciLCJzaGFyZWRQYXJhbXMiLCJtb3Rpb25JbnB1dCIsImRlc2NyaXB0b3JzIiwiYXNzZXRzUGF0aCIsImFzc2V0c0RvbWFpbiIsImF1ZGlvU3RyZWFtTWFuYWdlciIsIm1vbml0b3JJbnRlcnZhbCIsInJlcXVpcmVkQWR2YW5jZVRocmVzaG9sZCIsInRyaWdnZXJBdWRpb0J1ZmZlcnMiLCJiYWNrZ3JvdW5kSW1hZ2VzIiwic3RhdGVzIiwiZm9yRWFjaCIsInN0YXRlIiwiZXZlbnRzIiwiZXZlbnQiLCJ0cmlnZ2VyQXVkaW8iLCJpZCIsImZpbGUiLCJ0eXBlIiwidXJsIiwidGVzdEZpbGUiLCJ0eHQiLCJzb3VuZENoZWNrIiwiYXVkaW9CdWZmZXJNYW5hZ2VyIiwiZmlsZXMiLCJpbWFnZXNMb2FkZXIiLCJzaW1wbGVQbGF5ZXIiLCJTaW1wbGVQbGF5ZXIiLCJkYXRhIiwidmlldyIsIlBsYXllclZpZXciLCJyZXN0YXJ0UGFnZSIsInNob3ciLCJ0aGVuIiwidHJhbnNwb3J0IiwiVHJhbnNwb3J0IiwicGxheUNvbnRyb2wiLCJQbGF5Q29udHJvbCIsImN1cnJlbnRTdGF0ZUluZGV4IiwiZGVidWdNb2RlIiwiYWRkUGFyYW1MaXN0ZW5lciIsInZhbHVlIiwic3RhdGVJbmRleCIsIm5hbWUiLCJ0aXRsZSIsImdldFByZWZpeCIsImNsZWFuUHJlZml4IiwicHJlZml4IiwiZXhlYyIsImV2ZW50SW5kZXgiLCJwYXJzZUludCIsInJlcGxhY2UiLCJzZXRTdGF0ZSIsInByb2dyZXNzaW9uIiwicmV0cmlldmVQcm9ncmVzc2lvbiIsIm1vZGVsIiwicmVuZGVyIiwiaW5zdGFsbEV2ZW50cyIsImNvbmZpZyIsImV4aXQiLCJjbGVhciIsInN0YXRlQ29uZmlnIiwiY29tbW9uQ29uZmlnIiwiY29tbW9uIiwiaXNMYXN0IiwibGVuZ3RoIiwiU3RhdGUiLCJlbnRlciIsInNlZWsiLCJzdG9yZSIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwicGFyc2UiLCJnZXRJdGVtIiwiZXJyIiwicmVtb3ZlSXRlbSIsIkV4cGVyaWVuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsVTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1DLGVBQWVELFdBQVdDLFlBQWhDO0FBQ0EsSUFBTUMsU0FBU0YsV0FBV0UsTUFBMUI7QUFDQSxJQUFNQyxRQUFRSCxXQUFXRyxLQUF6QjtBQUNBO0FBQ0EsSUFBTUMsaUJBQWlCLFlBQXZCOztJQUVNQyxnQjs7O0FBQ0osNEJBQVlDLFNBQVosRUFBdUJDLGFBQXZCLEVBQXNDO0FBQUE7O0FBQUE7O0FBR3BDLFVBQUtELFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7O0FBRUEsUUFBTUMsV0FBVyxDQUFDLFdBQUQsRUFBYyxTQUFkLENBQWpCOztBQUVBLFFBQUlELGNBQWNFLFdBQWQsQ0FBMEJDLFFBQTlCLEVBQXdDO0FBQ3RDRixlQUFTRyxJQUFULENBQWMsV0FBZDtBQUNEOztBQUVEO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQixNQUFLQyxPQUFMLENBQWEsVUFBYixFQUF5QixFQUFFTCxVQUFVQSxRQUFaLEVBQXpCLENBQWhCO0FBQ0EsVUFBS00sSUFBTCxHQUFZLE1BQUtELE9BQUwsQ0FBYSxNQUFiLENBQVo7QUFDQSxVQUFLRSxPQUFMLEdBQWUsTUFBS0YsT0FBTCxD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QUFRSSxLQUFLQyxLQUFMLENBQVdKLE9BQU9DLFlBQVAsQ0FBb0JJLE9BQXBCLENBQTRCeEYsY0FBNUIsQ0FBWCxDQUFSO0FBQ0QsT0FGRCxDQUVFLE9BQU15RixHQUFOLEVBQVcsQ0FBRTs7QUFFZixhQUFPUCxLQUFQO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEJDLGFBQU9DLFlBQVAsQ0FBb0JNLFVBQXBCLENBQStCMUYsY0FBL0I7QUFDRDs7O0VBMUs0QkosV0FBVytGLFU7O2tCQTZLM0IxRixnQiIsImZpbGUiOiJQbGF5ZXJFeHBlcmllbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5pbXBvcnQgc2x1Z2lmeSBmcm9tICdzbHVnaWZ5JztcbmltcG9ydCBTaW1wbGVQbGF5ZXIgZnJvbSAnLi9hdWRpby9TaW1wbGVQbGF5ZXInO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vU3RhdGUnO1xuaW1wb3J0IFBsYXllclZpZXcgZnJvbSAnLi9QbGF5ZXJWaWV3JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBhdWRpb0NvbnRleHQgPSBzb3VuZHdvcmtzLmF1ZGlvQ29udGV4dDtcbmNvbnN0IGNsaWVudCA9IHNvdW5kd29ya3MuY2xpZW50O1xuY29uc3QgYXVkaW8gPSBzb3VuZHdvcmtzLmF1ZGlvO1xuLy8gc2hvdWxkIGJlIHNvbWV3aGVyZSBlbHNlLCBldmVuIGlmIG5vdCBhIGJpZyBkZWFsXG5jb25zdCBsb2NhbFN0b3JhZ2VJZCA9ICdsYmgtc3F1YXJlJztcblxuY2xhc3MgUGxheWVyRXhwZXJpZW5jZSBleHRlbmRzIHNvdW5kd29ya3MuRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKGVudkNvbmZpZywgcHJvamVjdENvbmZpZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmVudkNvbmZpZyA9IGVudkNvbmZpZztcbiAgICB0aGlzLnByb2plY3RDb25maWcgPSBwcm9qZWN0Q29uZmlnO1xuXG4gICAgY29uc3QgZmVhdHVyZXMgPSBbJ3dlYi1hdWRpbycsICd2aWJyYXRlJ107XG5cbiAgICBpZiAocHJvamVjdENvbmZpZy5lbnZpcm9ubWVudC53YWtlTG9jaykge1xuICAgICAgZmVhdHVyZXMucHVzaCgnd2FrZS1sb2NrJyk7XG4gICAgfVxuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnBsYXRmb3JtID0gdGhpcy5yZXF1aXJlKCdwbGF0Zm9ybScsIHsgZmVhdHVyZXM6IGZlYXR1cmVzIH0pO1xuICAgIHRoaXMuc3luYyA9IHRoaXMucmVxdWlyZSgnc3luYycpO1xuICAgIHRoaXMuY2hlY2tpbiA9IHRoaXMucmVxdWlyZSgnY2hlY2tpbicsIHsgc2hvd0RpYWxvZzogZmFsc2UgfSk7XG4gICAgdGhpcy5zaGFyZWRQYXJhbXMgPSB0aGlzLnJlcXVpcmUoJ3NoYXJlZC1wYXJhbXMnKTtcbiAgICB0aGlzLm1vdGlvbklucHV0ID0gdGhpcy5yZXF1aXJlKCdtb3Rpb24taW5wdXQnLCB7XG4gICAgICBkZXNjcmlwdG9yczogWydkZXZpY2VvcmllbnRhdGlvbiddLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYXNzZXRzUGF0aCA9IGAke3RoaXMuZW52Q29uZmlnLmFzc2V0c0RvbWFpbn1hc3NldHMvYDtcblxuICAgIHRoaXMuYXVkaW9TdHJlYW1NYW5hZ2VyID0gdGhpcy5yZXF1aXJlKCdhdWRpby1zdHJlYW0tbWFuYWdlcicsIHtcbiAgICAgIGFzc2V0c0RvbWFpbjogYXNzZXRzUGF0aCxcbiAgICAgIG1vbml0b3JJbnRlcnZhbDogMSxcbiAgICAgIHJlcXVpcmVkQWR2YW5jZVRocmVzaG9sZDogMTAsXG4gICAgfSk7XG5cbiAgICBjb25zdCB0cmlnZ2VyQXVkaW9CdWZmZXJzID0ge307XG4gICAgY29uc3QgYmFja2dyb3VuZEltYWdlcyA9IFtdO1xuXG4gICAgLy9cbiAgICB0aGlzLnByb2plY3RDb25maWcuc3RhdGVzLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudHJpZ2dlckF1ZGlvKVxuICAgICAgICAgIHRyaWdnZXJBdWRpb0J1ZmZlcnNbZXZlbnQudHJpZ2dlckF1ZGlvLmlkXSA9IGV2ZW50LnRyaWdnZXJBdWRpby5maWxlO1xuXG4gICAgICAgIC8vIGJhY2tncm91bmQgaW1hZ2UgZG9tYWluIG9yIHN1YiBsb2NhdGlvbiBhcmUgbm90IGFic3RyYWN0ZWQgYnlcbiAgICAgICAgLy8gYSBzZXJ2aWNlLCBzbyBvdmVycmlkZSB0aGUgdXJsXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSAnYmFja2dyb3VuZC1pbWFnZScpIHtcbiAgICAgICAgICBldmVudC51cmwgPSBhc3NldHNQYXRoICsgZXZlbnQudXJsO1xuICAgICAgICAgIGJhY2tncm91bmRJbWFnZXMucHVzaChldmVudC51cmwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRyaWdnZXJBdWRpb0J1ZmZlcnMudGVzdEZpbGUgPSB0aGlzLnByb2plY3RDb25maWcudHh0LnNvdW5kQ2hlY2sudGVzdEZpbGU7XG5cbiAgICB0aGlzLmF1ZGlvQnVmZmVyTWFuYWdlciA9IHRoaXMucmVxdWlyZSgnYXVkaW8tYnVmZmVyLW1hbmFnZXInLCB7XG4gICAgICBhc3NldHNEb21haW46IGFzc2V0c1BhdGgsXG4gICAgICBmaWxlczogdHJpZ2dlckF1ZGlvQnVmZmVycyxcbiAgICB9KTtcblxuICAgIHRoaXMuaW1hZ2VzTG9hZGVyID0gdGhpcy5yZXF1aXJlKCdpbWFnZXMtbG9hZGVyJywge1xuICAgICAgLy8gYXNzZXRzRG9tYWluOiBhc3NldHNQYXRoLCAvLyBpcyBhbHJlYWR5IG92ZXJyaWRlbi4uLlxuICAgICAgZmlsZXM6IGJhY2tncm91bmRJbWFnZXMsXG4gICAgfSk7XG5cbiAgICB0aGlzLnNvdW5kQ2hlY2sgPSB0aGlzLnJlcXVpcmUoJ3NvdW5kLWNoZWNrJyk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgdGhpcy5zaW1wbGVQbGF5ZXIgPSBuZXcgU2ltcGxlUGxheWVyKHRoaXMuYXVkaW9CdWZmZXJNYW5hZ2VyLmRhdGEpO1xuICAgIHRoaXMudmlldyA9IG5ldyBQbGF5ZXJWaWV3KHtcbiAgICAgIHN0YXRlOiAnZXhwZXJpZW5jZScsXG4gICAgICB0eHQ6IHRoaXMucHJvamVjdENvbmZpZy50eHQucmVzdGFydFBhZ2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLnNob3coKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMudHJhbnNwb3J0ID0gbmV3IGF1ZGlvLlRyYW5zcG9ydCgpO1xuICAgICAgdGhpcy5wbGF5Q29udHJvbCA9IG5ldyBhdWRpby5QbGF5Q29udHJvbCh0aGlzLnRyYW5zcG9ydCk7XG5cbiAgICAgIHRoaXMuY3VycmVudFN0YXRlSW5kZXggPSBudWxsO1xuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG5cbiAgICAgIC8vIGluaXQgZGVidWcgLSBsaXN0ZW4gZm9yIGNvbnRyb2xsZXIgZm9yIGRlYnVnZ2luZyAvIHRlc3RcbiAgICAgIHRoaXMuZGVidWdNb2RlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuc2hhcmVkUGFyYW1zLmFkZFBhcmFtTGlzdGVuZXIoJ2RlYnVnLW1vZGUnLCB2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMuZGVidWdNb2RlID0gdmFsdWU7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5wcm9qZWN0Q29uZmlnLnN0YXRlcy5mb3JFYWNoKChzdGF0ZSwgc3RhdGVJbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gc2x1Z2lmeShzdGF0ZS50aXRsZSk7XG5cbiAgICAgICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcihuYW1lLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLmRlYnVnTW9kZSB8fMKgIXZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgLy8gZ2V0IGV2ZW50IGluZGV4IGZyb20gdmFsdWVcbiAgICAgICAgICBjb25zdCBnZXRQcmVmaXggPSAvXlxcW1swLTldK1xcXS87XG4gICAgICAgICAgY29uc3QgY2xlYW5QcmVmaXggPSAvXFxbfFxcXS9nO1xuICAgICAgICAgIGNvbnN0IHByZWZpeCA9IGdldFByZWZpeC5leGVjKHZhbHVlKVswXTtcbiAgICAgICAgICBjb25zdCBldmVudEluZGV4ID0gcGFyc2VJbnQocHJlZml4LnJlcGxhY2UoY2xlYW5QcmVmaXgsICcnKSk7XG5cbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlSW5kZXgsIGV2ZW50SW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwcm9ncmVzc2lvbiA9IHRoaXMucmV0cmlldmVQcm9ncmVzc2lvbigpO1xuXG4gICAgICBpZiAoIXRoaXMuZGVidWdNb2RlKSB7XG4gICAgICAgIGlmIChwcm9ncmVzc2lvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMudmlldy5tb2RlbC5zdGF0ZSA9ICdjaG9pY2UnO1xuICAgICAgICAgIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgICAgICAgIHRoaXMudmlldy5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgICAgICdjbGljayAjcmVzdGFydCc6ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy52aWV3Lmluc3RhbGxFdmVudHMoe30sIHRydWUpO1xuICAgICAgICAgICAgICB0aGlzLnZpZXcubW9kZWwuc3RhdGUgPSAnZXhwZXJpZW5jZSc7XG4gICAgICAgICAgICAgIHRoaXMudmlldy5yZW5kZXIoKTtcbiAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY2xpY2sgI2NvbnRpbnVlJzogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnZpZXcuaW5zdGFsbEV2ZW50cyh7fSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIHRoaXMudmlldy5tb2RlbC5zdGF0ZSA9ICdleHBlcmllbmNlJztcbiAgICAgICAgICAgICAgdGhpcy52aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHByb2dyZXNzaW9uLnN0YXRlSW5kZXgsIHByb2dyZXNzaW9uLmV2ZW50SW5kZXgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfVxuXG4gIC8vIHNldHVwIGFuZCBzdGFydCBpbnRyb2R1Y3Rpb24gKHRleHQgKyByZWFkaW5nIHZvaWNlKVxuICBzZXRTdGF0ZShzdGF0ZUluZGV4LCBldmVudEluZGV4ID0gMCkge1xuICAgIHRoaXMuY3VycmVudFN0YXRlSW5kZXggPSBzdGF0ZUluZGV4O1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMucHJvamVjdENvbmZpZztcblxuICAgIGlmICh0aGlzLnN0YXRlKSB7XG4gICAgICB0aGlzLnN0YXRlLmV4aXQoKTtcbiAgICAgIHRoaXMudmlldy5jbGVhcigpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlQ29uZmlnID0gY29uZmlnLnN0YXRlc1tzdGF0ZUluZGV4XTtcbiAgICBjb25zdCBjb21tb25Db25maWcgPSBjb25maWcuY29tbW9uO1xuICAgIGNvbnN0IGlzTGFzdCA9IChzdGF0ZUluZGV4ID09PSBjb25maWcuc3RhdGVzLmxlbmd0aCAtIDEpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IG5ldyBTdGF0ZShzdGF0ZUluZGV4LCB0aGlzLCBzdGF0ZUNvbmZpZywgY29tbW9uQ29uZmlnLCBpc0xhc3QpO1xuICAgIHRoaXMuc3RhdGUuZW50ZXIoKTtcblxuICAgIGlmIChldmVudEluZGV4ICE9PSAwKVxuICAgICAgdGhpcy5zdGF0ZS5zZWVrKGV2ZW50SW5kZXgpO1xuICB9XG5cbiAgc2F2ZVByb2dyZXNzaW9uKHN0YXRlSW5kZXgsIGV2ZW50SW5kZXgpIHtcbiAgICBjb25zdCBzdG9yZSA9IEpTT04uc3RyaW5naWZ5KHsgc3RhdGVJbmRleCwgZXZlbnRJbmRleCB9KTtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxTdG9yYWdlSWQsIHN0b3JlKTtcbiAgfVxuXG4gIHJldHJpZXZlUHJvZ3Jlc3Npb24oKSB7XG4gICAgbGV0IHN0b3JlID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICBzdG9yZSA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZUlkKSk7XG4gICAgfSBjYXRjaChlcnIpIHt9XG5cbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cblxuICBkZWxldGVQcm9ncmVzc2lvbigpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9jYWxTdG9yYWdlSWQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllckV4cGVyaWVuY2U7XG5cblxuIl19