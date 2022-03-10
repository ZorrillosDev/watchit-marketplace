// REACT IMPORTS
import React, { FC, useState } from 'react'

// MUI IMPORTS
import { Alert, Box, BoxProps, Button, Grid, styled, Theme, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { SxProps } from '@mui/system'

// PROJECT IMPORTS
import Modal from '@components/Modal'
import { Translation } from '@src/i18n'
import { Web3State } from '@state/web3/types'
import { Movie } from '@state/movies/types'
import { String } from '@src/utils'

// ===========================|| MOVIE PROFILE PAY - VIEW ||=========================== //

export type MovieProfilePayViewProps = {
  isLoading: boolean
  handlePay: () => void
  buttonSx?: SxProps<Theme>
} & Web3State & Partial<Movie>

const MovieProfilePayView: FC<MovieProfilePayViewProps> = (props): JSX.Element => {
  const [isOpen, setOpen] = useState(false)
  const onClose = (): void => setOpen(false)
  const onOpen = (): void => setOpen(true)

  return (
    <>
      <Button variant='contained' color='primary' size='large' onClick={() => onOpen()} sx={props.buttonSx}>
        <Translation target='MOVIE_PROFILE_PRICE_BUY' />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
      >
        <MovieProfilePayContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <header>
                <Typography variant='h3' color='primary'>
                  <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION' />
                </Typography>
              </header>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' color='text.primary'>
                <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION_PAY' />
                <strong> {props.price} ETH </strong>
                <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION_FOR' />
                <strong> {props.title} </strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {
                                props.result.status > 0
                                  ? <Alert severity='success'>
                                    <strong> {props.title} </strong>
                                    <Translation target='MOVIE_PAY_OFFER_SUCCESS' />

                                  </Alert>
                                  : props.result.status == 0
                                    ? <Alert severity='error'>
                                      <Translation target='MOVIE_PAY_OFFER_ERROR' />
                                    </Alert>
                                    : <LoadingButton
                                        variant='contained'
                                        color='primary'
                                        size='large'
                                        loading={props.isLoading}
                                        onClick={() => props.handlePay()}
                                        fullWidth
                                      >
                                      <Translation target='MOVIE_PROFILE_PRICE_PAY' />
                                    </LoadingButton>
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
