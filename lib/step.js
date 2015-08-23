module.exports = Step

function Step(handler) {
  this.handler = handler
  this.definitions = []
}

Step.prototype.addDefinition = function (definition) {
  this.definitions.push(defition)
  return this
}

Step.prototype.load = function () {

}
