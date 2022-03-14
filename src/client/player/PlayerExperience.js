import * as soundworks from 'soundworks/client';
import slugify from 'slugify';
import SimplePlayer from './audio/SimplePlayer';
import State from './State';
import PlayerView from './PlayerView';
import path from 'path';

const audioContext = soundworks.audioContext;
const client = soundworks.client;
const audio = soundworks.audio;
// should be somewhere else, even if not a big deal
const localStorageId = 'lbh-square';

class PlayerExperience extends soundworks.Experience {
  constructor(envConfig, projectConfig) {
    super();

    this.envConfig = envConfig;
    this.projectConfig = projectConfig;

    const features = ['web-audio', 'vibrate'];

    if (projectConfig.environment.wakeLock) {
      features.push('wake-lock');
    }

    // services
    this.platform = this.require('platform', { features: features });
    this.sync = this.require('sync');
    this.checkin = this.require('checkin', { showDialog: false });
    this.sharedParams = this.require('shared-params');
    this.motionInput = this.require('motion-input', {
      descriptors: ['deviceorientation'],
    });

    const assetsPath = `${this.envConfig.assetsDomain}assets/`;

    this.audioStreamManager = this.require('audio-stream-manager', {
      assetsDomain: assetsPath,
      monitorInterval: 1,
      requiredAdvanceThreshold: 10,
    });

    const triggerAudioBuffers = {};
    const backgroundImages = [];

    //
    this.projectConfig.states.forEach(state => {
      state.events.forEach(event => {
        if (event.triggerAudio)
          triggerAudioBuffers[event.triggerAudio.id] = event.triggerAudio.file;

        // background image domain or sub location are not abstracted by
        // a service, so override the url
        if (event.type === 'background-image') {
          event.url = assetsPath + event.url;
          backgroundImages.push(event.url);
        }
      });
    });

    triggerAudioBuffers.testFile = this.projectConfig.txt.soundCheck.testFile;

    this.audioBufferManager = this.require('audio-buffer-manager', {
      assetsDomain: assetsPath,
      files: triggerAudioBuffers,
    });

    this.imagesLoader = this.require('images-loader', {
      // assetsDomain: assetsPath, // is already overriden...
      files: backgroundImages,
    });

    this.soundCheck = this.require('sound-check');
  }

  start() {
    super.start();

    this.simplePlayer = new SimplePlayer(this.audioBufferManager.data);
    this.view = new PlayerView({
      state: 'experience',
      txt: this.projectConfig.txt.restartPage,
    });

    this.show().then(() => {
      this.transport = new audio.Transport();
      this.playControl = new audio.PlayControl(this.transport);

      this.currentStateIndex = null;
      this.state = null;

      // init debug - listen for controller for debugging / test
      this.debugMode = false;

      this.sharedParams.addParamListener('debug-mode', value => {
        this.debugMode = value;
      });

      this.projectConfig.states.forEach((state, stateIndex) => {
        const name = slugify(state.title);

        this.sharedParams.addParamListener(name, value => {
          if (!this.debugMode || !value)
            return;

          // get event index from value
          const getPrefix = /^\[[0-9]+\]/;
          const cleanPrefix = /\[|\]/g;
          const prefix = getPrefix.exec(value)[0];
          const eventIndex = parseInt(prefix.replace(cleanPrefix, ''));

          this.setState(stateIndex, eventIndex);
        });
      });

      const progression = this.retrieveProgression();

      if (!this.debugMode) {
        if (progression !== null) {
          this.view.model.state = 'choice';
          this.view.render();

          this.view.installEvents({
            'click #restart': () => {
              this.view.installEvents({}, true);
              this.view.model.state = 'experience';
              this.view.render();
              this.setState(0);
            },
            'click #continue': () => {
              this.view.installEvents({}, true);
              this.view.model.state = 'experience';
              this.view.render();
              this.setState(progression.stateIndex, progression.eventIndex);
            },
          }, true);
        } else {
          this.setState(0);
        }
      }

    });
  }

  // setup and start introduction (text + reading voice)
  setState(stateIndex, eventIndex = 0) {
    this.currentStateIndex = stateIndex;
    const config = this.projectConfig;

    if (this.state) {
      this.state.exit();
      this.view.clear();
    }

    const stateConfig = config.states[stateIndex];
    const commonConfig = config.common;
    const isLast = (stateIndex === config.states.length - 1);

    this.state = new State(stateIndex, this, stateConfig, commonConfig, isLast);
    this.state.enter();

    if (eventIndex !== 0)
      this.state.seek(eventIndex);
  }

  saveProgression(stateIndex, eventIndex) {
    const store = JSON.stringify({ stateIndex, eventIndex });
    window.localStorage.setItem(localStorageId, store);
  }

  retrieveProgression() {
    let store = null;

    try {
      store = JSON.parse(window.localStorage.getItem(localStorageId));
    } catch(err) {}

    return store;
  }

  deleteProgression() {
    window.localStorage.removeItem(localStorageId);
  }
}

export default PlayerExperience;


