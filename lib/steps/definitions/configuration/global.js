const _ = require('lodash')

const definitions = [
  'the [following]?[\\s+]?global HTTP configuration:$',
  'the [following]?[\\s+]?global HTTP options:$',
  'the [following]?[\\s+]?global HTTP params:$',
  'the [following]?[\\s+]?global HTTP params:$'
]

function handler(map, next) {
  var config = this.global.get('req') || { headers: {} }

  map.rows().forEach(function (pair) {
    var hash = pair.slice()
    var val = hash.shift()
    var key = hash.shift().toLowerCase()

    switch (key) {
      case 'authorization':
        config.headers['Authorization'] = val
        break
      case 'headers':
        _.merge(config.headers, JSON.parse(val))
        break
      case 'query':
        _.merge(config.headers, val)
        break
      case 'path':
        config.url = (config.url || '') + val
        break
      default:
        config[key] = val
        break
    }
  })

  this.global.set('req', config)
  next()
}

exports.definitions = definitions
exports.handler = handler

/*
step['(reset|flush) all global settings'] = stepify(function () {
  this.global.forEach((_, key) => {
    this.global.delete(key)
  })
})

step['(reset|flush) global configuration$'] = stepify(function () {
  this.global.delete('config')
})
*/
