// REACT IMPORTS
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

// MUI IMPORTS
import {
  Box, BoxProps, Button, Grid,
  styled, Theme, Typography
} from '@mui/material'
import { SxProps } from '@mui/system'
import { LoadingButton } from '@mui/lab'

// PROJECT IMPORTS
import { MoviesResultState, setMovieResult } from '@state/movies/reducer'
import { Web3State } from '@state/web3/types'
import { Movie } from '@state/movies/types'
import { Translation } from '@src/i18n'
import Modal from '@components/Modal'
import AlertState from '@components/AlertState'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE PROFILE PAY - VIEW ||=========================== //

export type MovieProfilePayViewProps = {
  isLoading: boolean
  handlePay: () => void
  buttonSx?: SxProps<Theme>
} & Web3State & Partial<Movie> & MoviesResultState

const MovieProfilePayView: FC<MovieProfilePayViewProps> = (props): JSX.Element => {
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch()
  const onClose = (): void => setOpen(false)
  const onOpen = (): void => {
    setOpen(true)
    dispatch(setMovieResult({}))
  }

  return (
    <>
      <Button sx={props.buttonSx} variant='contained' size='large' color='primary' onClick={() => onOpen()}>
        <Translation target='MOVIE_PROFILE_PRICE_BUY' />
      </Button>

      <Modal
        onClose={() => onClose()}
        isOpen={isOpen}
      >
        <MovieProfilePayContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <header>
                <Typography color='primary' variant='h3'>
                  <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION' />
                </Typography>
              </header>
            </Grid>
            <Grid item xs={12}>
              <Typography color='text.primary' variant='body2'>
                <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION_PAY' />
                <strong> {props.price} ETH </strong>
                <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION_FOR' />
                <strong> {props.title} </strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AlertState
                result={props.result}
                successContent={(
                  <strong> {props.title} </strong>
                )}
              />
              {
                (props.result === undefined) && (
                  <LoadingButton
                    color='primary'
                    fullWidth
                    variant='contained'
                    loading={props.isLoading}
                    size='large'
                    onClick={() => props.handlePay()}
                  >
                    <Translation target='MOVIE_PROFILE_PRICE_PAY' />
                  </LoadingButton>
                )
              }
            </Grid>
          </Grid>
        </MovieProfilePayContent>
      </Modal>
    </>
  )
}

export default MovieProfilePayView

const MovieProfilePayContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  maxWidth: '23rem',
  padding: '1.5rem 1.5rem 1.5rem 2rem',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}))
