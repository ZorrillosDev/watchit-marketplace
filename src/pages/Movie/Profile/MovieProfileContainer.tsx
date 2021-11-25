// react imports
import React, { FC, useEffect, useState } from 'react'

// project imports
import { MovieProfileView, MovieProfileViewProps } from '@pages/Movie/Profile/MovieProfileView'

// TODO delete this when data comes from backend
import { FAKE_MOVIES } from '@src/config'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE PROFILE CONTAINER ||=========================== //

export const MovieProfileContainer: FC<{ id: string }> = ({ id }): JSX.Element => {
  const [movie, setMovie] = useState({} as MovieProfileViewProps)

  useEffect((): void => {
    // TODO get movie data from backend
    (+id > FAKE_MOVIES.length)
      ? setMovie(FAKE_MOVIES[1])
      : setMovie(FAKE_MOVIES[+id])
  }, [])

  return (<MovieProfileView {...movie} />)
}
