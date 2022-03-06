import { useCall } from '@usedapp/core'
import { getNetworkSettings } from '@src/w3'
import { WNFT } from '@w3/CONSTANTS'
import { BigNumber } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useEffect, useState } from 'react'

export function useNFTHolderOf (tokenId: string | undefined): string | undefined {
  const networkSettings = getNetworkSettings()

  const { value, error } = useCall({
    contract: new Contract(networkSettings.NFT, WNFT),
    method: 'holderOf',
    args: [BigNumber.from(tokenId)]
  }) ?? {}

  return (error === undefined)
    ? value?.[0]
    : undefined
}

export function useNFTIsApprovedFor (operator: string | undefined, tokenId: string | undefined): boolean {
  const networkSettings = getNetworkSettings()

  const { value, error } = useCall({
    contract: new Contract(networkSettings.NFT, WNFT),
    method: 'isApprovedFor',
    args: [operator, BigNumber.from(tokenId)]
  }) ?? {}

  return (error === undefined)
    ? value?.[0]
    : false
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
