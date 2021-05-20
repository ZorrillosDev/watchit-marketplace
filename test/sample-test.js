/* global ethers */

const { expect } = require('chai')

describe('Tokens', function () {
  let tokens
  let owner, addr1

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    const Tokens = await ethers.getContractFactory('Tokens')
    tokens = await Tokens.deploy()
    await tokens.deployed()
  })

  describe('URI_SETTER_ROLE', function () {
    it('Can update the URI with proper permissions', async function () {
      // owner is the default ethers account but let's
      // call .connect explicitly here anyway
      await tokens.connect(owner).setURI("test.com")

      // TODO: Learn more about what all this means in the transaction result.
      // const result = await tokens.connect...
      // console.log(result)
    })

    it('Cannot update the URI without proper permissions', async function () {
      try {
        await tokens.connect(addr1).setURI("test2.com")
      } catch (err) {
        expect(err.message).to.contain('revert URI cannot be updated')
      }
    })
  })
})
