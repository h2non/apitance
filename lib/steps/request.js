const fs = require('fs')
const _ = require('lodash')
const { stepify } = require('./helpers')
const step = exports

// Given
step['[request|server] url (.*)'] = stepify(function (url) {
  this.config = {}
  this.url = url
})

step['the request method is ([a-z]{3,7})$'] = stepify(function (method) {
  this.method = method.toUpperCase()
})

step['with options:$'] = stepify(function (map) {
  var rows = map.rows()
})

step['^with the following query params "(.*)"$'] = stepify(function (params) {
  this.url += '?' + params
})

step['^request path value is "(.*)"$'] = stepify(function (path) {
  this.url += path
})

step['[the]?[\\s+]?request content type is "(.*)"$'] = stepify(function (mime) {
  this.requestType = mime
})

step['[the]?[\\s+]?request [body|payload] is:$'] = stepify(function (data) {
  this.data = data
})

step['[the]?[\\s+]?following request headers:$'] = stepify(function (map) {
  this.headers = this.headers || {}
  map.rows().forEach(values => {
    this.headers[values.shift()] = values.shift()
  })
})

step['^request timeout is (\\d+) [second[s]?]?'] = stepify(function (seconds) {
  this.config.timeout = parseInt(seconds, 10)
})

step['[the]?[\\s+]?[following]?[\\s+]?body[\\s+]?[data]?'] = stepify(function (body) {
  this.method = defineMethod(this.method)
  this.config.body = body
})

step['[the]?[\\s+]?[following]?[\\s+]?body[\\s+]?[data]?[\\s+]?[from]?[\\s+]?file'] =
step['[the]?[\\s+]?[following]?[\\s+]?body[\\s+]?[data]?[\\s+]?[from]?[\\s+]?file: (.*)'] = stepify(function (file) {
  this.method = defineMethod(this.method)
  this.config.body = fs.readFileSync(file)
})

function defineMethod(method) {
  return method === 'GET' || method == undefined ? 'POST' : method
}

step['^send the request[s]?$'] =
step['^perform the request[s]?$'] = function (done) {
  const options = _.merge(this.config, _.pick.apply(null, [this, 'method', 'url', 'data']))
  this.HttpClient(options).send((err, res) => {
    this.error = err
    this.response = res
    done()
  })
}
