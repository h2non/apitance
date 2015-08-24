const fs = require('fs')
const path = require('path')
const flatten = require('lodash').flatten

module.exports = function loadSteps(dir) {
  var files = readDir(dir)
  return flatten(files).map(require)
}

function readDir(dir) {
  return fs.readdirSync(dir)
    .map(joinPath)
    .map(recursiveFiles)
    .filter(isValid)

  function joinPath(file) {
    return path.join(dir, file)
  }
}

function recursiveFiles(file) {
  if (isFile(file)) {
    return file
  }

  if (fs.statSync(file).isDirectory()) {
    return readDir(file)
  }
}

function readFiles(file) {
  return fs.readdirSync(file)
  .map(function (name) {
    return path.join(file, name)
  })
}

function isFile(file) {
  return /.js$/i.test(file)
}

function isValid(file) {
  return file != null
}
