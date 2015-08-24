const Cucumber = require('cucumber')
const Apitance = require('./apitance')
const version = require('../package.json').version

exports.run = function (argv, done) {
  var configuration = Cucumber.Cli.Configuration(argv)

  if (configuration.isHelpRequested())
    return Cucumber.Cli().displayHelp(done)

  if (configuration.isVersionRequested()) {
    console.log('%s (with Cucumber %s)', version, Cucumber.VERSION)
    return done(true)
  }

  new Apitance()
    .useArgs(argv)
    .start(done)
}
