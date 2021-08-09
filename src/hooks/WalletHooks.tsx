import {useState, useEffect} from 'react'
import {Injected} from "@src/web3";
import {useWeb3React} from "@web3-react/core";

export const useMetamaskEager = () => {
    const {activate, active} = useWeb3React()
    const [tried, setTried] = useState(false)

    useEffect(() => {
        Injected.isAuthorized().then((isAuthorized: boolean) => {
            if (isAuthorized) {
                activate(Injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                setTried(true)
            }
        })
    }, [])

    useEffect(() => {
        if (!tried && active) {
            setTried(true)
        }
    }, [tried, active])

    return tried

}


export const useMetamaskListener = (suppress: boolean = true) => {
    const {active, error, activate} = useWeb3React()

    useEffect((): any => {
        const {ethereum} = window as any
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleConnect = async () => {
                console.log("Handling 'connect' event")
                activate(Injected)
            }
            const handleChainChanged = (chainId: string | number) => {
                console.log("Handling 'chainChanged' event with payload", chainId)
                activate(Injected)
            }
            const handleAccountsChanged = (accounts: string[]) => {
                console.log("Handling 'accountsChanged' event with payload", accounts)
                if (accounts.length > 0) {
                    activate(Injected)
                }
            }
            const handleNetworkChanged = (networkId: string | number) => {
                console.log("Handling 'networkChanged' event with payload", networkId)
                activate(Injected)
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
