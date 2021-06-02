/* global ethers */

const { expect } = require('chai')
// see: https://github.com/mawrkus/js-unit-testing-guide
describe('Tokens', function () {
  let tokens
  let owner, addr1
  // Example token uri. CID is not valid one.
  // TODO: ERC1155 Metadata
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
  const tokenUriA = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwAWT'
  const tokenUriB = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRST'

  const nftMinter = async function(tokenUri, minter = owner.address){
    await tokens.mintNFT(minter, tokenUri, [])
    const nextTokenId = await tokens.nextTokenId()
    return [await tokens.getNFTUri(nextTokenId - 1), nextTokenId]
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


  describe('NonFungibleTokens', function() {

    describe('Burn', function () {
      it('should decrement balance after burn NFT ', async function(){
        const [_, nextTokenId] = await nftMinter(tokenUriA)
        const currentTokenId = nextTokenId - 1;
        await tokens.burnNFT(owner.address, currentTokenId) // Burn token
        const newBurnedBalance = await tokens.balanceOf(owner.address, currentTokenId)
        expect(newBurnedBalance.toString()).to.equal('0')
      })
    })

    describe('Mint', function () {
      it('should mint NFT valid mapping CID', async function () {
        const [tokenUriAResult, tokenIdA] = await nftMinter(tokenUriA)
        expect(tokenUriAResult).to.equal(tokenUriA)
        const [tokenUriBResult, _] = await nftMinter(tokenUriB)
        expect(tokenUriBResult).to.equal(tokenUriB)

        const rawFetchA = await tokens.getNFTUri(tokenIdA - 1) // nextTokenId 2 - 1 = 1 to check before id
        const rawFetchB = await tokens.getNFTUri(tokenIdA) // eg. nextTokenId 2
        expect(rawFetchA).to.equal(tokenUriA)
        expect(rawFetchB).to.equal(tokenUriB)

      })
    })

    describe('Query', function(){
      it('can retrieve NFT uri only by owner', async function(){
        try{
          // Minter by default owner
          const [_, tokenIdA] = await nftMinter(tokenUriA)
          await tokens.connect(addr1).getNFTUri(tokenIdA)
        } catch (err){
          expect(err.message).to.contain('Only owner can view NFT url')
        }
      })
    })
  })



  describe('FungibleTokens', function () {

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
