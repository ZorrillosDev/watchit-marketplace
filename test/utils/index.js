const bs58 = require('bs58')
const { expect } = require('chai')

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

async function getCurrentVersion (contract) {
  const hasVersionMethod = contract.version !== undefined
  return hasVersionMethod ? await contract.version() : 0
}

module.exports = {
  bs58toHex,
  hexToBs58,
  getFTContractAddress,
  getNFTContractAddress,
  getCurrentVersion
}

describe('Base 58 <--> Hex Conversion', function () {
  const str = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRST'

  it('"round trips" from bs58 to hex and back', async () => {
    const hex = bs58toHex(str)
    const b58 = hexToBs58(hex)

    expect(b58).to.equal(str)
  })
})
