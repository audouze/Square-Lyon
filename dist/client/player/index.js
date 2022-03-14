'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

require('whatwg-fetch');

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _PlayerExperience = require('./PlayerExperience');

var _PlayerExperience2 = _interopRequireDefault(_PlayerExperience);

var _serviceViews = require('../shared/serviceViews');

var _serviceViews2 = _interopRequireDefault(_serviceViews);

var _ImagesLoader = require('../shared/services/ImagesLoader');

var _ImagesLoader2 = _interopRequireDefault(_ImagesLoader);

var _SoundCheck = require('../shared/services/SoundCheck');

var _SoundCheck2 = _interopRequireDefault(_SoundCheck);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import client side soundworks and player experience
var config = (0, _assign2.default)({ appContainer: '#container' }, window.soundworksConfig);

function bootstrap(projectConfig) {
  projectConfig = JSON.parse(projectConfig);
  document.body.classList.remove('loading');
  // initialize the client with configuration received
  // from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  soundworks.client.init(config.clientType, config);

  // configure views for the services
  soundworks.client.setServiceInstanciationHook(function (id, instance) {
    if (_serviceViews2.default.has(id)) {
      instance.view = _serviceViews2.default.get(id, config);
    }

    // use audio buffer manager view for images loader
    if (id === 'service:images-loader') {
      instance.view = _serviceViews2.default.get('service:audio-buffer-manager', config);
    }

    if (id === 'service:platform') {
      instance.view = _serviceViews2.default.get('service:platform', projectConfig.txt.home);
    }

    if (id === 'service:sound-check') {
      instance.view = _serviceViews2.default.get('service:sound-check', projectConfig.txt.soundCheck);
    }
  });

  var vibrateHook = {
    id: 'vibrate',
    check: function check() {
      return true; // can't break application
    },
    interactionHook: function interactionHook() {
      // check for vibrate API (not in Safari)
      if (window.navigator.vibrate !== undefined) {
        window.navigator.vibrate(1);
      }
      return _promise2.default.resolve(true);
    }
  };

  var platform = soundworks.client.require('platform');
  platform.addFeatureDefinition(vibrateHook);

  // create client side (player) experience and start the client
  var experience = new _PlayerExperience2.default(config, projectConfig);
  soundworks.client.start();
}

