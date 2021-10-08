const { ethers, network } = require('hardhat')
const { writeInEnv } = require('./utils')

async function main () {

  const jobId = ethers.utils.formatBytes32String(process.env.RINKEBY_CHAINLINK_JOBID)
  const PurchaseGateway = await ethers.getContractFactory('PurchaseGateway')
  const purchaseGatewayContract = await PurchaseGateway.deploy(jobId);
  const currentNetwork = network.name.toUpperCase()
  if (!process.env.CI) {
    // Write in env if not CI workflow env
    writeInEnv({ [`${currentNetwork}_CONTRACT_GTW`]: purchaseGatewayContract.address })
  }

  console.log(`${network.name}:PC:${purchaseGatewayContract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
