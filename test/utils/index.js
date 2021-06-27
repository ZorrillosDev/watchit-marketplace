const txOptions = {
  gasLimit: 8000000,
  gasPrice: 1000000000
}

function isTestnet (networkName) {
  return (networkName === 'rinkeby') ||
    (networkName === 'ropsten') ||
    (networkName === 'goerli') ||
    (networkName === 'kovan')
}

function getFTContractAddress (networkName) {
  if (networkName === 'goerli') {
    return process.env.GOERLI_CONTRACT_FT
  }

  if (networkName === 'kovan') {
    return process.env.KOVAN_CONTRACT_FT
  }

  if (networkName === 'rinkeby') {
    return process.env.RINKEBY_CONTRACT_FT
  }

  if (networkName === 'ropsten') {
    return process.env.ROPSTEN_CONTRACT_FT
  }

  return process.env.LOCALHOST_CONTRACT_FT
}

function getNFTContractAddress (networkName) {
  if (networkName === 'goerli') {
    return process.env.GOERLI_CONTRACT_NFT
  }

  if (networkName === 'kovan') {
    return process.env.KOVAN_CONTRACT_NFT
  }

  if (networkName === 'rinkeby') {
    return process.env.RINKEBY_CONTRACT_NFT
  }

  if (networkName === 'ropsten') {
    return process.env.ROPSTEN_CONTRACT_NFT
  }

  return process.env.LOCALHOST_CONTRACT_NFT
}


async function getCurrentVersion(contract){
  const hasVersionMethod = contract.version !== undefined;
  return hasVersionMethod ? await contract.version() : 0;
}


async function runUpgradeTest(v2, prev){

  const newTokenId = await v2.nextTokenId(txOptions)
  //it('should retrieve a NFT previously minted', async function () {
  if (prev.id.toString() !== newTokenId.toString()){
    console.error('expected previously `nextTokenId` equal to upgraded contract state ')
    process.exit(1)
  }else {
    console.log(' > nextTokenId state passed')
  }

  // it('should allow call added method `upgrade`', async function () {
  const upgrade = await v2.upgrade(txOptions)
  await upgrade.wait() // wait for tx
  const newVersion = await v2.version(txOptions)
  if (+prev.version +1 !== +newVersion){
    console.error('expected version to increment')
    process.exit(1)
  } else {
    console.log(' > version state passed')
  }
}

module.exports = {
  isTestnet,
  getFTContractAddress,
  getNFTContractAddress,
  getCurrentVersion,
  txOptions,
  runUpgradeTest
}
