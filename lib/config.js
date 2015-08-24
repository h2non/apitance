const Store = require('./store')

module.exports = Config

function Config(parent) {
  this.store = new Store
  this.parent = parent
}

Config.prototype.set = function (key, value) {
  this.store[key] = value
}

Config.prototype.add = function (key, value) {
  if (this.store[key]) {
    this.store[key].push(value)
  } else {
    this.set(key, value)
  }
}

Config.prototype.get = function (key, value) {
  this.store[key] = value
}

Config.prototype.all = function () {
  return _.defaultsDeep(this.parent.all(), this.store.all())
}
