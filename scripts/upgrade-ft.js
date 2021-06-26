const { ethers, network, upgrades } = require('hardhat')
const { getFTContractAddress, runUpgradeTest } = require('../test/utils')

async function main () {
  const FToken = await ethers.getContractFactory('FToken')
  const currentContract = getFTContractAddress(network.name)
  const attachedContract = FToken.attach(currentContract)

  // Upgraded contract
  const upgradedFT = await upgrades.upgradeProxy(currentContract, FToken)
  await runUpgradeTest(attachedContract, upgradedFT)

  console.log(' > FToken upgraded')
  process.stdout.write(upgradedFT.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
