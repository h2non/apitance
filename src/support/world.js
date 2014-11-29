var _ = require('lodash')
var request = require('request')

exports.World = function World(done) {
  this.request = function (done) {
    request({
      url: this.url,
      method: this.method || 'GET',
      data: this.data
    }, function (err, res) {
      this.response = res
      done(err)
    }.bind(this))
  }

  this.getBodyObject = function () {
    var body = null
    if (this.response && (body = this.response.body)) {
      body = _.isArray(body) ? body[0] : body
    }
    return body
  }

  done()
}
