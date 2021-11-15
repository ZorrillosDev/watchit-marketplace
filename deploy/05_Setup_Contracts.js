const { autoFundCheck, getNetworkNameByChainId, getNetworkSettings } = require('../test/utils')
const { ethers } = require('hardhat')

module.exports = async ({
  deployments
}) => {
  return false// temp omit
  let linkToken
  const { log, get } = deployments
  const chainId = await getChainId()
  let linkTokenAddress
  let additionalMessage = ''
  // set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)
  const networkFromChainId = getNetworkNameByChainId(chainId)
  const networkConfig = getNetworkSettings(networkFromChainId)
  if (!networkConfig || !networkConfig.oracle) return

  if (chainId === '31337') {
    linkToken = await get('LinkToken')
    linkTokenAddress = linkToken.address
    additionalMessage = ' --linkaddress ' + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig.linkToken
  }

  // Try Auto-fund APIConsumer contract with LINK
  const PurchaseGateway = await deployments.get('PurchaseGateway')
  const purchaseGateway = await ethers.getContractAt('PurchaseGateway', PurchaseGateway.address)

  if (await autoFundCheck(purchaseGateway.address, networkFromChainId, linkTokenAddress, additionalMessage)) {
    await hre.run('fund-link', { contract: purchaseGateway.address, linkaddress: linkTokenAddress })
  }

  log('----------------------------------------------------')
}
module.exports.tags = ['all']
