const { ethers, network, upgrades } = require('hardhat')
const { writeInEnv } = require('./utils')

async function main () {
  const WNFT = await ethers.getContractFactory('WNFT')
  const wnft = await upgrades.deployProxy(WNFT)
  const currentNetwork = network.name.toUpperCase()
  if (!process.env.CI) {
    // Write in env if not CI workflow env
    writeInEnv({ [`${currentNetwork}_CONTRACT_NFT`]: wnft.address })
  }

  console.log(`${network.name}:NFT:${wnft.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
