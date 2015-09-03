module.exports = function (step, apitance) {
  step.addDefinition('I send the request')
  step.addDefinition('[I]? send the request')

  step.addHandler(function (next) {
    next()
  })
}
