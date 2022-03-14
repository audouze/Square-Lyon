import { Service, serviceManager } from 'soundworks/client';

const SERVICE_ID = 'service:images-loader';


function prefixPaths(pathList, prefix) {
  // test absolute urls (or protocol relative)
  const isAbsolute = /^https?:\/\/|^\/\//i;

  pathList = pathList.map((path) => {
    if (isAbsolute.test(path) || prefix === '/')
      return path;
    else
      return prefix + path;
  });

  return pathList;
}


class ImagesLoader extends Service {
  constructor() {
    super(SERVICE_ID, false);

    const defaults = {
      files: [],
      viewPriority: 3,
      assetsDomain: '',
    };

    this.configure(defaults);
  }

  start() {
    super.start();
    this.show();

    this.loadImages();
  }

  stop() {
    this.hide();
    super.stop();
  }

  loadImages() {
    const images = prefixPaths(this.options.files, this.options.assetsDomain);

    const promises = images.map(src => {
      return new Promise((resolve, reject) => {
        const $img = new Image();
        $img.src = src;
        $img.onload = () => resolve();
      });
    });

    Promise.all(promises).then(() => this.ready());
  }
}

serviceManager.register(SERVICE_ID, ImagesLoader);

export default ImagesLoader;
