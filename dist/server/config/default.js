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

    projectName: 'bologna',

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQuanMiXSwibmFtZXMiOlsiY3dkIiwicHJvY2VzcyIsImFwcE5hbWUiLCJwcm9qZWN0TmFtZSIsImVudiIsInZlcnNpb24iLCJkZWZhdWx0Q2xpZW50IiwiYXNzZXRzRG9tYWluIiwicG9ydCIsImVuYWJsZUdaaXBDb21wcmVzc2lvbiIsInB1YmxpY0RpcmVjdG9yeSIsInBhdGgiLCJqb2luIiwidGVtcGxhdGVEaXJlY3RvcnkiLCJ1c2VIdHRwcyIsImh0dHBzSW5mb3MiLCJrZXkiLCJjZXJ0Iiwid2Vic29ja2V0cyIsInVybCIsInRyYW5zcG9ydHMiLCJzZXR1cCIsImFyZWEiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmQiLCJsYWJlbHMiLCJjb29yZGluYXRlcyIsIm1heENsaWVudHNQZXJQb3NpdGlvbiIsImNhcGFjaXR5IiwiSW5maW5pdHkiLCJwYXNzd29yZCIsIm9zYyIsInJlY2VpdmVBZGRyZXNzIiwicmVjZWl2ZVBvcnQiLCJzZW5kQWRkcmVzcyIsInNlbmRQb3J0IiwicmF3U29ja2V0IiwibG9nZ2VyIiwibmFtZSIsImxldmVsIiwic3RyZWFtcyIsInN0cmVhbSIsInN0ZG91dCIsImVycm9yUmVwb3J0ZXJEaXJlY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFDQSxJQUFNQSxNQUFNQyxRQUFRRCxHQUFSLEVBQVo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtrQkFDZTtBQUNYO0FBQ0E7QUFDQUUsYUFBUyxRQUhFOztBQUtYQyxpQkFBYSxTQUxGOztBQU9YO0FBQ0FDLFNBQUssYUFSTTs7QUFVWDtBQUNBO0FBQ0FDLGFBQVMsT0FaRTs7QUFjWDtBQUNBO0FBQ0FDLG1CQUFlLFFBaEJKOztBQWtCWDtBQUNBO0FBQ0E7QUFDQUMsa0JBQWMsR0FyQkg7O0FBdUJYO0FBQ0FDLFVBQU0sSUF4Qks7O0FBMEJYO0FBQ0FDLDJCQUF1QixJQTNCWjs7QUE2Qlg7QUFDQUMscUJBQWlCQyxlQUFLQyxJQUFMLENBQVVaLEdBQVYsRUFBZSxRQUFmLENBOUJOOztBQWdDWDtBQUNBYSx1QkFBbUJGLGVBQUtDLElBQUwsQ0FBVVosR0FBVixFQUFlLE1BQWYsQ0FqQ1I7O0FBbUNYO0FBQ0E7QUFDQTtBQUNBYyxjQUFVLEtBdENDOztBQXdDWDtBQUNBO0FBQ0E7QUFDQUMsZ0JBQVk7QUFDUkMsYUFBSyxJQURHO0FBRVJDLGNBQU07QUFGRSxLQTNDRDs7QUFnRFg7QUFDQUMsZ0JBQVk7QUFDUkMsYUFBSyxFQURHO0FBRVJDLG9CQUFZLENBQUMsV0FBRCxDQUZKO0FBR1JULGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUlEsS0FqREQ7O0FBNERYO0FBQ0E7QUFDQTtBQUNBVSxXQUFPO0FBQ0hDLGNBQU07QUFDRkMsbUJBQU8sQ0FETDtBQUVGQyxvQkFBUSxDQUZOO0FBR0Y7QUFDQUMsd0JBQVk7QUFKVixTQURIO0FBT0g7QUFDQUMsZ0JBQVEsSUFSTDtBQVNIO0FBQ0FDLHFCQUFhLElBVlY7QUFXSDtBQUNBQywrQkFBdUIsQ0FacEI7QUFhSDtBQUNBO0FBQ0FDLGtCQUFVQztBQWZQLEtBL0RJOztBQWlGWDtBQUNBQyxjQUFVLEVBbEZDOztBQW9GWDtBQUNBQyxTQUFLO0FBQ0Q7QUFDQUMsd0JBQWdCLFdBRmY7QUFHRDtBQUNBQyxxQkFBYSxLQUpaO0FBS0Q7QUFDQUMscUJBQWEsV0FOWjtBQU9EO0FBQ0FDLGtCQUFVO0FBUlQsS0FyRk07O0FBZ0dYO0FBQ0FDLGVBQVc7QUFDUDtBQUNBN0IsY0FBTTtBQUZDLEtBakdBOztBQXNHWDtBQUNBOEIsWUFBUTtBQUNKQyxjQUFNLFlBREY7QUFFSkMsZUFBTyxNQUZIO0FBR0pDLGlCQUFTLENBQUM7QUFDRkQsbUJBQU8sTUFETDtBQUVGRSxvQkFBUXpDLFFBQVEwQztBQUZkLFNBQUQ7QUFITCxLQXZHRzs7QUFxSFg7QUFDQUMsNEJBQXdCakMsZUFBS0MsSUFBTCxDQUFVWixHQUFWLEVBQWUsTUFBZixFQUF1QixTQUF2QjtBQXRIYixDIiwiZmlsZSI6ImRlZmF1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG5cbi8vIENvbmZpZ3VyYXRpb24gb2YgdGhlIGFwcGxpY2F0aW9uLlxuLy8gT3RoZXIgZW50cmllcyBjYW4gYmUgYWRkZWQgKGFzIGxvbmcgYXMgdGhlaXIgbmFtZSBkb2Vzbid0IGNvbmZsaWN0IHdpdGhcbi8vIGV4aXN0aW5nIG9uZXMpIHRvIGRlZmluZSBnbG9iYWwgcGFyYW1ldGVycyBvZiB0aGUgYXBwbGljYXRpb24gKGUuZy4gQlBNLFxuLy8gc3ludGggcGFyYW1ldGVycykgdGhhdCBjYW4gdGhlbiBiZSBzaGFyZWQgZWFzaWx5IGFtb25nIGFsbCBjbGllbnRzIHVzaW5nXG4vLyB0aGUgYHNoYXJlZC1jb25maWdgIHNlcnZpY2UuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gbmFtZSBvZiB0aGUgYXBwbGljYXRpb24sIHVzZWQgaW4gdGhlIGAuZWpzYCB0ZW1wbGF0ZSBhbmQgYnkgZGVmYXVsdCBpblxuICAgIC8vIHRoZSBgcGxhdGZvcm1gIHNlcnZpY2UgdG8gcG9wdWxhdGUgaXRzIHZpZXdcbiAgICBhcHBOYW1lOiAnU1FVQVJFJyxcblxuICAgIHByb2plY3ROYW1lOiAnYm9sb2duYScsXG5cbiAgICAvLyBuYW1lIG9mIHRoZSBlbnZpcm9ubmVtZW50ICgncHJvZHVjdGlvbicgZW5hYmxlIGNhY2hlIGluIGV4cHJlc3MgYXBwbGljYXRpb24pXG4gICAgZW52OiAnZGV2ZWxvcG1lbnQnLFxuXG4gICAgLy8gdmVyc2lvbiBvZiBhcHBsaWNhdGlvbiwgY2FuIGJlIHVzZWQgdG8gZm9yY2UgcmVsb2FkIGNzcyBhbmQganMgZmlsZXNcbiAgICAvLyBmcm9tIHNlcnZlciAoY2YuIGBodG1sL2RlZmF1bHQuZWpzYClcbiAgICB2ZXJzaW9uOiAnMC4wLjEnLFxuXG4gICAgLy8gbmFtZSBvZiB0aGUgZGVmYXVsdCBjbGllbnQgdHlwZSwgaS5lLiB0aGUgY2xpZW50IHRoYXQgY2FuIGFjY2VzcyB0aGVcbiAgICAvLyBhcHBsaWNhdGlvbiBhdCBpdHMgcm9vdCBVUkxcbiAgICBkZWZhdWx0Q2xpZW50OiAncGxheWVyJyxcblxuICAgIC8vIGRlZmluZSBmcm9tIHdoZXJlIHRoZSBhc3NldHMgKHN0YXRpYyBmaWxlcykgc2hvdWxkIGJlIGxvYWRlZCwgdGhlc2UgdmFsdWVcbiAgICAvLyBjb3VsZCBhbHNvIHJlZmVyIHRvIGEgc2VwYXJhdGUgc2VydmVyIGZvciBzY2FsYWJpbGl0eSByZWFzb25zLiBUaGlzIHZhbHVlXG4gICAgLy8gc2hvdWxkIGFsc28gYmUgdXNlZCBjbGllbnQtc2lkZSB0byBjb25maWd1cmUgdGhlIGBhdWRpby1idWZmZXItbWFuYWdlcmAgc2VydmljZS5cbiAgICBhc3NldHNEb21haW46ICcvJyxcblxuICAgIC8vIHBvcnQgdXNlZCB0byBvcGVuIHRoZSBodHRwIHNlcnZlciwgaW4gcHJvZHVjdGlvbiB0aGlzIHZhbHVlIGlzIHR5cGljYWxseSA4MFxuICAgIHBvcnQ6IDgwNTksXG5cbiAgICAvLyBkZWZpbmUgaWYgdGhlIHNlcnZlciBzaG91bGQgdXNlIGd6aXAgY29tcHJlc3Npb24gZm9yIHN0YXRpYyBmaWxlc1xuICAgIGVuYWJsZUdaaXBDb21wcmVzc2lvbjogdHJ1ZSxcblxuICAgIC8vIGxvY2F0aW9uIG9mIHRoZSBwdWJsaWMgZGlyZWN0b3J5IChhY2Nlc3NpYmxlIHRocm91Z2ggaHR0cChzKSByZXF1ZXN0cylcbiAgICBwdWJsaWNEaXJlY3Rvcnk6IHBhdGguam9pbihjd2QsICdwdWJsaWMnKSxcblxuICAgIC8vIGRpcmVjdG9yeSB3aGVyZSB0aGUgc2VydmVyIHRlbXBsYXRpbmcgc3lzdGVtIGxvb2tzIGZvciB0aGUgYGVqc2AgdGVtcGxhdGVzXG4gICAgdGVtcGxhdGVEaXJlY3Rvcnk6IHBhdGguam9pbihjd2QsICdodG1sJyksXG5cbiAgICAvLyBkZWZpbmUgaWYgdGhlIEhUVFAgc2VydmVyIHNob3VsZCBiZSBsYXVuY2hlZCB1c2luZyBzZWN1cmUgY29ubmVjdGlvbnMuXG4gICAgLy8gRm9yIGRldmVsb3BtZW50IHB1cnBvc2VzIHdoZW4gc2V0IHRvIGB0cnVlYCBhbmQgbm8gY2VydGlmaWNhdGVzIGFyZSBnaXZlblxuICAgIC8vIChjZi4gYGh0dHBzSW5mb3NgKSwgYSBzZWxmLXNpZ25lZCBjZXJ0aWZpY2F0ZSBpcyBjcmVhdGVkLlxuICAgIHVzZUh0dHBzOiBmYWxzZSxcblxuICAgIC8vIHBhdGhzIHRvIHRoZSBrZXkgYW5kIGNlcnRpZmljYXRlIHRvIGJlIHVzZWQgaW4gb3JkZXIgdG8gbGF1bmNoIHRoZSBodHRwc1xuICAgIC8vIHNlcnZlci4gQm90aCBlbnRyaWVzIGFyZSByZXF1aXJlZCBvdGhlcndpc2UgYSBzZWxmLXNpZ25lZCBjZXJ0aWZpY2F0ZVxuICAgIC8vIGlzIGdlbmVyYXRlZC5cbiAgICBodHRwc0luZm9zOiB7XG4gICAgICAgIGtleTogbnVsbCxcbiAgICAgICAgY2VydDogbnVsbCxcbiAgICB9LFxuXG4gICAgLy8gc29ja2V0LmlvIGNvbmZpZ3VyYXRpb25cbiAgICB3ZWJzb2NrZXRzOiB7XG4gICAgICAgIHVybDogJycsXG4gICAgICAgIHRyYW5zcG9ydHM6IFsnd2Vic29ja2V0J10sXG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICAvLyBAbm90ZTogRW5naW5lSU8gZGVmYXVsdHNcbiAgICAgICAgLy8gcGluZ1RpbWVvdXQ6IDMwMDAsXG4gICAgICAgIC8vIHBpbmdJbnRlcnZhbDogMTAwMCxcbiAgICAgICAgLy8gdXBncmFkZVRpbWVvdXQ6IDEwMDAwLFxuICAgICAgICAvLyBtYXhIdHRwQnVmZmVyU2l6ZTogMTBFNyxcbiAgICB9LFxuXG4gICAgLy8gZGVzY3JpYmUgdGhlIGxvY2F0aW9uIHdoZXJlIHRoZSBleHBlcmllbmNlIHRha2VzIHBsYWNlcywgdGhlc2VzIHZhbHVlcyBhcmVcbiAgICAvLyB1c2VkIGJ5IHRoZSBgcGxhY2VyYCwgYGNoZWNraW5gIGFuZCBgbG9jYXRvcmAgc2VydmljZXMuXG4gICAgLy8gaWYgb25lIG9mIHRoZXNlIHNlcnZpY2UgaXMgcmVxdWlyZWQsIHRoaXMgZW50cnkgc2hvdWxkbid0IGJlIHJlbW92ZWQuXG4gICAgc2V0dXA6IHtcbiAgICAgICAgYXJlYToge1xuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAvLyBwYXRoIHRvIGFuIGltYWdlIHRvIGJlIHVzZWQgaW4gdGhlIGFyZWEgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICAgIGJhY2tncm91bmQ6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGxpc3Qgb2YgcHJlZGVmaW5lZCBsYWJlbHNcbiAgICAgICAgbGFiZWxzOiBudWxsLFxuICAgICAgICAvLyBsaXN0IG9mIHByZWRlZmluZWQgY29vcmRpbmF0ZXMgZ2l2ZW4gYXMgYW4gYXJyYXkgb2YgYFt4Ok51bWJlciwgeTpOdW1iZXJdYFxuICAgICAgICBjb29yZGluYXRlczogbnVsbCxcbiAgICAgICAgLy8gbWF4aW11bSBudW1iZXIgb2YgY2xpZW50cyBhbGxvd2VkIGluIGEgcG9zaXRpb25cbiAgICAgICAgbWF4Q2xpZW50c1BlclBvc2l0aW9uOiAxLFxuICAgICAgICAvLyBtYXhpbXVtIG51bWJlciBvZiBwb3NpdGlvbnMgKG1heSBsaW1pdCBvciBiZSBsaW1pdGVkIGJ5IHRoZSBudW1iZXIgb2ZcbiAgICAgICAgLy8gbGFiZWxzIGFuZC9vciBjb29yZGluYXRlcylcbiAgICAgICAgY2FwYWNpdHk6IEluZmluaXR5LFxuICAgIH0sXG5cbiAgICAvLyBwYXNzd29yZCB0byBiZSB1c2VkIGJ5IHRoZSBgYXV0aGAgc2VydmljZVxuICAgIHBhc3N3b3JkOiAnJyxcblxuICAgIC8vIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGBvc2NgIHNlcnZpY2VcbiAgICBvc2M6IHtcbiAgICAgICAgLy8gSVAgb2YgdGhlIGN1cnJlbnRseSBydW5uaW5nIG5vZGUgc2VydmVyXG4gICAgICAgIHJlY2VpdmVBZGRyZXNzOiAnMTI3LjAuMC4xJyxcbiAgICAgICAgLy8gcG9ydCBsaXN0ZW5pbmcgZm9yIGluY29tbWluZyBtZXNzYWdlc1xuICAgICAgICByZWNlaXZlUG9ydDogNTcxMjEsXG4gICAgICAgIC8vIElQIG9mIHRoZSByZW1vdGUgYXBwbGljYXRpb25cbiAgICAgICAgc2VuZEFkZHJlc3M6ICcxMjcuMC4wLjEnLFxuICAgICAgICAvLyBwb3J0IHdoZXJlIHRoZSByZW1vdGUgYXBwbGljYXRpb24gaXMgbGlzdGVuaW5nIGZvciBtZXNzYWdlc1xuICAgICAgICBzZW5kUG9ydDogNTcxMjAsXG4gICAgfSxcblxuICAgIC8vIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGByYXctc29ja2V0YCBzZXJ2aWNlXG4gICAgcmF3U29ja2V0OiB7XG4gICAgICAgIC8vIHBvcnQgdXNlZCBmb3Igc29ja2V0IGNvbm5lY3Rpb25cbiAgICAgICAgcG9ydDogODA4MFxuICAgIH0sXG5cbiAgICAvLyBidW55YW4gY29uZmlndXJhdGlvblxuICAgIGxvZ2dlcjoge1xuICAgICAgICBuYW1lOiAnc291bmR3b3JrcycsXG4gICAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgICAgIHN0cmVhbXM6IFt7XG4gICAgICAgICAgICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICBzdHJlYW06IHByb2Nlc3Muc3Rkb3V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIHtcbiAgICAgICAgICAgICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICAgcGF0aDogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdsb2dzJywgJ3NvdW5kd29ya3MubG9nJyksXG4gICAgICAgICAgICAgICB9ICovXG4gICAgICAgIF1cbiAgICB9LFxuXG4gICAgLy8gZGlyZWN0b3J5IHdoZXJlIGVycm9yIHJlcG9ydGVkIGZyb20gdGhlIGNsaWVudHMgYXJlIHdyaXR0ZW5cbiAgICBlcnJvclJlcG9ydGVyRGlyZWN0b3J5OiBwYXRoLmpvaW4oY3dkLCAnbG9ncycsICdjbGllbnRzJyksXG59Il19