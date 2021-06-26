/* global ethers, upgrades, network */

const { expect } = require('chai')
const { isTestnet, getFTContractAddress } = require('./utils')

const TESTNET = isTestnet(network.name)
const CONTRACT_ADDRESS = getFTContractAddress(network.name)

let txOptions = {}
if (TESTNET) {
  txOptions = {
    gasLimit: 8000000,
    gasPrice: 1000000000
  }
}

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('FTokens', function () {
  if (TESTNET) {
    this.timeout(0)
  }

  let tokensF
  let owner, addr1

  before(async function () {
    [owner, addr1] = await ethers.getSigners()
    const FToken = await ethers.getContractFactory('FToken')
    tokensF = FToken.attach(CONTRACT_ADDRESS)
  })

  describe('FungibleTokens', function () {
    describe.skip('Upgradeable', function () {
      let v2NFT, currentNextId
      before(async function () {
        // Mint for v1 must persist in v2 state
        const minter = await tokensF.mint(owner.address, 1, [])
        await minter.wait() // wait until transaction mined
        currentNextId = await tokensF.nextTokenId() // v1 currentNextId
        const v2Factory = await ethers.getContractFactory('FTokenV2')
        v2NFT = await upgrades.upgradeProxy(tokensF.address, v2Factory)
        v2NFT.attach(tokensF.address)
      })

      it('should retrieve a NFT previously minted', async function () {
        const previousContractNextId = await v2NFT.nextTokenId()
        const previousBalance = await v2NFT.balanceOf(owner.address, currentNextId - 1)
        expect(previousContractNextId).to.equal(currentNextId)
        expect(previousBalance).to.equal('1')
      })

      it('should allow call added method in upgrade `myUpgradedTokenId`', async function () {
        const previousContractNextId = await v2NFT.myUpgradedTokenId()
        expect(previousContractNextId).to.equal(currentNextId)
      })

      it('should cannot upgrade if not owner', async function () {
        try {
          const v2Factory = await ethers.getContractFactory('FTokenV2', { signer: addr1 })
          await upgrades.upgradeProxy(tokensF.address, v2Factory)
        } catch (err) {
          expect(err.message).to.contain('Ownable: caller is not the owner')
        }
      })
    })

    describe('Mint', function () {
      it('should increments the nextTokenId after each mint', async function () {
        const initialTokenId = await tokensF.nextTokenId()
        const mintFT = await tokensF.mint(owner.address, 1, [], txOptions)
        await mintFT.wait() // wait until transaction mined
        const nextTokenId = await tokensF.nextTokenId()
        expect(nextTokenId).to.equal(initialTokenId.add(1))
      })

      it('should increments nextTokenId properly after batch mint', async function () {
        const initialTokenId = await tokensF.nextTokenId()
        const amounts = [
          1,
          10,
          100,
          10000000,
          '1000000000000000'
        ]

        const mintBatch = await tokensF.mintBatch(owner.address, amounts, [], txOptions)
        await mintBatch.wait() // wait until transaction mined
        const nextTokenId = await tokensF.nextTokenId()
        expect(nextTokenId).to.equal(initialTokenId.add(amounts.length))
      })
    })
  })
})
