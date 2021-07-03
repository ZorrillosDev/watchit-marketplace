const { ethers, network, upgrades } = require('hardhat')

async function main () {
  const WNFT = await ethers.getContractFactory('WNFT')
  const wnft = await upgrades.deployProxy(WNFT)
  const localNetwork = network.name === 'localhost'

  process.stdout.write(
    localNetwork
      ? wnft.address
      : `${network.name}:NFT:${wnft.address}\n`
  )
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
