module.exports = Response

function Response() {
  this.status = 0
}

Response.prototype.status = function (code) {
  this.status = 200
}
