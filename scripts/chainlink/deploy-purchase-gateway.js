const { ethers, network } = require('hardhat')
const { writeInEnv } = require('../utils')

async function main () {
  const currentNetwork = network.name.toUpperCase()
  const jobId = web3.utils.toHex(process.env[`${currentNetwork}_CHAINLINK_JOBID`])
  const oracle = web3.utils.toHex(process.env[`${currentNetwork}_CHAINLINK_ORACLE`])
  const link = web3.utils.toHex(process.env[`${currentNetwork}_CHAINLINK_LINK`])
  const fee =  0.1 * (10 ** 18)

  const PurchaseGateway = await ethers.getContractFactory('PurchaseGateway')
  const purchaseGatewayContract = await PurchaseGateway.deploy(jobId, oracle, link, fee.toString())

  if (!process.env.CI) {
    // Write in env if not CI workflow env
    writeInEnv({ [`${currentNetwork}_CONTRACT_PURCHASE_GATEWAY`]: purchaseGatewayContract.address })
  }

  console.log(`${network.name}:PURCHASE_GATEWAY:${purchaseGatewayContract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
