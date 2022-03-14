'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _serviceViews = require('../shared/serviceViews');

var _serviceViews2 = _interopRequireDefault(_serviceViews);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import client side soundworks and player experience
function bootstrap() {
  document.body.classList.remove('loading');
  // initialize the client with configuration received
  // from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  var config = (0, _assign2.default)({ appContainer: '#container' }, window.soundworksConfig);
  soundworks.client.init(config.clientType, config);

  // configure views for the services
  soundworks.client.setServiceInstanciationHook(function (id, instance) {
    if (_serviceViews2.default.has(id)) instance.view = _serviceViews2.default.get(id, config);
  });

  // create client side (player) experience and start the client
  var experience = new soundworks.ControllerExperience(config.assetsDomain);
  soundworks.client.start();
}
// import PlayerExperience from './PlayerExperience';


window.addEventListener('load', bootstrap);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJib290c3RyYXAiLCJkb2N1bWVudCIsImJvZHkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJjb25maWciLCJhcHBDb250YWluZXIiLCJ3aW5kb3ciLCJzb3VuZHdvcmtzQ29uZmlnIiwiY2xpZW50IiwiaW5pdCIsImNsaWVudFR5cGUiLCJzZXRTZXJ2aWNlSW5zdGFuY2lhdGlvbkhvb2siLCJpZCIsImluc3RhbmNlIiwic2VydmljZVZpZXdzIiwiaGFzIiwidmlldyIsImdldCIsImV4cGVyaWVuY2UiLCJDb250cm9sbGVyRXhwZXJpZW5jZSIsImFzc2V0c0RvbWFpbiIsInN0YXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7O0lBQVlBLFU7O0FBRVo7Ozs7Ozs7O0FBSEE7QUFLQSxTQUFTQyxTQUFULEdBQXFCO0FBQ25CQyxXQUFTQyxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLE1BQXhCLENBQStCLFNBQS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNQyxTQUFTLHNCQUFjLEVBQUVDLGNBQWMsWUFBaEIsRUFBZCxFQUE4Q0MsT0FBT0MsZ0JBQXJELENBQWY7QUFDQVQsYUFBV1UsTUFBWCxDQUFrQkMsSUFBbEIsQ0FBdUJMLE9BQU9NLFVBQTlCLEVBQTBDTixNQUExQzs7QUFFQTtBQUNBTixhQUFXVSxNQUFYLENBQWtCRywyQkFBbEIsQ0FBOEMsVUFBQ0MsRUFBRCxFQUFLQyxRQUFMLEVBQWtCO0FBQzlELFFBQUlDLHVCQUFhQyxHQUFiLENBQWlCSCxFQUFqQixDQUFKLEVBQ0VDLFNBQVNHLElBQVQsR0FBZ0JGLHVCQUFhRyxHQUFiLENBQWlCTCxFQUFqQixFQUFxQlIsTUFBckIsQ0FBaEI7QUFDSCxHQUhEOztBQUtBO0FBQ0EsTUFBTWMsYUFBYSxJQUFJcEIsV0FBV3FCLG9CQUFmLENBQW9DZixPQUFPZ0IsWUFBM0MsQ0FBbkI7QUFDQXRCLGFBQVdVLE1BQVgsQ0FBa0JhLEtBQWxCO0FBQ0Q7QUFyQkQ7OztBQXVCQWYsT0FBT2dCLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDdkIsU0FBaEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgY2xpZW50IHNpZGUgc291bmR3b3JrcyBhbmQgcGxheWVyIGV4cGVyaWVuY2VcbmltcG9ydCAqIGFzIHNvdW5kd29ya3MgZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuLy8gaW1wb3J0IFBsYXllckV4cGVyaWVuY2UgZnJvbSAnLi9QbGF5ZXJFeHBlcmllbmNlJztcbmltcG9ydCBzZXJ2aWNlVmlld3MgZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VWaWV3cyc7XG5cbmZ1bmN0aW9uIGJvb3RzdHJhcCgpIHtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gIC8vIGluaXRpYWxpemUgdGhlIGNsaWVudCB3aXRoIGNvbmZpZ3VyYXRpb24gcmVjZWl2ZWRcbiAgLy8gZnJvbSB0aGUgc2VydmVyIHRocm91Z2ggdGhlIGBpbmRleC5odG1sYFxuICAvLyBAc2VlIHt+L3NyYy9zZXJ2ZXIvaW5kZXguanN9XG4gIC8vIEBzZWUge34vaHRtbC9kZWZhdWx0LmVqc31cbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7IGFwcENvbnRhaW5lcjogJyNjb250YWluZXInIH0sIHdpbmRvdy5zb3VuZHdvcmtzQ29uZmlnKTtcbiAgc291bmR3b3Jrcy5jbGllbnQuaW5pdChjb25maWcuY2xpZW50VHlwZSwgY29uZmlnKTtcblxuICAvLyBjb25maWd1cmUgdmlld3MgZm9yIHRoZSBzZXJ2aWNlc1xuICBzb3VuZHdvcmtzLmNsaWVudC5zZXRTZXJ2aWNlSW5zdGFuY2lhdGlvbkhvb2soKGlkLCBpbnN0YW5jZSkgPT4ge1xuICAgIGlmIChzZXJ2aWNlVmlld3MuaGFzKGlkKSlcbiAgICAgIGluc3RhbmNlLnZpZXcgPSBzZXJ2aWNlVmlld3MuZ2V0KGlkLCBjb25maWcpO1xuICB9KTtcblxuICAvLyBjcmVhdGUgY2xpZW50IHNpZGUgKHBsYXllcikgZXhwZXJpZW5jZSBhbmQgc3RhcnQgdGhlIGNsaWVudFxuICBjb25zdCBleHBlcmllbmNlID0gbmV3IHNvdW5kd29ya3MuQ29udHJvbGxlckV4cGVyaWVuY2UoY29uZmlnLmFzc2V0c0RvbWFpbik7XG4gIHNvdW5kd29ya3MuY2xpZW50LnN0YXJ0KCk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYm9vdHN0cmFwKTtcbiJdfQ==