// import client side soundworks and player experience
import 'whatwg-fetch';
import * as soundworks from 'soundworks/client';
import PlayerExperience from './PlayerExperience';
import serviceViews from '../shared/serviceViews';
import ImagesLoader from '../shared/services/ImagesLoader';
import SoundCheck from '../shared/services/SoundCheck';

const config = Object.assign({ appContainer: '#container' }, window.soundworksConfig);

function bootstrap(projectConfig) {
  projectConfig = JSON.parse(projectConfig);
  document.body.classList.remove('loading');
  // initialize the client with configuration received
  // from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  soundworks.client.init(config.clientType, config);

  // configure views for the services
  soundworks.client.setServiceInstanciationHook((id, instance) => {
    if (serviceViews.has(id)) {
      instance.view = serviceViews.get(id, config);
    }

    // use audio buffer manager view for images loader
    if (id === 'service:images-loader') {
      instance.view = serviceViews.get('service:audio-buffer-manager', config);
    }

    if (id === 'service:platform') {
      instance.view = serviceViews.get('service:platform', projectConfig.txt.home);
    }

    if (id === 'service:sound-check') {
      instance.view = serviceViews.get('service:sound-check', projectConfig.txt.soundCheck);
    }
  });

  const vibrateHook = {
    id: 'vibrate',
    check: function() {
      return true; // can't break application
    },
    interactionHook: function() {
      // check for vibrate API (not in Safari)
      if( window.navigator.vibrate !== undefined ) {
        window.navigator.vibrate(1);
      }
      return Promise.resolve(true);
    }
  };

  const platform = soundworks.client.require('platform');
  platform.addFeatureDefinition(vibrateHook);

  // create client side (player) experience and start the client
  const experience = new PlayerExperience(config, projectConfig);
  soundworks.client.start();
}

window.addEventListener('load', () => {
  window.fetch(config.assetsDomain + 'project-config')
    .then(response => response.json())
    .then(bootstrap);
});
