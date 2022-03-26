// REACT IMPORTS
import React, { FC } from 'react'

// PROJECT IMPORTS
import { MovieProfilePriceView } from '@pages/Movie/components/MovieProfilePrice/MovieProfilePriceView'
import { Movie } from '@state/movies/types'
import { Bid, BidState } from '@state/bids/types'
import { connect, RootStateOrAny } from 'react-redux'
import { selectBidCollection } from '@state/bids/selector'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - PROFILE - PRICE - CONTAINER ||=========================== //

type MovieProfilePriceProps = Movie & BidState
export const MovieProfilePriceContainer: FC<MovieProfilePriceProps> = (props): JSX.Element => {
  const { bids } = props

  // Replace current price for highest bid if exists
  const bid = Array.from(bids.sort((a, b) => b.bid - a.bid))
  const highestBid: Bid = bid.shift() as Bid // Get first from sorted bids
  const price = highestBid?.bid ?? props.price

  return <MovieProfilePriceView {...{ ...props, ...highestBid, ...{ price } }} />
}

const mapStateToProps = (state: RootStateOrAny): Partial<BidState> => {
  const bids = selectBidCollection(state)
  return { bids }
}

export const MovieProfilePrice = connect(
  mapStateToProps
)(MovieProfilePriceContainer)
