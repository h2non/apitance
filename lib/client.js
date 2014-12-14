const _ = require('lodash')
const request = require('request')

const defaultOptions = {
  method: 'GET'
}

export class HttpClient {
  constructor(options) {
    this.setConfig(options)
  }

  setConfig(config) {
    this.config = _.assign({}, defaultOptions, config)
  }

  url(url) {
    this.config.url = url
  }

  definePath(path) {
    this.config.path = path
  }

  addPath(path) {
    this.config.path += path
  }

  headers(headers, value) {
    if (_.isObject(headers)) {
      this.config.headers = _.clone(headers)
    } else if (typeof headers === 'string' && value) {
      this.config.headers
    }
    this.config.path += path
  }

  send(cb) {
    request(this.getConfig(), cb)
  }

  getConfig() {
    var config = _.cloneDeep(this.config)
    if (config.path) config.url = config.url + config.path
    return config
  }
}
