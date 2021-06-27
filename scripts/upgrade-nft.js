const { ethers, network, upgrades } = require('hardhat')
const { getNFTContractAddress, runUpgradeTest, getCurrentVersion, txOptions } = require('../test/utils')

async function main () {
  const NFToken = await ethers.getContractFactory('NFToken')
  const currentContract = getNFTContractAddress(network.name)
  const attachedContract = NFToken.attach(currentContract)
  // Current contract
  const id = await attachedContract.nextTokenId(txOptions)
  const version = await getCurrentVersion(attachedContract)
  console.log('>> Current version:', version);

  // Upgraded contract
  const upgradedNFT = await upgrades.upgradeProxy(currentContract, NFToken)
  await runUpgradeTest(attachedContract, {id, version})

  console.log(' > NFToken upgraded')
  process.stdout.write(upgradedNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
