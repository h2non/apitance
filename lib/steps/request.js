const fs = require('fs')
const _ = require('lodash')
const { stepify } = require('./helpers')
const step = exports

step['[request|server] url (.*)'] = stepify(function (url) {
  this.config = {}
  this.headers = {}
  this.url = url
})

step['the request method is ([a-z]{3,7})$'] = stepify(function (method) {
  this.method = method.toUpperCase()
})

step['[with|the]?[\\s+]?[following]?[\\s+]?request options:$'] = stepify(function (map) {
  var rows = map.rows()
})

step['[with|the]?[\\s+]?[following]?[\\s+]?query params "(.*)"$'] = stepify(function (params) {
  this.url += '?' + params
})

step['^request path value is "(.*)"$'] = stepify(function (path) {
  this.url += path
})

step['[the]?[\\s+]?request content type is "(.*)"$'] = stepify(function (mime) {
  this.requestType = mime
})

step['[the]?[\\s+]?[following]?[\\s+]?request headers:$'] = stepify(function (map) {
  map.rows().forEach(values => {
    this.headers[values.shift()] = values.shift()
  })
})

step['^request timeout is (\\d+) [second[s]?]?'] = stepify(function (seconds) {
  this.config.timeout = parseInt(seconds, 10)
})

step['[the]?[\\s+]?request [body|payload] is:$'] =
step['[the]?[\\s+]?[following]?[\\s+]?request payload[\\s+]?[data]?'] =
step['[the]?[\\s+]?[following]?[\\s+]?request body[\\s+]?[data]?'] = stepify(function (body) {
  this.method = defineMethod(this.method)
  this.config.body = body
})

step['[the]?[\\s+]? user "([^"]*)" and pass "([^"]*)"'] =
step['[the]?[\\s+]? username "([^"]*)" and password "([^"]*)"'] = stepify(function (user, pass) {
  this.config.auth = { username: user, password: pass }
})

step['[the]?[\\s+]?[auth|authorization] value "(.*)"'] = stepify(function (auth) {
  this.headers.Authorization = auth
})

step['[the]?[\\s+]?[following]?[\\s+]?body[\\s+]?[data]?[\\s+]?[from]?[\\s+]?file:'] = stepify(function (file) {
  this.method = defineMethod(this.method)
  this.config.body = fs.readFileSync(file)
})

function defineMethod(method) {
  return method === 'GET' || method == undefined ? 'POST' : method
}

step['should wait (\\d+) seconds [before send the request]?'] = function (seconds, done) {
  setTimeout(done, parseInt(seconds, 10))
}

step['send the request[s]?$'] =
step['perform the request[s]?$'] = function (done) {
  const options = _.merge(this.config, _.pick.apply(null, [this, 'method', 'url', 'data']))
  this.HttpClient(options).send((err, res) => {
    this.error = err
    if (res) {
      this.response = res
      this.body = res.body
    }
    done()
  })
}
