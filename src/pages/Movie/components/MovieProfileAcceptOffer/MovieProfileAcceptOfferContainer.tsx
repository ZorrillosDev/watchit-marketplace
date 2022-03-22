// REACT IMPORTS
import React, { FC, useCallback, useEffect, useState } from 'react'

// PROJECT IMPORTS
import { useEthers } from '@usedapp/core'
import { connect, RootStateOrAny } from 'react-redux'
import { Web3Actions, Web3State } from '@state/web3/types'
import { setApprovalFor } from '@state/web3/actions'
import { selectWeb3Result } from '@state/web3/selector'
import MovieProfileAcceptOfferView, { MovieProfileAcceptOfferViewProps } from '@pages/Movie/components/MovieProfileAcceptOffer/MovieProfileAcceptOfferView'
import { MoviesResultState } from '@state/movies/reducer'
import { selectMovieResult } from '@state/movies/selector'

// ===========================|| ACCEPT OFFER - CONTAINER ||=========================== //

export type MovieProfileAcceptOfferContainerProps = Web3Actions & Omit<MovieProfileAcceptOfferViewProps, 'isLoading' | 'handleAcceptOffer'>

const MovieProfileAcceptOfferContainer: FC<MovieProfileAcceptOfferContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useEthers()

  const {
    setApprovalFor,
    result
  } = props

  useEffect(() => {
    if (result === undefined) {
      return
    }
    setIsLoading(false)
  }, [result])

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
const mapStateToProps = (state: RootStateOrAny): Partial<Web3State> & MoviesResultState => {
  const callResult = selectWeb3Result(state)
  const result = selectMovieResult(state)?.result

  return { callResult, result }
}

export const MovieProfileAcceptOffers = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieProfileAcceptOfferContainer)
