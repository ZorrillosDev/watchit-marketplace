// REACT IMPORTS
import React, { FC, useState } from 'react'

// MUI IMPORTS
import { Box, BoxProps, Button, Grid, styled, Theme, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { SxProps } from '@mui/system'

// PROJECT IMPORTS
import Modal from '@components/Modal'
import { Translation } from '@src/i18n'

// ===========================|| ACCEPT OFFER - VIEW ||=========================== //

export interface MovieProfileAcceptOfferViewProps {
  price: number
  isLoading: boolean
  compact?: boolean
  handleAcceptOffer: () => void
  buttonSx?: SxProps<Theme>
}

const MovieProfileAcceptOfferView: FC<MovieProfileAcceptOfferViewProps> = (props): JSX.Element => {
  const [isOpen, setOpen] = useState(false)
  const onClose = (): void => setOpen(false)
  const onOpen = (): void => setOpen(true)
    const isCompact = props.compact === true ? 'small' : 'large'

  return (
    <>
        <Button variant='contained' color='primary' size={isCompact} onClick={() => onOpen()} sx={props.buttonSx}>
            {
                props.compact === true
                    ? <Translation target='MOVIE_PROFILE_PRICE_ACCEPT'/>
                    : <Translation target='MOVIE_PROFILE_PRICE_ACCEPT_OFFER'/>
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
                <strong> 0x0...00 </strong>
                <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION_FOR' />
                <strong> {props.price} ETH.</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
