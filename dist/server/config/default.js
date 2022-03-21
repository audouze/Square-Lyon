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

    projectName: 'lyon',

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
    assetsDomain: '/squarelyon/',

    // port used to open the http server, in production this value is typically 80
    port: 8059,

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
        path: '/squarelyon/socket.io'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQuanMiXSwibmFtZXMiOlsiY3dkIiwicHJvY2VzcyIsImFwcE5hbWUiLCJwcm9qZWN0TmFtZSIsImVudiIsInZlcnNpb24iLCJkZWZhdWx0Q2xpZW50IiwiYXNzZXRzRG9tYWluIiwicG9ydCIsImVuYWJsZUdaaXBDb21wcmVzc2lvbiIsInB1YmxpY0RpcmVjdG9yeSIsInBhdGgiLCJqb2luIiwidGVtcGxhdGVEaXJlY3RvcnkiLCJ1c2VIdHRwcyIsImh0dHBzSW5mb3MiLCJrZXkiLCJjZXJ0Iiwid2Vic29ja2V0cyIsInVybCIsInRyYW5zcG9ydHMiLCJzZXR1cCIsImFyZWEiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmQiLCJsYWJlbHMiLCJjb29yZGluYXRlcyIsIm1heENsaWVudHNQZXJQb3NpdGlvbiIsImNhcGFjaXR5IiwiSW5maW5pdHkiLCJwYXNzd29yZCIsIm9zYyIsInJlY2VpdmVBZGRyZXNzIiwicmVjZWl2ZVBvcnQiLCJzZW5kQWRkcmVzcyIsInNlbmRQb3J0IiwicmF3U29ja2V0IiwibG9nZ2VyIiwibmFtZSIsImxldmVsIiwic3RyZWFtcyIsInN0cmVhbSIsInN0ZG91dCIsImVycm9yUmVwb3J0ZXJEaXJlY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFDQSxJQUFNQSxNQUFNQyxRQUFRRCxHQUFSLEVBQVo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtrQkFDZTtBQUNYO0FBQ0E7QUFDQUUsYUFBUyxRQUhFOztBQUtYQyxpQkFBYSxNQUxGOztBQU9YO0FBQ0FDLFNBQUssYUFSTTs7QUFVWDtBQUNBO0FBQ0FDLGFBQVMsT0FaRTs7QUFjWDtBQUNBO0FBQ0FDLG1CQUFlLFFBaEJKOztBQWtCWDtBQUNBO0FBQ0E7QUFDQUMsa0JBQWMsY0FyQkg7O0FBdUJYO0FBQ0FDLFVBQU0sSUF4Qks7O0FBMEJYO0FBQ0FDLDJCQUF1QixJQTNCWjs7QUE2Qlg7QUFDQUMscUJBQWlCQyxlQUFLQyxJQUFMLENBQVVaLEdBQVYsRUFBZSxRQUFmLENBOUJOOztBQWdDWDtBQUNBYSx1QkFBbUJGLGVBQUtDLElBQUwsQ0FBVVosR0FBVixFQUFlLE1BQWYsQ0FqQ1I7O0FBbUNYO0FBQ0E7QUFDQTtBQUNBYyxjQUFVLEtBdENDOztBQXdDWDtBQUNBO0FBQ0E7QUFDQUMsZ0JBQVk7QUFDUkMsYUFBSyxJQURHO0FBRVJDLGNBQU07QUFGRSxLQTNDRDs7QUFnRFg7QUFDQUMsZ0JBQVk7QUFDUkMsYUFBSyxFQURHO0FBRVJDLG9CQUFZLENBQUMsV0FBRCxDQUZKO0FBR1JULGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUlEsS0FqREQ7O0FBNERYO0FBQ0E7QUFDQTtBQUNBVSxXQUFPO0FBQ0hDLGNBQU07QUFDRkMsbUJBQU8sQ0FETDtBQUVGQyxvQkFBUSxDQUZOO0FBR0Y7QUFDQUMsd0JBQVk7QUFKVixTQURIO0FBT0g7QUFDQUMsZ0JBQVEsSUFSTDtBQVNIO0FBQ0FDLHFCQUFhLElBVlY7QUFXSDtBQUNBQywrQkFBdUIsQ0FacEI7QUFhSDtBQUNBO0FBQ0FDLGtCQUFVQztBQWZQLEtBL0RJOztBQWlGWDtBQUNBQyxjQUFVLEVBbEZDOztBQW9GWDtBQUNBQyxTQUFLO0FBQ0Q7QUFDQUMsd0JBQWdCLFdBRmY7QUFHRDtBQUNBQyxxQkFBYSxLQUpaO0FBS0Q7QUFDQUMscUJBQWEsV0FOWjtBQU9EO0FBQ0FDLGtCQUFVO0FBUlQsS0FyRk07O0FBZ0dYO0FBQ0FDLGVBQVc7QUFDUDtBQUNBN0IsY0FBTTtBQUZDLEtBakdBOztBQXNHWDtBQUNBOEIsWUFBUTtBQUNKQyxjQUFNLFlBREY7QUFFSkMsZUFBTyxNQUZIO0FBR0pDLGlCQUFTLENBQUM7QUFDRkQsbUJBQU8sTUFETDtBQUVGRSxvQkFBUXpDLFFBQVEwQztBQUZkLFNBQUQ7QUFITCxLQXZHRzs7QUFxSFg7QUFDQUMsNEJBQXdCakMsZUFBS0MsSUFBTCxDQUFVWixHQUFWLEVBQWUsTUFBZixFQUF1QixTQUF2QjtBQXRIYixDIiwiZmlsZSI6ImRlZmF1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG5cbi8vIENvbmZpZ3VyYXRpb24gb2YgdGhlIGFwcGxpY2F0aW9uLlxuLy8gT3RoZXIgZW50cmllcyBjYW4gYmUgYWRkZWQgKGFzIGxvbmcgYXMgdGhlaXIgbmFtZSBkb2Vzbid0IGNvbmZsaWN0IHdpdGhcbi8vIGV4aXN0aW5nIG9uZXMpIHRvIGRlZmluZSBnbG9iYWwgcGFyYW1ldGVycyBvZiB0aGUgYXBwbGljYXRpb24gKGUuZy4gQlBNLFxuLy8gc3ludGggcGFyYW1ldGVycykgdGhhdCBjYW4gdGhlbiBiZSBzaGFyZWQgZWFzaWx5IGFtb25nIGFsbCBjbGllbnRzIHVzaW5nXG4vLyB0aGUgYHNoYXJlZC1jb25maWdgIHNlcnZpY2UuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gbmFtZSBvZiB0aGUgYXBwbGljYXRpb24sIHVzZWQgaW4gdGhlIGAuZWpzYCB0ZW1wbGF0ZSBhbmQgYnkgZGVmYXVsdCBpblxuICAgIC8vIHRoZSBgcGxhdGZvcm1gIHNlcnZpY2UgdG8gcG9wdWxhdGUgaXRzIHZpZXdcbiAgICBhcHBOYW1lOiAnU1FVQVJFJyxcblxuICAgIHByb2plY3ROYW1lOiAnbHlvbicsXG5cbiAgICAvLyBuYW1lIG9mIHRoZSBlbnZpcm9ubmVtZW50ICgncHJvZHVjdGlvbicgZW5hYmxlIGNhY2hlIGluIGV4cHJlc3MgYXBwbGljYXRpb24pXG4gICAgZW52OiAnZGV2ZWxvcG1lbnQnLFxuXG4gICAgLy8gdmVyc2lvbiBvZiBhcHBsaWNhdGlvbiwgY2FuIGJlIHVzZWQgdG8gZm9yY2UgcmVsb2FkIGNzcyBhbmQganMgZmlsZXNcbiAgICAvLyBmcm9tIHNlcnZlciAoY2YuIGBodG1sL2RlZmF1bHQuZWpzYClcbiAgICB2ZXJzaW9uOiAnMC4wLjEnLFxuXG4gICAgLy8gbmFtZSBvZiB0aGUgZGVmYXVsdCBjbGllbnQgdHlwZSwgaS5lLiB0aGUgY2xpZW50IHRoYXQgY2FuIGFjY2VzcyB0aGVcbiAgICAvLyBhcHBsaWNhdGlvbiBhdCBpdHMgcm9vdCBVUkxcbiAgICBkZWZhdWx0Q2xpZW50OiAncGxheWVyJyxcblxuICAgIC8vIGRlZmluZSBmcm9tIHdoZXJlIHRoZSBhc3NldHMgKHN0YXRpYyBmaWxlcykgc2hvdWxkIGJlIGxvYWRlZCwgdGhlc2UgdmFsdWVcbiAgICAvLyBjb3VsZCBhbHNvIHJlZmVyIHRvIGEgc2VwYXJhdGUgc2VydmVyIGZvciBzY2FsYWJpbGl0eSByZWFzb25zLiBUaGlzIHZhbHVlXG4gICAgLy8gc2hvdWxkIGFsc28gYmUgdXNlZCBjbGllbnQtc2lkZSB0byBjb25maWd1cmUgdGhlIGBhdWRpby1idWZmZXItbWFuYWdlcmAgc2VydmljZS5cbiAgICBhc3NldHNEb21haW46ICcvc3F1YXJlbHlvbi8nLFxuXG4gICAgLy8gcG9ydCB1c2VkIHRvIG9wZW4gdGhlIGh0dHAgc2VydmVyLCBpbiBwcm9kdWN0aW9uIHRoaXMgdmFsdWUgaXMgdHlwaWNhbGx5IDgwXG4gICAgcG9ydDogODA1OSxcblxuICAgIC8vIGRlZmluZSBpZiB0aGUgc2VydmVyIHNob3VsZCB1c2UgZ3ppcCBjb21wcmVzc2lvbiBmb3Igc3RhdGljIGZpbGVzXG4gICAgZW5hYmxlR1ppcENvbXByZXNzaW9uOiB0cnVlLFxuXG4gICAgLy8gbG9jYXRpb24gb2YgdGhlIHB1YmxpYyBkaXJlY3RvcnkgKGFjY2Vzc2libGUgdGhyb3VnaCBodHRwKHMpIHJlcXVlc3RzKVxuICAgIHB1YmxpY0RpcmVjdG9yeTogcGF0aC5qb2luKGN3ZCwgJ3B1YmxpYycpLFxuXG4gICAgLy8gZGlyZWN0b3J5IHdoZXJlIHRoZSBzZXJ2ZXIgdGVtcGxhdGluZyBzeXN0ZW0gbG9va3MgZm9yIHRoZSBgZWpzYCB0ZW1wbGF0ZXNcbiAgICB0ZW1wbGF0ZURpcmVjdG9yeTogcGF0aC5qb2luKGN3ZCwgJ2h0bWwnKSxcblxuICAgIC8vIGRlZmluZSBpZiB0aGUgSFRUUCBzZXJ2ZXIgc2hvdWxkIGJlIGxhdW5jaGVkIHVzaW5nIHNlY3VyZSBjb25uZWN0aW9ucy5cbiAgICAvLyBGb3IgZGV2ZWxvcG1lbnQgcHVycG9zZXMgd2hlbiBzZXQgdG8gYHRydWVgIGFuZCBubyBjZXJ0aWZpY2F0ZXMgYXJlIGdpdmVuXG4gICAgLy8gKGNmLiBgaHR0cHNJbmZvc2ApLCBhIHNlbGYtc2lnbmVkIGNlcnRpZmljYXRlIGlzIGNyZWF0ZWQuXG4gICAgdXNlSHR0cHM6IGZhbHNlLFxuXG4gICAgLy8gcGF0aHMgdG8gdGhlIGtleSBhbmQgY2VydGlmaWNhdGUgdG8gYmUgdXNlZCBpbiBvcmRlciB0byBsYXVuY2ggdGhlIGh0dHBzXG4gICAgLy8gc2VydmVyLiBCb3RoIGVudHJpZXMgYXJlIHJlcXVpcmVkIG90aGVyd2lzZSBhIHNlbGYtc2lnbmVkIGNlcnRpZmljYXRlXG4gICAgLy8gaXMgZ2VuZXJhdGVkLlxuICAgIGh0dHBzSW5mb3M6IHtcbiAgICAgICAga2V5OiBudWxsLFxuICAgICAgICBjZXJ0OiBudWxsLFxuICAgIH0sXG5cbiAgICAvLyBzb2NrZXQuaW8gY29uZmlndXJhdGlvblxuICAgIHdlYnNvY2tldHM6IHtcbiAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgdHJhbnNwb3J0czogWyd3ZWJzb2NrZXQnXSxcbiAgICAgICAgcGF0aDogJy9zcXVhcmVseW9uL3NvY2tldC5pbycsXG4gICAgICAgIC8vIEBub3RlOiBFbmdpbmVJTyBkZWZhdWx0c1xuICAgICAgICAvLyBwaW5nVGltZW91dDogMzAwMCxcbiAgICAgICAgLy8gcGluZ0ludGVydmFsOiAxMDAwLFxuICAgICAgICAvLyB1cGdyYWRlVGltZW91dDogMTAwMDAsXG4gICAgICAgIC8vIG1heEh0dHBCdWZmZXJTaXplOiAxMEU3LFxuICAgIH0sXG5cbiAgICAvLyBkZXNjcmliZSB0aGUgbG9jYXRpb24gd2hlcmUgdGhlIGV4cGVyaWVuY2UgdGFrZXMgcGxhY2VzLCB0aGVzZXMgdmFsdWVzIGFyZVxuICAgIC8vIHVzZWQgYnkgdGhlIGBwbGFjZXJgLCBgY2hlY2tpbmAgYW5kIGBsb2NhdG9yYCBzZXJ2aWNlcy5cbiAgICAvLyBpZiBvbmUgb2YgdGhlc2Ugc2VydmljZSBpcyByZXF1aXJlZCwgdGhpcyBlbnRyeSBzaG91bGRuJ3QgYmUgcmVtb3ZlZC5cbiAgICBzZXR1cDoge1xuICAgICAgICBhcmVhOiB7XG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIC8vIHBhdGggdG8gYW4gaW1hZ2UgdG8gYmUgdXNlZCBpbiB0aGUgYXJlYSByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgYmFja2dyb3VuZDogbnVsbCxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gbGlzdCBvZiBwcmVkZWZpbmVkIGxhYmVsc1xuICAgICAgICBsYWJlbHM6IG51bGwsXG4gICAgICAgIC8vIGxpc3Qgb2YgcHJlZGVmaW5lZCBjb29yZGluYXRlcyBnaXZlbiBhcyBhbiBhcnJheSBvZiBgW3g6TnVtYmVyLCB5Ok51bWJlcl1gXG4gICAgICAgIGNvb3JkaW5hdGVzOiBudWxsLFxuICAgICAgICAvLyBtYXhpbXVtIG51bWJlciBvZiBjbGllbnRzIGFsbG93ZWQgaW4gYSBwb3NpdGlvblxuICAgICAgICBtYXhDbGllbnRzUGVyUG9zaXRpb246IDEsXG4gICAgICAgIC8vIG1heGltdW0gbnVtYmVyIG9mIHBvc2l0aW9ucyAobWF5IGxpbWl0IG9yIGJlIGxpbWl0ZWQgYnkgdGhlIG51bWJlciBvZlxuICAgICAgICAvLyBsYWJlbHMgYW5kL29yIGNvb3JkaW5hdGVzKVxuICAgICAgICBjYXBhY2l0eTogSW5maW5pdHksXG4gICAgfSxcblxuICAgIC8vIHBhc3N3b3JkIHRvIGJlIHVzZWQgYnkgdGhlIGBhdXRoYCBzZXJ2aWNlXG4gICAgcGFzc3dvcmQ6ICcnLFxuXG4gICAgLy8gY29uZmlndXJhdGlvbiBvZiB0aGUgYG9zY2Agc2VydmljZVxuICAgIG9zYzoge1xuICAgICAgICAvLyBJUCBvZiB0aGUgY3VycmVudGx5IHJ1bm5pbmcgbm9kZSBzZXJ2ZXJcbiAgICAgICAgcmVjZWl2ZUFkZHJlc3M6ICcxMjcuMC4wLjEnLFxuICAgICAgICAvLyBwb3J0IGxpc3RlbmluZyBmb3IgaW5jb21taW5nIG1lc3NhZ2VzXG4gICAgICAgIHJlY2VpdmVQb3J0OiA1NzEyMSxcbiAgICAgICAgLy8gSVAgb2YgdGhlIHJlbW90ZSBhcHBsaWNhdGlvblxuICAgICAgICBzZW5kQWRkcmVzczogJzEyNy4wLjAuMScsXG4gICAgICAgIC8vIHBvcnQgd2hlcmUgdGhlIHJlbW90ZSBhcHBsaWNhdGlvbiBpcyBsaXN0ZW5pbmcgZm9yIG1lc3NhZ2VzXG4gICAgICAgIHNlbmRQb3J0OiA1NzEyMCxcbiAgICB9LFxuXG4gICAgLy8gY29uZmlndXJhdGlvbiBvZiB0aGUgYHJhdy1zb2NrZXRgIHNlcnZpY2VcbiAgICByYXdTb2NrZXQ6IHtcbiAgICAgICAgLy8gcG9ydCB1c2VkIGZvciBzb2NrZXQgY29ubmVjdGlvblxuICAgICAgICBwb3J0OiA4MDgwXG4gICAgfSxcblxuICAgIC8vIGJ1bnlhbiBjb25maWd1cmF0aW9uXG4gICAgbG9nZ2VyOiB7XG4gICAgICAgIG5hbWU6ICdzb3VuZHdvcmtzJyxcbiAgICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgICAgc3RyZWFtczogW3tcbiAgICAgICAgICAgICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgICAgICAgICAgIHN0cmVhbTogcHJvY2Vzcy5zdGRvdXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoge1xuICAgICAgICAgICAgICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2xvZ3MnLCAnc291bmR3b3Jrcy5sb2cnKSxcbiAgICAgICAgICAgICAgIH0gKi9cbiAgICAgICAgXVxuICAgIH0sXG5cbiAgICAvLyBkaXJlY3Rvcnkgd2hlcmUgZXJyb3IgcmVwb3J0ZWQgZnJvbSB0aGUgY2xpZW50cyBhcmUgd3JpdHRlblxuICAgIGVycm9yUmVwb3J0ZXJEaXJlY3Rvcnk6IHBhdGguam9pbihjd2QsICdsb2dzJywgJ2NsaWVudHMnKSxcbn1cbiJdfQ==