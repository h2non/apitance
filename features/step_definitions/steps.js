var nock = require('nock')

module.exports = function () {
  var Step = this.defineStep

  this.Before(function (scenario, done) {
    console.log('Clean all')
    nock.cleanAll()
    done()
  })

  Step(/mock ([a-z]{3,6}) request to "([^"]*)"$/i, function (method, path, done) {
    var method = method.toLowerCase()
    this._mock = nock('http://localhost:8882')[method](path)
    done()
  })

  Step(/mock should reply with status ([0-9]{3})$/i, function (status, done) {
    this._mock.reply(parseInt(status, 10))
    done()
  })

  Step(/mock should reply with status ([0-9]{3}) and body:/i, function (status, body, done) {
    this._mock.reply(parseInt(status, 10), body)
    done()
  })

  Step(/^clean all mock$/, function (done) {
    nock.cleanAll()
    done()
  })
}
