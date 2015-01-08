const { expect } = require('chai')
const { stepify } = require('./helpers')
const step = exports

step['^[the]?[\\s+]?following global HTTP client configuration:'] = stepify(function (map) {
  map.rows().forEach(pair => {
    this.globalConfig.set(pair.shift(), pair.shift())
  })
})

step['^(set|define) global request config values:$'] = stepify(function (_, map) {

})
