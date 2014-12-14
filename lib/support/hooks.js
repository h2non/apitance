module.exports = Hooks

function Hooks() {
  this.BeforeFeatures(function (event, done) {
    done()
  })
}
