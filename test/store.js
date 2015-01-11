const { expect } = require('chai')
const store = require('../src/store')

describe('Store', () => {
  it('should expose the global map store', () => {
    expect(store.global).to.be.an('object')
  })

  it('should expose the local map store constructor', () => {
    expect(store.Store).to.be.a('function')
  })

  it('should define a value in the global store', () => {
    store.global.set('key', 'value')
    expect(store.global.get('key')).to.be.equal('value')
  })

  it('should define a values in the local store', () => {
    let local = new store.Store()
    local.set('key2', 'value2')
    expect(local.get('key2')).to.be.equal('value2')
  })

  it('should define the value in the object store', () => {
    let local = new store.Store()
    local.set('key2', 'value2')
    expect(local.get('key2')).to.be.equal('value2')
  })

  it('should retrieve a merged object of both stores', () => {
    let local = new store.Store()
    local.set('key2', 'value2')
    expect(store.get(local)).to.be.deep.equal({
      key : 'value',
      key2: 'value2'
    })
  })
})
