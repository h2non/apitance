const request = require('request')
const Store = require('./store')

const env = process.env
const globalConfig = new Store

module.exports = CucumberRunner

function CucumberRunner() {
  var apitance = CucumberRunner.currentApitanceInstance

  // Register steps in Cucumber instance
  apitance.steps.register(this.defineStep.bind(this))

  this.World = function (done) {
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

CucumberRunner.currentApitanceInstance = null
