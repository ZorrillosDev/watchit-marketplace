const { ethers, upgrades } = require('hardhat')

async function main () {
  const WatchItERC20 = await ethers.getContractFactory('WatchItERC20')
  const WATCHIT = await upgrades.deployProxy(WatchItERC20, [200000], { initializer: 'initialize' })

  process.stdout.write(WATCHIT.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
