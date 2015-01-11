const _ = require('lodash')
const request = require('request')
const { HttpClient } = require('../client')

export class World {
  constructor(done) {
    this.request = null
    this.response = null
    this.config = {}
    this.headers = {}
    this.vars = {}
    done()
  }

  HttpClient(options) {
    return new HttpClient(options)
  }

  getBodyObject() {
    var body = null
    if (this.response && (body = this.response.body)) {
      body = _.isArray(body) ? body[0] : body
    }
    return body
  }
}

function buildOptions(options) {
  // to do
}
