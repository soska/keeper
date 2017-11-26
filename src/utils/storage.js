const {log} = console;

const defaultErrorHandler = ex => {
  if (process.env.NODE_ENV !== 'production') {
    throw ex;
  }
  log(ex);
};

class Storage {
  constructor(name, errorHandler = defaultErrorHandler) {
    this.name = name;
    this.errorHandler = errorHandler;
    this.init();
  }

  unserialize() {
    const json = localStorage.getItem(this.name) || '';
    if (!json || json === 'undefined') {
      return null;
    }
    try {
      return JSON.parse(json);
    } catch (ex) {
      this.errorHandler(ex);
    }
  }

  serialize(obj) {
    try {
      localStorage.setItem(this.name, JSON.stringify(obj));
    } catch (ex) {
      this.errorHandler(ex);
    }
  }

  init() {
    if (!this.unserialize()) {
      this.serialize({});
    }
  }

  nuke() {
    localStorage.removeItem(this.name);
  }

  getItem(prop, defaultValue = null) {
    const obj = this.unserialize();
    if (obj && typeof obj[prop] !== 'undefined') {
      return obj[prop];
    }
    return defaultValue;
  }

  setItem(prop, val) {
    const obj = this.unserialize();
    obj[prop] = val;
    this.serialize(obj);
  }
}

export default Storage;
