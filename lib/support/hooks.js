module.exports = Hooks

function Hooks() {
  this.Before(function (scenario, done) {
    //console.log(scenario.getName(), "(" + scenario.getUri() + ":" + scenario.getLine() + ")")
    //console.log('Scenario:', scenario)
    //console.log(scenario.__proto__)
    done()
  })

  this.StepResult(function (step, done) {
    done()
  })

  this.Before('@apitance', '@flush,@flushconfig', function (done) {
    done()
  })

  this.BeforeFeatures(function (event, done) {
    done()
  })

  this.Around(function (runScenario) {
    // "this" is - as always - an instance of World promised to the scenario.
    // First do the "before scenario" tasks:
    // When the "before" duty is finished, tell Cucumber to execute the scenario
    // and pass a function to be called when the scenario is finished:
    runScenario(function (done) {
      // Now, we can do our "after scenario" stuff:
      done()
    })
  })
}
