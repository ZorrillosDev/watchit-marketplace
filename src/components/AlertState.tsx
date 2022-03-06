// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Alert } from '@mui/material'

// PROJECT IMPORTS
import { MoviesResultState } from '@state/movies/reducer'

// ===========================|| ALERT STATE FULL ||=========================== //

const AlertState: FC<MoviesResultState> = (props): JSX.Element => {
  return (props.response !== undefined)
    ? props.response.success
      ? (
        <Alert sx={{ mt: 2, width: 1, '.MuiAlert-message': { display: 'flex', alignItems: 'center' } }} severity='success'>
          {props.response.message}
        </Alert>
        )
      : (
        <Alert sx={{ mt: 2, width: 1, '.MuiAlert-message': { display: 'flex', alignItems: 'center' } }} severity='error'>
          {props.response.message}
        </Alert>
        )
    : <></>
}

export default AlertState
