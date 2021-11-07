import {useContractCall, useEthers} from "@usedapp/core";
import {getNetworkSettings} from "@src/w3";
import WNFT from '@src/w3/abi/WNFT.json'
import {ethers} from "ethers";
interface MetaMask {
    activate: () => void
    active: boolean
    deactivate: () => void
    account: string | null | undefined
    library: any
    error: Error | undefined
}


export const useNFTBalanceOf = () => {
    const {chainId} = useEthers()
    const networkSettings = getNetworkSettings(chainId)
    // @ts-ignore
    const wnftInterface = new ethers.utils.Interface(WNFT);

    const [tokenBalance] = useContractCall({
        abi: wnftInterface,
        address: networkSettings.NFT,
        method: 'balanceOf',
        args: []
    }) ?? []
}
