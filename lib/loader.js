const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const directoryPath = __dirname + '/steps'

const steps = readSteps()

module.exports = function (suite) {
  steps.forEach(function (step) {
    if (step.definition) {
      step.definitions = [ step.definition ]
    }
  })

  steps.forEach(function (step) {
    step.definitions.forEach(function (definition) {
      suite.defineStep(new RegExp(definition, 'i'), step.handler)
    })
  })
}

function readSteps() {
  var files = fs.readdirSync(directoryPath)
    .map(joinPath)
    .map(recursiveFiles)
    .filter(notNull)

  return _.flatten(files).map(require)
}

function notNull(file) {
  return file != null
}

function joinPath(file) {
  return path.join(directoryPath, file)
}

function recursiveFiles(file) {
  if (/.js$/i.test(file)) {
    return file
  }

  if (fs.statSync(file).isDirectory()) {
    return fs.readdirSync(file).map(function (name) {
      return path.join(file, name)
    })
  }
}
