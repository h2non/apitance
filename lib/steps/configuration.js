const { stepify } = require('./helpers')
const { global } = require('../store')
const step = exports

step['^[the]?[\\s+]?following global HTTP client configuration:'] = stepify(function (map) {
  map.rows().forEach(pair => {
    this.globalConfig.set(pair.shift(), pair.shift())
  })
})

step['(set|define) (an|the) environment variable "([^"]*)" to "([^"]*)"$'] = stepify(function (_, __, name, value) {
  process.env[name.trim()] = value.trim()
})
