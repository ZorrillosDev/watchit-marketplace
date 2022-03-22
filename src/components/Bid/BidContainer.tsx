// REACT IMPORTS
import React, { FC, useCallback, useEffect, useState } from 'react'

// PROJECT IMPORTS
import BidView from '@components/Bid/BidView'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'
import { MovieArgs, MoviesActions } from '@state/movies/types'
import { commitBidMovie } from '@state/movies/actions'
import { connect, RootStateOrAny } from 'react-redux'
import { useEthers } from '@usedapp/core'
import { useParams } from 'react-router'
import { MoviesResultState } from '@state/movies/reducer'
import { selectMovieResult } from '@state/movies/selector'

// ===========================|| BID - CONTAINER ||=========================== //

type BidContainerProps = { buttonSx?: SxProps<Theme> } & MoviesActions & MoviesResultState

const BidContainer: FC<BidContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams<MovieArgs>()
  const { account } = useEthers()
  const {
    buttonSx,
    commitBidMovie,
    result
  } = props

  useEffect(() => {
    if (result === undefined) {
      return
    }
    setIsLoading(false)
  }, [result])

  const handleSetBid = useCallback((bid: number): void => {
    if (account === undefined) {
      return
    }

    setIsLoading(true)
    commitBidMovie({
      account: account ?? '',
      id,
      bid
    })
  }, [account])

  return <BidView {...{ buttonSx, isLoading, handleSetBid }} />
}

const mapDispatchToProps: Partial<MoviesActions> = { commitBidMovie }
const mapStateToProps = (state: RootStateOrAny): MoviesResultState => {
  const result = selectMovieResult(state)?.result
  return { result }
}

export const Bid = connect(
  mapStateToProps,
  mapDispatchToProps
)(BidContainer)
