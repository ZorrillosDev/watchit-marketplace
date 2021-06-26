const { ethers, network, upgrades } = require('hardhat')
const { getFTContractAddress } = require('../test/utils')

async function main () {
  const FToken = await ethers.getContractFactory('FToken')
  const ftoken = await upgrades.upgradeProxy(getFTContractAddress(network.name), FToken)

  process.stdout.write(ftoken.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
