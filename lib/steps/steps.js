const _ = require('lodash')
const { expect } = require('chai')

// module.export = defineSteps

export function defineSteps() {
  const defineStep = this.defineStep
  this.World = require('../support/world').World
  registerSteps(defineStep)
}

function registerSteps(defineStep) {
  ['expect', 'request'].forEach(function (module) {
    var steps = require('./' + module)
    Object.keys(steps).forEach(function (step) {
      defineStep(new RegExp(step), steps[step])
    })
  })
}
