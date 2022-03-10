// REACT IMPORTS
<<<<<<< HEAD
import React, { FC, useCallback, useEffect, useState } from 'react'
=======
import React, { FC, useCallback, useState } from 'react'
>>>>>>> main

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

// ===========================|| BID - CONTAINER ||=========================== //

type BidContainerProps = { buttonSx?: SxProps<Theme> } & MoviesActions & MoviesResultState

const BidContainer: FC<BidContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams<MovieArgs>()
  const { account } = useEthers()
  const {
    buttonSx,
    commitBidMovie
  } = props

  useEffect(() => {
    if (Object.is(props.response, undefined)) {
      return
    }
    setIsLoading(false)
  }, [props.response])

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

  const clickHandler = (): void => {
    setIsLoading(true)
  }

  return <BidView {...{ buttonSx, isLoading, handleSetBid, clickHandler }} />
}

const mapDispatchToProps: Partial<MoviesActions> = { commitBidMovie }
const mapStateToProps = (state: RootStateOrAny): MoviesResultState => {
  return {
    response: state.movies.response
  }
}

export const Bid = connect(
  mapStateToProps,
  mapDispatchToProps
)(BidContainer)
