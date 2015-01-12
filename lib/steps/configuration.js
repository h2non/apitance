const { stepify } = require('./helpers')
const { global } = require('../store')
const step = exports

step['[the]?[\\s+]?[following]?[\\s+]?global HTTP client (configuration|options):$'] = stepify(function (_, map) {
  map.rows().forEach(pair => {
    this.global.set(pair.shift().toLowerCase(), pair.shift())
  })
})

step['(set|define) (an|the) environment variable "([^"]*)" to "([^"]*)"$'] = stepify(function (_, __, name, value) {
  process.env[name.trim()] = value.trim()
})

step['^reset global configuration$'] = stepify(function () {
  this.global.forEach((_, key) => {
    this.global.remove(key)
  })
})
