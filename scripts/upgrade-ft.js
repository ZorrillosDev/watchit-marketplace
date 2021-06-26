const { ethers, network, upgrades } = require('hardhat')
const { getFTContractAddress, runUpgradeTest, getCurrentVersion, txOptions } = require('../test/utils')

async function main () {
  const FToken = await ethers.getContractFactory('FToken')
  const currentContract = getFTContractAddress(network.name)
  const attachedContract = FToken.attach(currentContract)
  // Current contract
  const id = await attachedContract.nextTokenId(txOptions)
  const version = await getCurrentVersion(attachedContract)
  console.log('>> Current version:', version);

  // Upgraded contract
  const upgradedFT = await upgrades.upgradeProxy(currentContract, FToken)
  await runUpgradeTest(attachedContract, {id, version})

  console.log(' > FToken upgraded')
  process.stdout.write(upgradedFT.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
