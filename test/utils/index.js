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


async function runUpgradeTest(v1, v2){
  const version = await getCurrentVersion(v1)
  console.log('>> Current version:', version);
  const currentTokenId = await v1.nextTokenId()
  const newTokenId = await v2.nextTokenId()

  //it('should retrieve a NFT previously minted', async function () {
  if (currentTokenId.toString() !== newTokenId.toString()){
    console.error('expected previously `nextTokenId` equal to upgraded contract state ')
    process.exit(1)
  }else {
    console.log(' > nextTokenId state passed')
  }

  // it('should allow call added method `upgrade`', async function () {
  const upgrade = await v2.upgrade()
  await upgrade.wait() // wait for tx
  const newVersion = await v2.version()
  if (+version.toString() === +newVersion.toString()){
    console.error('expected version increment ')
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
  runUpgradeTest
}
