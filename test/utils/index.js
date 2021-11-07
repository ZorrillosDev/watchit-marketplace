const { parse, stringify } = require('envfile')
const fs = require('fs')
const path = require('path')
const root = path.resolve(process.cwd())
const sourcePath = path.join(root, '.env')

const crypto = require('crypto')
const bs58 = require('bs58')
const CID = require('cids')
const web3 = require('web3')
const multihashing = require('multihashing-async')

const randomCID = async () => {
  const randomHash = await multihashing(crypto.randomBytes(Math.random() * 100000), 'sha2-256')
  return (new CID(0, 'dag-pb', Buffer.from(randomHash)))
}

function getNetworkNameByChainId (chainId) {
  const chainIdCollection = {
    42: 'kovan',
    4: 'rinkeby',
    5: 'goerli'
    // TODO add ropsten here
  }

  if (chainId in chainIdCollection) { return chainIdCollection[chainId] }
  return 'localhost'
}

function getNetworkSettings (networkName) {
  /**
   * @param {string} networkName network to retrieve contract
   * @type {{kovan: {WVC, NFT, PO}, rinkeby: {WVC, NFT, PO}, goerli: {WVC, NFT, PO: string}, ropsten: {WVC, NFT, PO: string}}}
   * @return {object} {WVC, NFT, PO} PO = Purchase Gateway
   */

  const contractAddressCollection = {
    kovan: {
      PURCHASE_GATEWAY: process.env.KOVAN_CONTRACT_PURCHASE_GATEWAY,
      NFT: process.env.KOVAN_CONTRACT_NFT,
      WVC: process.env.KOVAN_CONTRACT_FT,
      jobId: 'd5270d1c311941d0b08bead21fea7747',
      fee: '100000000000000000',
      oracle: '0xc57b33452b4f7bb189bb5afae9cc4aba1f7a4fd8',
      linkToken: '0xa36085F69e2889c224210F603D836748e7dC0088'
    },
    rinkeby: {
      PURCHASE_GATEWAY: process.env.RINKEBY_CONTRACT_PURCHASE_GATEWAY,
      NFT: process.env.RINKEBY_CONTRACT_NFT,
      WVC: process.env.RINKEBY_CONTRACT_FT,
      fee: '100000000000000000',
      oracle: '0xc57b33452b4f7bb189bb5afae9cc4aba1f7a4fd8',
      jobId: '6b88e0402e5d415eb946e528b8e0c7ba',
      linkToken: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
    },
    ropsten: {
      PURCHASE_GATEWAY: process.env.ROPSTEN_CONTRACT_PURCHASE_GATEWAY,
      NFT: process.env.ROPSTEN_CONTRACT_NFT,
      WVC: process.env.ROPSTEN_CONTRACT_FT
    }
  }
  if (networkName in contractAddressCollection) { return contractAddressCollection[networkName] }

  return {
    PURCHASE_GATEWAY: process.env.LOCALHOST_CONTRACT_PURCHASE_GATEWAY,
    NFT: process.env.LOCALHOST_CONTRACT_NFT,
    WVC: process.env.LOCALHOST_CONTRACT_FT,
    jobId: '29fa9aa13bf1468788b7cc4a500a45b8',
    fee: '100000000000000000',
    oracle: process.env.LOCALHOST_CHAINLINK_ORACLE,
    linkToken: process.env.LOCALHOST_CHAINLINK_LINK
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

const autoFundCheck = async (contractAddr, networkName, linkTokenAddress, additionalMessage) => {
  console.log('Checking to see if contract can be auto-funded with LINK:')
  const amount = '1000000000000000000'
  // check to see if user has enough LINK
  const accounts = await ethers.getSigners()
  const signer = accounts[0]
  const LinkToken = await ethers.getContractFactory('LinkToken')
  const linkTokenContract = new ethers.Contract(linkTokenAddress, LinkToken.interface, signer)
  const balanceHex = await linkTokenContract.balanceOf(signer.address)
  const balance = await web3.utils.toBN(balanceHex._hex).toString()
  const contractBalanceHex = await linkTokenContract.balanceOf(contractAddr)
  const contractBalance = await web3.utils.toBN(contractBalanceHex._hex).toString()
  if (balance > amount && amount > 0 && contractBalance < amount) {
    // user has enough LINK to auto-fund
    // and the contract isn't already funded
    return true
  } else { // user doesn't have enough LINK, print a warning
    console.log('Account doesn\'t have enough LINK to fund contracts, or you\'re deploying to a network where auto funding isnt\' done by default')
    console.log('Please obtain LINK via the faucet at https://' + networkName + '.chain.link/, then run the following command to fund contract with LINK:')
    console.log('npx hardhat fund-link --contract ' + contractAddr + ' --network ' + networkName + additionalMessage)
    return false
  }
}

function writeInEnv (newData) {
  /**
   * Write or replace vars in .env
   * @param {object}
   * @type {Buffer}
   */
  const currentEnvData = fs.readFileSync(sourcePath)
  const parsedEnv = parse(currentEnvData)
  const mergedData = Object.assign({}, parsedEnv, newData)
  const stringData = stringify(mergedData)
  fs.writeFileSync(sourcePath, stringData)
}

module.exports = {
  bs58toHex,
  hexToBs58,
  autoFundCheck,
  runUpgradeTest,
  getNetworkSettings,
  getNetworkNameByChainId,
  randomCID,
  writeInEnv
}
