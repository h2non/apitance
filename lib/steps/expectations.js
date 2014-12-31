const { expect } = require('chai')
const { stepify } = require('./helpers')
const step = exports

const errorCodes = {
  'timeout': 'ETIMEDOUT|ESOCKETTIMEDOUT',
  'refuse': 'ECONNREFUSED',
  'connection refuse': 'ECONNREFUSED',
  'not found': 'ENOTFOUND',
  '404': 'ENOTFOUND'
}

function getErrorCode(error) {
  const code = errorCodes[error.toLowerCase()]
  return code ? new RegExp('^' + code + '$', 'i') : null
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
  const code = getErrorCode(error)
  if (code == null) {
    throw new Error('Invalid or unsupported error name: ' + error)
  }
  expect(this.error.code).to.match(code)
})
