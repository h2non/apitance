const steps = exports

steps['a request to (.*)'] = function (url, done) {
  this.url = url
  done()
}

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

steps['^perform the request$'] = function (done) {
  this.request(done)
}
