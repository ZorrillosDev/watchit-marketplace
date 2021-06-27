const { ethers, upgrades } = require('hardhat')

async function main () {
  const WatchIt = await ethers.getContractFactory('WatchItToken')
  const WATCHIT = await upgrades.deployProxy(WatchIt, [200000], { initializer: 'initialize' })

  process.stdout.write(WATCHIT.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
