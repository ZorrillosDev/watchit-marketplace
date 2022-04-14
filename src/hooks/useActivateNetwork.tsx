import { InjectedConnector } from '@web3-react/injected-connector'
import { useEthers } from '@usedapp/core'
import { supportedChains } from '@src/w3'
import { useEffect } from 'react'

export function useActivateNetwork() {
  const { activate, ...rest } = useEthers()
  const injected = new InjectedConnector({ supportedChainIds: supportedChains })

  useEffect(() => {
    (async () => {
      if (await injected.isAuthorized()) {
        activate(injected)
      }
    })()
  }, [])


  return { ...rest }

}

