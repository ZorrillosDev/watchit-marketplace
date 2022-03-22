// REACT IMPORTS
import React, { FC, PropsWithChildren } from 'react'

// MUI IMPORTS
import { Alert } from '@mui/material'

// PROJECT IMPORTS
import { MoviesResultState } from '@state/movies/reducer'

// ===========================|| ALERT STATE FULL ||=========================== //

const AlertState: FC<PropsWithChildren<MoviesResultState>> = (props): JSX.Element => {
  return (props.result !== undefined)
    ? props.result.success
      ? (
        <Alert sx={{ mt: 2, width: 1, '.MuiAlert-message': { display: 'flex', alignItems: 'center' } }} severity='success'>
          {props.result.message}
          {props.children}
        </Alert>
        )
      : (
        <Alert sx={{ mt: 2, width: 1, '.MuiAlert-message': { display: 'flex', alignItems: 'center' } }} severity='error'>
          {props.result.message}
          {props.children}
        </Alert>
        )
    : <></>
}

export default AlertState
