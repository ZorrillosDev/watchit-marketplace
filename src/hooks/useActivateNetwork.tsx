import { InjectedConnector } from '@web3-react/injected-connector'
import { useEthers, Web3Ethers } from '@usedapp/core'
import { supportedChains } from '@src/w3'
import { useEffect } from 'react'

export function useActivateNetwork (): Web3Ethers {
  const { activate, ...rest } = useEthers()
  const injected = new InjectedConnector({ supportedChainIds: supportedChains })

  useEffect((): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      if (await injected.isAuthorized()) {
        await activate(injected)
      }
    })()
  }, [])

  return { activate, ...rest }
}
