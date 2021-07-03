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

async function getCurrentVersion (contract) {
  const hasVersionMethod = contract.version !== undefined
  return hasVersionMethod ? await contract.version() : 0
}

module.exports = {
  bs58toHex,
  hexToBs58,
  getFTContractAddress,
  getNFTContractAddress,
  getCurrentVersion,
  randomCID
}

describe('Base 58 <--> Hex Conversion', function () {
  const str = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRST'

  it('"round trips" from bs58 to hex and back', async () => {
    const hex = bs58toHex(str)
    const b58 = hexToBs58(hex)

    expect(b58).to.equal(str)
  })
})

describe('Random CIDs', function () {
  const volume = 500
  const existingCIDs = new Set()

  it(`generates ${volume} random valid CIDs`, async () => {
    for(let i = 0; i < volume; i++) {
      const cid = await randomCID()

      if (existingCIDs.has(cid)) {
        expect.fail('Duplicate CID detected??')
      }

      existingCIDs.add(cid)
      expect(() => CID.validateCID(cid)).to.not.throw()
    }
  })
})
