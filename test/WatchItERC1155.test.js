/* global ethers, upgrades, network */

const { expect } = require('chai')
const bs58 = require('bs58')
const { getNFTContractAddress } = require('./utils')

const CONTRACT_ADDRESS = getNFTContractAddress(network.name)
const txOptions = {}

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('WatchitERC1155', function () {
  this.timeout(0)

  let tokensNF
  let owner, addr1
  // Example token uri. CID is not valid one.
  // TODO: ERC1155 Metadata
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
  const tokenUriA = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwAWT'
  const tokenUriB = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRST'
  const tokenUriC = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRYU'
  const tokenUriD = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRHJ'

  const toBase58 = (string) => `0x${Buffer.from(bs58.decode(string).slice(2)).toString('hex')}`
  const fromBase58 = (b58) => bs58.encode(Buffer.from(`1220${b58.slice(2)}`, 'hex'))

  const nftMinter = async function (tokenUri, minter = owner.address) {
    const mint = await tokensNF.mint(minter, toBase58(tokenUri), [])
    await mint.wait() // wait until transaction mined
    return await tokensNF.nextTokenId()
  }

  before(async function () {
    [owner, addr1] = await ethers.getSigners()
    // Deploy FT and NFT contracts
    const NFToken = await ethers.getContractFactory('WatchItERC1155')
    tokensNF = NFToken.attach(CONTRACT_ADDRESS)
  })

  describe('Roles', function () {
    describe('NFT_MINTER_ROLE', function () {
      it('cannot mint NFT without proper permissions', async function () {
        try {
          await tokensNF.connect(addr1).mint(
            owner.address, toBase58(tokenUriA), [], txOptions
          )
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be created')
        }
      })
    })

    describe('DEFAULT_ADMIN_ROLE', function () {
      it('can burn NFT with proper permissions', async function () {
        // owner is the default ethers account but let's
        // call .connect explicitly here anyway <- done!
        const mint = await tokensNF.connect(owner).mint(owner.address, toBase58(tokenUriA), [], txOptions)
        await mint.wait() // wait until transaction mined
        const nextTokenId = await tokensNF.nextTokenId()
        await tokensNF.burn(owner.address, nextTokenId - 1)
      })

      it('cannot burn NFT without proper permissions', async function () {
        try {
            const nextTokenId = await nftMinter(tokenUriA) //eslint-disable-line
          await tokensNF.connect(addr1).burn(owner.address, nextTokenId - 1, txOptions)
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be burned')
        }
      })
    })
  })

  describe('Mint & Burn', function () {
    it('should mint NFT valid mapping CID', async function () {
      const tokenIdA = await nftMinter(tokenUriA)
        const tokenIdB = await nftMinter(tokenUriB) // eslint-disable-line
      const rawFetchA = await tokensNF.getNFTUri(tokenIdA - 1) // nextTokenId 2 - 1 = 1 to check before id
      const rawFetchB = await tokensNF.getNFTUri(tokenIdB - 1) // eg. nextTokenId 2

      expect(fromBase58(rawFetchA)).to.equal(tokenUriA)
      expect(fromBase58(rawFetchB)).to.equal(tokenUriB)
    })

    it('should mint NFT batch', async function () {
      const uris = [tokenUriA, tokenUriB, tokenUriC, tokenUriD]
      const initialTokenId = await tokensNF.nextTokenId()
      const mintBatch = await tokensNF.mintBatch(owner.address, uris.map(toBase58), [])
      await mintBatch.wait() // wait transaction get mined
      const nextTokenId = await tokensNF.nextTokenId()

      const rawFetchA = await tokensNF.getNFTUri(nextTokenId - 4) // nextTokenId 4 - 4 = 0 first uri index
      const rawFetchB = await tokensNF.getNFTUri(nextTokenId - 3) // eg. nextTokenId  4 -3 = 1 second uri index
      expect(fromBase58(rawFetchA)).to.equal(tokenUriA)
      expect(fromBase58(rawFetchB)).to.equal(tokenUriB)
      expect(nextTokenId).to.equal(initialTokenId.add(uris.length))
    })

    it('should decrement balance after burn NFT ', async function () {
      const mint = await tokensNF.mint(addr1.address, toBase58(tokenUriA), [])
      await mint.wait() // wait until transaction mined
      const nextTokenId = await tokensNF.nextTokenId()
      const currentTokenId = nextTokenId - 1

      // Try burn previous minted NFT
      const burnTx = await tokensNF.connect(owner).burn(addr1.address, currentTokenId)
      await burnTx.wait() // wait until transaction mined
      const newBurnedBalance = await tokensNF.balanceOf(addr1.address, currentTokenId)
      expect(newBurnedBalance.toString()).to.equal('0')
    })
  })

  describe('Transfer', function () {
    it('should be transferable', async function () {
        const tokenIdA = await nftMinter(tokenUriA) // eslint-disable-line
      const currentToken = tokenIdA - 1
      const transfer = await tokensNF.connect(owner).transfer(
        owner.address, addr1.address, currentToken, [], txOptions
      )

      await transfer.wait() // wait transaction get mined
      const isOwner = await tokensNF.connect(addr1).isOwnerOf(currentToken)
      expect(isOwner.toString()).to.equal('true')
    })

    it('should fail for try to transfer not owned NFT', async function () {
      try {
          const tokenIdA = await nftMinter(tokenUriA) // eslint-disable-line
        await tokensNF.connect(addr1).transfer(addr1.address, owner.address, tokenIdA - 1, [], txOptions)
      } catch (err) {
        expect(err.message).to.contain('Only owner can transfer NFT')
      }
    })
  })

  describe('Query', function () {
    it.skip('should retrieve NFT uri only by owner', async function () {
      try {
        // Minter by default owner
          const tokenIdA = await nftMinter(tokenUriA, addr1.address) // eslint-disable-line
        await tokensNF.getNFTUri(tokenIdA - 1, txOptions)
      } catch (err) {
        expect(err.message).to.contain('Only owner can view NFT url')
      }
    })

    it('should fail if NFT doesnt exist in collection', async function () {
      const isValidNFT = await tokensNF.isValidNFT(1000000000)
      expect(isValidNFT.toString()).to.equal('false')
    })

    it('should not fail if NFT exist in collection', async function () {
        const tokenIdA = await nftMinter(tokenUriA) // eslint-disable-line
      const isValidNFT = await tokensNF.isValidNFT(tokenIdA - 1)
      expect(isValidNFT.toString()).to.equal('true')
    })
  })
})
