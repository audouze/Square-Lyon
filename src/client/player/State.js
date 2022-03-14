import * as soundworks from 'soundworks/client';
import StereoPanner from './audio/StereoPanner';

const audio = soundworks.audio;
const audioContext = soundworks.audioContext;

class EventEngine extends audio.TimeEngine {
  constructor(state, events) {
    super();

    this.state = state;
    // maybe sort by time to make sure everything is ok
    this.events = events;
    this.currentIndex = 0;
  }

  advancePosition(time, position) {
    const currentEvent = this.events[this.currentIndex];
    const now = audioContext.currentTime;
    const dt = time - now;
    const currentIndex = this.currentIndex; // copy for setTimeout
    // defer execution to be more precise
    setTimeout(() => {
      this.state.handleEvent(currentEvent, currentIndex);
    }, dt * 1000);

    this.currentIndex += 1;

    if (this.events[this.currentIndex])
      return this.events[this.currentIndex].time;
    else
      return Infinity;
  }

  syncPosition(time, position) {
    // go to beginning of previous event
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      const next = this.events[i + 1];

      if (position >= event.time) {
        // apply event silently, and test next event
        if (next && position > next.time) {
          // recreate whole time line from beginning of the state
          this.state.handleEvent(event, i, true);

        // if several event at same position, we pass here too
        } else {
          // we found the current index
          this.currentIndex = i;
          break;
        }
      }
    }

    return this.events[this.currentIndex].time;
  }
}

class State {
  constructor(index, experience, stateConfig, commonConfig, isLast) {
    this.index = index;
    this.experience = experience;
    this.stateConfig = stateConfig;
    this.commonConfig = commonConfig;
    this.isLast = isLast;

    this.eventEngine = new EventEngine(this, this.stateConfig.events);

    this.initialOrientation = null;
    this.motionInputCallback = this.motionInputCallback.bind(this);

    this._createStream(0);
  }

  _createStream() {
    this.audioStream = this.experience.audioStreamManager.getAudioStream();
    this.audioStream.sync = false;
    this.audioStream.loop = this.stateConfig.stream.loop;
    this.audioStream.url = this.stateConfig.stream.id;
    this.audioStream.periodic = !!this.stateConfig.stream.period;

    this.audioStream.onended = () => {
      this.audioStream.url = this.commonConfig.fallbackStream.id;
      this.audioStream.loop = true;
      this.audioStream.sync = false;
      this.audioStream.start(0);
    };

    this.stereoPanner = new StereoPanner();

    this.audioStream.connect(this.stereoPanner.input);
    this.stereoPanner.connect(audioContext.destination);
  }

  enter() {
    const { playControl, transport, view, motionInput } = this.experience;

    view.setId(this.index);
    transport.add(this.eventEngine);
    playControl.start();

    if (this.stateConfig.stream.period) {
      const syncTime = this.experience.sync.getSyncTime();
      const offset = syncTime % this.stateConfig.stream.period;
      this.audioStream.start(offset);
    } else {
      this.audioStream.start(0);
    }

    if (motionInput.isAvailable('deviceorientation'))
      motionInput.addListener('deviceorientation', this.motionInputCallback);
  }

  exit() {
    const { playControl, transport, motionInput } = this.experience;
    playControl.stop();

    if (this.eventEngine.master)
      transport.remove(this.eventEngine);

    if (motionInput.isAvailable('deviceorientation'))
      motionInput.removeListener('deviceorientation', this.motionInputCallback);

    this.audioStream.stop(0);
    this.stereoPanner.disconnect();
  }

  seek(eventIndex) {
    const position = this.stateConfig.events[eventIndex].time;
    this.experience.playControl.seek(position);

    this.audioStream.stop(0);
    this.stereoPanner.disconnect();

    this._createStream();
    this.audioStream.start(position);
  }

  handleEvent(event, eventIndex, silent = false) {
    const view = this.experience.view;

    switch (event.type) {
      case 'background-color':
        view.setBackgroundColor(event.placeholder, event.color);
        break;
      case 'background-image':
        view.setBackgroundImage(event.placeholder, event.url);
        break;
      case 'text-subtitle':
        if (this.commonConfig.enableSubtitles){
          view.setTextContent(event.placeholder, event.content, event.classes);
        }
        break;
      case 'text':
        view.setTextContent(event.placeholder, event.content, event.classes);
        break;
      case 'fade-in':
        const fadeInDuration = silent ? 0 : event.duration;
        view.fadeIn(event.placeholder, fadeInDuration);
        break;
      case 'fade-out':
        const fadeOutDuration = silent ? 0 : event.duration;
        view.fadeOut(event.placeholder, fadeOutDuration);
        break;
      case 'trigger-next-state':
        if (!silent) {
          view.setEvent(event.placeholder, () => {
            this.experience.setState(this.index + 1);

            if (event.triggerAudio)
              this.experience.simplePlayer.trigger(event.triggerAudio.id);
          });
        }
        break;
      case 'trigger-audio':
        if (!silent)
          this.experience.simplePlayer.trigger(event.id);
        break;
      case 'vibrate':
        if (!silent) {
          // check for vibrate API (not in Safari)
          if (window.navigator.vibrate !== undefined)
            window.navigator.vibrate(event.pattern);
        }
        break;
    }

    // for 'trigger-next-state' event type, we wait for the interaction
    if (event.type !== 'trigger-next-state' && !silent) {
      if (event.triggerAudio)
        this.experience.simplePlayer.trigger(event.triggerAudio.id);
    }

    // is we are in the last state, we delete the saved progression
    if (!silent) {
      if (!this.isLast)
        this.experience.saveProgression(this.index, eventIndex);
      else
        this.experience.deleteProgression();
    }
  }

  motionInputCallback(data) {
    const orientation = data[0];

    if (this.initialOrientation === null)
      this.initialOrientation = orientation;

    // get reverse orientation state (is subject facing opposite dir.
    // from when current state started)
    const inverseChannels = Math.cos((orientation - this.initialOrientation) / 180 * Math.PI) < 0;
    this.stereoPanner.inverseChannels(inverseChannels);
  }
}

export default State;
