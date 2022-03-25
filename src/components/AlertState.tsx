// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Alert } from '@mui/material'

// ===========================|| ALERT STATE FULL ||=========================== //

export interface ResultState {
  result?: {
    success: boolean
    message: string | undefined
  }
}

export interface AlertStateProps {
  successContent?: string | JSX.Element
  errorContent?: string | JSX.Element
}

const AlertState: FC<ResultState & AlertStateProps> = (props): JSX.Element => {
  return (props.result !== undefined)
    ? props.result.success
      ? (
        <Alert sx={{ mt: 2, width: 1, '.MuiAlert-message': { display: 'flex', alignItems: 'center' } }} severity='success'>
          {props.result.message}
          {props?.successContent ?? ''}
        </Alert>
        )
      : (
        <Alert sx={{ mt: 2, width: 1, '.MuiAlert-message': { display: 'flex', alignItems: 'center' } }} severity='error'>
          {props.result.message}
          {props?.errorContent ?? ''}
        </Alert>
        )
    : <></>
}

export default AlertState
