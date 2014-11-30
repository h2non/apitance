var _ = require('lodash')
var request = require('request')

module.exports = client

function Client(options) {
  this.setConfig(options)
}

Client.prototype.defaults = {
  url: '',
  path: '',
  method: 'GET',
  headers: null,
  auth: null
}

Client.prototype.setConfig = function (config) {
  this.config = _.extend({}, this.defaults, config)
}

Client.prototype.url = function (url) {
  this.config.url = url
}

Client.prototype.path = function (path) {
  this.config.path = path
}

Client.prototype.addPath = function (path) {
  this.config.path += path
}

Client.prototype.headers = function (headers, value) {
  if (_.isObject(headers)) {
    this.config.headers = _.clone(headers)
  } else if (typeof headers === 'string' && value) {
    this.config.headers
  }
  this.config.path += path
}

Client.prototype.send = function (cb) {
  request(this.getConfig(), cb)
}

Client.prototype.getConfig = function () {
  var config = _.cloneDeep(this.config)
  config.url = config.url + config.path
  return config
}
