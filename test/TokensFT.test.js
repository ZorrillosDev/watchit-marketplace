/* global ethers, network */

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
  let owner

  before(async function () {
    [owner] = await ethers.getSigners()
    const FToken = await ethers.getContractFactory('FToken')
    tokensF = FToken.attach(CONTRACT_ADDRESS)
  })

  describe('FungibleTokens', function () {
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
