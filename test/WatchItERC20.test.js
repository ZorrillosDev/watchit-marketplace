/* global ethers, network */

const { expect } = require('chai')
const { getFTContractAddress } = require('./utils')
const CONTRACT_ADDRESS = getFTContractAddress(network.name)

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('WatchItERC20', function () {
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
    let initialBlockNumber

    before(async () => {
      initialBlockNumber = await ethers.provider.getBlockNumber()
    })

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

    it('emits the Transfer event for the two previous transactions', async () => {
      const endingBlockNumber = await ethers.provider.getBlockNumber()
      expect(endingBlockNumber).to.be.above(initialBlockNumber)

      const transferFilter = WATCHIT.filters.Transfer()
      const events = await WATCHIT.queryFilter(transferFilter)

      const recentEvents = events
        .filter(e => (initialBlockNumber < e.blockNumber) && (e.blockNumber <= endingBlockNumber))

      expect(recentEvents.length).to.be.at.least(2)
      expect(recentEvents.filter(e => e.args.to === owner.address).length).to.equal(1)
      expect(recentEvents.filter(e => e.args.to === account1.address).length).to.equal(1)
    })
  })

  describe('Mint & Burn', function () {
    const amount = 1000

    it('allows owner to mint tokens', async () => {
      const initialBalance = await WATCHIT.balanceOf(owner.address)

      txOptions.gasLimit = await WATCHIT
        .connect(owner)
        .estimateGas
        .mint(owner.address, amount)

      const tx0 = await WATCHIT
        .connect(owner)
        .mint(owner.address, amount)
      await tx0.wait()

      const endingBalance = await WATCHIT.balanceOf(owner.address)
      expect(endingBalance).to.equal(initialBalance.add(amount))
    })

    it('allows owner to burn tokens', async () => {
      const initialBalance = await WATCHIT.balanceOf(owner.address)

      txOptions.gasLimit = await WATCHIT
        .connect(owner)
        .estimateGas
        .burn(owner.address, amount)

      const tx0 = await WATCHIT
        .connect(owner)
        .burn(owner.address, amount)
      await tx0.wait()

      const endingBalance = await WATCHIT.balanceOf(owner.address)
      expect(endingBalance).to.equal(initialBalance.sub(amount))
    })
  })

  describe('Approval & Allowance', function () {
    const amount = 1000
    let initialBlockNumber

    before(async () => {
      initialBlockNumber = await ethers.provider.getBlockNumber()
    })

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
        .increaseAllowance(account1.address, amount)

      const tx1 = await WATCHIT
        .connect(owner)
        .increaseAllowance(account1.address, amount, txOptions)
      await tx1.wait()

      const allowance = await WATCHIT.allowance(owner.address, account1.address)
      expect(allowance).to.equal(initialAllowance.add(amount))
    })

    it('allows account1 to transferFrom owner 50% of allowance', async () => {
      const initialAllowance = await WATCHIT.allowance(owner.address, account1.address)

      txOptions.gasLimit = await WATCHIT
        .connect(account1)
        .estimateGas
        .transferFrom(owner.address, account1.address, initialAllowance.div(2))

      const tx0 = await WATCHIT
        .connect(account1)
        .transferFrom(owner.address, account1.address, initialAllowance.div(2))
      await tx0.wait()

      const allowance = await WATCHIT.allowance(owner.address, account1.address)
      expect(allowance).to.equal(initialAllowance.div(2))
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

    it('emits the Approval event for the four previous transactions', async () => {
      const endingBlockNumber = await ethers.provider.getBlockNumber()
      expect(endingBlockNumber).to.be.above(initialBlockNumber)

      const approvalFilter = WATCHIT.filters.Approval()
      const events = await WATCHIT.queryFilter(approvalFilter)

      const recentEvents = events
        .filter(e => (initialBlockNumber < e.blockNumber) && (e.blockNumber <= endingBlockNumber))

      expect(recentEvents.length).to.be.at.least(4)
      expect(recentEvents.filter(e => e.args.value.eq(0)).length).to.be.at.least(2)
      expect(recentEvents.filter(e => e.args.value.eq(amount)).length).to.be.at.least(1)
      expect(recentEvents.filter(e => e.args.value.eq(amount / 2)).length).to.be.at.least(1)
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