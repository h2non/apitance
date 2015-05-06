const { expect } = require('chai')
const { stepify } = require('./helpers')
const step = exports

step['^!(.*)'] = stepify(function () { /* no-op */ })

step['^(set|define) (constant|variable|environment) "([^"]*)" (to|with data|with value) "([^"]*)"$'] = stepify(function (_, __, name, ___, value) {
  this.vars[name] = value
})

step['^(set|define) [multiple]?[\\s+]?(constants|variables|environment values)'] = stepify(function (_, __, map) {
  map.rows().forEach(pair => {
    this.vars[pair.shift()] = pair.shift()
  })
})

step['^(assert|expect) (constant|variable|environment) "([^"]*)" to equal "([^"]*)"$'] = stepify(function (_, __, name, value) {
  expect(this.vars[name]).to.be.equal(value)
})
