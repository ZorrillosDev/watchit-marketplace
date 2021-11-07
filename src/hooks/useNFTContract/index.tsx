import {useContractCall, useEthers} from "@usedapp/core";
import {getNetworkSettings} from "@src/w3";
import {WNFTAbi} from "@w3/CONSTANTS";
import {Ethers} from "@src/utils";
import {BigNumber} from "ethers";
import {Falsy} from "@usedapp/core/dist/cjs/src/model/types";
import {Contract} from '@ethersproject/contracts'
import {useEffect, useState} from "react";

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


export function useListenForEvent(event: string) {
    const {chainId} = useEthers()
    const networkSettings = getNetworkSettings(chainId)
    const contract = new Contract(networkSettings.NFT, WNFTAbi)
    const [events, setEvent] = useState()

    useEffect(() => {
        const listener = (...params: any) => setEvent(params)
        contract.on(event, listener)
        return () => {
            contract.off(event, listener)
        }
    }, [event])

    return events
}
