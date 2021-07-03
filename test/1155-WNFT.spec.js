/* global ethers, network */

const { expect } = require('chai')
const { bs58toHex, getNFTContractAddress, hexToBs58 } = require('./utils')

const CONTRACT_ADDRESS = getNFTContractAddress(network.name)
const txOptions = {}

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('WatchIt NFTs (WNFT)', function () {
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
  const tokenUriE = 'QmPXME1oRmoT627YKaDPDQ3PwAutdP9rWuAAweLzqSwRHJ'
  const tokenUriF = 'QmPXMXx1oRtoT627YKaDrDr3PwA8td9rWuAAweLzqSwR1J'
  const tokenUriG = 'QmPXMExRtoT627YKaDPDQ3PwA8tdPo1rWuAAweLzqSwRHJ'
  const tokenUriH = 'QmPXME1x3toT627YbaDPDQ3PwA8tdP9rWuAAweLzqSwRHJ'
  const tokenUriI = 'QmPXME1oxtiT627YKaDPDQ3PwA8tdParWuAAweLzqSwRHJ'
  const tokenUriJ = 'QmPXME1oRtiT627YKaDPDQ3Pwi8tdP9rWuAAweLz1SwRHJ'
  const tokenUriK = 'QmPXME1oRtiT627YKaDPDQ3PwA8tdP9rWuAAweL3qSwRHJ'

  const nftMinter = async function (CID, minter = owner) {
    const tokenHex = bs58toHex(CID)

    txOptions.gasLimit = await tokensNF.connect(minter).estimateGas
      .mint(minter.address, tokenHex, txOptions)
    const tx = await tokensNF.connect(minter).mint(minter.address, tokenHex)
    await tx.wait()

    return CID
  }

  before(async function () {
    [owner, addr1] = await ethers.getSigners()
    txOptions.gasPrice = await ethers.provider.getGasPrice()

    const NFToken = await ethers.getContractFactory('WNFT')

    tokensNF = NFToken.attach(CONTRACT_ADDRESS)
  })

  describe('Details', function () {
    it('returns true when 0xd9b67a26 is passed to supportsInterface', async () => {
      const supports = await tokensNF.supportsInterface('0xd9b67a26')
      expect(supports).to.equal(true)
    })
  })

  describe('Roles', function () {
    describe('NFT_MINTER_ROLE', function () {
      it('cannot mint NFT without proper permissions', async function () {
        try {
          await tokensNF.connect(addr1).mint(
            owner.address, bs58toHex(tokenUriA), txOptions
          )
          expect(false)
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be created')
        }
      })
    })

    describe('DEFAULT_ADMIN_ROLE', function () {
      it('can burn NFT with proper permissions', async function () {
        const mint = await tokensNF
          .connect(owner)
          .mint(owner.address, bs58toHex(tokenUriB), txOptions)
        await mint.wait()
        const burn = await tokensNF.burn(owner.address, bs58toHex(tokenUriB))
        await burn.wait()

        const filter = tokensNF.filters.TransferSingle()
        const events = await tokensNF.queryFilter(filter)
        const latestEvent = events.pop()
        expect(ethers.BigNumber.from(latestEvent.args.to)).to.equal(0x0)
        expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenUriB)
      })

      it('cannot burn NFT without proper permissions', async function () {
        try {
          await nftMinter(tokenUriC)
          await tokensNF.connect(addr1).burn(owner.address, bs58toHex(tokenUriC), txOptions)
          expect(false)
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be burned')
        }
      })
    })
  })

  describe('Mint & Burn', function () {
    it('should mint NFT valid mapping CID', async function () {
      const tokenIdA = await nftMinter(tokenUriD)
      const tokenIdB = await nftMinter(tokenUriE)

      const filter = tokensNF.filters.TransferSingle()
      const events = await tokensNF.queryFilter(filter)
      const latestEvent = events.pop()
      expect(ethers.BigNumber.from(latestEvent.args.from)).to.equal(0x0)
      expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenUriE)

      const nextEvent = events.pop()
      expect(ethers.BigNumber.from(nextEvent.args.from)).to.equal(0x0)
      expect(hexToBs58(nextEvent.args.id.toHexString())).to.equal(tokenUriD)
    })

    it('should mint NFT batch', async function () {
      const uris = [tokenUriF, tokenUriG, tokenUriH, tokenUriI]
      const mintBatch = await tokensNF.mintBatch(owner.address, uris.map(bs58toHex), [1, 5, 10, 100])
      await mintBatch.wait()

      const filter = tokensNF.filters.TransferBatch()
      const events = await tokensNF.queryFilter(filter)
      const latestEvent = events.pop()
      expect(ethers.BigNumber.from(latestEvent.args.from)).to.equal(0x0)
      expect(latestEvent.args.ids.map(e => ethers.BigNumber.prototype.toHexString.apply(e)))
        .to.deep.equal(uris.map(bs58toHex))
    })

    it('should not "re-mint" an already existing CID', async () => {
      // expect(async () => {
      //   await nftMinter(tokenUriA)
      //   await nftMinter(tokenUriA)
      // }).to.throw('This token ID has already been minted')
    })
  })

  describe('Transfer', function () {
    it('should be transferable', async function () {
      const tokenIdA = await nftMinter(tokenUriJ)
      const transfer = await tokensNF.connect(owner).transfer(
        owner.address, addr1.address, bs58toHex(tokenIdA), txOptions
      )
      await transfer.wait() // wait transaction get mined

      const balance = await tokensNF.balanceOf(addr1.address, bs58toHex(tokenUriJ))
      expect(balance).to.equal(1)

      const filter = tokensNF.filters.TransferSingle()
      const events = await tokensNF.queryFilter(filter)
      const latestEvent = events.pop()
      expect(latestEvent.args.from).to.equal(owner.address)
      expect(latestEvent.args.to).to.equal(addr1.address)
      expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenUriJ)
    })

    it('should fail for try to transfer not owned NFT', async function () {
      try {
        const tokenIdA = await nftMinter(tokenUriK)
        await tokensNF.connect(addr1)
          .transfer(owner.address, addr1.address, bs58toHex(tokenIdA), txOptions)
        expect(false)
      } catch (err) {
        expect(err.message).to.contain('ERC1155: caller is not owner nor approved')
      }
    })
  })

  describe('Query', function () {
    it('lists all TransferSingle events', async () => {
      const filter = tokensNF.filters.TransferSingle()
      const events = await tokensNF.queryFilter(filter)
      expect(events.length).to.be.at.least(7)
    })

    it('lists all TransferBatch events', async () => {
      const filter = tokensNF.filters.TransferBatch()
      const events = await tokensNF.queryFilter(filter)
      expect(events.length).to.be.at.least(1)
    })
  })
})
