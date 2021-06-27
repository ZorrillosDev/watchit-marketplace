/* global task, ethers */

require('dotenv').config()

require('@nomiclabs/hardhat-waffle')
require('hardhat-gas-reporter')
require('solidity-coverage')
require('hardhat-contract-sizer')
require('@openzeppelin/hardhat-upgrades')

const GOERLI_ALCHEMY_API_KEY = process.env.GOERLI_ALCHEMY_API_KEY
const KOVAN_ALCHEMY_API_KEY = process.env.KOVAN_ALCHEMY_API_KEY
const RINKEBY_ALCHEMY_API_KEY = process.env.RINKEBY_ALCHEMY_API_KEY
const ROPSTEN_ALCHEMY_API_KEY = process.env.ROPSTEN_ALCHEMY_API_KEY
const OWNER_KEY = process.env.OWNER_KEY
const SECONDARY_KEY = process.env.SECONDARY_KEY

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
    version: '0.8.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
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
      mining: {
        auto: false,
        interval: [500, 2000]
      },
      // gas: 2000000,
      // gasPrice: 1000000000,
      // blockGasLimit: 8000000,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true
    }
  }
}

if (ROPSTEN_ALCHEMY_API_KEY && OWNER_KEY && SECONDARY_KEY) {
  module.exports.networks = {
    ...{
      ropsten: {
        url: `https://eth-ropsten.alchemyapi.io/v2/${ROPSTEN_ALCHEMY_API_KEY}`,
        from: `0x${OWNER_KEY}`,
        accounts: [`0x${OWNER_KEY}`, `0x${SECONDARY_KEY}`],
        gas: 8000000,
        timeout: 60 * 1000
      },
      ...module.exports.networks
    }
  }
}

if (RINKEBY_ALCHEMY_API_KEY && OWNER_KEY && SECONDARY_KEY) {
  module.exports.networks = {
    ...{
      rinkeby: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_ALCHEMY_API_KEY}`,
        from: `0x${OWNER_KEY}`,
        accounts: [`0x${OWNER_KEY}`, `0x${SECONDARY_KEY}`],
        gas: 8000000,
        timeout: 60 * 1000
      },
      ...module.exports.networks
    }
  }
}

if (GOERLI_ALCHEMY_API_KEY && OWNER_KEY && SECONDARY_KEY) {
  module.exports.networks = {
    ...{
      goerli: {
        url: `https://eth-goerli.alchemyapi.io/v2/${GOERLI_ALCHEMY_API_KEY}`,
        from: `0x${OWNER_KEY}`,
        accounts: [`0x${OWNER_KEY}`, `0x${SECONDARY_KEY}`],
        gas: 8000000,
        timeout: 60 * 1000
      },
      ...module.exports.networks
    }
  }
}

if (KOVAN_ALCHEMY_API_KEY && OWNER_KEY && SECONDARY_KEY) {
  module.exports.networks = {
    ...{
      kovan: {
        url: `https://eth-kovan.alchemyapi.io/v2/${KOVAN_ALCHEMY_API_KEY}`,
        from: `0x${OWNER_KEY}`,
        accounts: [`0x${OWNER_KEY}`, `0x${SECONDARY_KEY}`],
        gas: 8000000,
        timeout: 60 * 1000
      },
      ...module.exports.networks
    }
  }
}
