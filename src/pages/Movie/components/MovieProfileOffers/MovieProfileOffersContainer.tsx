// REACT IMPORTS
import React, { FC, useEffect } from 'react'

// PROJECT IMPORTS
import { MovieProfileOffersView } from '@pages/Movie/components/MovieProfileOffers/MovieProfileOffersView'
import { MovieArgs, MoviesState } from '@state/movies/types'
import { connect, RootStateOrAny } from 'react-redux'
import { fetchRecentMovieBids } from '@state/bids/actions'
import { selectMovie } from '@state/movies/selector'
import { selectBidCollection } from '@state/bids/selector'
import { BidActions, BidState } from '@state/bids/types'
import { useParams } from 'react-router'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - PROFILE - OFFERS - CONTAINER ||=========================== //

type MovieProfileOffersProps = BidActions & MoviesState & BidState
const MovieProfileOffersContainer: FC<MovieProfileOffersProps> = (props): JSX.Element => {
  const { id } = useParams<MovieArgs>()
  const {
    fetchRecentMovieBids,
    bids,
    movie
  } = props

  useEffect(() => {
    fetchRecentMovieBids({ id })
  }, [])

  return <MovieProfileOffersView rows={bids} movie={movie} />
}

const mapDispatchToProps: Partial<BidActions> = { fetchRecentMovieBids }
const mapStateToProps = (state: RootStateOrAny): Partial<MoviesState & BidState> => {
  const bids = selectBidCollection(state)
  const movie = selectMovie(state)
  return { bids, movie }
}

export const MovieProfileOffers = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieProfileOffersContainer)
