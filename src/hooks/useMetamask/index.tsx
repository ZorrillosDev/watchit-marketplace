import {useWeb3React} from "@web3-react/core";
import {useEffect, useState} from "react";
import {Injected} from "@src/w3";

type MetaMask = {
    activate: ()=> void,
    active: boolean,
    deactivate: ()=> void,
    account: string | null | undefined,
    error: Error | undefined
}

export const useMetamask = (): MetaMask => {
    const {active, account, error, activate, deactivate} = useWeb3React()
    const [isActive, setActive] = useState(false)
    const activateNetwork = () => activate(Injected)

    useEffect(() => {
        (async () => {
            try {
                const isAuthorized = await Injected.isAuthorized()
                setActive(true);
                if (isAuthorized && !error && !active)
                    await activateNetwork()
            } catch (e) {
                await deactivate()
            }
        })()
    }, [active])

    return {
        activate: activateNetwork,
        active: isActive,
        deactivate,
        account,
        error
    }
}
