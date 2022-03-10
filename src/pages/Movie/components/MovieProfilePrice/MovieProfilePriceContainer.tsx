// REACT IMPORTS
import React, { FC } from 'react'

// PROJECT IMPORTS
import { MovieProfilePriceView } from '@pages/Movie/components/MovieProfilePrice/MovieProfilePriceView'
import { Movie, MovieBid, MoviesState } from '@state/movies/types'
import { connect, RootStateOrAny } from 'react-redux'
import { selectBidCollection } from '@state/movies/selector'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - PROFILE - PRICE - CONTAINER ||=========================== //

type MovieProfilePriceProps = Movie & MoviesState
export const MovieProfilePriceContainer: FC<MovieProfilePriceProps> = (props): JSX.Element => {
  const {
    bidCollection
  } = props

  // Replace current price for highest bid if exists
  const bid = Array.from(bidCollection).sort((a, b) => b.bid - a.bid)
  const highestBid: MovieBid = bid.shift() as MovieBid // Get first from sorted bids
  const price = highestBid?.bid ?? props.price

  return <MovieProfilePriceView {...{ ...props, ...highestBid, ...{ price } }} />
}

const mapStateToProps = (state: RootStateOrAny): Partial<MoviesState> => {
  const bidCollection = selectBidCollection(state)
  return { bidCollection }
}

export const MovieProfilePrice = connect(
  mapStateToProps
)(MovieProfilePriceContainer)
