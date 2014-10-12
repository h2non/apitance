var expect = require('chai').expect
var _ = require('lodash')

module.exports = function () {
  var Step = this.defineStep
  this.World = require('../support/world').World

  Step(/^a new request to (.*)/, function (url, done) {
    this.url = url
    done()
  })

  Step(/^the request method is ([a-z]{3,7})$/i, function (method, done) {
    this.method = method.toUpperCase()
    done()
  })

  Step(/^with the following query params "(.*)"$/i, function (params, done) {
    this.url += '?' + params
    done()
  })

  Step(/^request path value is "(.*)"$/i, function (path, done) {
    this.url += path
    done()
  })

  Step(/^request content type is "(.*)"$/i, function (mime, done) {
    this.requestType = mime
    done()
  })

  Step(/^request payload is:$/i, function (data, done) {
    this.data = data
    done()
  })

  Step(/^perform the request$/i, function (done) {
    this.request(done)
  })

  Step(/^[response ]?status code should be ([0-9]{3})$/, function (code, done) {
    expect(this.response.statusCode).to.be.equal(parseInt(code, 10))
    done()
  })

  Step(/^[response ]?content type should be "(.*)"$/, function (mime, done) {
    expect(this.response.type).to.be.equal(mime)
    done()
  })
}
