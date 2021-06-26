const { ethers, network, upgrades } = require('hardhat')
const { getNFTContractAddress } = require('../test/utils')

async function main () {
  const NFToken = await ethers.getContractFactory('NFToken')
  const nftoken = await upgrades.upgradeProxy(getNFTContractAddress(network.name), NFToken)

  process.stdout.write(nftoken.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
