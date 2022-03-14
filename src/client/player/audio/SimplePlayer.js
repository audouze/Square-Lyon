import { audioContext } from 'soundworks/client';

class SimplePlayer {
  constructor(bufferList) {
    this.bufferList = bufferList;
  }

  // connect(destination) {}

  trigger(bufferId) {
    const buffer = this.bufferList[bufferId];

    const src = audioContext.createBufferSource();
    src.connect(audioContext.destination);
    src.buffer = buffer;
    src.start(audioContext.currentTime);
  }
}

export default SimplePlayer;
