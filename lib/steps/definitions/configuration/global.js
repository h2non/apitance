const _ = require('lodash')

module.exports = function (step) {
  const definitions = [
    'the [following]?[\\s+]?global HTTP configuration:$',
    'the [following]?[\\s+]?global HTTP options:$',
    'the [following]?[\\s+]?global HTTP params:$',
    'the [following]?[\\s+]?global HTTP params:$'
  ]

  definitions.forEach(function (definition) {
    step.addDefinition(definition)
  })

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

  step.addHandler(handler)
}
