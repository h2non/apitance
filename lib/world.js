const _ = require('lodash')

module.exports = World

function World() {
  this.buf = Object.create(null)
}

World.prototype.define = function (key, value) {
  this.buf[key] = value
  return this
}

World.prototype.extend = function (parent) {
  _.extend(parent, this.buf)
}
