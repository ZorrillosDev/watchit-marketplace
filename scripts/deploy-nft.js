const { ethers, network, upgrades } = require('hardhat')
const { writeInEnv } = require('./utils')

async function main () {
  const WNFT = await ethers.getContractFactory('WNFT')
  const wnft = await upgrades.deployProxy(WNFT)
  const currentNetwork = network.name.toUpperCase()
  writeInEnv({ [`${currentNetwork}_CONTRACT_NFT`]: wnft.address })

  process.stdout.write(
    `${network.name}:NFT:${wnft.address}\n`
  )
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
