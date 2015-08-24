const Cucumber = require('cucumber')
const runner = require('./runner')
const paths = require('./paths')

module.exports = Runtime

function Runtime(apitance) {
  this.apitance = apitance
  this.config = Cucumber.Cli.Configuration(apitance.args)
}

Runtime.prototype.load = function () {
  this.apitance.loadSteps(paths.STEP_DEFINITIONS)
  return this
}

Runtime.prototype.start = function (done) {
  var apitance = this.apitance
  runner.currentApitanceInstance = apitance

  // Load build-in steps
  this.load()

  var defineStepNative = Cucumber.SupportCode.StepDefinition
  // Wrap Cucumber's step definition method
  Cucumber.SupportCode.StepDefinition = function (pattern, code) {
    return defineStepNative(pattern, function () {
      code.apply(this, arguments)
    })
  }

  var runtime = Cucumber.Runtime(this.config)

  var formatter = this.config.getFormatter()
  runtime.attachListener(formatter)
  //var suite = runtime.getSupportCodeLibrary()

  runtime.start(done)
  return runtime
}
