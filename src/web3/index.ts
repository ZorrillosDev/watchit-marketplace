import {ethers} from 'ethers'
import {Chains} from "@src/web3/types";
import {Web3Provider} from '@ethersproject/providers'
import {InjectedConnector} from '@web3-react/injected-connector'

export const getLibrary = (provider?: any): Web3Provider =>
    new ethers.providers.Web3Provider(provider)

export const Injected = new InjectedConnector({
    supportedChainIds: [Chains.PRIVATE, Chains.RINKEBY]
})
