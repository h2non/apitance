exports.definitions = [
  'I send the request',
]

exports.handler = function (next) {
  console.log('> Run step')
  next()
}
