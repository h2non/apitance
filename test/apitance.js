const { expect } = require('chai')
const { Apitance } = require('../')

describe('Apitance', () => {
  it('should expose the API', () => {
    expect(Apitance).to.be.a('function')
  })
})
