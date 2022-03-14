import 'source-map-support/register'; // enable sourcemaps in node
import path from 'path';
import slugify from 'slugify';
import serveStatic from 'serve-static';
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';
import SoundCheck from './services/SoundCheck';

const configName = process.env.ENV || 'default';
const configPath = path.join(__dirname, 'config', configName);
let config = null;
let projectConfig = null;

// rely on node `require` for synchronicity
try {
  config = require(configPath).default;
} catch(err) {
  console.error(`Invalid ENV "${configName}", file "${configPath}.js" not found`);
  console.error(err);
  process.exit(1);
}

// get app config
const projectName = config.projectName;

if (!projectName)
  throw new Error('Invalid project name, please define the `projectName` in `src/server/shared/config`');

const projectConfigPath = path.join(process.cwd(), 'projects', projectName, 'config.js');

try {
  projectConfig = require(projectConfigPath);
} catch(err) {
  console.error(`Invalid project config file "${projectConfigPath}"`);
  console.error(err);
  process.exit(1);
}

// configure express environment ('production' enables cache systems)
process.env.NODE_ENV = config.env;
// initialize application with configuration options
soundworks.server.init(config);


projectConfig.name = projectName;
// open static middleware for assets
const projectConfigJson = JSON.stringify(projectConfig);
const projectAssets = path.join(process.cwd(), 'projects', projectName, 'assets');

soundworks.server.router.use('/assets', serveStatic(projectAssets));
soundworks.server.router.get('/project-config', (req, res) => res.json(projectConfigJson));

// define the configuration object to be passed to the `.ejs` template
soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
    websockets: config.websockets,
    version: config.version,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
  };
});

// parse all states to create controllers
const sharedParams = soundworks.server.require('shared-params');

sharedParams.addBoolean('debug-mode', 'Debug mode', false);

projectConfig.states.forEach(state => {
  const name = slugify(state.title);
  const label = state.title;
  const options = state.events.map((event, index) => {
    return `[${index}] - ${event.type} (${event.time}s)`;
  });

  sharedParams.addEnum(name, label, options);
});

// launch experiences
const experience = new PlayerExperience('player', projectConfig, projectName);

if (config.env !== 'production') {
  const controller = new soundworks.ControllerExperience('controller');
}

// start application
soundworks.server.start();
