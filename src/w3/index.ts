import { ChainId, Config, Kovan, Rinkeby } from '@usedapp/core';
import { NetworkSetting } from '@w3/types';
// import { RINKEBY_ALCHEMY_API_KEY } from '@w3/CONSTANTS'
import { ethers } from 'ethers';

export const supportedChains = [
  // ChainId.Mainnet,
  // ChainId.Goerli,
  // ChainId.Kovan,
  ChainId.Rinkeby,
  // ChainId.Ropsten,
  // ChainId.BSC,
  // ChainId.xDai,
];

export const config: Config = {
  networks: [Rinkeby, Kovan],
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    // [ChainId.Rinkeby]: `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_ALCHEMY_API_KEY}`
  },
};

export function getDefaultProvider(chain: ChainId = ChainId.Rinkeby): ethers.providers.Web3Provider {
  const network = ethers.providers.getNetwork(chain);
  return new ethers.providers.Web3Provider((window as any).ethereum, network);
}

/**
 * Return network settings based on params
 * @param {ChainId} networkName network to retrieve contract
 * @return {NetworkSetting}
 */
export function getNetworkSettings(networkName: ChainId = ChainId.Rinkeby): NetworkSetting {
  const contractAddressCollection: { [key: number]: NetworkSetting } = {
    [ChainId.Kovan]: {
      CHAIN_NAME: 'KOVAN',
      PURCHASE_GATEWAY: process.env.KOVAN_CONTRACT_PURCHASE_GATEWAY ?? '',
      NFT: process.env.KOVAN_CONTRACT_NFT ?? '',
      WVC: process.env.KOVAN_CONTRACT_FT ?? '',
    },
    [ChainId.Rinkeby]: {
      CHAIN_NAME: 'RINKEBY',
      PURCHASE_GATEWAY: process.env.RINKEBY_CONTRACT_PURCHASE_GATEWAY ?? '',
      NFT: process.env.RINKEBY_CONTRACT_NFT ?? '',
      WVC: process.env.RINKEBY_CONTRACT_FT ?? '',

    },
  };

  // return default rikeby if not supported chain
  if (networkName === undefined || !(networkName in contractAddressCollection)) {
    return contractAddressCollection[ChainId.Rinkeby];
  }

  return contractAddressCollection[networkName];
}
