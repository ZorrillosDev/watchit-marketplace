const { ethers, upgrades } = require('hardhat')

async function main () {
  const WatchItERC11155 = await ethers.getContractFactory('WatchItERC1155')
  const WATCHIT = await upgrades.deployProxy(WatchItERC11155)
  process.stdout.write(WATCHIT.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
