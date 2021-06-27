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

async function getCurrentVersion (contract) {
  const hasVersionMethod = contract.version !== undefined
  return hasVersionMethod ? await contract.version() : 0
}

module.exports = {
  isTestnet,
  getFTContractAddress,
  getNFTContractAddress,
  getCurrentVersion,
  txOptions
}
