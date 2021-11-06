import React, { ComponentType, FC } from 'react'
import { useWeb3React } from '@web3-react/core'

/**
 * Generic HOC function
 * https://www.typescriptlang.org/docs/handbook/2/functions.html
 * withVerificationRequired generic function with param P
 * @return FC<P>
 */

export const withVerificationRequired = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  return (props: P): JSX.Element => {
    // TODO work on HOC to handle if active return component, else "please connect wallet"
    return <></>
  }
}
