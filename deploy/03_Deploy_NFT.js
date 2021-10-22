const { writeInEnv, getNetworkNameByChainId } = require('../utils')

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
  const wnft = await deploy('WNFT', {
    contract: 'WNFT',
    from: deployer,
    log: true,
    proxy: {
      owner: deployer,
      // https://hardhat.org/plugins/hardhat-deploy.html#deploying-and-upgrading-proxies
      execute: {
        init: {
          methodName: 'initialize',
          args: []
        },
        onUpgrade: {
          methodName: 'upgrade',
          args: []
        }
      }
    }
  })

  log('Run NFT contract with following command:')
  log('Contract ' + wnft.address + ' --network ' + networkFromChainId + ' by: ' + deployer)
  log('----------------------------------------------------')
  if (!process.env.CI) {
    writeInEnv({ [`${networkFromChainId.toUpperCase()}_CONTRACT_NFT`]: wnft.address })
  }
}

module.exports.tags = ['all', 'contracts', 'main']
