/* global ethers */

const { expect } = require('chai')

describe('Tokens', function () {
  let tokens
  let owner, addr1
  // Example token uri. CID is not valid one.
  // TODO: ERC1155 Metadata
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
  const tokenUriA = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwAWT'
  const tokenUriB = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRST'

  const nftMinter = async function(tokenUri){
    await tokens.mintNFT(owner.address, tokenUri, [])
    const nextTokenId = await tokens.nextTokenId()
    return await tokens.nftURICollection(nextTokenId - 1)
  }


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
          await tokens.connect(addr1).mintNFT(owner.address, tokenUriA, [])
        } catch (err) {
          console.log(err.message)
          expect(err.message).to.contain('NFT cannot be created')
        }
      })
    })

    describe('URI_SETTER_ROLE', function () {
      it('Can update the URI with proper permissions', async function () {
        // owner is the default ethers account but let's
        // call .connect explicitly here anyway
        await tokens.connect(owner).setURI(tokenUriA)

        // TODO: Learn more about what all this means in the transaction result.
        // const result = await tokens.connect...
        // console.log(result)
      })

      it('Cannot update the URI without proper permissions', async function () {
        try {
          await tokens.connect(addr1).setURI(tokenUriA)
        } catch (err) {
          expect(err.message).to.contain('revert URI cannot be updated')
        }
      })
    })
  })

  describe('Minting', function () {
    // see: https://github.com/mawrkus/js-unit-testing-guide

    it('should mint NFT valid mapping CID', async function(){
      const tokenUriAResult = await nftMinter(tokenUriA)
      expect(tokenUriAResult).to.equal(tokenUriA)
      const tokenUriBResult = await nftMinter(tokenUriB)
      expect(tokenUriBResult).to.equal(tokenUriB)
      expect(tokenUriAResult).to.equal(tokenUriA)
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
