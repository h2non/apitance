const _ = require('lodash')
const { stepify } = require('./helpers')
const steps = exports

// Given
steps['[request|server] url (.*)'] = stepify(function (url) {
  this.config = {}
  this.url = url
})

steps['the request method is ([a-z]{3,7})$'] = stepify(function (method) {
  this.method = method.toUpperCase()
})

steps['with options:$'] = stepify(function (map) {
  var rows = map.rows()
})

steps['^with the following query params "(.*)"$'] = stepify(function (params) {
  this.url += '?' + params
})

steps['^request path value is "(.*)"$'] = stepify(function (path) {
  this.url += path
})

steps['[the]?[\\s+]?request content type is "(.*)"$'] = stepify(function (mime) {
  this.requestType = mime
})

steps['[the]?[\\s+]?request [body|payload] is:$'] = stepify(function (data) {
  this.data = data
})

steps['[the]?[\\s+]?following request headers:$'] = stepify(function (map) {
  this.headers = this.headers || {}
  map.rows().forEach(values => {
    this.headers[values.shift()] = values.shift()
  })
})

steps['^request timeout is (\\d+) [second[s]?]?'] = stepify(function (seconds) {
  this.config.timeout = parseInt(seconds, 10)
})

steps['^send the request[s]?$'] =
steps['^perform the request[s]?$'] = function (done) {
  const options = _.merge(this.config, _.pick.apply(null, [this, 'method', 'url', 'data']))
  this.HttpClient(options).send((err, res) => {
    this.error = err
    this.response = res
    done()
  })
}
