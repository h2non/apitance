const _ = require('lodash')
const steps = exports

// Given
steps['[request|server] url (.*)'] = function (url, done) {
  this._request = this.HttpClient()
  this.url = url
  done()
}

steps['the request method is ([a-z]{3,7})$'] = function (method, done) {
  this.method = method.toUpperCase()
  done()
}

steps['^with the following query params "(.*)"$'] = function (params, done) {
  this.url += '?' + params
  done()
}

steps['^request path value is "(.*)"$'] = function (path, done) {
  this.url += path
  done()
}

steps['[the]?[\s+]?request content type is "(.*)"$'] = function (mime, done) {
  this.requestType = mime
  done()
}

steps['[the]?[\s+]?request [body|payload] is:$'] = function (data, done) {
  this.data = data
  done()
}

steps['[the]?[\s+]?following request headers:$'] = function (map, done) {
  this.headers = this.headers || {}
  map.rows().forEach(values => {
    this.headers[values.shift()] = values.shift()
  })
  done()
}

steps['^send the request[s]?$'] =
steps['^perform the request[s]?$'] = function (done) {
  this.HttpClient(_.pick.apply(null, [this, 'method', 'url', 'data'])).send((err, res) => {
    this.error = err
    this.response = res
    done()
  })
}
