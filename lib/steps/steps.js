const _ = require('lodash')
const { expect } = require('chai')

module.exports = defineSteps

function defineSteps() {
  this.World = require('../support/world').World
  registerSteps(this.defineStep)
}

function registerSteps(defineStep) {
  ['expectations', 'request'].forEach(function (module) {
    var steps = require('./' + module)
    Object.keys(steps).forEach(function (step) {
      defineStep(new RegExp(step, 'i'), steps[step])
    })
  })
}
