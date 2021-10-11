const crypto = require('crypto')
const bs58 = require('bs58')
const CID = require('cids')
const multihashing = require('multihashing-async')

const randomCID = async () => {
  const randomHash = await multihashing(crypto.randomBytes(Math.random() * 100000), 'sha2-256')
  return (new CID(0, 'dag-pb', Buffer.from(randomHash)))
}

function getContractAddress (networkName) {

  /**
   * @param {string} networkName network to retrieve contract
   * @type {{kovan: {WVC, NFT, PO}, rinkeby: {WVC, NFT, PO}, goerli: {WVC, NFT, PO: string}, ropsten: {WVC, NFT, PO: string}}}
   * @return {object} {WVC, NFT, PO} PO = Purchase Gateway
   */

  const contractAddressCollection = {
    'goerli': {
      PO: process.env.GOERLI_CONTRACT_PURCHASE_GATEWAY,
      NFT: process.env.GOERLI_CONTRACT_NFT,
      WVC: process.env.GOERLI_CONTRACT_FT
    },
    'kovan': {
      PO: process.env.KOVAN_CONTRACT_PURCHASE_GATEWAY,
      NFT: process.env.KOVAN_CONTRACT_NFT,
      WVC: process.env.KOVAN_CONTRACT_FT
    },
    'rinkeby': {
      PO: process.env.RINKEBY_CONTRACT_PURCHASE_GATEWAY,
      NFT: process.env.RINKEBY_CONTRACT_NFT,
      WVC: process.env.RINKEBY_CONTRACT_FT
    },
    'ropsten': {
      PO: process.env.ROPSTEN_CONTRACT_PURCHASE_GATEWAY,
      NFT: process.env.ROPSTEN_CONTRACT_NFT,
      WVC: process.env.ROPSTEN_CONTRACT_FT
    }
  }
  if (networkName in contractAddressCollection)
    return contractAddressCollection[networkName]

  return {
    PO: process.env.LOCALHOST_CONTRACT_PURCHASE_GATEWAY,
    NFT: process.env.LOCALHOST_CONTRACT_NFT,
    WVC: process.env.LOCALHOST_CONTRACT_FT
  }
}


const bs58toHex = (b58) => `0x${Buffer.from(bs58.decode(b58).slice(2)).toString('hex')}`
const hexToBs58 = (hex) => bs58.encode(Buffer.from(`1220${hex.slice(2)}`, 'hex'))

async function runUpgradeTest (version, upgraded) {
  const upgrade = await upgraded.upgrade()
  await upgrade.wait() // wait for tx
  const newVersion = await upgraded.version()

  if (+version === +newVersion) {
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
  getContractAddress,
  randomCID
}
