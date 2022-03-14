'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerExperience = function (_Experience) {
  (0, _inherits3.default)(PlayerExperience, _Experience);

  function PlayerExperience(clientType, projectConfig, projectName) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this, clientType));

    _this.projectConfig = projectConfig;
    _this.projectName = projectName;
    // services
    _this.checkin = _this.require('checkin');
    _this.sync = _this.require('sync');
    _this.audioBufferManager = _this.require('audio-buffer-manager');
    _this.sharedParams = _this.require('shared-params');

    // get all stream files from app configuration
    var streamFiles = projectConfig.states.map(function (state) {
      return state.stream.file;
    });
    streamFiles.push(projectConfig.common.fallbackStream.file);
    // folder in which the streams are located
    var assetsPath = _path2.default.join('projects', projectName, 'assets');

    _this.audioStreamManager = _this.require('audio-stream-manager', {
      audioFiles: (0, _from2.default)(new _set2.default(streamFiles)), // deduplicate
      publicDirectory: assetsPath,
      compress: true,
      duration: 4,
      overlap: 0.1
    });

    _this.soundCheck = _this.require('sound-check');

    if (_this.projectConfig.environment.osc) {
      _this.osc = _this.require('osc');
    }
    return _this;
  }

  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      // if osc sync clocks with max
      if (this.projectConfig.environment.osc) {
        setInterval(function () {
          var syncTime = _this2.sync.getSyncTime();
          _this2.osc.send('/clock', syncTime);
        }, 1000);
      }
    }
  }, {
    key: 'enter',
    value: function enter(client) {
      var _this3 = this;

      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'enter', this).call(this, client);

      if (this.projectConfig.environment.osc) {
        this.receive(client, 'osc', function (data) {
          _this3.osc.send('/player', data);
        });
      }
    }
  }, {
    key: 'exit',
    value: function exit(client) {
      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'exit', this).call(this, client);

      if (this.projectConfig.environment.osc) this.osc.send('/player', [client.index, -1, 0]);
    }
  }]);
  return PlayerExperience;
}(_server.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsiUGxheWVyRXhwZXJpZW5jZSIsImNsaWVudFR5cGUiLCJwcm9qZWN0Q29uZmlnIiwicHJvamVjdE5hbWUiLCJjaGVja2luIiwicmVxdWlyZSIsInN5bmMiLCJhdWRpb0J1ZmZlck1hbmFnZXIiLCJzaGFyZWRQYXJhbXMiLCJzdHJlYW1GaWxlcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwic3RyZWFtIiwiZmlsZSIsInB1c2giLCJjb21tb24iLCJmYWxsYmFja1N0cmVhbSIsImFzc2V0c1BhdGgiLCJwYXRoIiwiam9pbiIsImF1ZGlvU3RyZWFtTWFuYWdlciIsImF1ZGlvRmlsZXMiLCJwdWJsaWNEaXJlY3RvcnkiLCJjb21wcmVzcyIsImR1cmF0aW9uIiwib3ZlcmxhcCIsInNvdW5kQ2hlY2siLCJlbnZpcm9ubWVudCIsIm9zYyIsInNldEludGVydmFsIiwic3luY1RpbWUiLCJnZXRTeW5jVGltZSIsInNlbmQiLCJjbGllbnQiLCJyZWNlaXZlIiwiZGF0YSIsImluZGV4IiwiRXhwZXJpZW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0lBRU1BLGdCOzs7QUFDSiw0QkFBWUMsVUFBWixFQUF3QkMsYUFBeEIsRUFBdUNDLFdBQXZDLEVBQW9EO0FBQUE7O0FBQUEsMEpBQzVDRixVQUQ0Qzs7QUFHbEQsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBO0FBQ0EsVUFBS0MsT0FBTCxHQUFlLE1BQUtDLE9BQUwsQ0FBYSxTQUFiLENBQWY7QUFDQSxVQUFLQyxJQUFMLEdBQVksTUFBS0QsT0FBTCxDQUFhLE1BQWIsQ0FBWjtBQUNBLFVBQUtFLGtCQUFMLEdBQTBCLE1BQUtGLE9BQUwsQ0FBYSxzQkFBYixDQUExQjtBQUNBLFVBQUtHLFlBQUwsR0FBb0IsTUFBS0gsT0FBTCxDQUFhLGVBQWIsQ0FBcEI7O0FBRUE7QUFDQSxRQUFNSSxjQUFjUCxjQUFjUSxNQUFkLENBQXFCQyxHQUFyQixDQUF5QjtBQUFBLGFBQVNDLE1BQU1DLE1BQU4sQ0FBYUMsSUFBdEI7QUFBQSxLQUF6QixDQUFwQjtBQUNBTCxnQkFBWU0sSUFBWixDQUFpQmIsY0FBY2MsTUFBZCxDQUFxQkMsY0FBckIsQ0FBb0NILElBQXJEO0FBQ0E7QUFDQSxRQUFNSSxhQUFhQyxlQUFLQyxJQUFMLENBQVUsVUFBVixFQUFzQmpCLFdBQXRCLEVBQW1DLFFBQW5DLENBQW5COztBQUVBLFVBQUtrQixrQkFBTCxHQUEwQixNQUFLaEIsT0FBTCxDQUFhLHNCQUFiLEVBQXFDO0FBQzdEaUIsa0JBQVksb0JBQVcsa0JBQVFiLFdBQVIsQ0FBWCxDQURpRCxFQUNmO0FBQzlDYyx1QkFBaUJMLFVBRjRDO0FBRzdETSxnQkFBVSxJQUhtRDtBQUk3REMsZ0JBQVUsQ0FKbUQ7QUFLN0RDLGVBQVM7QUFMb0QsS0FBckMsQ0FBMUI7O0FBUUEsVUFBS0MsVUFBTCxHQUFrQixNQUFLdEIsT0FBTCxDQUFhLGFBQWIsQ0FBbEI7O0FBRUEsUUFBSSxNQUFLSCxhQUFMLENBQW1CMEIsV0FBbkIsQ0FBK0JDLEdBQW5DLEVBQXdDO0FBQ3RDLFlBQUtBLEdBQUwsR0FBVyxNQUFLeEIsT0FBTCxDQUFhLEtBQWIsQ0FBWDtBQUNEO0FBN0JpRDtBQThCbkQ7Ozs7NEJBRU87QUFBQTs7QUFDTjtBQUNBLFVBQUksS0FBS0gsYUFBTCxDQUFtQjBCLFdBQW5CLENBQStCQyxHQUFuQyxFQUF3QztBQUN0Q0Msb0JBQVksWUFBTTtBQUNoQixjQUFNQyxXQUFXLE9BQUt6QixJQUFMLENBQVUwQixXQUFWLEVBQWpCO0FBQ0EsaUJBQUtILEdBQUwsQ0FBU0ksSUFBVCxDQUFjLFFBQWQsRUFBd0JGLFFBQXhCO0FBQ0QsU0FIRCxFQUdHLElBSEg7QUFJRDtBQUNGOzs7MEJBRUtHLE0sRUFBUTtBQUFBOztBQUNaLHNKQUFZQSxNQUFaOztBQUVBLFVBQUksS0FBS2hDLGFBQUwsQ0FBbUIwQixXQUFuQixDQUErQkMsR0FBbkMsRUFBd0M7QUFDdEMsYUFBS00sT0FBTCxDQUFhRCxNQUFiLEVBQXFCLEtBQXJCLEVBQTRCLFVBQUNFLElBQUQsRUFBVTtBQUNwQyxpQkFBS1AsR0FBTCxDQUFTSSxJQUFULENBQWMsU0FBZCxFQUF5QkcsSUFBekI7QUFDRCxTQUZEO0FBR0Q7QUFDRjs7O3lCQUVJRixNLEVBQVE7QUFDWCxxSkFBV0EsTUFBWDs7QUFFQSxVQUFJLEtBQUtoQyxhQUFMLENBQW1CMEIsV0FBbkIsQ0FBK0JDLEdBQW5DLEVBQ0UsS0FBS0EsR0FBTCxDQUFTSSxJQUFULENBQWMsU0FBZCxFQUF5QixDQUFDQyxPQUFPRyxLQUFSLEVBQWUsQ0FBQyxDQUFoQixFQUFtQixDQUFuQixDQUF6QjtBQUNIOzs7RUExRDRCQyxrQjs7a0JBNkRoQnRDLGdCIiwiZmlsZSI6IlBsYXllckV4cGVyaWVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHBlcmllbmNlIH0gZnJvbSAnc291bmR3b3Jrcy9zZXJ2ZXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNsYXNzIFBsYXllckV4cGVyaWVuY2UgZXh0ZW5kcyBFeHBlcmllbmNlIHtcbiAgY29uc3RydWN0b3IoY2xpZW50VHlwZSwgcHJvamVjdENvbmZpZywgcHJvamVjdE5hbWUpIHtcbiAgICBzdXBlcihjbGllbnRUeXBlKTtcblxuICAgIHRoaXMucHJvamVjdENvbmZpZyA9IHByb2plY3RDb25maWc7XG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IHByb2plY3ROYW1lO1xuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5jaGVja2luID0gdGhpcy5yZXF1aXJlKCdjaGVja2luJyk7XG4gICAgdGhpcy5zeW5jID0gdGhpcy5yZXF1aXJlKCdzeW5jJyk7XG4gICAgdGhpcy5hdWRpb0J1ZmZlck1hbmFnZXIgPSB0aGlzLnJlcXVpcmUoJ2F1ZGlvLWJ1ZmZlci1tYW5hZ2VyJyk7XG4gICAgdGhpcy5zaGFyZWRQYXJhbXMgPSB0aGlzLnJlcXVpcmUoJ3NoYXJlZC1wYXJhbXMnKTtcblxuICAgIC8vIGdldCBhbGwgc3RyZWFtIGZpbGVzIGZyb20gYXBwIGNvbmZpZ3VyYXRpb25cbiAgICBjb25zdCBzdHJlYW1GaWxlcyA9IHByb2plY3RDb25maWcuc3RhdGVzLm1hcChzdGF0ZSA9PiBzdGF0ZS5zdHJlYW0uZmlsZSk7XG4gICAgc3RyZWFtRmlsZXMucHVzaChwcm9qZWN0Q29uZmlnLmNvbW1vbi5mYWxsYmFja1N0cmVhbS5maWxlKTtcbiAgICAvLyBmb2xkZXIgaW4gd2hpY2ggdGhlIHN0cmVhbXMgYXJlIGxvY2F0ZWRcbiAgICBjb25zdCBhc3NldHNQYXRoID0gcGF0aC5qb2luKCdwcm9qZWN0cycsIHByb2plY3ROYW1lLCAnYXNzZXRzJyk7XG5cbiAgICB0aGlzLmF1ZGlvU3RyZWFtTWFuYWdlciA9IHRoaXMucmVxdWlyZSgnYXVkaW8tc3RyZWFtLW1hbmFnZXInLCB7XG4gICAgICBhdWRpb0ZpbGVzOiBBcnJheS5mcm9tKG5ldyBTZXQoc3RyZWFtRmlsZXMpKSwgLy8gZGVkdXBsaWNhdGVcbiAgICAgIHB1YmxpY0RpcmVjdG9yeTogYXNzZXRzUGF0aCxcbiAgICAgIGNvbXByZXNzOiB0cnVlLFxuICAgICAgZHVyYXRpb246IDQsXG4gICAgICBvdmVybGFwOiAwLjEsXG4gICAgfSk7XG5cbiAgICB0aGlzLnNvdW5kQ2hlY2sgPSB0aGlzLnJlcXVpcmUoJ3NvdW5kLWNoZWNrJyk7XG5cbiAgICBpZiAodGhpcy5wcm9qZWN0Q29uZmlnLmVudmlyb25tZW50Lm9zYykge1xuICAgICAgdGhpcy5vc2MgPSB0aGlzLnJlcXVpcmUoJ29zYycpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIC8vIGlmIG9zYyBzeW5jIGNsb2NrcyB3aXRoIG1heFxuICAgIGlmICh0aGlzLnByb2plY3RDb25maWcuZW52aXJvbm1lbnQub3NjKSB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN5bmNUaW1lID0gdGhpcy5zeW5jLmdldFN5bmNUaW1lKCk7XG4gICAgICAgIHRoaXMub3NjLnNlbmQoJy9jbG9jaycsIHN5bmNUaW1lKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIGVudGVyKGNsaWVudCkge1xuICAgIHN1cGVyLmVudGVyKGNsaWVudCk7XG5cbiAgICBpZiAodGhpcy5wcm9qZWN0Q29uZmlnLmVudmlyb25tZW50Lm9zYykge1xuICAgICAgdGhpcy5yZWNlaXZlKGNsaWVudCwgJ29zYycsIChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMub3NjLnNlbmQoJy9wbGF5ZXInLCBkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGV4aXQoY2xpZW50KSB7XG4gICAgc3VwZXIuZXhpdChjbGllbnQpO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdENvbmZpZy5lbnZpcm9ubWVudC5vc2MpXG4gICAgICB0aGlzLm9zYy5zZW5kKCcvcGxheWVyJywgW2NsaWVudC5pbmRleCwgLTEsIDBdKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXJFeHBlcmllbmNlO1xuIl19