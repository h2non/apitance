const Apitance = require('./')
const args = process.argv

if (args.length === 3 && args[2].indexOf('version')) {
  return console.log(
    `Apitance ${Apitance.VERSION}\n` +
    `Cucumber ${Apitance.Cucumber.VERSION}`
  )
}

Apitance(args)
