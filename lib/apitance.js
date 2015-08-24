const Cucumber = require('cucumber')
const Runtime = require('./runtime')
const Steps = require('./steps/steps')
const paths = require('./paths')

module.exports = Apitance

function Apitance(opts) {
  this.steps = new Steps
  this.opts = opts || {}
  this.args = [ '-r', __dirname + '/runner.js' ] // this.opts.argv
}

Apitance.prototype.loadSteps = function (dir) {
  this.steps.loadFromDirectory(dir || opts.stepsPath)
  return this
}

Apitance.prototype.useArgs = function (args) {
  this.args = args.concat(this.args)
  return this
}

Apitance.prototype.start = function (done) {
  var runtime = new Runtime(this)
  runtime.start(done)
  return runtime
}
