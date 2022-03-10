// REACT IMPORTS
import React, { FC, useEffect } from 'react'

// PROJECT IMPORTS
import { MovieProfileOffersView } from '@pages/Movie/components/MovieProfileOffers/MovieProfileOffersView'
import { MovieArgs, MoviesActions, MoviesState } from '@state/movies/types'
import { connect, RootStateOrAny } from 'react-redux'
import { fetchRecentMovieBids } from '@state/movies/actions'
import { selectBidCollection, selectMovie } from '@state/movies/selector'
import { useParams } from 'react-router'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - PROFILE - OFFERS - CONTAINER ||=========================== //

type MovieProfileOffersProps = MoviesActions & MoviesState
const MovieProfileOffersContainer: FC<MovieProfileOffersProps> = (props): JSX.Element => {
  const { id } = useParams<MovieArgs>()
  const {
    fetchRecentMovieBids,
    bidCollection,
    movie
  } = props

  useEffect(() => {
    fetchRecentMovieBids({ id })
  }, [])

  return <MovieProfileOffersView rows={bidCollection} movie={movie} />
}

const mapDispatchToProps: Partial<MoviesActions> = { fetchRecentMovieBids }
const mapStateToProps = (state: RootStateOrAny): Partial<MoviesState> => {
  const bidCollection = selectBidCollection(state)
  const movie = selectMovie(state)
  return { bidCollection, movie }
}

export const MovieProfileOffers = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieProfileOffersContainer)
