/* global ethers, network */
require('./utils/global')
const { expect } = require('chai')

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('WVC', function () {
  let wvc
  let owner, client

  const txOptions = {}

  before(async function () {
    const accounts = await getNamedAccounts()
    owner = await ethers.getSigner(accounts.deployer)
    client = await ethers.getSigner(accounts.client)

    txOptions.gasPrice = await ethers.provider.getGasPrice()
    const WVC = await deployments.get('WVC')
    wvc = await ethers.getContractAt('WVC', WVC.address)
  })

  describe('Details', function () {
    it('is called "WatchIt Video Coin"', async () => {
      expect(await wvc.name()).to.match(/WatchIt Video Coin/)
    })

    it('has the symbol "WVC"', async () => {
      expect(await wvc.symbol()).to.match(/WVC/)
    })

    it('has a decimal count of 18', async () => {
      expect(await wvc.decimals()).to.equal(18)
    })
  })

  describe('Roles', function () {
    describe('DEFAULT_ADMIN_ROLE', function () {
      it('can bump version', async function () {
        const currentVersion = await wvc.version()
        const upgrade = await wvc.upgrade()
        await upgrade.wait()
        const newVersion = await wvc.version()

        expect(newVersion).to.equal(currentVersion + 1)
      })
    })
  })

  describe('Transfer', function () {
    const transferAmount = 10
    let initialBlockNumber

    before(async () => {
      initialBlockNumber = await ethers.provider.getBlockNumber()
    })

    it('allows owner to transfer tokens to account 1', async function () {
      const initialBalance = await wvc.balanceOf(client.address)

      txOptions.gasLimit = await wvc
        .connect(owner)
        .estimateGas
        .transfer(client.address, transferAmount)

      const tx0 = await wvc
        .connect(owner)
        .transfer(client.address, transferAmount, txOptions)
      await tx0.wait()

      const endingBalance = await wvc.balanceOf(client.address)
      expect(endingBalance).to.equal(initialBalance.add(10))
    })

    it('allows client to transfer tokens back', async () => {
      const initialBalance = await wvc.balanceOf(client.address)

      txOptions.gasLimit = await wvc
        .connect(client)
        .estimateGas
        .transfer(owner.address, transferAmount)

      const tx0 = await wvc
        .connect(client)
        .transfer(owner.address, transferAmount, txOptions)
      await tx0.wait()

      const endingBalance = await wvc.balanceOf(client.address)
      expect(endingBalance).to.equal(initialBalance - 10)
    })

    it('emits the Transfer event for the two previous transactions', async () => {
      const endingBlockNumber = await ethers.provider.getBlockNumber()
      expect(endingBlockNumber).to.be.above(initialBlockNumber)

      const transferFilter = wvc.filters.Transfer()
      const events = await wvc.queryFilter(transferFilter)

      const recentEvents = events
        .filter(e => (initialBlockNumber < e.blockNumber) && (e.blockNumber <= endingBlockNumber))

      expect(recentEvents.length).to.be.at.least(2)
      expect(recentEvents.filter(e => e.args.to === owner.address).length).to.equal(1)
      expect(recentEvents.filter(e => e.args.to === client.address).length).to.equal(1)
    })
  })

  describe('Mint & Burn', function () {
    const amount = 1000

    it('allows owner to mint tokens', async () => {
      const initialBalance = await wvc.balanceOf(owner.address)

      txOptions.gasLimit = await wvc
        .connect(owner)
        .estimateGas
        .mint(owner.address, amount)

      const tx0 = await wvc
        .connect(owner)
        .mint(owner.address, amount)
      await tx0.wait()

      const endingBalance = await wvc.balanceOf(owner.address)
      expect(endingBalance).to.equal(initialBalance.add(amount))
    })

    it('allows owner to burn tokens', async () => {
      const initialBalance = await wvc.balanceOf(owner.address)

      txOptions.gasLimit = await wvc
        .connect(owner)
        .estimateGas
        .burn(owner.address, amount)

      const tx0 = await wvc
        .connect(owner)
        .burn(owner.address, amount)
      await tx0.wait()

      const endingBalance = await wvc.balanceOf(owner.address)
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
      txOptions.gasLimit = await wvc
        .connect(owner)
        .estimateGas
        .approve(client.address, 0)

      const tx0 = await wvc
        .connect(owner)
        .approve(client.address, 0, txOptions)
      await tx0.wait()

      const initialAllowance = await wvc.allowance(owner.address, client.address)

      txOptions.gasLimit = await wvc
        .connect(owner)
        .estimateGas
        .increaseAllowance(client.address, amount)

      const tx1 = await wvc
        .connect(owner)
        .increaseAllowance(client.address, amount, txOptions)
      await tx1.wait()

      const allowance = await wvc.allowance(owner.address, client.address)
      expect(allowance).to.equal(initialAllowance.add(amount))
    })

    it('allows client to transferFrom owner 50% of allowance', async () => {
      const initialAllowance = await wvc.allowance(owner.address, client.address)

      const tx0 = await wvc
        .connect(client)
        .transferFrom(owner.address, client.address, initialAllowance.div(2))
      await tx0.wait()

      const allowance = await wvc.allowance(owner.address, client.address)
      expect(allowance).to.equal(initialAllowance.div(2))
    })

    it('decreases client allowance back to 0', async function () {
      const initialAllowance = await wvc.allowance(owner.address, client.address)

      txOptions.gasLimit = await wvc
        .connect(owner)
        .estimateGas
        .decreaseAllowance(client.address, initialAllowance)

      const tx2 = await wvc
        .connect(owner)
        .decreaseAllowance(client.address, initialAllowance, txOptions)
      await tx2.wait()

      const allowance = await wvc.allowance(owner.address, client.address)
      expect(allowance).to.equal(0)
    })

    it('emits the Approval event for the four previous transactions', async () => {
      const endingBlockNumber = await ethers.provider.getBlockNumber()
      expect(endingBlockNumber).to.be.above(initialBlockNumber)

      const approvalFilter = wvc.filters.Approval()
      const events = await wvc.queryFilter(approvalFilter)

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
      const totalSupply = await wvc.totalSupply()
      expect(totalSupply).to.be.above(0)
    })

    it('keeps some of the balance with the creator', async function () {
      const ownerBalance = await wvc.balanceOf(owner.address)
      expect(ownerBalance).to.be.above(0)
    })
  })
})
