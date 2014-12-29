var slice = Array.prototype.slice

export function stepify(lambda) {
  return function () {
    let err, done = slice.call(arguments, -1).shift()
    try { 
      lambda.apply(this, arguments)
    } catch (e) {
      err = e
    } finally {
      done(err)
    }
  }
}