window.addEventListener('load', function () {
  window.fetch(config.assetsDomain + 'project-config').then(function (response) {
    return response.json();
  }).then(bootstrap);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJjb25maWciLCJhcHBDb250YWluZXIiLCJ3aW5kb3ciLCJzb3VuZHdvcmtzQ29uZmlnIiwiYm9vdHN0cmFwIiwicHJvamVjdENvbmZpZyIsIkpTT04iLCJwYXJzZSIsImRvY3VtZW50IiwiYm9keSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImNsaWVudCIsImluaXQiLCJjbGllbnRUeXBlIiwic2V0U2VydmljZUluc3RhbmNpYXRpb25Ib29rIiwiaWQiLCJpbnN0YW5jZSIsInNlcnZpY2VWaWV3cyIsImhhcyIsInZpZXciLCJnZXQiLCJ0eHQiLCJob21lIiwic291bmRDaGVjayIsInZpYnJhdGVIb29rIiwiY2hlY2siLCJpbnRlcmFjdGlvbkhvb2siLCJuYXZpZ2F0b3IiLCJ2aWJyYXRlIiwidW5kZWZpbmVkIiwicmVzb2x2ZSIsInBsYXRmb3JtIiwicmVxdWlyZSIsImFkZEZlYXR1cmVEZWZpbml0aW9uIiwiZXhwZXJpZW5jZSIsIlBsYXllckV4cGVyaWVuY2UiLCJzdGFydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmZXRjaCIsImFzc2V0c0RvbWFpbiIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7SUFBWUEsVTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFOQTtBQVFBLElBQU1DLFNBQVMsc0JBQWMsRUFBRUMsY0FBYyxZQUFoQixFQUFkLEVBQThDQyxPQUFPQyxnQkFBckQsQ0FBZjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxhQUFuQixFQUFrQztBQUNoQ0Esa0JBQWdCQyxLQUFLQyxLQUFMLENBQVdGLGFBQVgsQ0FBaEI7QUFDQUcsV0FBU0MsSUFBVCxDQUFjQyxTQUFkLENBQXdCQyxNQUF4QixDQUErQixTQUEvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FaLGFBQVdhLE1BQVgsQ0FBa0JDLElBQWxCLENBQXVCYixPQUFPYyxVQUE5QixFQUEwQ2QsTUFBMUM7O0FBRUE7QUFDQUQsYUFBV2EsTUFBWCxDQUFrQkcsMkJBQWxCLENBQThDLFVBQUNDLEVBQUQsRUFBS0MsUUFBTCxFQUFrQjtBQUM5RCxRQUFJQyx1QkFBYUMsR0FBYixDQUFpQkgsRUFBakIsQ0FBSixFQUEwQjtBQUN4QkMsZUFBU0csSUFBVCxHQUFnQkYsdUJBQWFHLEdBQWIsQ0FBaUJMLEVBQWpCLEVBQXFCaEIsTUFBckIsQ0FBaEI7QUFDRDs7QUFFRDtBQUNBLFFBQUlnQixPQUFPLHVCQUFYLEVBQW9DO0FBQ2xDQyxlQUFTRyxJQUFULEdBQWdCRix1QkFBYUcsR0FBYixDQUFpQiw4QkFBakIsRUFBaURyQixNQUFqRCxDQUFoQjtBQUNEOztBQUVELFFBQUlnQixPQUFPLGtCQUFYLEVBQStCO0FBQzdCQyxlQUFTRyxJQUFULEdBQWdCRix1QkFBYUcsR0FBYixDQUFpQixrQkFBakIsRUFBcUNoQixjQUFjaUIsR0FBZCxDQUFrQkMsSUFBdkQsQ0FBaEI7QUFDRDs7QUFFRCxRQUFJUCxPQUFPLHFCQUFYLEVBQWtDO0FBQ2hDQyxlQUFTRyxJQUFULEdBQWdCRix1QkFBYUcsR0FBYixDQUFpQixxQkFBakIsRUFBd0NoQixjQUFjaUIsR0FBZCxDQUFrQkUsVUFBMUQsQ0FBaEI7QUFDRDtBQUNGLEdBakJEOztBQW1CQSxNQUFNQyxjQUFjO0FBQ2xCVCxRQUFJLFNBRGM7QUFFbEJVLFdBQU8saUJBQVc7QUFDaEIsYUFBTyxJQUFQLENBRGdCLENBQ0g7QUFDZCxLQUppQjtBQUtsQkMscUJBQWlCLDJCQUFXO0FBQzFCO0FBQ0EsVUFBSXpCLE9BQU8wQixTQUFQLENBQWlCQyxPQUFqQixLQUE2QkMsU0FBakMsRUFBNkM7QUFDM0M1QixlQUFPMEIsU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUIsQ0FBekI7QUFDRDtBQUNELGFBQU8sa0JBQVFFLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBUDtBQUNEO0FBWGlCLEdBQXBCOztBQWNBLE1BQU1DLFdBQVdqQyxXQUFXYSxNQUFYLENBQWtCcUIsT0FBbEIsQ0FBMEIsVUFBMUIsQ0FBakI7QUFDQUQsV0FBU0Usb0JBQVQsQ0FBOEJULFdBQTlCOztBQUVBO0FBQ0EsTUFBTVUsYUFBYSxJQUFJQywwQkFBSixDQUFxQnBDLE1BQXJCLEVBQTZCSyxhQUE3QixDQUFuQjtBQUNBTixhQUFXYSxNQUFYLENBQWtCeUIsS0FBbEI7QUFDRDs7QUFFRG5DLE9BQU9vQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFNO0FBQ3BDcEMsU0FBT3FDLEtBQVAsQ0FBYXZDLE9BQU93QyxZQUFQLEdBQXNCLGdCQUFuQyxFQUNHQyxJQURILENBQ1E7QUFBQSxXQUFZQyxTQUFTQyxJQUFULEVBQVo7QUFBQSxHQURSLEVBRUdGLElBRkgsQ0FFUXJDLFNBRlI7QUFHRCxDQUpEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IGNsaWVudCBzaWRlIHNvdW5kd29ya3MgYW5kIHBsYXllciBleHBlcmllbmNlXG5pbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XG5pbXBvcnQgKiBhcyBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmltcG9ydCBQbGF5ZXJFeHBlcmllbmNlIGZyb20gJy4vUGxheWVyRXhwZXJpZW5jZSc7XG5pbXBvcnQgc2VydmljZVZpZXdzIGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlVmlld3MnO1xuaW1wb3J0IEltYWdlc0xvYWRlciBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvSW1hZ2VzTG9hZGVyJztcbmltcG9ydCBTb3VuZENoZWNrIGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9Tb3VuZENoZWNrJztcblxuY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7IGFwcENvbnRhaW5lcjogJyNjb250YWluZXInIH0sIHdpbmRvdy5zb3VuZHdvcmtzQ29uZmlnKTtcblxuZnVuY3Rpb24gYm9vdHN0cmFwKHByb2plY3RDb25maWcpIHtcbiAgcHJvamVjdENvbmZpZyA9IEpTT04ucGFyc2UocHJvamVjdENvbmZpZyk7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAvLyBpbml0aWFsaXplIHRoZSBjbGllbnQgd2l0aCBjb25maWd1cmF0aW9uIHJlY2VpdmVkXG4gIC8vIGZyb20gdGhlIHNlcnZlciB0aHJvdWdoIHRoZSBgaW5kZXguaHRtbGBcbiAgLy8gQHNlZSB7fi9zcmMvc2VydmVyL2luZGV4LmpzfVxuICAvLyBAc2VlIHt+L2h0bWwvZGVmYXVsdC5lanN9XG4gIHNvdW5kd29ya3MuY2xpZW50LmluaXQoY29uZmlnLmNsaWVudFR5cGUsIGNvbmZpZyk7XG5cbiAgLy8gY29uZmlndXJlIHZpZXdzIGZvciB0aGUgc2VydmljZXNcbiAgc291bmR3b3Jrcy5jbGllbnQuc2V0U2VydmljZUluc3RhbmNpYXRpb25Ib29rKChpZCwgaW5zdGFuY2UpID0+IHtcbiAgICBpZiAoc2VydmljZVZpZXdzLmhhcyhpZCkpIHtcbiAgICAgIGluc3RhbmNlLnZpZXcgPSBzZXJ2aWNlVmlld3MuZ2V0KGlkLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8vIHVzZSBhdWRpbyBidWZmZXIgbWFuYWdlciB2aWV3IGZvciBpbWFnZXMgbG9hZGVyXG4gICAgaWYgKGlkID09PSAnc2VydmljZTppbWFnZXMtbG9hZGVyJykge1xuICAgICAgaW5zdGFuY2UudmlldyA9IHNlcnZpY2VWaWV3cy5nZXQoJ3NlcnZpY2U6YXVkaW8tYnVmZmVyLW1hbmFnZXInLCBjb25maWcpO1xuICAgIH1cblxuICAgIGlmIChpZCA9PT0gJ3NlcnZpY2U6cGxhdGZvcm0nKSB7XG4gICAgICBpbnN0YW5jZS52aWV3ID0gc2VydmljZVZpZXdzLmdldCgnc2VydmljZTpwbGF0Zm9ybScsIHByb2plY3RDb25maWcudHh0LmhvbWUpO1xuICAgIH1cblxuICAgIGlmIChpZCA9PT0gJ3NlcnZpY2U6c291bmQtY2hlY2snKSB7XG4gICAgICBpbnN0YW5jZS52aWV3ID0gc2VydmljZVZpZXdzLmdldCgnc2VydmljZTpzb3VuZC1jaGVjaycsIHByb2plY3RDb25maWcudHh0LnNvdW5kQ2hlY2spO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgdmlicmF0ZUhvb2sgPSB7XG4gICAgaWQ6ICd2aWJyYXRlJyxcbiAgICBjaGVjazogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gY2FuJ3QgYnJlYWsgYXBwbGljYXRpb25cbiAgICB9LFxuICAgIGludGVyYWN0aW9uSG9vazogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjaGVjayBmb3IgdmlicmF0ZSBBUEkgKG5vdCBpbiBTYWZhcmkpXG4gICAgICBpZiggd2luZG93Lm5hdmlnYXRvci52aWJyYXRlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IudmlicmF0ZSgxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXRmb3JtID0gc291bmR3b3Jrcy5jbGllbnQucmVxdWlyZSgncGxhdGZvcm0nKTtcbiAgcGxhdGZvcm0uYWRkRmVhdHVyZURlZmluaXRpb24odmlicmF0ZUhvb2spO1xuXG4gIC8vIGNyZWF0ZSBjbGllbnQgc2lkZSAocGxheWVyKSBleHBlcmllbmNlIGFuZCBzdGFydCB0aGUgY2xpZW50XG4gIGNvbnN0IGV4cGVyaWVuY2UgPSBuZXcgUGxheWVyRXhwZXJpZW5jZShjb25maWcsIHByb2plY3RDb25maWcpO1xuICBzb3VuZHdvcmtzLmNsaWVudC5zdGFydCgpO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgd2luZG93LmZldGNoKGNvbmZpZy5hc3NldHNEb21haW4gKyAncHJvamVjdC1jb25maWcnKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihib290c3RyYXApO1xufSk7XG4iXX0=