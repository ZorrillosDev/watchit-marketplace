// REACT IMPORTS
import React, { FC, useCallback, useState } from 'react'

// PROJECT IMPORTS
import MovieProfileAcceptOfferView, { MovieProfileAcceptOfferViewProps } from '@pages/Movie/components/MovieProfileAcceptOffer/MovieProfileAcceptOfferView'
import { useEthers } from '@usedapp/core'
import { connect, RootStateOrAny } from 'react-redux'
import { Web3Actions, Web3State } from '@state/web3/types'
import { setApprovalFor } from '@state/web3/actions'
import { selectWeb3Result } from '@state/web3/selector'

// ===========================|| ACCEPT OFFER - CONTAINER ||=========================== //

export type MovieProfileAcceptOfferContainerProps = Omit<MovieProfileAcceptOfferViewProps, 'isLoading' | 'handleAcceptOffer'>

const MovieProfileAcceptOfferContainer: FC<MovieProfileAcceptOfferContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useEthers()
  const { setApprovalFor } = props

  const handleAcceptOffer = useCallback((): void => {
    if (account === undefined) return

    setIsLoading(true)
    setApprovalFor({
      operator: props.account,
      tokenId: props.token,
      approved: props.price.toString()
    })
  }, [account])

  return (
    <MovieProfileAcceptOfferView
      {...{ ...props, isLoading, handleAcceptOffer }
      }
    />
  )
}

const mapDispatchToProps: Partial<Web3Actions> = { setApprovalFor }
const mapStateToProps = (state: RootStateOrAny): Partial<Web3State> => {
  const result = selectWeb3Result(state)
  return { result }
}

export const MovieProfileAcceptOffers = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieProfileAcceptOfferContainer)
