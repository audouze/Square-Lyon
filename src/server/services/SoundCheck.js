import { Service, serviceManager } from 'soundworks/server';
import fs from 'fs';

const SERVICE_ID = 'service:sound-check';

class SoundCheck extends Service {
  constructor() {
    super(SERVICE_ID); // need a server counterpart
  }

  start() {
    super.start();

    this.ready();
  }

  stop() {
    super.stop();
  }

  connect(client) {
    this.receive(client, 'results', (results) => {
      fs.appendFileSync('sound-check-results.txt', JSON.stringify(results) + '\n');
    });
  }
}

serviceManager.register(SERVICE_ID, SoundCheck);

export default SoundCheck;
