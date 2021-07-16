const { ethers, network, upgrades } = require('hardhat')
const { getNFTContractAddress, runUpgradeTest } = require('../test/utils') // eslint-disable-line

async function main () {
  const WNFT = await ethers.getContractFactory('WNFT')
  const currentContract = getNFTContractAddress(network.name)
  const attachedContract = WNFT.attach(currentContract)

  // Current contract
  const version = await attachedContract.version()
  console.log('>> Current version:', version)

  // Upgraded contract
  const upgraded = await upgrades.upgradeProxy(currentContract, WNFT)
  await runUpgradeTest(version, upgraded)

  console.log(' > WNFT upgraded')
  process.stdout.write(upgraded.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
