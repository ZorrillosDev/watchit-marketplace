const { ethers, network, upgrades } = require('hardhat') // eslint-disable-line
const { getFTContractAddress, runUpgradeTest, } = require('../test/utils') // eslint-disable-line

async function main () {
  const WVC = await ethers.getContractFactory('WVC')
  const currentContract = getFTContractAddress(network.name)
  const attachedContract = WVC.attach(currentContract) // eslint-disable-line

  // Current contract
  const version = await attachedContract.version()
  console.log('>> Current version:', version)

  // Upgraded contract
  const upgraded = await upgrades.upgradeProxy(currentContract, WVC)
  await runUpgradeTest(upgraded)

  console.log(' > WVC upgraded')
  process.stdout.write(upgraded.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
