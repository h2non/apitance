require('./traceur-runtime')
const Cucumber = require('cucumber')

const requires = [
  'steps/',
  'support/'
].map(function (path) {
  return __dirname + '/' + path
})

export class Apitance {
  constructor(args) {
    requires.forEach(path => {
      args.push('-r')
      args.push(path)
    })

    if (!(~args.indexOf('-f') && ~args.indexOf('--format'))) {
      args.push('--format')
      args.push('pretty')
    }

    runCucumber(args)
  }
}

Apitance.Cucumber = Cucumber

function runCucumber(args) {
  Cucumber.Cli(args).run(succeeded => {
    var code = succeeded ? 0 : 1

    process.on('exit', () => {
      process.exit(code)
    })

    var timeoutId = setTimeout(() => {
      console.error('Cucumber process timed out after waiting 60 seconds for the node.js event loop to empty. There may be a resource leak.  Have all resources like database connections and network connections been closed properly?');
      process.exit(code)
    }, 60 * 1000)

    if (timeoutId.unref) {
      timeoutId.unref()
    } else {
      clearTimeout(timeoutId)
    }
  })
}
