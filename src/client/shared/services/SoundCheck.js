import { Service, serviceManager } from 'soundworks/client';
import { audioContext } from 'waves-audio';

const SERVICE_ID = 'service:sound-check';

class SoundCheck extends Service {
  constructor() {
    super(SERVICE_ID); // need a server counterpart

    this.platform = this.require('platform');
    this.audioBufferManager = this.require('audio-buffer-manager');

    const defaults = {
      viewPriority: 5,
    }

    this.onCheckResult = this.onCheckResult.bind(this);

    this.configure(defaults);
  }

  start() {
    super.start();
    this.show();

    this.view.setCheckCallback(this.onCheckResult);

    this.audioStartTime = audioContext.currentTime;
    this.dateStartTime = new Date().getTime() / 1000;
    this.deltaStart = this.dateStartTime - this.audioStartTime;

    // play sound and display buttons
    this.testSrc = audioContext.createBufferSource();
    this.testSrc.buffer = this.audioBufferManager.data.testFile;
    this.testSrc.connect(audioContext.destination);
    this.testSrc.start();
  }

  stop() {
    this.testSrc.stop();
    this.hide();

    super.stop();
  }

  onCheckResult(result) {
    const audioStopTime = audioContext.currentTime;
    const clockStopTime = new Date().getTime() / 1000;
    const deltaStop = clockStopTime - audioStopTime;

    const results = {
      result,
      audioStartTime: this.audioStartTime,
      dateStartTime: this.dateStartTime,
      deltaStart: this.deltaStart,
      audioStopTime,
      clockStopTime,
      deltaStop,
    }

    this.send('results', results);

    if (result === false) {
      window.location.reload(true);
    } else {
      this.ready();
    }
  }
}

serviceManager.register(SERVICE_ID, SoundCheck);

export default SoundCheck;
