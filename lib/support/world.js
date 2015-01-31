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
    this.defineConfig()
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
    const env = process.env

    this.baseUrl = env.APITANCE_BASEURL || env.APITANCE_BASE_URL || ''

    if (env.APITANCE_USER) {
      this.config.auth = { username: env.APITANCE_USER }
      if (env.APITANCE_PASSWORD) {
        this.config.auth.password = env.APITANCE_PASSWORD
      }
    }

    if (env.APITANCE_COOKIE) {
      this.headers.Cookie = env.APITANCE_COOKIE
    }

    if (env.APITANCE_TIMEOUT) {
      this.config.timeout = parseInt(env.APITANCE_TIMEOUT, 10)
    }

    if (env.APITANCE_PROXY) {
      this.config.proxy = env.APITANCE_PROXY
    } else if (env.http_proxy) {
      this.config.proxy = env.http_proxy
    }
  }
}
