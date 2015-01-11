const { render } = require('../template')
const slice = Array.prototype.slice

export function stepify(lambda) {
  return function () {
    const args = slice.call(arguments)
    const done = args.slice(-1).shift()
    try {
      lambda.apply(this, render(args))
    } catch (err) {
      errorFormatter(err)
      throw err
    }
    done()
  }
}

function errorFormatter(err) {
  process.stdout.write(
    `Apitance Error:\n\n` +
    `  Code: ${err.code || 'UNKNOWN'}` +
    `  Message: ${err.message || err}` +
    `\n\n`
  )
}
