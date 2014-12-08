const { expect } = require('chai')
const steps = exports

steps['^[response ]?status code should be ([0-9]{3})$'] = function (code, done) {
  expect(this.response.statusCode).to.be.equal(parseInt(code, 10))
  done()
}

steps['^[response ]?content type should be "(.*)"$'] = function (mime, done) {
  expect(this.response.type).to.be.equal(mime)
  done()
}
