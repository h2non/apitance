var slice = Array.prototype.slice

export function stepify(lambda) {
  return function () {
    let err, done = slice.call(arguments, -1).shift()
    lambda.apply(this, arguments)
    done()
  }
}
