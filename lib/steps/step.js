module.exports = Step

function Step(handler) {
  this.enabled = true
  this.handler = handler
  this.definitions = []
}

Step.prototype.addAlias =
Step.prototype.addDefinition = function (definition) {
  this.definitions.push(new RegExp(definition, 'i'))
}

Step.prototype.disable = function () {
  this.enabled = false
}

Step.prototype.run = function (ctx, args) {
  this.handler.apply(ctx, args)
}

Step.prototype.register = function (defineStep) {
  this.definitions.forEach(function (definition) {
    defineStep(definition, this.handler)
  }.bind(this))
}
