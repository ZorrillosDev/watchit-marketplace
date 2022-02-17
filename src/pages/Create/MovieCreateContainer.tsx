// react imports
import React, { FC } from 'react'

// project imports

import { MovieCreateView } from '@pages/Create/MovieCreateView'
import { MoviesActions, MoviesState } from '@state/movies/types'
import { commitUploadMovie } from '@state/movies/actions'
import { connect, RootStateOrAny } from 'react-redux'
import { selectUploadProgress } from '@state/movies/selector'
import { useEthers } from '@usedapp/core'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - CREATE - CONTAINER ||=========================== //

export const MovieCreateContainer: FC<MoviesState & MoviesActions> = ({ commitUploadMovie, progress }): JSX.Element => {
  const { account } = useEthers()

  const onSubmit = (values: any): void => {
    const formData = new FormData()
    // Avoid request if wallet isn't connected
    if (account === null) { return }

    for (const [idx, value] of Object.entries(values)) {
      formData.append(idx, value as any)
    }

    // Dispatch action api call with creator append from wallet
    formData.append('creator', account ?? '')
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
