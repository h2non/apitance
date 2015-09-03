const request = require('request')
const Store = require('./store')

const env = process.env
const globalConfig = new Store

module.exports = CucumberRunner

function CucumberRunner() {
  var apitance = CucumberRunner.currentApitanceInstance

  console.log(this)

  // Register steps in Cucumber instance
  apitance.defineSteps(this.defineStep.bind(this))

  this.World = function (done) {
    apitance.world.extend(this)

    this.req = {}
    this.res = null
    this.error = null

    this.vars = new Store
    this.config = new Store
    this.global = globalConfig
    this.apitance = apitance
    this.http = request

    done()
  }
}

/**
 * We use this static member to pass the reference
 * between Cucumber and latest Apitance instance
 */

CucumberRunner.currentApitanceInstance = null
