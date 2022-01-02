// react imports
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router'

// project imports
import { MovieProfileView } from '@pages/Movie/MovieProfileView'
import { fetchMovieProfile } from '@state/movies/actions'
import { connect, RootStateOrAny } from 'react-redux'
import { selectMovie } from '@state/movies/selector'
import { MovieArgs, MoviesActions, MoviesState } from '@state/movies/types'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE PROFILE CONTAINER ||=========================== //

export const MovieProfileContainer: FC<MoviesState & MoviesActions> = (props): JSX.Element => {
  const { fetchMovieProfile, movie } = props
  const { id } = useParams<MovieArgs>()

  useEffect((): void => {
    fetchMovieProfile({ id })
  }, [])

  return (Object.keys(movie).length > 0 ? <MovieProfileView {...movie} /> : <></>)
}

const mapDispatchToProps: Partial<MoviesActions> = { fetchMovieProfile }
const mapStateToProps = (state: RootStateOrAny): Partial<MoviesState> => {
  const movie = selectMovie(state)
  return { movie }
}

export const MovieProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieProfileContainer)
