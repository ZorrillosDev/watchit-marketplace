/* global task, ethers */

require('dotenv').config()

require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-ethers')
require('hardhat-gas-reporter')
require('solidity-coverage')
require('hardhat-abi-exporter')
require('hardhat-contract-sizer')
require('@openzeppelin/hardhat-upgrades')
require('@nomiclabs/hardhat-web3')
require('@appliedblockchain/chainlink-plugins-api-consumer')
require('@appliedblockchain/chainlink-plugins-price-consumer')
require('@appliedblockchain/chainlink-plugins-fund-link')
require('hardhat-deploy')
require('./tasks/accounts')
require('./tasks/balance')
require('./tasks/block-number')

const KOVAN_ALCHEMY_API_KEY = process.env.KOVAN_ALCHEMY_API_KEY
const RINKEBY_ALCHEMY_API_KEY = process.env.RINKEBY_ALCHEMY_API_KEY
const ROPSTEN_ALCHEMY_API_KEY = process.env.ROPSTEN_ALCHEMY_API_KEY
const HARDHAT_AUTOMINE = process.env.HARDHAT_AUTOMINE
const MAINNET_DEV_ALCHEMY_API_KEY = process.env.MAINNET_DEV_ALCHEMY_API_KEY
const SECONDARY_KEY = process.env.SECONDARY_KEY
const OWNER_KEY = process.env.OWNER_KEY

if (HARDHAT_AUTOMINE === 'true' && !process.env.CI) {
  console.warn('WARN: HARDHAT_AUTOMINE is on. This should only be in CI or selectively on local')
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  abiExporter: {
    path: './abi',
    clear: false,
    flat: true
    // only: [],
    // except: []
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0 // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    client: {
      default: 1
    }
  },
  solidity: {
    compilers: [
      { version: '0.4.0' },
      { version: '0.4.24' },
      { version: '0.6.0' },
      { version: '0.6.6' },
      { version: '0.8.6' }
    ]
  },
  gasReporter: {
    currency: 'EUR',
    showTimeSpent: true,
    coinmarketcap: '6ffc3d5b-865e-482d-a05c-144ba7fe319e'
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  networks: {
    hardhat: {
      mining: {
        auto: true
        // interval: (HARDHAT_AUTOMINE === 'true') ? 100 : [500, 2000]
      },
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${MAINNET_DEV_ALCHEMY_API_KEY}`
      },
      throwOnTransactionFailures: true,
      throwOnCallFailures: true
    },
    localhost: {
    },
    ...ROPSTEN_ALCHEMY_API_KEY && {
      ropsten: {
        url: `https://eth-ropsten.alchemyapi.io/v2/${ROPSTEN_ALCHEMY_API_KEY}`,
        from: `0x${OWNER_KEY}`,
        accounts: [`0x${OWNER_KEY}`, `0x${SECONDARY_KEY}`],
        saveDeployments: true,
        timeout: 60 * 1000
      }
    },
    ...RINKEBY_ALCHEMY_API_KEY && {
      rinkeby: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_ALCHEMY_API_KEY}`,
        from: `0x${OWNER_KEY}`,
        accounts: [`0x${OWNER_KEY}`, `0x${SECONDARY_KEY}`],
        saveDeployments: true,
        timeout: 60 * 1000
      }
    },
    ...KOVAN_ALCHEMY_API_KEY && {
      kovan: {
        url: `https://eth-kovan.alchemyapi.io/v2/${KOVAN_ALCHEMY_API_KEY}`,
        from: `0x${OWNER_KEY}`,
        saveDeployments: true,
        accounts: [`0x${OWNER_KEY}`, `0x${SECONDARY_KEY}`],
        timeout: 60 * 1000
      }
    }
  },
  mocha: {
    timeout: 100000
  }
}
