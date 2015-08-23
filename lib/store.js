const _ = require('lodash')

module.exports = Store

function Store() {
  this.buf = {}
}

Store.prototype.set = function (key, value) {
  this.buf[key] = value
}

Store.prototype.remove = function (key) {
  this.buf[key] = undefined
}

Store.prototype.flush = function () {
  this.buf = {}
}

Store.prototype.get = function (key) {
  return this.buf[key]
}

Store.prototype.all = function () {
  return _.cloneDeep(this.buf)
}

Store.prototype.has = function (key) {
  return this.buf[key] && this.buf[key] !== undefined
}
