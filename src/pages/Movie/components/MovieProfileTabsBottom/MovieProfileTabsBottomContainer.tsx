// REACT IMPORTS
import React, { FC } from 'react'

// PROJECT IMPORTS
import { MovieProfileTabsBottomView } from '@pages/Movie/components/MovieProfileTabsBottom/MovieProfileTabsBottomView'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - PROFILE - ACTIVITY - CONTAINER ||=========================== //

export const MovieProfileTabsBottomContainer: FC = (props): JSX.Element => {
  return <MovieProfileTabsBottomView {...props} />
}
