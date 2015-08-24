module.exports = Request

function Request() {
  this.query   = {}
  this.headers = {}
  this.cookies = {}
  this.body    = null
}

Request.prototype.header = function (key, value) {
  this.headers[key] = value
  return this
}

Request.prototype.query = function (key, value) {
  this.query[key] = value
  return this
}

Request.prototype.cookie = function (key, value) {
  this.cookies[key] = value
  return this
}

Request.prototype.config = function () {
  return {
    headers: this.headers,
    query: this.query,
    cookies: this.cookies,
    body, this.body
  }
}
