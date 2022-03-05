// REACT IMPORTS
import React, {FC, useCallback, useState} from 'react'

// PROJECT IMPORTS
import BidView from '@components/Bid/BidView'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'
import { MovieArgs, MoviesActions } from '@state/movies/types'
import { commitBidMovie } from '@state/movies/actions'
import { connect } from 'react-redux'
import { useEthers } from '@usedapp/core'
import { useParams } from 'react-router'

// ===========================|| BID - CONTAINER ||=========================== //

type BidContainerProps = { buttonSx?: SxProps<Theme> } & MoviesActions

const BidContainer: FC<BidContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams<MovieArgs>()
  const { account } = useEthers()

  const {
    buttonSx,
    commitBidMovie
  } = props

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
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [account])

  return <BidView {...{ buttonSx, isLoading, handleSetBid }} />
}

const mapDispatchToProps: Partial<MoviesActions> = { commitBidMovie }
export const Bid = connect(
  null,
  mapDispatchToProps
)(BidContainer)
