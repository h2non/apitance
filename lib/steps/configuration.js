const _ = require('lodash')
const { stepify } = require('./helpers')
const { global } = require('../store')
const step = exports

step['[the]?[\\s+]?[following]?[\\s+]?global HTTP client (configuration|options):$'] = stepify(function (__, map) {
  let config = this.global.get('config') || { headers: {} }
  map.rows().forEach(([key, value]) => {
    key = key.toLowerCase()
    switch (key) {
      case 'authorization':
        config.headers['Authorization'] = value
        break
      case 'headers':
        _.merge(config.headers, JSON.parse(value))
        break
      case 'query':
        _.merge(config.headers, value)
        break
      case 'path':
        config.url = (config.url || '') + value
        break
      default: config[key] = value
    }

  })
  this.global.set('config', config)
})

step['(set|define) (an|the) environment variable "([^"]*)" to "([^"]*)"$'] = stepify(function (_, __, name, value) {
  process.env[name.trim()] = value.trim()
})

step['(reset|flush) all global settings'] = stepify(function () {
  this.global.forEach((_, key) => {
    this.global.delete(key)
  })
})

step['(reset|flush) global configuration$'] = stepify(function () {
  this.global.delete('config')
})
