/* global ethers */

const { expect } = require('chai')
const bs58 = require('bs58')
const utils = ethers.utils
// see: https://github.com/mawrkus/js-unit-testing-guide
describe('Tokens', function () {
  let tokens
  let owner, addr1
  // Example token uri. CID is not valid one.
  // TODO: ERC1155 Metadata
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
  const tokenUriA = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwAWT'
  const tokenUriB = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRST'
  const tokenUriC = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRYU'
  const tokenUriD = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRHJ'

  const toFormat32 = (string)=> `0x${bs58.decode(string).slice(2).toString('hex')}`;
  const fromFormat32 = (b58)=> bs58.encode(Buffer.from(`1220${b58.slice(2)}`, "hex"));
  const nftMinter = async function(tokenUri, minter = owner.address){
    await tokens.mintNFT(minter, toFormat32(tokenUri), [])
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
          await tokens.connect(addr1).mintNFT(owner.address, toFormat32(tokenUriA), [])
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be created')
        }
      })
    })

    describe('DEFAULT_ADMIN_ROLE', function(){
      it('can burn token with proper permissions', async function () {
        // owner is the default ethers account but let's
        // call .connect explicitly here anyway
        await tokens.mintNFT(owner.address, toFormat32(tokenUriA), [])
        const nextTokenId = await tokens.nextTokenId()
        await tokens.burnNFT(owner.address, nextTokenId - 1)
      })

      it('cannot burn token without proper permissions', async function () {
        try {
          const [_, nextTokenId] = await nftMinter(tokenUriA)
          await tokens.connect(addr1).burnNFT(owner.address, nextTokenId - 1)
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be burned')
        }
      })
    })

    describe('URI_SETTER_ROLE', function () {
      it('can update the URI with proper permissions', async function () {
        // owner is the default ethers account but let's
        // call .connect explicitly here anyway
        await tokens.connect(owner).setURI(tokenUriA)

        // TODO: Learn more about what all this means in the transaction result.
        // const result = await tokens.connect...
        // console.log(result)
      })

      it('cannot update the URI without proper permissions', async function () {
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
        await tokens.mintNFT(addr1.address,toFormat32( tokenUriA), [])
        const nextTokenId = await tokens.nextTokenId()
        const currentTokenId = nextTokenId - 1;
        await tokens.connect(owner).burnNFT(addr1.address, currentTokenId) // Burn token
        const newBurnedBalance = await tokens.balanceOf(addr1.address, currentTokenId)
        expect(newBurnedBalance.toString()).to.equal('0')
      })
    })

    describe('Mint', function () {
      it('should mint NFT valid mapping CID', async function () {
        const [tokenUriAResult, tokenIdA] = await nftMinter(tokenUriA)
        expect(fromFormat32(tokenUriAResult)).to.equal(tokenUriA)
        const [tokenUriBResult, _] = await nftMinter(tokenUriB)
        expect(fromFormat32(tokenUriBResult)).to.equal(tokenUriB)

        const rawFetchA = await tokens.getNFTUri(tokenIdA - 1) // nextTokenId 2 - 1 = 1 to check before id
        const rawFetchB = await tokens.getNFTUri(tokenIdA) // eg. nextTokenId 2
        expect(fromFormat32(rawFetchA)).to.equal(tokenUriA)
        expect(fromFormat32(rawFetchB)).to.equal(tokenUriB)

      })


      it('should mint NFT batch', async function () {
        const uris = [tokenUriA, tokenUriB, tokenUriC, tokenUriD]
        const initialTokenId = await tokens.nextTokenId()
        await tokens.mintBatchNFT(owner.address, uris.map(toFormat32), [])
        const nextTokenId = await tokens.nextTokenId()

        const rawFetchA = await tokens.getNFTUri(nextTokenId - 4) // nextTokenId 2 - 1 = 1 to check before id
        const rawFetchB = await tokens.getNFTUri(nextTokenId - 3) // eg. nextTokenId 2
        expect(fromFormat32(rawFetchA)).to.equal(tokenUriA)
        expect(fromFormat32(rawFetchB)).to.equal(tokenUriB)
        expect(nextTokenId).to.equal(initialTokenId.add(uris.length))


      })
    })

    describe('Transfer', function(){
      it('should be transferable', async function(){
        const [_, tokenIdA] = await nftMinter(tokenUriA)
        const currentToken = tokenIdA - 1;
        await tokens.connect(owner).transferNFT(owner.address, addr1.address, currentToken, [])
        const isOwner = await tokens.connect(addr1).isOwnerOf(currentToken)
        expect(isOwner.toString()).to.equal('true')
      })

      it('should fail for try to transfer not owned NFT', async function(){
        try{
          const [_, tokenIdA] = await nftMinter(tokenUriA)
          const currentToken = tokenIdA - 1;
          await tokens.connect(addr1).transferNFT(addr1.address, owner.address, currentToken, [])
        } catch (err) {
          expect(err.message).to.contain('Only owner can transfer NFT')
        }
      })
    })

    describe('Query', function(){
      it('should retrieve NFT uri only by owner', async function(){
        try{
          // Minter by default owner
          const [_, tokenIdA] = await nftMinter(tokenUriA)
          await tokens.connect(addr1).getNFTUri(tokenIdA)
        } catch (err){
          expect(err.message).to.contain('Only owner can view NFT url')
        }
      })

      it('should fail if NFT doesnt exist in collection', async function(){
        const isValidNFT = await tokens.isValidNFT(1000000000);
        expect(isValidNFT.toString()).to.equal('false')
      })

      it('should not fail if NFT exist in collection', async function(){
        const [_, tokenIdA] = await nftMinter(tokenUriA)
        const isValidNFT = await tokens.isValidNFT(tokenIdA - 1);
        expect(isValidNFT.toString()).to.equal('true')
      })
    })
  })



  describe('FungibleTokens', function () {
    describe('Mint', function () {
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
})
