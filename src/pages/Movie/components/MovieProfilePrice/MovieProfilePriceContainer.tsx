// REACT IMPORTS
import React, { FC } from 'react'

// PROJECT IMPORTS
import { MovieProfilePriceView } from '@pages/Movie/components/MovieProfilePrice/MovieProfilePriceView'
import { Movie } from '@state/movies/types'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - PROFILE - PRICE - CONTAINER ||=========================== //

export const MovieProfilePriceContainer: FC<Movie> = (props): JSX.Element => {
  return <MovieProfilePriceView price={props.price} owner={props.creator} fiatPrice={0} />
}
