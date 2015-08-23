const Apitance = require('./lib/apitance')

module.exports = apitance

/**
 * API factory
 */

function apitance(opts) {
  return new Apitance(opts)
}

/**
 * Expose modules
 */

apitance.cli = require('./lib/cli')
apitance.step = require('./lib/step')
apitance.Cucumber = require('cucumber')

/**
 * Expose version
 */

apitance.VERSION = require('./package.json').version
