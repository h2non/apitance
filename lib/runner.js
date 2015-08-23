const loader = require('./loader')
const Store = require('./store')
const env = process.env

const globalConfig = new Store

module.exports = function () {
  console.log('>>>> Register!', this)
  loadConfig(self)

  this.World = function (done) {
    this.req = {}
    this.res = null
    this.error = null

    this.vars = new Store
    this.config = new Store
    this.global = globalConfig

    done()
  }

  loader(this)
}

function loadConfig(self) {
  var baseUrl = env.APITANCE_BASEURL || env.APITANCE_BASE_URL || ''
  globalConfig.set('baseUrl', baseUrl)

  if (env.APITANCE_AUTH) {

  }

  if (env.APITANCE_USER) {
    self.config.auth = { username: env.APITANCE_USER }
    if (env.APITANCE_PASSWORD) {
      self.config.auth.password = env.APITANCE_PASSWORD
    }
  }

  if (env.APITANCE_COOKIE) {
    self.headers.Cookie = env.APITANCE_COOKIE
  }

  if (env.APITANCE_TIMEOUT) {
    self.config.timeout = parseInt(env.APITANCE_TIMEOUT, 10)
  }

  if (env.APITANCE_PROXY) {
    self.config.proxy = env.APITANCE_PROXY
  } else if (env.http_proxy) {
    self.config.proxy = env.http_proxy
  }
}
