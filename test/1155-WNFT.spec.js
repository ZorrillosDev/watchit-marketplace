/* global ethers, network */
require('./utils/global')
const { expect } = require('chai')
const {
  bs58toHex,
  getContractAddress,
  hexToBs58,
  randomCID
} = require('./utils')

const contracts = getContractAddress(network.name)
const CONTRACT_ADDRESS = contracts.NFT;
const CONTRACT_GATEWAY_PURCHASE = contracts.PO;
const txOptions = { gasLimit: 8000000 }

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('WatchIt NFTs (WNFT)', function () {
  this.timeout(0)

  let wnft, purchase
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

    const purchaseFactory = await ethers.getContractFactory('PurchaseGateway')
    purchase = purchaseFactory.attach(CONTRACT_GATEWAY_PURCHASE);

  })

  describe.skip('Details', function () {
    it('returns true when 0xd9b67a26 is passed to supportsInterface', async () => {
      const supports = await wnft.supportsInterface('0xd9b67a26')
      expect(supports).to.equal(true)
    })
  })

  describe.skip('Roles', function () {
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

  describe.skip('Mint & Burn', function () {
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
      for (const i in latestEvent.args.ids) {
        expect(latestEvent.args.ids[i].eq(ethers.BigNumber.from(bs58toHex(uris[i]))))
      }
    })

    it('should not "re-mint" an already existing CID', async () => {
      const tokenCID = (await randomCID()).toString()
      await nftMinter(tokenCID)
      const reMint = await wnft.mint(owner.address, bs58toHex(tokenCID), txOptions)
      expect(reMint.wait()).to.be.reverted // eslint-disable-line
    })
  })

  describe.skip('Transfer', function () {
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
      expect(transfer.wait()).to.be.reverted // eslint-disable-line
    })
  })

  describe.skip('Query', function () {
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
    it('should purchase with defined price in gateway', async () => {
      // Integration tests
      const token = bs58toHex((await randomCID()).toString())
      const tokenTx = await wnft.connect(owner).mint(acct1.address, token, txOptions)
      await tokenTx.wait()

      // console.log(owner.address) 0xEe99CeFF640d37Edd9cac8c7cfF4Ed4cD609f435 Kovan
      // console.log(owner.address) 0xEe99CeFF640d37Edd9cac8c7cfF4Ed4cD609f435 Rinkeby

      // Request purchase from acct1 address for token
      const currentOwnerBalance = await wnft.balanceOf(acct1.address, token, txOptions);
      const currentHolder = await wnft.getCurrentHolder(token);
      expect(currentOwnerBalance).to.equal(1);
      expect(currentHolder).to.equal(acct1.address);

      // Request purchase CID token NFT with caller address to delegate back call
      const transaction = await purchase.requestNFTPrice(token, wnft.address, txOptions);
      await transaction.wait()

      //wait 30 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 50000))
      const currentPrice = await purchase.getCurrentPriceForCID(token);
      console.log(currentPrice)
      // const newHolder = await wnft.getCurrentHolder(token);
      // // expect(currentPrice).to.equal(1);
      // expect(newHolder).to.equal(owner.address);



      // const purchaseTx = purchase.filters.PurchaseRequestReceived()
      // const events = await purchase.queryFilter(purchaseTx)
      // console.log(events)
      //
      // // Check that NFT has been minted for acct1 as owner

      // // let tx = await purchase.fulFillNFTPrice(transaction, 1)
      // // tx.await();

    })
  })
})
