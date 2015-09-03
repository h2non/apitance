module.exports = function (step, apitance) {
  step.addDefinition('(set|define) (an|the) environment variable "([^"]*)" (to|with value) "([^"]*)"$')

  step.addHandler(function (_, _, name, _, value, next) {
    process.env[name.trim()] = value.trim()
  })
}
