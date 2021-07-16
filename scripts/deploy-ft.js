const { ethers, network, upgrades } = require('hardhat')
const { writeInEnv } = require('./utils')

async function main () {
  const WVC = await ethers.getContractFactory('WVC')
  const wvc = await upgrades.deployProxy(WVC, [200000], { initializer: 'initialize' })
  const currentNetwork = network.name.toUpperCase()
  writeInEnv({ [`${currentNetwork}_CONTRACT_FT`]: wvc.address })

  console.log(`${network.name}:WVC:${wvc.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
