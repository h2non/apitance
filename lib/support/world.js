const _ = require('lodash')
const request = require('request')
const { global } = require('../store')
const { HttpClient } = require('../client')

export class World {
  constructor(done) {
    this.global = global
    this.request = null
    this.response = null
    this.config = {}
    this.headers = {}
    this.vars = {}
    done()
  }

  HttpClient(options) {
    return new HttpClient(_.merge({}, this.global.get('config'), options ))
  }

  getBodyObject() {
    var body = null
    if (this.response && (body = this.response.body)) {
      body = _.isArray(body) ? body[0] : body
    }
    return body
  }

  defineConfig() {

  }
}
