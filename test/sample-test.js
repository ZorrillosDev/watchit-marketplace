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

  describe('Minting', function () {
    it('increments the nextTokenId after each mint', async function () {
      const initialTokenId = await tokens.nextTokenId()

      // TODO: ERC1155 Metadata
      // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
      await tokens.mint(owner.address, 1, [])

      const nextTokenId = await tokens.nextTokenId()
      expect(nextTokenId).to.equal(initialTokenId.add(1))
    })

    it('increments nextTokenId properly after batch mint', async function () {
      const initialTokenId = await tokens.nextTokenId()

      const amounts = [
        1,
        10,
        100,
        10000000,
        "1000000000000000"
      ];
      await tokens.mintBatch(owner.address, amounts, [])

      const nextTokenId = await tokens.nextTokenId()
      expect(nextTokenId).to.equal(initialTokenId.add(amounts.length))
    })
  })
})
