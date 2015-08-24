
exports.loadConfig = function loadConfig(self) {
  var baseUrl = env.APITANCE_BASEURL || env.APITANCE_BASE_URL || ''
  globalConfig.set('baseUrl', baseUrl)

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
