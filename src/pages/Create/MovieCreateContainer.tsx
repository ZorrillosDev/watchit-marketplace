// react imports
import React, { FC } from 'react'

// project imports

import { MovieCreateView } from '@pages/Create/MovieCreateView'
import { MoviesActions, MoviesState } from '@state/movies/types'
import { commitUploadMovie } from '@state/movies/actions'
import { connect, RootStateOrAny } from 'react-redux'
import { selectUploadProgress } from '@state/movies/selector'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - CREATE - CONTAINER ||=========================== //

export const MovieCreateContainer: FC<MoviesState & MoviesActions> = ({ commitUploadMovie, progress }): JSX.Element => {
  const onSubmit = (values: any): void => {
    const formData = new FormData()

    for (const [idx, value] of Object.entries(values)) {
      formData.append(idx, value as any)
    }
    // Here call the api
    commitUploadMovie(formData)
  }

  return <MovieCreateView {...{ onSubmit, progress }} />
}

const mapDispatchToProps: Partial<MoviesActions> = { commitUploadMovie }
const mapStateToProps = (state: RootStateOrAny): Partial<MoviesState> => {
  const progress = selectUploadProgress(state)
  return { progress }
}

export const MovieCreate = connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(MovieCreateContainer))
