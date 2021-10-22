/* global ethers, network */
const chai = require('chai')
require('./utils/global')
const { expect } = require('chai')
const { BigNumber } = require('ethers')

const {
  bs58toHex,
  hexToBs58,
  randomCID
} = require('../utils')

const txOptions = { gasLimit: 800000 }

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('WatchIt NFTs (WNFT)', function () {
  this.timeout(0)

  let wnft, purchase
  let deployer, client
  // Example token uri. CID is not valid one.
  // TODO: ERC1155 Metadata
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

  const nftMinter = async function (CID, minter = deployer) {
    const tokenHex = bs58toHex(CID)
    const tx = await wnft.connect(minter)
      .mint(minter.address, tokenHex, txOptions)
    await tx.wait()

    return CID
  }

  before(async function () {
    const accounts = await getNamedAccounts()
    deployer = await ethers.getSigner(accounts.deployer)
    client = await ethers.getSigner(accounts.client)

    // console.log(owner.address) //0xEe99CeFF640d37Edd9cac8c7cfF4Ed4cD609f435
    // await deployments.fixture(['mocks', 'api'])
    const PurchaseGateway = await deployments.get('PurchaseGateway')
    purchase = await ethers.getContractAt('PurchaseGateway', PurchaseGateway.address)

    txOptions.gasPrice = await ethers.provider.getGasPrice()
    const NFToken = await deployments.get('WNFT')
    wnft = await ethers.getContractAt('WNFT', NFToken.address)

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
        const mint = await wnft.connect(client).mint(client.address, tokenCID, txOptions)
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
        const burn = await wnft.burn(deployer.address, bs58toHex(tokenCID), txOptions)
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
        const burn = await wnft.connect(client).burn(deployer.address, bs58toHex(tokenCID), txOptions)
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
        .mintBatch(deployer.address, uris.map(bs58toHex), txOptions)
      await mintBatch.wait()

      const filter = wnft.filters.TransferBatch()
      const events = await wnft.queryFilter(filter)
      const latestEvent = events.pop()
      expect(ethers.BigNumber.from(latestEvent.args.from)).to.equal(0x0)
      for (const i in latestEvent.args.ids) {
        expect(latestEvent.args.ids[i].eq(ethers.BigNumber.from(bs58toHex(uris[i]))))
      }
    })

    it('should not "re-mint" an already existing CID', async () => {
      const tokenCID = (await randomCID()).toString()
      await nftMinter(tokenCID)
      const reMint = await wnft.mint(deployer.address, bs58toHex(tokenCID), txOptions)
      expect(reMint.wait()).to.be.reverted // eslint-disable-line
    })
  })

  describe('Transfer', function () {
    it('should be transferable', async function () {
      const tokenIdA = await nftMinter((await randomCID()).toString())
      const transfer = await wnft.connect(deployer)
        .transfer(deployer.address, client.address, bs58toHex(tokenIdA), txOptions)
      await transfer.wait()

      const balance = await wnft.balanceOf(client.address, bs58toHex(tokenIdA))
      expect(balance).to.equal(1)

      const filter = wnft.filters.TransferSingle()
      const events = await wnft.queryFilter(filter)
      const latestEvent = events.pop()
      expect(latestEvent.args.from).to.equal(deployer.address)
      expect(latestEvent.args.to).to.equal(client.address)
      expect(hexToBs58(latestEvent.args.id.toHexString())).to.equal(tokenIdA)
    })

    it('should fail for try to transfer not owned NFT', async function () {
      const tokenIdA = await nftMinter((await randomCID()).toString())
      const transfer = await wnft.connect(client).transfer(deployer.address, client.address, bs58toHex(tokenIdA), txOptions)
      expect(transfer.wait()).to.be.reverted // eslint-disable-line
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

  describe('Purchase', function () {
    // Skip local environment
    if (!['kovan', 'rinkeby'].includes(network.name)) { return }

    it('should make an API request successfully', async () => {
      const token = bs58toHex((await randomCID()).toString())
      const value = BigNumber.from('1000000000000')
      // Request purchase CID token NFT with caller address to delegate back call
      const transaction = await purchase.requestPurchase(token, wnft.address, { value })
      const tx = await transaction.wait()
      const requestId = tx.events[0].topics[1]
      expect(requestId).to.not.be.null
    })

    it('should purchase with API price from gateway', async () => {
      // Integration tests
      const value = BigNumber.from('1000000000000')
      const token = bs58toHex((await randomCID()).toString())
      const tokenTx = await wnft.mint(client.address, token, txOptions)
      await tokenTx.wait()

      const currentOwnerBalance = await wnft.balanceOf(client.address, token, txOptions)
      const currentHolder = await wnft.holderOf(token)
      expect(currentOwnerBalance).to.equal(1)
      expect(currentHolder).to.equal(client.address)

      // Request purchase CID token NFT with caller address to delegate back call
      await (await purchase.connect(deployer).requestPurchase(token, wnft.address, {value})).wait()
      // wait 30 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 30000))
      const newHolder = await wnft.holderOf(token)
      expect(newHolder).to.equal(deployer.address)
    })

    it('should retrieve corresponding price for CID from API', async () => {
      // Integration tests
      const value = BigNumber.from('1000000000000')
      const token = bs58toHex((await randomCID()).toString())
      const tokenTx = await wnft.mint(client.address, token, txOptions)
      await tokenTx.wait()

      // Request purchase CID token NFT with caller address to delegate back call
      const contractBalanceBefore = await ethers.provider.getBalance(purchase.address)
      await (await purchase.connect(deployer).requestPurchase(token, wnft.address, { value })).wait()
      const contractBalance = await ethers.provider.getBalance(purchase.address)
      expect(contractBalance.sub(contractBalanceBefore)).to.equal(value)

      // wait 30 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 30000))
      const currentPrice = await purchase.getCurrentPriceForCID(token)
      expect(currentPrice).to.equal(value)
    })

    it('should subtract => add balance from buyer to seller', async () => {
      // Integration tests
      const value = BigNumber.from('1000000000000')
      const token = bs58toHex((await randomCID()).toString())
      const tokenTx = await wnft.mint(client.address, token, txOptions)
      await tokenTx.wait()

      // Request purchase from acct1 address for token
      const initialSellerETHBalance = await ethers.provider.getBalance(client.address)
      const initialBuyerETHBalance = await ethers.provider.getBalance(deployer.address)
      // Request purchase CID token NFT with caller address to delegate back call
      await (await purchase.connect(deployer).requestPurchase(token, wnft.address, { value })).wait()

      // wait 30 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 30000))
      // Check new balance after purchase
      const newSellerBalance = await ethers.provider.getBalance(client.address)
      expect(newSellerBalance.gte(initialSellerETHBalance.add(value))).to.equal(true)
      const newBuyerBalance = await ethers.provider.getBalance(deployer.address)
      expect(newBuyerBalance.lte(initialBuyerETHBalance.sub(value))).to.equal(true)
    })
  })
})
