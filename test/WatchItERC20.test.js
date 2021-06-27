/* global ethers, network */

const { expect } = require('chai')
const { getFTContractAddress } = require('./utils')
const CONTRACT_ADDRESS = getFTContractAddress(network.name)

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('WatchItERC20', function () {
  this.timeout(0)

  let WATCHIT
  let owner, account1

  const txOptions = {}

  before(async function () {
    ;[owner, account1] = await ethers.getSigners()

    txOptions.gasPrice = await ethers.provider.getGasPrice()
    const WatchIt = await ethers.getContractFactory('WatchItERC20')
    WATCHIT = WatchIt.attach(CONTRACT_ADDRESS)
  })

  describe('Details', function () {
    it('is called "WatchIt"', async () => {
      expect(await WATCHIT.name()).to.match(/WatchIt/)
    })

    it('has the symbol "WATCHIT"', async () => {
      expect(await WATCHIT.symbol()).to.match(/WATCHIT/)
    })

    it('has a decimal count of 18', async () => {
      expect(await WATCHIT.decimals()).to.equal(18)
    })
  })

  describe('Transfer', function () {
    const transferAmount = 10

    it('allows owner to transfer tokens to account 1', async function () {
      const initialBalance = await WATCHIT.balanceOf(account1.address)

      txOptions.gasLimit = await WATCHIT
        .connect(owner)
        .estimateGas
        .transfer(account1.address, transferAmount)

      const tx0 = await WATCHIT
        .connect(owner)
        .transfer(account1.address, transferAmount, txOptions)
      await tx0.wait()

      const endingBalance = await WATCHIT.balanceOf(account1.address)
      expect(endingBalance).to.equal(initialBalance + 10)
    })

    it('allows account1 to transfer tokens back', async () => {
      const initialBalance = await WATCHIT.balanceOf(account1.address)

      txOptions.gasLimit = await WATCHIT
        .connect(account1)
        .estimateGas
        .transfer(owner.address, transferAmount)

      const tx0 = await WATCHIT
        .connect(account1)
        .transfer(owner.address, transferAmount, txOptions)
      await tx0.wait()

      const endingBalance = await WATCHIT.balanceOf(account1.address)
      expect(endingBalance).to.equal(initialBalance - 10)
    })
  })

  describe('Approval & Allowance', function () {
    const allowanceIncrease = 1000

    // Always set allowance to zero,then increase it
    // https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/edit

    it('allows addr1 to approve owner to spend 1000', async function () {
      txOptions.gasLimit = await WATCHIT
        .connect(owner)
        .estimateGas
        .approve(account1.address, 0)

      const tx0 = await WATCHIT
        .connect(owner)
        .approve(account1.address, 0, txOptions)
      await tx0.wait()

      const initialAllowance = await WATCHIT.allowance(owner.address, account1.address)

      txOptions.gasLimit = await WATCHIT
        .connect(owner)
        .estimateGas
        .increaseAllowance(account1.address, allowanceIncrease)

      const tx1 = await WATCHIT
        .connect(owner)
        .increaseAllowance(account1.address, allowanceIncrease, txOptions)
      await tx1.wait()

      const allowance = await WATCHIT.allowance(owner.address, account1.address)
      expect(allowance).to.equal(initialAllowance.add(allowanceIncrease))
    })

    it('allows account1 to transferFrom owner 50% of allowance', async () => {
      const initialAllowance = await WATCHIT.allowance(owner.address, account1.address)

      txOptions.gasLimit = await WATCHIT
        .connect(account1)
        .estimateGas
        .transferFrom(owner.address, account1.address, initialAllowance / 2)

      const tx0 = await WATCHIT
        .connect(account1)
        .transferFrom(owner.address, account1.address, initialAllowance / 2)
      await tx0.wait()

      const allowance = await WATCHIT.allowance(owner.address, account1.address)
      expect(allowance).to.equal(initialAllowance / 2)
    })

    it('decreases account1 allowance back to 0', async function () {
      const initialAllowance = await WATCHIT.allowance(owner.address, account1.address)

      txOptions.gasLimit = await WATCHIT
        .connect(owner)
        .estimateGas
        .decreaseAllowance(account1.address, initialAllowance)

      const tx2 = await WATCHIT
        .connect(owner)
        .decreaseAllowance(account1.address, initialAllowance, txOptions)
      await tx2.wait()

      const allowance = await WATCHIT.allowance(owner.address, account1.address)
      expect(allowance).to.equal(0)
    })
  })

  describe('Supply & Balance', function () {
    it('initially mints a non-zero number of tokens', async function () {
      const totalSupply = await WATCHIT.totalSupply()
      expect(totalSupply).to.be.above(0)
    })

    it('keeps some of the balance with the creator', async function () {
      const ownerBalance = await WATCHIT.balanceOf(owner.address)
      expect(ownerBalance).to.be.above(0)
    })
  })
})
