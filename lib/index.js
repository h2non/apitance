require('./traceur-runtime')
const { version } = require('../package.json')
const { Apitance } = require('./apitance')

module.exports = Apitance

Apitance.VERSION = version
