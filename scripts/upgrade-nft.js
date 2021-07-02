const { ethers, network, upgrades } = require('hardhat')
const { getNFTContractAddress, runUpgradeTest, getCurrentVersion, txOptions } = require('../test/utils') // eslint-disable-line

async function main () {
  const WatchitERC11155 = await ethers.getContractFactory('WatchitERC11155')
  const currentContract = getNFTContractAddress(network.name)
  const attachedContract = WatchitERC11155.attach(currentContract)
  // Current contract
  const id = await attachedContract.nextTokenId(txOptions)
  const version = await getCurrentVersion(attachedContract)
  console.log('>> Current version:', version)

  // Upgraded contract
  const upgradedNFT = await upgrades.upgradeProxy(currentContract, WatchitERC11155)
  const newTokenId = await upgradedNFT.nextTokenId(txOptions)

  // it('should retrieve a NFT previously minted', async function () {
  if (id.toString() !== newTokenId.toString()) {
    console.error('expected previously `nextTokenId` equal to upgraded contract state ')
    process.exit(1)
  } else {
    console.log(' > nextTokenId state passed')
  }

  // it('should allow call added method `upgrade`', async function () {
  const upgrade = await upgradedNFT.upgrade(txOptions)
  await upgrade.wait() // wait for tx
  const newVersion = await upgradedNFT.version(txOptions)
  if (+version + 1 !== +newVersion) {
    console.error('expected version to increment')
    process.exit(1)
  } else {
    console.log(' > version state passed')
  }

  console.log(' > WatchitERC11155 upgraded')
  process.stdout.write(upgradedNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
