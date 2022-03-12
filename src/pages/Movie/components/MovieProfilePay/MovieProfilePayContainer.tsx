// REACT IMPORTS
import React, { FC, useCallback, useState } from 'react'

// PROJECT IMPORTS
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'
import { useEthers } from '@usedapp/core'
import MovieProfilePayView from '@pages/Movie/components/MovieProfilePay/MovieProfilePayView'
import { Web3Actions, Web3State } from '@state/web3/types'
import { safePurchase } from '@state/web3/actions'
import { connect, RootStateOrAny } from 'react-redux'
import { selectWeb3Result } from '@state/web3/selector'
import { Movie, MovieBid, MoviesActions, MovieArgs } from '@state/movies/types'
import { flushBidsForMovie } from '@src/redux/movies/actions'
import { useParams } from 'react-router'

// ===========================|| MOVIE PROFILE PAY - CONTAINER ||=========================== //

export type MovieProfilePayContainerProps = {
  buttonSx?: SxProps<Theme>
} & Web3Actions & Movie & MoviesActions & MovieBid & Web3State

const MovieProfilePayContainer: FC<MovieProfilePayContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useEthers()
  const { id } = useParams<MovieArgs>()
  const { safePurchase, flushBidsForMovie } = props

  const handlePay = useCallback((): void => {
    if (account === undefined) {
      return
    }

    setIsLoading(true)
    safePurchase({
      tokenId: props.token,
      value: props.price.toString()
    })

    flushBidsForMovie({
      account: account ?? '',
      id
    })
  }, [account])

  return <MovieProfilePayView {...{ isLoading, handlePay, ...props }} />
}

const mapDispatchToProps: Partial<Web3Actions & MoviesActions> = { safePurchase, flushBidsForMovie }
const mapStateToProps = (state: RootStateOrAny): Partial<Web3State> => {
  const result = selectWeb3Result(state)
  return { result }
}

export const MovieProfilePay = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieProfilePayContainer)
