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
  let owner, acct1
  // Example token uri. CID is not valid one.
  // TODO: ERC1155 Metadata
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

  const nftMinter = async function (CID, minter = owner) {
    const tokenHex = bs58toHex(CID)

    txOptions.gasLimit = await tokensNF.connect(minter).estimateGas
      .mint(minter.address, tokenHex)
    const tx = await tokensNF.connect(minter)
      .mint(minter.address, tokenHex, txOptions)
    await tx.wait()

    return CID
  }

  before(async function () {
    [owner, acct1] = await ethers.getSigners()
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
          const tokenCID = (await randomCID()).toString()
          await nftMinter(tokenCID, acct1)
          expect(false).to.equal(true)
        } catch (err) {
          expect(err.message).to.contain('NFT cannot be created')
        }
      })
    })

    describe('DEFAULT_ADMIN_ROLE', function () {
      it('can burn NFT with proper permissions', async function () {
        const tokenCID = (await randomCID()).toString()
        await nftMinter(tokenCID)
        txOptions.gasLimit = await tokensNF.estimateGas
          .burn(owner.address, bs58toHex(tokenCID))
        const burn = await tokensNF
          .burn(owner.address, bs58toHex(tokenCID), txOptions)
        await burn.wait()

        const filter = tokensNF.filters.TransferSingle()
        const events = await tokensNF.queryFilter(filter)
        const latestEvent = events.pop()
        expect(ethers.BigNumber.from(latestEvent.args.to)).to.equal(0x0)
        expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenCID)
      })

      it('cannot burn NFT without proper permissions', async function () {
        try {
          const tokenCID = (await randomCID()).toString()
          await nftMinter(tokenCID)
          await tokensNF.connect(acct1).estimateGas
            .burn(owner.address, bs58toHex(tokenCID))
          const tx = await tokensNF.connect(acct1)
            .burn(owner.address, bs58toHex(tokenCID), txOptions)
          await tx.wait()
          expect(false).to.equal(true)
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
      txOptions.gasLimit = await tokensNF.estimateGas
        .mintBatch(owner.address, uris.map(bs58toHex), [1, 5, 10, 100])
      const mintBatch = await tokensNF
        .mintBatch(owner.address, uris.map(bs58toHex), [1, 5, 10, 100], txOptions)
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
      } catch (err) {
        expect(err.message).to.match(/This token ID has already been minted/)
      }
    })
  })

  describe('Transfer', function () {
    it('should be transferable', async function () {
      const tokenIdA = await nftMinter((await randomCID()).toString())
      txOptions.gasLimit = await tokensNF.connect(owner).estimateGas
        .transfer(owner.address, acct1.address, bs58toHex(tokenIdA))
      const transfer = await tokensNF.connect(owner)
        .transfer(owner.address, acct1.address, bs58toHex(tokenIdA), txOptions)
      await transfer.wait()

      const balance = await tokensNF.balanceOf(acct1.address, bs58toHex(tokenIdA))
      expect(balance).to.equal(1)

      const filter = tokensNF.filters.TransferSingle()
      const events = await tokensNF.queryFilter(filter)
      const latestEvent = events.pop()
      expect(latestEvent.args.from).to.equal(owner.address)
      expect(latestEvent.args.to).to.equal(acct1.address)
      expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenIdA)
    })

    it('should fail for try to transfer not owned NFT', async function () {
      try {
        const tokenIdA = await nftMinter((await randomCID()).toString())
        txOptions.gasLimit = await tokensNF.connect(acct1).estimateGas
          .transfer(owner.address, acct1.address, bs58toHex(tokenIdA))
        await tokensNF.connect(acct1)
          .transfer(owner.address, acct1.address, bs58toHex(tokenIdA), txOptions)
        expect(false).to.equal(true)
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
