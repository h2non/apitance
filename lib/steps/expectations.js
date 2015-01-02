const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const { stepify } = require('./helpers')
const tv4 = require('tv4')
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

step['^[response]?[\\s]?status code should be ([0-9]{3})$'] = stepify(function (code) {
  if (this.error) {
    throw new Error('The request was failed due to an error: ' + (this.error.code || this.error))
  }
  expect(this.response.statusCode).to.be.equal(parseInt(code, 10))
})

step['^[response]?[\\s+]?content type should be "(.*)"$'] = stepify(function (mime) {
  if (this.error) {
    throw new Error('The request was failed due to an error: ' + (this.error.code || this.error))
  }
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

step['body should implement the JSON schema file'] = stepify(function (file) {
  file = path.normalize(file)
  if (fs.existsSync(file) === false) {
    throw new Error('File do not exist in the path: ' + file)
  }
  const schema = fs.readFileSync(file).toString()
  const result = tv4.validateMultiple(parseBody(this.response), JSON.parse(schema))
  if (result.valid === false) {
    throw new Error('Response body do not match with the JSON Schema: ' + JSON.stringify(result, null, 2))
  }
})

step['body should not implement the JSON schema file'] = stepify(function (file) {
  file = path.normalize(file)
  if (fs.existsSync(file) === false) {
    throw new Error('File do not exist in the path: ' + file)
  }
  const schema = fs.readFileSync(file).toString()
  const result = tv4.validateMultiple(parseBody(this.response), JSON.parse(schema))
  if (result.valid === true) {
    throw new Error('Response body matches the JSON Schema: ' + schema)
  }
})

step['body should implement the JSON schema:'] = stepify(function (schema) {
  const result = tv4.validateMultiple(parseBody(this.response), JSON.parse(schema))
  if (result.valid === false) {
    throw new Error('Response body do not match with the JSON Schema: ' + JSON.stringify(result, null, 2))
  }
})

function parseBody(res) {
  if (/application\/json/i.test(res.headers['content-type']) === false) {
    throw new Error('Invalid response MIME content type. It should be application/json')
  }
  return JSON.parse(res.body)
}
