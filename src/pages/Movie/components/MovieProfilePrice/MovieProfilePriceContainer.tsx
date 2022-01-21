// REACT IMPORTS
import React, { FC } from 'react'

// PROJECT IMPORTS
import { MovieProfilePriceView } from '@pages/Movie/components/MovieProfilePrice/MovieProfilePriceView'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - PROFILE - PRICE - CONTAINER ||=========================== //

export const MovieProfilePriceContainer: FC = (): JSX.Element => {
  return <MovieProfilePriceView price={0} owner='0x00' fiatPrice={0} />
}
