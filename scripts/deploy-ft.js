const { ethers, network, upgrades } = require('hardhat')

async function main () {
  const WatchItERC20 = await ethers.getContractFactory('WatchItERC20')
  const WATCHIT = await upgrades.deployProxy(WatchItERC20, [200000], { initializer: 'initialize' })
  const localNetwork = network.name === 'localhost'

  process.stdout.write(
    localNetwork
      ? WATCHIT.address
      : `${network.name}:NFT:${WATCHIT.address}\n`
  )
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
