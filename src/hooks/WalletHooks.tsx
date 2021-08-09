import {useState, useEffect} from 'react'
import {injectedConnector as injected} from "@src/web3";
import {useWeb3React} from "@web3-react/core";
import {connect, connected, error} from '@state/reducers/WalletReducer'
import {useDispatch} from "react-redux";

export const webMetamaskEager = () => {
    const dispatch = useDispatch();
    const {activate} = useWeb3React()

    useEffect(() => {
        dispatch(connect()); // Start connecting
        injected.isAuthorized().then((isAuthorized: boolean) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    dispatch(error())
                })
            }
        })
    }, [])

}


export const webMetamaskConnect = async () => {
    const dispatch = useDispatch();
    const {active, error, activate} = useWeb3React()

    useEffect((): any => {
        const {ethereum} = window as any
        if (ethereum && ethereum.on && !active && !error) {
            const handleConnect = async () => {
                await activate(injected)
                dispatch(connected());
            }
            const handleChainChanged = (chainId: string | number) => {
                console.log("Handling 'chainChanged' event with payload", chainId)
                activate(injected)
            }
            const handleAccountsChanged = (accounts: string[]) => {
                console.log("Handling 'accountsChanged' event with payload", accounts)
                if (accounts.length > 0) {
                    activate(injected)
                }
            }
            const handleNetworkChanged = (networkId: string | number) => {
                console.log("Handling 'networkChanged' event with payload", networkId)
                activate(injected)
            }

            ethereum.on('connect', handleConnect)
            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)
            ethereum.on('networkChanged', handleNetworkChanged)

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect)
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                    ethereum.removeListener('networkChanged', handleNetworkChanged)
                }
            }
        }
    }, [active, error, activate])
}
