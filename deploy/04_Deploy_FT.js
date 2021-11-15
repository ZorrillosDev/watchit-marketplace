const { writeInEnv, getNetworkNameByChainId } = require('../test/utils')

module.exports = async ({
  getNamedAccounts,
  deployments
}) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  // set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)
  const networkFromChainId = getNetworkNameByChainId(chainId)
  const ft = await deploy('WVC', {
    contract: 'WVC',
    from: deployer,
    log: true
  })

  log('Run FT contract with following command:')
  log('Contract ' + ft.address + ' --network ' + networkFromChainId + ' by: ' + deployer)
  log('----------------------------------------------------')
  if (!process.env.CI) {
    writeInEnv({ [`${networkFromChainId.toUpperCase()}_CONTRACT_FT`]: ft.address })
  }
}

module.exports.tags = ['all', 'contracts', 'main']
