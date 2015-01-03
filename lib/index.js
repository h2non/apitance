const chai = require('chai')
const { version } = require('../package.json')
const { Apitance } = require('./apitance')
chai.use(require('chai-http'))

module.exports = Apitance

Apitance.VERSION = version
