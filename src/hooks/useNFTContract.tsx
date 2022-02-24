import { useContractCall, useEthers } from '@usedapp/core'
import { getNetworkSettings } from '@src/w3'
import { WNFTAbi } from '@w3/CONSTANTS'
import { BigNumber } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useEffect, useState } from 'react'


export function useNFTHolderOf (tokenId: string | undefined): string | undefined {

  const { chainId } = useEthers()
  const networkSettings = getNetworkSettings(chainId)

  const [holder] = useContractCall({
    abi: WNFTAbi,
    address: networkSettings.NFT,
    method: 'holderOf',
    args: [BigNumber.from(tokenId)]
  }) ?? []

  return holder
}

export function useNFTContract (): Contract {
  const { chainId } = useEthers()
  const networkSettings = getNetworkSettings(chainId)
  return new Contract(networkSettings.NFT, WNFTAbi)
}

export function useListenForEvent (contract: Contract, event: string): object | undefined {
  const [events, setEvent] = useState()

  useEffect(() => {
    contract.on(event, (...params: any): void => setEvent(params))
    return () => {
      contract.removeAllListeners(event)
    }
  }, [event])

  return events
}
