/* global ethers */

const assert = require('assert')

describe('Events', function () {
  let fToken, nfToken, tokens

  before(async () => {
    const Tokens = await ethers.getContractFactory('Tokens')
    const FToken = await ethers.getContractFactory('FToken')
    const NFToken = await ethers.getContractFactory('NFToken')

    tokens = await Tokens.deploy()
    fToken = await FToken.deploy()
    nfToken = await NFToken.deploy()
  })

  describe('Tokens', function () {
    it('emits the Initialize event', async () => {
      // Set up the filter object for the Initialize event
      const filter = tokens.filters.Initialize()
      const topicHex = '0x671157b0f1c2263357940413f1ae7c3b814aa00ccf41f221cfd5c7bfdacda7f7'
      assert.strictEqual(filter.address, tokens.address)
      assert.strictEqual(filter.topics[0], topicHex)

      // Call initialize and then query for the event.
      await tokens.initialize(fToken.address, nfToken.address)
      const events = await tokens.queryFilter(filter)

      // TODO: Decode event data
      console.log(events.map(e => e.decode()))
      assert.strictEqual(events.length, 1)
    })
  })

  describe('FToken', function () {
    it('emits the Initialize event', () => {
      const initializeEvent = fToken.filters.Initialize()
      const topicHex = '0x2b7f97d835e47d58da52e60d87ccf00bf1d59023322eb40a60af485323dc31f4'

      assert.strictEqual(initializeEvent.address, fToken.address)
      assert.strictEqual(initializeEvent.topics.length, 1)
      assert.strictEqual(initializeEvent.topics[0], topicHex)
    })

    it('emits the SetURI event', () => {
      const setUriEvent = fToken.filters.SetURI()
      const topicHex = '0xe9ec3eb6b1dc11a2cf6c15af0d986705fd970fc5318eb7fde178486b4914fa1c'

      assert.strictEqual(setUriEvent.address, fToken.address)
      assert.strictEqual(setUriEvent.topics.length, 1)
      assert.strictEqual(setUriEvent.topics[0], topicHex)
    })
  })
})
