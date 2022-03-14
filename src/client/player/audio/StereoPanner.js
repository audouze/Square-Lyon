import { audioContext } from 'soundworks/client';

class StereoPanner {
  constructor() {
    // locals
    this.inversed = false;

    // init channel splitter / merger used in audio panning
    this.splitter = audioContext.createChannelSplitter(2);
    this.merger = audioContext.createChannelMerger(2);
    this.gainLL = audioContext.createGain();
    this.gainLR = audioContext.createGain();
    this.gainRL = audioContext.createGain();
    this.gainRR = audioContext.createGain();
    this.gainLL.gain.value = 1.0;
    this.gainLR.gain.value = 0.0;
    this.gainRL.gain.value = 0.0;
    this.gainRR.gain.value = 1.0;

    // connect graph
    this.splitter.connect(this.gainLL, 0);
    this.splitter.connect(this.gainLR, 0);
    this.splitter.connect(this.gainRL, 1);
    this.splitter.connect(this.gainRR, 1);

    this.gainLL.connect(this.merger, 0, 0);
    this.gainLR.connect(this.merger, 0, 1);
    this.gainRL.connect(this.merger, 0, 0);
    this.gainRR.connect(this.merger, 0, 1);
  }

  get input() {
    return this.splitter;
  }

  connect(audioNode) {
    this.merger.connect(audioNode);
  }

  disconnect() {
    this.merger.disconnect();
  }

  inverseChannels(onOff) {
    if (onOff && !this.inversed) {
      this.rampGain(this.gainLL, 0);
      this.rampGain(this.gainLR, 1);
      this.rampGain(this.gainRL, 1);
      this.rampGain(this.gainRR, 0);
      this.inversed = true;
    } else if (!onOff && this.inversed) {
      this.rampGain(this.gainLL, 1);
      this.rampGain(this.gainLR, 0);
      this.rampGain(this.gainRL, 0);
      this.rampGain(this.gainRR, 1);
      this.inversed = false;
    }
  }

  rampGain(gNode, oneZero, rampDuration = 4.0) {
    // handle envelope
    let now = audioContext.currentTime;
    gNode.gain.cancelScheduledValues(now);
    gNode.gain.setValueAtTime(gNode.gain.value, now);
    gNode.gain.linearRampToValueAtTime(oneZero, now + rampDuration);
  }
}

export default StereoPanner;
