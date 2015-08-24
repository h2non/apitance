exports.definitions = [
  '(set|define) (an|the) environment variable "([^"]*)" (to|with value) "([^"]*)"$'
]

exports.handler = function (_, _, name, _, value) {
  process.env[name.trim()] = value.trim()
}
