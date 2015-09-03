const loader = require('./loader')
const Step = require('./step')

module.exports = Steps

function Steps() {
  this.steps = []
}

Steps.prototype.add = function (step) {
  this.steps.push(step)
}

Steps.prototype.inject = function (fn) {
  var step = new Step
  fn(step)
  return step
}

Steps.prototype.loadFromDirectory = function (dir) {
  loader(dir)
  .map(this.inject.bind(this))
  .forEach(this.add.bind(this))
}

Steps.prototype.define = function (defineStep, ctx) {
  this.steps.forEach(function (step) {
    step.definitions.forEach(function (definition) {
      defineStep(definition, stepHandler(step))
    }.bind(this))
  })

  function stepHandler(step) {
    return function () {
      var args = [].slice.call(arguments)
      var done = args.pop()
      this.step = step
      step.run(ctx, args, done)
    }
  }
}
