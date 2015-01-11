const { join } = require('path')
const Cucumber = require('cucumber')

require('chai').use(require('chai-http'))

export function Apitance (flags = []) {
  flags = flags.concat(getApitanceFlags())

  if (!(~flags.indexOf('-f') && ~flags.indexOf('--format'))) {
    flags.push('--format')
    flags.push('pretty')
  }

  return runCucumber(flags)
}

Apitance.Cucumber = Cucumber

function runCucumber(flags) {
  const cucumber = Cucumber.Cli(flags)

  cucumber.run(succeeded => {
    const code = succeeded ? 0 : 1

    process.on('exit', () => process.exit(code))

    const timeoutId = setTimeout(() => {
      console.error('Cucumber process timed out after waiting 60 seconds for the node.js event loop to empty. There may be a resource leak.  Have all resources like database connections and network connections been closed properly?');
      process.exit(code)
    }, 60 * 1000)

    if (timeoutId.unref) {
      timeoutId.unref()
    } else {
      clearTimeout(timeoutId)
    }
  })

  return cucumber
}

function getApitanceFlags() {
  const flags = []

  ;['steps/', 'support/']
    .map(path => join(__dirname, path))
    .forEach(path => {
      flags.push('-r')
      flags.push(path)
    })

  return flags
}
