const _ = require('lodash')
const steps = exports

steps['a server url (.*)'] =
steps['a request to (.*)'] = function (url, done) {
  this.url = url
  done()
}

steps['^the request method is ([a-z]{3,7})$'] = function (method, done) {
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

steps['^request content type is "(.*)"$'] = function (mime, done) {
  this.requestType = mime
  done()
}

steps['^request payload is:$'] = function (data, done) {
  this.data = data
  done()
}

steps['^send the request[s]?$'] =
steps['^perform the request[s]?$'] = function (done) {
  this.request(_.pick.apply(null, [this, 'method', 'url', 'data'])).send((err, res) => {
    this.error = err
    this.response = res
    done()
  })
}
