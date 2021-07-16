const crypto = require('crypto')

const bs58 = require('bs58')
const { expect } = require('chai')
const CID = require('cids')
const multihashing = require('multihashing-async')

const randomCID = async () => {
  const randomHash = await multihashing(crypto.randomBytes(Math.random() * 100000), 'sha2-256')
  return (new CID(0, 'dag-pb', Buffer.from(randomHash)))
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

const bs58toHex = (b58) => `0x${Buffer.from(bs58.decode(b58).slice(2)).toString('hex')}`
const hexToBs58 = (hex) => bs58.encode(Buffer.from(`1220${hex.slice(2)}`, 'hex'))

async function runUpgradeTest (version, upgraded) {
  const upgrade = await upgraded.upgrade()
  await upgrade.wait() // wait for tx
  const newVersion = await upgraded.version()
  if (+version + 1 === +newVersion) {
    console.error('expected version to increment')
    process.exit(1)
  } else {
    console.log(' > version state passed')
  }
}

module.exports = {
  bs58toHex,
  hexToBs58,
  runUpgradeTest,
  getFTContractAddress,
  getNFTContractAddress,
  randomCID
}
