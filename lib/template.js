var _ = require('lodash')
var env = process.ENV

export function replace(obj, vars) {
  vars = _.merge({}, env, vars)
}
