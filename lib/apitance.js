const Cucumber = require('cucumber')
const Runtime = require('./runtime')
const World = require('./world')
const Steps = require('./steps/steps')
const paths = require('./paths')

const defaultArgs = [ '-r', __dirname + '/runner.js' ]

module.exports = Apitance

function Apitance(opts) {
  this.steps = new Steps
  this.world = new World
  this._loaded = false
  this.opts = opts || {}
  this.args = defaultArgs // this.opts.argv
}

Apitance.prototype.loadSteps = function (dir) {
  this.steps.loadFromDirectory(dir || opts.stepsPath)
  return this
}

Apitance.prototype.addStep = function (fn) {
  var step = this.steps.inject(fn)
  this.steps.add(step)
  return this
}

Apitance.prototype.defineSteps = function (definer) {
  this.steps.define(definer)
}

Apitance.prototype.useArgs = function (args) {
  this.args = args.concat(this.args)
  return this
}

Apitance.prototype.load = function () {
  this.loadSteps(paths.STEP_DEFINITIONS)
  this._loaded = true
  return this
}

Apitance.prototype.start = function (done) {
  if (!this._loaded) this.load()

  var runtime = new Runtime(this)
  runtime.start(done)

  return runtime
}
