const { render } = require('../template')
const slice = Array.prototype.slice

export function stepify(lambda) {
  return function () {
    const args = slice.call(arguments)
    const done = args.slice(-1).shift()
    lambda.apply(this, render(args))
    done()
  }
}
