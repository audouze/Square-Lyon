'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

// Configuration of the application.
// Other entries can be added (as long as their name doesn't conflict with
// existing ones) to define global parameters of the application (e.g. BPM,
// synth parameters) that can then be shared easily among all clients using
// the `shared-config` service.
exports.default = {
  // name of the application, used in the `.ejs` template and by default in
  // the `platform` service to populate its view
  appName: 'SQUARE',

  projectName: 'default',

  // name of the environnement ('production' enable cache in express application)
  env: 'development',

  // version of application, can be used to force reload css and js files
  // from server (cf. `html/default.ejs`)
  version: '0.0.1',

  // name of the default client type, i.e. the client that can access the
  // application at its root URL
  defaultClient: 'player',

  // define from where the assets (static files) should be loaded, these value
  // could also refer to a separate server for scalability reasons. This value
  // should also be used client-side to configure the `audio-buffer-manager` service.
  assetsDomain: '/',

  // port used to open the http server, in production this value is typically 80
  port: 8000,

  // define if the server should use gzip compression for static files
  enableGZipCompression: true,

  // location of the public directory (accessible through http(s) requests)
  publicDirectory: _path2.default.join(cwd, 'public'),

  // directory where the server templating system looks for the `ejs` templates
  templateDirectory: _path2.default.join(cwd, 'html'),

  // define if the HTTP server should be launched using secure connections.
  // For development purposes when set to `true` and no certificates are given
  // (cf. `httpsInfos`), a self-signed certificate is created.
  useHttps: false,

  // paths to the key and certificate to be used in order to launch the https
  // server. Both entries are required otherwise a self-signed certificate
  // is generated.
  httpsInfos: {
    key: null,
    cert: null
  },

  // socket.io configuration
  websockets: {
    url: '',
    transports: ['websocket'],
    path: ''
    // @note: EngineIO defaults
    // pingTimeout: 3000,
    // pingInterval: 1000,
    // upgradeTimeout: 10000,
    // maxHttpBufferSize: 10E7,
  },

  // describe the location where the experience takes places, theses values are
  // used by the `placer`, `checkin` and `locator` services.
  // if one of these service is required, this entry shouldn't be removed.
  setup: {
    area: {
      width: 1,
      height: 1,
      // path to an image to be used in the area representation
      background: null
    },
    // list of predefined labels
    labels: null,
    // list of predefined coordinates given as an array of `[x:Number, y:Number]`
    coordinates: null,
    // maximum number of clients allowed in a position
    maxClientsPerPosition: 1,
    // maximum number of positions (may limit or be limited by the number of
    // labels and/or coordinates)
    capacity: Infinity
  },

  // password to be used by the `auth` service
  password: '',

  // configuration of the `osc` service
  osc: {
    // IP of the currently running node server
    receiveAddress: '127.0.0.1',
    // port listening for incomming messages
    receivePort: 57121,
    // IP of the remote application
    sendAddress: '127.0.0.1',
    // port where the remote application is listening for messages
    sendPort: 57120
  },

  // configuration of the `raw-socket` service
  rawSocket: {
    // port used for socket connection
    port: 8080
  },

  // bunyan configuration
  logger: {
    name: 'soundworks',
    level: 'info',
    streams: [{
      level: 'info',
      stream: process.stdout
    }]
  },

  // directory where error reported from the clients are written
  errorReporterDirectory: _path2.default.join(cwd, 'logs', 'clients')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQuanMiXSwibmFtZXMiOlsiY3dkIiwicHJvY2VzcyIsImFwcE5hbWUiLCJwcm9qZWN0TmFtZSIsImVudiIsInZlcnNpb24iLCJkZWZhdWx0Q2xpZW50IiwiYXNzZXRzRG9tYWluIiwicG9ydCIsImVuYWJsZUdaaXBDb21wcmVzc2lvbiIsInB1YmxpY0RpcmVjdG9yeSIsInBhdGgiLCJqb2luIiwidGVtcGxhdGVEaXJlY3RvcnkiLCJ1c2VIdHRwcyIsImh0dHBzSW5mb3MiLCJrZXkiLCJjZXJ0Iiwid2Vic29ja2V0cyIsInVybCIsInRyYW5zcG9ydHMiLCJzZXR1cCIsImFyZWEiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmQiLCJsYWJlbHMiLCJjb29yZGluYXRlcyIsIm1heENsaWVudHNQZXJQb3NpdGlvbiIsImNhcGFjaXR5IiwiSW5maW5pdHkiLCJwYXNzd29yZCIsIm9zYyIsInJlY2VpdmVBZGRyZXNzIiwicmVjZWl2ZVBvcnQiLCJzZW5kQWRkcmVzcyIsInNlbmRQb3J0IiwicmF3U29ja2V0IiwibG9nZ2VyIiwibmFtZSIsImxldmVsIiwic3RyZWFtcyIsInN0cmVhbSIsInN0ZG91dCIsImVycm9yUmVwb3J0ZXJEaXJlY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFDQSxJQUFNQSxNQUFNQyxRQUFRRCxHQUFSLEVBQVo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtrQkFDZTtBQUNiO0FBQ0E7QUFDQUUsV0FBUyxRQUhJOztBQUtiQyxlQUFhLFNBTEE7O0FBT2I7QUFDQUMsT0FBSyxhQVJROztBQVViO0FBQ0E7QUFDQUMsV0FBUyxPQVpJOztBQWNiO0FBQ0E7QUFDQUMsaUJBQWUsUUFoQkY7O0FBa0JiO0FBQ0E7QUFDQTtBQUNBQyxnQkFBYyxHQXJCRDs7QUF1QmI7QUFDQUMsUUFBTSxJQXhCTzs7QUEwQmI7QUFDQUMseUJBQXVCLElBM0JWOztBQTZCYjtBQUNBQyxtQkFBaUJDLGVBQUtDLElBQUwsQ0FBVVosR0FBVixFQUFlLFFBQWYsQ0E5Qko7O0FBZ0NiO0FBQ0FhLHFCQUFtQkYsZUFBS0MsSUFBTCxDQUFVWixHQUFWLEVBQWUsTUFBZixDQWpDTjs7QUFtQ2I7QUFDQTtBQUNBO0FBQ0FjLFlBQVUsS0F0Q0c7O0FBd0NiO0FBQ0E7QUFDQTtBQUNBQyxjQUFZO0FBQ1ZDLFNBQUssSUFESztBQUVWQyxVQUFNO0FBRkksR0EzQ0M7O0FBZ0RiO0FBQ0FDLGNBQVk7QUFDVkMsU0FBSyxFQURLO0FBRVZDLGdCQUFZLENBQUMsV0FBRCxDQUZGO0FBR1ZULFVBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUlUsR0FqREM7O0FBNERiO0FBQ0E7QUFDQTtBQUNBVSxTQUFPO0FBQ0xDLFVBQU07QUFDSkMsYUFBTyxDQURIO0FBRUpDLGNBQVEsQ0FGSjtBQUdKO0FBQ0FDLGtCQUFZO0FBSlIsS0FERDtBQU9MO0FBQ0FDLFlBQVEsSUFSSDtBQVNMO0FBQ0FDLGlCQUFhLElBVlI7QUFXTDtBQUNBQywyQkFBdUIsQ0FabEI7QUFhTDtBQUNBO0FBQ0FDLGNBQVVDO0FBZkwsR0EvRE07O0FBaUZiO0FBQ0FDLFlBQVUsRUFsRkc7O0FBb0ZiO0FBQ0FDLE9BQUs7QUFDSDtBQUNBQyxvQkFBZ0IsV0FGYjtBQUdIO0FBQ0FDLGlCQUFhLEtBSlY7QUFLSDtBQUNBQyxpQkFBYSxXQU5WO0FBT0g7QUFDQUMsY0FBVTtBQVJQLEdBckZROztBQWdHYjtBQUNBQyxhQUFXO0FBQ1Q7QUFDQTdCLFVBQU07QUFGRyxHQWpHRTs7QUFzR2I7QUFDQThCLFVBQVE7QUFDTkMsVUFBTSxZQURBO0FBRU5DLFdBQU8sTUFGRDtBQUdOQyxhQUFTLENBQUM7QUFDUkQsYUFBTyxNQURDO0FBRVJFLGNBQVF6QyxRQUFRMEM7QUFGUixLQUFEO0FBSEgsR0F2R0s7O0FBbUhiO0FBQ0FDLDBCQUF3QmpDLGVBQUtDLElBQUwsQ0FBVVosR0FBVixFQUFlLE1BQWYsRUFBdUIsU0FBdkI7QUFwSFgsQyIsImZpbGUiOiJkZWZhdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5jb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpO1xuXG4vLyBDb25maWd1cmF0aW9uIG9mIHRoZSBhcHBsaWNhdGlvbi5cbi8vIE90aGVyIGVudHJpZXMgY2FuIGJlIGFkZGVkIChhcyBsb25nIGFzIHRoZWlyIG5hbWUgZG9lc24ndCBjb25mbGljdCB3aXRoXG4vLyBleGlzdGluZyBvbmVzKSB0byBkZWZpbmUgZ2xvYmFsIHBhcmFtZXRlcnMgb2YgdGhlIGFwcGxpY2F0aW9uIChlLmcuIEJQTSxcbi8vIHN5bnRoIHBhcmFtZXRlcnMpIHRoYXQgY2FuIHRoZW4gYmUgc2hhcmVkIGVhc2lseSBhbW9uZyBhbGwgY2xpZW50cyB1c2luZ1xuLy8gdGhlIGBzaGFyZWQtY29uZmlnYCBzZXJ2aWNlLlxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBuYW1lIG9mIHRoZSBhcHBsaWNhdGlvbiwgdXNlZCBpbiB0aGUgYC5lanNgIHRlbXBsYXRlIGFuZCBieSBkZWZhdWx0IGluXG4gIC8vIHRoZSBgcGxhdGZvcm1gIHNlcnZpY2UgdG8gcG9wdWxhdGUgaXRzIHZpZXdcbiAgYXBwTmFtZTogJ1NRVUFSRScsXG5cbiAgcHJvamVjdE5hbWU6ICdkZWZhdWx0JyxcblxuICAvLyBuYW1lIG9mIHRoZSBlbnZpcm9ubmVtZW50ICgncHJvZHVjdGlvbicgZW5hYmxlIGNhY2hlIGluIGV4cHJlc3MgYXBwbGljYXRpb24pXG4gIGVudjogJ2RldmVsb3BtZW50JyxcblxuICAvLyB2ZXJzaW9uIG9mIGFwcGxpY2F0aW9uLCBjYW4gYmUgdXNlZCB0byBmb3JjZSByZWxvYWQgY3NzIGFuZCBqcyBmaWxlc1xuICAvLyBmcm9tIHNlcnZlciAoY2YuIGBodG1sL2RlZmF1bHQuZWpzYClcbiAgdmVyc2lvbjogJzAuMC4xJyxcblxuICAvLyBuYW1lIG9mIHRoZSBkZWZhdWx0IGNsaWVudCB0eXBlLCBpLmUuIHRoZSBjbGllbnQgdGhhdCBjYW4gYWNjZXNzIHRoZVxuICAvLyBhcHBsaWNhdGlvbiBhdCBpdHMgcm9vdCBVUkxcbiAgZGVmYXVsdENsaWVudDogJ3BsYXllcicsXG5cbiAgLy8gZGVmaW5lIGZyb20gd2hlcmUgdGhlIGFzc2V0cyAoc3RhdGljIGZpbGVzKSBzaG91bGQgYmUgbG9hZGVkLCB0aGVzZSB2YWx1ZVxuICAvLyBjb3VsZCBhbHNvIHJlZmVyIHRvIGEgc2VwYXJhdGUgc2VydmVyIGZvciBzY2FsYWJpbGl0eSByZWFzb25zLiBUaGlzIHZhbHVlXG4gIC8vIHNob3VsZCBhbHNvIGJlIHVzZWQgY2xpZW50LXNpZGUgdG8gY29uZmlndXJlIHRoZSBgYXVkaW8tYnVmZmVyLW1hbmFnZXJgIHNlcnZpY2UuXG4gIGFzc2V0c0RvbWFpbjogJy8nLFxuXG4gIC8vIHBvcnQgdXNlZCB0byBvcGVuIHRoZSBodHRwIHNlcnZlciwgaW4gcHJvZHVjdGlvbiB0aGlzIHZhbHVlIGlzIHR5cGljYWxseSA4MFxuICBwb3J0OiA4MDAwLFxuXG4gIC8vIGRlZmluZSBpZiB0aGUgc2VydmVyIHNob3VsZCB1c2UgZ3ppcCBjb21wcmVzc2lvbiBmb3Igc3RhdGljIGZpbGVzXG4gIGVuYWJsZUdaaXBDb21wcmVzc2lvbjogdHJ1ZSxcblxuICAvLyBsb2NhdGlvbiBvZiB0aGUgcHVibGljIGRpcmVjdG9yeSAoYWNjZXNzaWJsZSB0aHJvdWdoIGh0dHAocykgcmVxdWVzdHMpXG4gIHB1YmxpY0RpcmVjdG9yeTogcGF0aC5qb2luKGN3ZCwgJ3B1YmxpYycpLFxuXG4gIC8vIGRpcmVjdG9yeSB3aGVyZSB0aGUgc2VydmVyIHRlbXBsYXRpbmcgc3lzdGVtIGxvb2tzIGZvciB0aGUgYGVqc2AgdGVtcGxhdGVzXG4gIHRlbXBsYXRlRGlyZWN0b3J5OiBwYXRoLmpvaW4oY3dkLCAnaHRtbCcpLFxuXG4gIC8vIGRlZmluZSBpZiB0aGUgSFRUUCBzZXJ2ZXIgc2hvdWxkIGJlIGxhdW5jaGVkIHVzaW5nIHNlY3VyZSBjb25uZWN0aW9ucy5cbiAgLy8gRm9yIGRldmVsb3BtZW50IHB1cnBvc2VzIHdoZW4gc2V0IHRvIGB0cnVlYCBhbmQgbm8gY2VydGlmaWNhdGVzIGFyZSBnaXZlblxuICAvLyAoY2YuIGBodHRwc0luZm9zYCksIGEgc2VsZi1zaWduZWQgY2VydGlmaWNhdGUgaXMgY3JlYXRlZC5cbiAgdXNlSHR0cHM6IGZhbHNlLFxuXG4gIC8vIHBhdGhzIHRvIHRoZSBrZXkgYW5kIGNlcnRpZmljYXRlIHRvIGJlIHVzZWQgaW4gb3JkZXIgdG8gbGF1bmNoIHRoZSBodHRwc1xuICAvLyBzZXJ2ZXIuIEJvdGggZW50cmllcyBhcmUgcmVxdWlyZWQgb3RoZXJ3aXNlIGEgc2VsZi1zaWduZWQgY2VydGlmaWNhdGVcbiAgLy8gaXMgZ2VuZXJhdGVkLlxuICBodHRwc0luZm9zOiB7XG4gICAga2V5OiBudWxsLFxuICAgIGNlcnQ6IG51bGwsXG4gIH0sXG5cbiAgLy8gc29ja2V0LmlvIGNvbmZpZ3VyYXRpb25cbiAgd2Vic29ja2V0czoge1xuICAgIHVybDogJycsXG4gICAgdHJhbnNwb3J0czogWyd3ZWJzb2NrZXQnXSxcbiAgICBwYXRoOiAnJyxcbiAgICAvLyBAbm90ZTogRW5naW5lSU8gZGVmYXVsdHNcbiAgICAvLyBwaW5nVGltZW91dDogMzAwMCxcbiAgICAvLyBwaW5nSW50ZXJ2YWw6IDEwMDAsXG4gICAgLy8gdXBncmFkZVRpbWVvdXQ6IDEwMDAwLFxuICAgIC8vIG1heEh0dHBCdWZmZXJTaXplOiAxMEU3LFxuICB9LFxuXG4gIC8vIGRlc2NyaWJlIHRoZSBsb2NhdGlvbiB3aGVyZSB0aGUgZXhwZXJpZW5jZSB0YWtlcyBwbGFjZXMsIHRoZXNlcyB2YWx1ZXMgYXJlXG4gIC8vIHVzZWQgYnkgdGhlIGBwbGFjZXJgLCBgY2hlY2tpbmAgYW5kIGBsb2NhdG9yYCBzZXJ2aWNlcy5cbiAgLy8gaWYgb25lIG9mIHRoZXNlIHNlcnZpY2UgaXMgcmVxdWlyZWQsIHRoaXMgZW50cnkgc2hvdWxkbid0IGJlIHJlbW92ZWQuXG4gIHNldHVwOiB7XG4gICAgYXJlYToge1xuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICAvLyBwYXRoIHRvIGFuIGltYWdlIHRvIGJlIHVzZWQgaW4gdGhlIGFyZWEgcmVwcmVzZW50YXRpb25cbiAgICAgIGJhY2tncm91bmQ6IG51bGwsXG4gICAgfSxcbiAgICAvLyBsaXN0IG9mIHByZWRlZmluZWQgbGFiZWxzXG4gICAgbGFiZWxzOiBudWxsLFxuICAgIC8vIGxpc3Qgb2YgcHJlZGVmaW5lZCBjb29yZGluYXRlcyBnaXZlbiBhcyBhbiBhcnJheSBvZiBgW3g6TnVtYmVyLCB5Ok51bWJlcl1gXG4gICAgY29vcmRpbmF0ZXM6IG51bGwsXG4gICAgLy8gbWF4aW11bSBudW1iZXIgb2YgY2xpZW50cyBhbGxvd2VkIGluIGEgcG9zaXRpb25cbiAgICBtYXhDbGllbnRzUGVyUG9zaXRpb246IDEsXG4gICAgLy8gbWF4aW11bSBudW1iZXIgb2YgcG9zaXRpb25zIChtYXkgbGltaXQgb3IgYmUgbGltaXRlZCBieSB0aGUgbnVtYmVyIG9mXG4gICAgLy8gbGFiZWxzIGFuZC9vciBjb29yZGluYXRlcylcbiAgICBjYXBhY2l0eTogSW5maW5pdHksXG4gIH0sXG5cbiAgLy8gcGFzc3dvcmQgdG8gYmUgdXNlZCBieSB0aGUgYGF1dGhgIHNlcnZpY2VcbiAgcGFzc3dvcmQ6ICcnLFxuXG4gIC8vIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGBvc2NgIHNlcnZpY2VcbiAgb3NjOiB7XG4gICAgLy8gSVAgb2YgdGhlIGN1cnJlbnRseSBydW5uaW5nIG5vZGUgc2VydmVyXG4gICAgcmVjZWl2ZUFkZHJlc3M6ICcxMjcuMC4wLjEnLFxuICAgIC8vIHBvcnQgbGlzdGVuaW5nIGZvciBpbmNvbW1pbmcgbWVzc2FnZXNcbiAgICByZWNlaXZlUG9ydDogNTcxMjEsXG4gICAgLy8gSVAgb2YgdGhlIHJlbW90ZSBhcHBsaWNhdGlvblxuICAgIHNlbmRBZGRyZXNzOiAnMTI3LjAuMC4xJyxcbiAgICAvLyBwb3J0IHdoZXJlIHRoZSByZW1vdGUgYXBwbGljYXRpb24gaXMgbGlzdGVuaW5nIGZvciBtZXNzYWdlc1xuICAgIHNlbmRQb3J0OiA1NzEyMCxcbiAgfSxcblxuICAvLyBjb25maWd1cmF0aW9uIG9mIHRoZSBgcmF3LXNvY2tldGAgc2VydmljZVxuICByYXdTb2NrZXQ6IHtcbiAgICAvLyBwb3J0IHVzZWQgZm9yIHNvY2tldCBjb25uZWN0aW9uXG4gICAgcG9ydDogODA4MFxuICB9LFxuXG4gIC8vIGJ1bnlhbiBjb25maWd1cmF0aW9uXG4gIGxvZ2dlcjoge1xuICAgIG5hbWU6ICdzb3VuZHdvcmtzJyxcbiAgICBsZXZlbDogJ2luZm8nLFxuICAgIHN0cmVhbXM6IFt7XG4gICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgc3RyZWFtOiBwcm9jZXNzLnN0ZG91dCxcbiAgICB9LCAvKiB7XG4gICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgcGF0aDogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdsb2dzJywgJ3NvdW5kd29ya3MubG9nJyksXG4gICAgfSAqL11cbiAgfSxcblxuICAvLyBkaXJlY3Rvcnkgd2hlcmUgZXJyb3IgcmVwb3J0ZWQgZnJvbSB0aGUgY2xpZW50cyBhcmUgd3JpdHRlblxuICBlcnJvclJlcG9ydGVyRGlyZWN0b3J5OiBwYXRoLmpvaW4oY3dkLCAnbG9ncycsICdjbGllbnRzJyksXG59XG4iXX0=