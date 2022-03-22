// REACT IMPORTS
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

// MUI IMPORTS
import {
  Box, BoxProps, Button, Grid,
  styled, Theme, Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { SxProps } from '@mui/system'

// PROJECT IMPORTS
import { MoviesResultState, setMovieResult } from '@state/movies/reducer'
import { Movie, MovieBid } from '@state/movies/types'
import AlertState from '@components/AlertState'
import { Web3State } from '@state/web3/types'
import { Translation } from '@src/i18n'
import Modal from '@components/Modal'
import { String } from '@src/utils'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| ACCEPT OFFER - VIEW ||=========================== //

export type MovieProfileAcceptOfferViewProps = {
  isLoading: boolean
  handleAcceptOffer: () => void
  buttonSx?: SxProps<Theme>
  compact?: boolean
} & Web3State & Movie & MovieBid & MoviesResultState

const MovieProfileAcceptOfferView: FC<MovieProfileAcceptOfferViewProps> = (props): JSX.Element => {
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)
  const isCompact = props.compact === true ? 'small' : 'large'
  const onClose = (): void => setOpen(false)
  const onOpen = (): void => {
    setOpen(true)
    dispatch(setMovieResult({}))
  }

  return (
    <>
      <Button
        variant='contained' color='primary' size={isCompact} onClick={() => onOpen()}
        sx={props.buttonSx}
      >
        {
          props.compact === true
            ? <Translation target='MOVIE_PROFILE_PRICE_ACCEPT' />
            : <Translation target='MOVIE_PROFILE_PRICE_ACCEPT_OFFER' />
        }
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
      >
        <AcceptOfferContent>
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
                <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION_ACCEPT' />
                <strong> {String.minifyHash(props.account)} </strong>
                <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION_FOR' />
                <strong> {props.price} ETH.</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AlertState result={props.result}>
                {
                  props?.result?.success &&
                    <strong> Tx: {String.minifyHash(props.callResult.transactionHash)} </strong>
                }
              </AlertState>
              {
                (props.result === undefined) && (
                  <LoadingButton
                    variant='contained'
                    color='primary'
                    size='large'
                    loading={props.isLoading}
                    onClick={() => props.handleAcceptOffer()}
                    fullWidth
                  >
                    <Translation target='MOVIE_PROFILE_PRICE_ACCEPT_OFFER' />
                  </LoadingButton>
                )
              }
            </Grid>
          </Grid>
        </AcceptOfferContent>
      </Modal>
    </>
  )
}

export default MovieProfileAcceptOfferView

const AcceptOfferContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  maxWidth: '23rem',
  padding: '1.5rem 1.5rem 1.5rem 2rem',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}))
