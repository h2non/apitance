const { expect } = require('chai')
const { stepify } = require('./helpers')
const step = exports

const errorCodes = {
  'timeout': 'ETIMEDOUT',
  'refuse': 'ECONNREFUSED'
}

step['^[response ]?status code should be ([0-9]{3})$'] = stepify(function (code) {
  expect(this.response.statusCode).to.be.equal(parseInt(code, 10))
})

step['^[response ]?content type should be "(.*)"$'] = stepify(function (mime) {
  expect(this.response.type).to.be.equal(mime)
})

step['[should]? fail due to (.*) error$'] = stepify(function (error) {
  if (!this.error) {
    throw new Error('No error found. The request was success')
  }
  expect(this.error.code).to.be.equal(errorCodes[error.toLowerCase()])
})
