const _ = require('lodash')
const request = require('request')
const { Client } = require('../client')

export class World {
  constructor(done) {
    done()
  }

  newClient(options) {
    return new Client(options)
  }

  getBodyObject() {
    var body = null
    if (this.response && (body = this.response.body)) {
      body = _.isArray(body) ? body[0] : body
    }
    return body
  }
}
