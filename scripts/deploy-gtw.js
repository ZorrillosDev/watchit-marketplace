const { ethers, network } = require('hardhat')
const { writeInEnv } = require('./utils')

async function main () {
  const PurchaseGateway = await ethers.getContractFactory('PurchaseGateway')
  const purchaseGatewayContract = await PurchaseGateway.deploy();
  const currentNetwork = network.name.toUpperCase()
  if (!process.env.CI) {
    // Write in env if not CI workflow env
    writeInEnv({ [`${currentNetwork}_CONTRACT_FT`]: purchaseGatewayContract.address })
  }

  console.log(`${network.name}:PC:${purchaseGatewayContract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
