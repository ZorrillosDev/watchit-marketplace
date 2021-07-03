const { ethers, network, upgrades } = require('hardhat')

async function main () {
  const WVC = await ethers.getContractFactory('WVC')
  const wvc = await upgrades.deployProxy(WVC, [200000], { initializer: 'initialize' })
  const localNetwork = network.name === 'localhost'

  process.stdout.write(
    localNetwork
      ? wvc.address
      : `${network.name}:WVC:${wvc.address}\n`
  )
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
