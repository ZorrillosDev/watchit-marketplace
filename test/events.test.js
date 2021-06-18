/* global ethers */

const assert = require('assert')

describe('Events', function () {
  let tokens

  before(async () => {
    const Tokens = await ethers.getContractFactory('Tokens')
    tokens = await Tokens.deploy()
  })

  it('emits the Initialize event', () => {
    const initializeEvent = tokens.filters.Initialize()
    assert.strictEqual(initializeEvent.address, tokens.address)
    assert.strictEqual(initializeEvent.topics.length, 1)
  })
})
