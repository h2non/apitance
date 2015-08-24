const loader = require('./loader')
const Step = require('./step')

module.exports = Steps

function Steps() {
  this.steps = []
}

Steps.prototype.add = function (step) {
  var s = new Step(step.handler)

  if (step.definition) {
    step.definitions = [ step.definition ]
  }

  step.definitions.forEach(function (definition) {
    s.addDefinition(definition)
  })

  this.steps.push(s)
}

Steps.prototype.loadFromDirectory = function (dir) {
  var steps = loader(dir)
  steps.map(this.add.bind(this))
}

Steps.prototype.register = function (suite) {
  this.steps.forEach(function (step) {
    step.register(suite)
  })
}
