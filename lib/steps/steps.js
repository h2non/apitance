const _ = require('lodash')
const { expect } = require('chai')
const { World } = require('../support/world')

module.exports = defineSteps

const stepFiles = ['expectations', 'request', 'definitions', 'configuration']

function defineSteps() {
  this.World = World
  registerSteps(this.defineStep)
}

function registerSteps(defineStep) {
  stepFiles.forEach(module => {
    const steps = require('./' + module)
    Object.keys(steps).forEach(step => {
      defineStep(new RegExp(step, 'i'), steps[step])
    })
  })
}
