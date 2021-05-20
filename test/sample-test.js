/* global ethers */

// const { expect } = require('chai')

// TODO: Run IPFS?

describe('Tokens', function () {
  describe('Minting', function () {
    it('Should mint fungible ERC1155 tokens', async function () {
      const Tokens = await ethers.getContractFactory('Tokens')
      const tokens = await Tokens.deploy()

      await tokens.deployed()
    })
  })
})
