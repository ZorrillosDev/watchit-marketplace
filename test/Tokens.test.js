/* global ethers */

const { expect } = require('chai')

describe('Tokens', function () {
  let tokens
  let owner, addr1
  // Example token uri. CID is not valid one.
  // TODO: ERC1155 Metadata
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
  const tokenUri = 'ipfs://QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwAWT/metadata.json'

  before(async function () {
    [owner, addr1] = await ethers.getSigners()
    const Tokens = await ethers.getContractFactory('Tokens')
    tokens = await Tokens.deploy()
    await tokens.deployed()
  })

  describe('Roles', function () {
    describe('NFT_MINTER_ROLE', function(){
      it('cannot mint NFT without proper permissions', async function () {
        try {
          await tokens.connect(addr1).mintNFT(owner.address, tokenUri, [])
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be created')
        }
      })
    })
  })

  describe('Minting', function () {
    // see: https://github.com/mawrkus/js-unit-testing-guide
    it('should have a valid NFT uri', async function () {
      await tokens.mintNFT(owner.address, tokenUri, [])
      const nextTokenId = await tokens.nextTokenId()
      const tokenURI = await tokens.uri(nextTokenId - 1)
      expect(tokenURI).to.equal(tokenUri)
    })

    it('should increments the nextTokenId after each mint', async function () {
      const initialTokenId = await tokens.nextTokenId()
      await tokens.mint(owner.address, 1, [])
      const nextTokenId = await tokens.nextTokenId()
      expect(nextTokenId).to.equal(initialTokenId.add(1))
    })

    it('should increments nextTokenId properly after batch mint', async function () {
      const initialTokenId = await tokens.nextTokenId()
      const amounts = [
        1,
        10,
        100,
        10000000,
        '1000000000000000'
      ]

      await tokens.mintBatch(owner.address, amounts, [])
      const nextTokenId = await tokens.nextTokenId()
      expect(nextTokenId).to.equal(initialTokenId.add(amounts.length))
    })
  })
})
