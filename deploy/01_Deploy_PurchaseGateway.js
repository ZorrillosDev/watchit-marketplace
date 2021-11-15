const { writeInEnv, getNetworkNameByChainId, getNetworkSettings } = require('../test/utils')

module.exports = async ({
  getNamedAccounts,
  deployments
}) => {
  return false // omit
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress
  let oracle

  // set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)

  const networkFromChainId = getNetworkNameByChainId(chainId)
  const networkConfig = getNetworkSettings(networkFromChainId)
  if (!networkConfig || !networkConfig.oracle) return

  if (chainId === 31337) {
    return
  }

  linkTokenAddress = networkConfig.linkToken
  oracle = networkConfig.oracle
  const jobId = networkConfig.jobId
  const fee = networkConfig.fee

  const purchaseGateway = await deploy('PurchaseGateway', {
    from: deployer,
    args: [oracle, jobId, fee, linkTokenAddress],
    log: true
  })

  log('Run Purchase Gateway contract with following command:')
  log('Contract address:' + purchaseGateway.address + ' deployed in network: ' + networkFromChainId + ' by: ' + deployer)
  log('----------------------------------------------------')

  if (!process.env.CI) {
    writeInEnv({ [`${networkFromChainId.toUpperCase()}_PG`]: purchaseGateway.address })
  }
}

module.exports.tags = ['all', 'api', 'main']
