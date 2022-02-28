import { ChainId, Config } from '@usedapp/core'
import { NetworkSetting } from '@w3/types'
import { RINKEBY_ALCHEMY_API_KEY } from '@w3/CONSTANTS'

export const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_ALCHEMY_API_KEY}`
  }
}

export function getNetworkSettings (networkName: ChainId | undefined): NetworkSetting {
  /**
     * @param {ChainId} networkName network to retrieve contract
     * @return {NetworkSetting}
     */

  const contractAddressCollection: { [key: number]: NetworkSetting } = {
    [ChainId.Kovan]: {
      PURCHASE_GATEWAY: process.env.KOVAN_CONTRACT_PURCHASE_GATEWAY ?? '',
      NFT: process.env.KOVAN_CONTRACT_NFT ?? '',
      WVC: process.env.KOVAN_CONTRACT_FT ?? ''
    },
    [ChainId.Rinkeby]: {
      PURCHASE_GATEWAY: process.env.RINKEBY_CONTRACT_PURCHASE_GATEWAY ?? '',
      NFT: process.env.RINKEBY_CONTRACT_NFT ?? '',
      WVC: process.env.RINKEBY_CONTRACT_FT ?? ''

    }
  }

  // return default rikeby if not supported chain
  if (networkName === undefined || !(networkName in contractAddressCollection))
    return contractAddressCollection[ChainId.Rinkeby]

  return contractAddressCollection[networkName]
}
