/* global ethers, network */
require('./utils/global')
const { expect } = require('chai')
const {
  bs58toHex,
  getNFTContractAddress,
  hexToBs58,
  randomCID
} = require('./utils')

const CONTRACT_ADDRESS = getNFTContractAddress(network.name)
const txOptions = { gasLimit: 800000 }

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('WatchIt NFTs (WNFT)', function () {
  this.timeout(0)

  let wnft
  let owner, acct1
  // Example token uri. CID is not valid one.
  // TODO: ERC1155 Metadata
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

  const nftMinter = async function (CID, minter = owner) {
    const tokenHex = bs58toHex(CID)
    const tx = await wnft.connect(minter)
      .mint(minter.address, tokenHex, txOptions)
    await tx.wait()

    return CID
  }

  before(async function () {
    [owner, acct1] = await ethers.getSigners()
    txOptions.gasPrice = await ethers.provider.getGasPrice()
    const NFToken = await ethers.getContractFactory('WNFT')
    wnft = NFToken.attach(CONTRACT_ADDRESS)
  })

  describe('Details', function () {
    it('returns true when 0xd9b67a26 is passed to supportsInterface', async () => {
      const supports = await wnft.supportsInterface('0xd9b67a26')
      expect(supports).to.equal(true)
    })
  })

  describe('Roles', function () {
    describe('NFT_MINTER_ROLE', function () {
      it('cannot mint NFT without proper permissions', async function () {
        const tokenCID = bs58toHex((await randomCID()).toString())
        const mint = await wnft.connect(acct1).mint(acct1.address, tokenCID, txOptions)
        await expect(mint.wait()).to.be.reverted
      })
    })

    describe('DEFAULT_ADMIN_ROLE', function () {

      it('can bump version', async function () {
        const currentVersion = await wnft.version()
        const upgrade = await wnft.upgrade()
        await upgrade.wait()
        const newVersion = await wnft.version()

        expect(newVersion).to.equal(currentVersion + 1)
      })

      it('can burn NFT with proper permissions', async function () {
        const tokenCID = (await randomCID()).toString()
        await nftMinter(tokenCID)
        const burn = await wnft.burn(owner.address, bs58toHex(tokenCID), txOptions)
        await burn.wait()

        const filter = wnft.filters.TransferSingle()
        const events = await wnft.queryFilter(filter)
        const latestEvent = events.pop()
        expect(ethers.BigNumber.from(latestEvent.args.to)).to.equal(0x0)
        expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenCID)
      })


      it('only admin can burn NFTs', async function () {
        const tokenCID = (await randomCID()).toString()
        await nftMinter(tokenCID)
        const burn = await wnft.connect(acct1).burn(owner.address, bs58toHex(tokenCID), txOptions)
        await expect(burn.wait()).to.be.reverted
      })
    })
  })

  describe('Mint & Burn', function () {
    it('should mint NFT valid mapping CID', async function () {
      const tokenIdA = await nftMinter((await randomCID()).toString())
      const tokenIdB = await nftMinter((await randomCID()).toString())

      const filter = wnft.filters.TransferSingle()
      const events = await wnft.queryFilter(filter)
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
      const mintBatch = await wnft
        .mintBatch(owner.address, uris.map(bs58toHex), txOptions)
      await mintBatch.wait()

      const filter = wnft.filters.TransferBatch()
      const events = await wnft.queryFilter(filter)
      const latestEvent = events.pop()
      expect(ethers.BigNumber.from(latestEvent.args.from)).to.equal(0x0)
      expect(latestEvent.args.ids.map(e => ethers.BigNumber.prototype.toHexString.apply(e)))
        .to.deep.equal(uris.map(bs58toHex))
    })

    it('should not "re-mint" an already existing CID', async () => {
      const tokenCID = (await randomCID()).toString()
      await nftMinter(tokenCID)
      const reMint = await wnft.mint(owner.address, bs58toHex(tokenCID), txOptions)
      expect(reMint.wait()).to.be.reverted
    })
  })

  describe('Transfer', function () {
    it('should be transferable', async function () {
      const tokenIdA = await nftMinter((await randomCID()).toString())
      const transfer = await wnft.connect(owner)
        .transfer(owner.address, acct1.address, bs58toHex(tokenIdA), txOptions)
      await transfer.wait()

      const balance = await wnft.balanceOf(acct1.address, bs58toHex(tokenIdA))
      expect(balance).to.equal(1)

      const filter = wnft.filters.TransferSingle()
      const events = await wnft.queryFilter(filter)
      const latestEvent = events.pop()
      expect(latestEvent.args.from).to.equal(owner.address)
      expect(latestEvent.args.to).to.equal(acct1.address)
      expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenIdA)
    })

    it('should fail for try to transfer not owned NFT', async function () {
      const tokenIdA = await nftMinter((await randomCID()).toString())
      const transfer = await wnft.connect(acct1).transfer(owner.address, acct1.address, bs58toHex(tokenIdA), txOptions)
      expect(transfer.wait()).to.be.reverted
    })
  })

  describe('Query', function () {
    it('lists all TransferSingle events', async () => {
      const filter = wnft.filters.TransferSingle()
      const events = await wnft.queryFilter(filter)
      expect(events.length).to.be.at.least(7)
    })

    it('lists all TransferBatch events', async () => {
      const filter = wnft.filters.TransferBatch()
      const events = await wnft.queryFilter(filter)
      expect(events.length).to.be.at.least(1)
    })
  })
})
