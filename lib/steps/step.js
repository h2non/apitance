const fw = require('fw')

module.exports = Step

function Step() {
  this.enabled = true
  this.handlers = []
  this.definitions = []
}

Step.prototype.addHandler = function (definition) {
  this.handlers.push(new RegExp(definition, 'gi'))
}

Step.prototype.addAlias =
Step.prototype.addDefinition = function (definition) {
  this.definitions.push(new RegExp(definition, 'i'))
}

Step.prototype.disable = function () {
  this.enabled = false
}

Step.prototype.runner = function (ctx, args, done) {
  if (this.enabled === false) return done()

  fw.eachSeries(this.handlers, function (fn, next) {
    fn.apply(ctx, args.concat(next))
  }, done)
}

Step.prototype.run = function () {
  return this.runner.bind(this)
}
