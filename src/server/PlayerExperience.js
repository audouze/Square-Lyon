import { Experience } from 'soundworks/server';
import path from 'path';

class PlayerExperience extends Experience {
  constructor(clientType, projectConfig, projectName) {
    super(clientType);

    this.projectConfig = projectConfig;
    this.projectName = projectName;
    // services
    this.checkin = this.require('checkin');
    this.sync = this.require('sync');
    this.audioBufferManager = this.require('audio-buffer-manager');
    this.sharedParams = this.require('shared-params');

    // get all stream files from app configuration
    const streamFiles = projectConfig.states.map(state => state.stream.file);
    streamFiles.push(projectConfig.common.fallbackStream.file);
    // folder in which the streams are located
    const assetsPath = path.join('projects', projectName, 'assets');

    this.audioStreamManager = this.require('audio-stream-manager', {
      audioFiles: Array.from(new Set(streamFiles)), // deduplicate
      publicDirectory: assetsPath,
      compress: true,
      duration: 4,
      overlap: 0.1,
    });

    this.soundCheck = this.require('sound-check');

    if (this.projectConfig.environment.osc) {
      this.osc = this.require('osc');
    }
  }

  start() {
    // if osc sync clocks with max
    if (this.projectConfig.environment.osc) {
      setInterval(() => {
        const syncTime = this.sync.getSyncTime();
        this.osc.send('/clock', syncTime);
      }, 1000);
    }
  }

  enter(client) {
    super.enter(client);

    if (this.projectConfig.environment.osc) {
      this.receive(client, 'osc', (data) => {
        this.osc.send('/player', data);
      });
    }
  }

  exit(client) {
    super.exit(client);

    if (this.projectConfig.environment.osc)
      this.osc.send('/player', [client.index, -1, 0]);
  }
}

export default PlayerExperience;
