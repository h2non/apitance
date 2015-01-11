const { expect } = require('chai')
const { render } = require('../src/template')

describe('Template', () => {
  it('should expose the render function', () => {
    expect(render).to.be.a('function')
  })

  describe('string', () => {
    it('should return the same string', () => {
      expect(render('hello world')).to.be.equal('hello world')
    })

    it('should replace the value', () => {
      expect(render('hello ${world}', { world: 'chuck' })).to.be.equal('hello chuck')
    })

    it('should replace multiple values', () => {
      expect(render('hello ${place}, mister ${name}', { place: 'world', name: 'Norris' })).to.be.equal('hello world, mister Norris')
    })

    it('should throw an error if missing value', () => {
      expect(() => { render('hello ${invalid}') }).to.throw(Error)
    })

    it('should replace based on an environment variables', () => {
      process.env.APITANCE = 'world'
      expect(render('hello ${APITANCE}')).to.be.equal('hello world')
    })
  })

  describe('array', () => {
    it('should replace the value', () => {
      expect(render(['hello ${world}'], { world: 'chuck' })).to.be.deep.equal(['hello chuck'])
    })
  })

  describe('object', () => {
    it('should replace the value', () => {
      expect(render({ a: 'hello ${world}' }, { world: 'chuck' })).to.be.deep.equal({ a: 'hello chuck' })
    })
  })

  describe('invalid', () => {
    it('should return the same value if invalid', () => {
      expect(render(null)).to.be.equal(null)
      expect(render({})).to.be.deep.equal({})
      const fn = function () {}
      expect(render(fn)).to.be.equal(fn)
    })
  })
})
