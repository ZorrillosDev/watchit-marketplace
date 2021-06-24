/* global task, ethers */

require('dotenv').config()

require('@nomiclabs/hardhat-waffle')
require('hardhat-gas-reporter')
require('solidity-coverage')
require('hardhat-contract-sizer')
require('@openzeppelin/hardhat-upgrades')

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const ROPSTEN_OWNER_KEY = process.env.ROPSTEN_OWNER_KEY
const ROPSTEN_SECONDARY_KEY = process.env.ROPSTEN_ACCOUNT1_KEY
const TESTNET = process.env.TESTNET

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  gasReporter: {
    currency: 'EUR',
    showTimeSpent: true,
    coinmarketcap: '6ffc3d5b-865e-482d-a05c-144ba7fe319e'
  },
  networks: {
    hardhat: {
      gas: 2000000,
      gasPrice: 1000000000,
      blockGasLimit: 8000000,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true
    }
  }
}

if (TESTNET) {
  module.exports.networks = {
    ...{
      ropsten: {
        url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
        from: `0x${ROPSTEN_OWNER_KEY}`,
        accounts: [`0x${ROPSTEN_OWNER_KEY}`, `0x${ROPSTEN_SECONDARY_KEY}`],
        gas: 8000000,
        timeout: 60 * 1000
      },
      rinkeby: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
        from: `0x${ROPSTEN_OWNER_KEY}`,
        accounts: [`0x${ROPSTEN_OWNER_KEY}`, `0x${ROPSTEN_SECONDARY_KEY}`],
        gas: 8000000,
        timeout: 60 * 1000
      }
    },
    ...module.exports.networks
  }
}
