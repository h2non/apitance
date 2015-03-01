const _ = require('lodash')

export function render(src, vars = {}) {
  vars = _.merge({}, process.env, vars)
  return processTemplate(vars)(src)
}

function processTemplate(vars) {
  return function replace(src) {
    switch (true) {
      case typeof src === 'string':
        src = replaceString(src, vars)
        break
      case Array.isArray(src):
        src = src.map(replace)
        break
      case _.isPlainObject(src):
        src = _.mapValues(src, replace)
        break
    }
    return src
  }
}

const expression = /\$\{([^\}]+)?\}/g

function replaceString(str, vars) {
  return str.replace(expression, (_, match) => {
    return getKey(match, vars)
  })
}

function getKey(key, obj) {
  let value = obj[key] || obj[key.toUpperCase()] || obj[key.toLowerCase()] || null
  if (value == null) {
    throw new Error(`Missing variable to replace: \$\{${key}\}". Have you defined it?`)
  }
  return value
}
