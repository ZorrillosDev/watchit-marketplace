const { ethers,network, upgrades } = require('hardhat')

async function main () {
  const WatchItERC11155 = await ethers.getContractFactory('WatchItERC1155')
  const WATCHIT = await upgrades.deployProxy(WatchItERC11155)
  const localNetwork = network.name ==='localhost';

  process.stdout.write(
    localNetwork ?
      WATCHIT.address :
      `${network.name}:NFT:${WATCHIT.address}\n`
  )
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
