import {useContractCall, useEthers} from '@usedapp/core'
import {getNetworkSettings} from '@src/w3'
import {WNFTAbi} from '@w3/CONSTANTS'
import {Ethers} from '@src/utils'
import {BigNumber} from 'ethers'
import {Falsy} from '@usedapp/core/dist/cjs/src/model/types'
import {Contract} from '@ethersproject/contracts'
import {useEffect, useState} from 'react'

// interface Events {
//   type: string
//   tx: string
//   payload: object
// }

export function useNFTBalanceOf(account: string | Falsy, cid: string): BigNumber {
    const {chainId} = useEthers()
    const networkSettings = getNetworkSettings(chainId)

    const [tokenBalance] = useContractCall({
        abi: WNFTAbi,
        address: networkSettings.NFT,
        method: 'balanceOf',
        args: [account, Ethers.cidToUint256(cid)]
    }) ?? []

    return tokenBalance
}

export function useNFTContract(): Contract {
    const {chainId} = useEthers()
    const networkSettings = getNetworkSettings(chainId)
    return new Contract(networkSettings.NFT, WNFTAbi)
}

export function useListenForEvent(contract: Contract, event: string): object | undefined {
    const [events, setEvent] = useState()

    useEffect(() => {
        contract.on(event, (...params: any): void => setEvent(params))
        return () => {
            contract.removeAllListeners(event)
        }
    }, [event])

    return events
}
