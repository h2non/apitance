const _ = require('lodash')
const request = require('request')

const defaultOptions = new Map()

export class HttpClient {
  constructor(options) {
    this.setConfig(options)
  }

  setConfig(config) {
    this.config = _.union({}, defaultOptions, config)
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
    config.url = config.url + config.path
    return config
  }
}
