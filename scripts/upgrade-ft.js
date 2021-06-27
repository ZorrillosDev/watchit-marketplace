const { ethers, network, upgrades } = require('hardhat')
const { getFTContractAddress, runUpgradeTest, getCurrentVersion, txOptions } = require('../test/utils')

async function main () {
  const WatchItERC20 = await ethers.getContractFactory('WatchItERC20')
  const currentContract = getFTContractAddress(network.name)
  const attachedContract = WatchItERC20.attach(currentContract)
  // Current contract
  // TODO testing upgrade ERC20
  // const version = await getCurrentVersion(attachedContract)
  // console.log('>> Current version:', version)
  // // Upgraded contract
  // const upgradedFT = await upgrades.upgradeProxy(currentContract, FToken)
  //
  // console.log(' > FToken upgraded')
  // process.stdout.write(upgradedFT.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
