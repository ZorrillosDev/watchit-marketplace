/* global ethers, network */

const { expect } = require('chai')
const {
  bs58toHex,
  getNFTContractAddress,
  hexToBs58,
  randomCID
} = require('./utils')

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
            owner.address, bs58toHex((await randomCID()).toString()), txOptions
          )
          expect(false)
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be created')
        }
      })
    })

    describe('DEFAULT_ADMIN_ROLE', function () {
      it('can burn NFT with proper permissions', async function () {
        const tokenCID = (await randomCID()).toString()

        const mint = await tokensNF
          .connect(owner)
          .mint(owner.address, bs58toHex(tokenCID), txOptions)
        await mint.wait()
        const burn = await tokensNF.burn(owner.address, bs58toHex(tokenCID))
        await burn.wait()

        const filter = tokensNF.filters.TransferSingle()
        const events = await tokensNF.queryFilter(filter)
        const latestEvent = events.pop()
        expect(ethers.BigNumber.from(latestEvent.args.to)).to.equal(0x0)
        expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenCID)
      })

      it('cannot burn NFT without proper permissions', async function () {
        try {
          const tokenCID = await nftMinter((await randomCID()).toString())
          await tokensNF.connect(addr1).burn(owner.address, bs58toHex(tokenCID), txOptions)
          expect(false)
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be burned')
        }
      })
    })
  })

  describe('Mint & Burn', function () {
    it('should mint NFT valid mapping CID', async function () {
      const tokenIdA = await nftMinter((await randomCID()).toString())
      const tokenIdB = await nftMinter((await randomCID()).toString())

      const filter = tokensNF.filters.TransferSingle()
      const events = await tokensNF.queryFilter(filter)
      const latestEvent = events.pop()
      expect(ethers.BigNumber.from(latestEvent.args.from)).to.equal(0x0)
      expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenIdB)

      const nextEvent = events.pop()
      expect(ethers.BigNumber.from(nextEvent.args.from)).to.equal(0x0)
      expect(hexToBs58(nextEvent.args.id.toHexString())).to.equal(tokenIdA)
    })

    it('should mint NFT batch', async function () {
      const uris = [
        (await randomCID()).toString(),
        (await randomCID()).toString(),
        (await randomCID()).toString(),
        (await randomCID()).toString()
      ]
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
      const tokenCID = (await randomCID()).toString()

      try {
        await nftMinter(tokenCID)
        await nftMinter(tokenCID)
      } catch(err) {
        expect(err.message).to.match(/This token ID has already been minted/)
      }
    })
  })

  describe('Transfer', function () {
    it('should be transferable', async function () {
      const tokenIdA = await nftMinter((await randomCID()).toString())
      const transfer = await tokensNF.connect(owner).transfer(
        owner.address, addr1.address, bs58toHex(tokenIdA), txOptions
      )
      await transfer.wait() // wait transaction get mined

      const balance = await tokensNF.balanceOf(addr1.address, bs58toHex(tokenIdA))
      expect(balance).to.equal(1)

      const filter = tokensNF.filters.TransferSingle()
      const events = await tokensNF.queryFilter(filter)
      const latestEvent = events.pop()
      expect(latestEvent.args.from).to.equal(owner.address)
      expect(latestEvent.args.to).to.equal(addr1.address)
      expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenIdA)
    })

    it('should fail for try to transfer not owned NFT', async function () {
      try {
        const tokenIdA = await nftMinter((await randomCID()).toString())
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
