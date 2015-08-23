const Cucumber = require('cucumber')

module.exports = Apitance

function Apitance(opts) {
  this.opts = opts
  this.steps = []

  this.args = [
    '-r',
    __dirname + '/runner.js'
  ]
}

Apitance.prototype.useArgs = function (args) {
  this.args = args.concat(this.args)
}

Apitance.prototype.run = function (done) {
  var configuration = Cucumber.Cli.Configuration(this.args)
  var runtime = Cucumber.Runtime(configuration)

  var formatter = configuration.getFormatter()
  runtime.attachListener(formatter)

  runtime.start(done)
  return runtime
}
