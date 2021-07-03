const { ethers, network, upgrade } = require('hardhat') // eslint-disable-line
const { getFTContractAddress, runUpgradeTest, getCurrentVersion, txOptions } = require('../test/utils') // eslint-disable-line

async function main () {
  const WVC = await ethers.getContractFactory('WVC')
  const currentContract = getFTContractAddress(network.name)
  const attachedContract = WVC.attach(currentContract) // eslint-disable-line
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
