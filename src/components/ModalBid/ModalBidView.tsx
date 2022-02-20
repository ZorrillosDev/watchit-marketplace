// REACT IMPORTS
import React, { FC, useState } from 'react'

// MUI IMPORTS
import { Box, BoxProps, Button, Grid, styled, TextField, Theme, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// PROJECT IMPORTS
import Modal from '@components/Modal'
import { Translation } from '@src/i18n'
import { SxProps } from '@mui/system'
import ModalBidSummary from '@components/ModalBid/ModalBidSummary'

// ===========================|| MODAL BID - VIEW ||=========================== //

export interface ModalBidViewProps {
  isOpen: boolean
  isLoading: boolean
  title: string
  onClose: () => void
  onOpen: () => void
  handleSetBid: () => void
  buttonSx?: SxProps<Theme>
}

const ModalBidView: FC<ModalBidViewProps> = (props): JSX.Element => {
  const [bidAmount, setBidAmount] = useState(0)

  return (
    <>
      <Button variant='contained' color='primary' size='large' onClick={() => props.onOpen()} sx={props.buttonSx}>
        <Translation target='MOVIE_PROFILE_PRICE_MAKE_OFFER' />
      </Button>

      <Modal
        isOpen={props.isOpen}
        onClose={() => props.onClose()}
      >
        <ModalBidContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <header>
                <Typography variant='h3'>
                  Place a bid
                </Typography>
              </header>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>
                You are about to place a bid for <strong>{props.title}</strong>.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='bidAmount' name='bidAmount' label='Your bid' variant='outlined' fullWidth
                onChange={(e) => setBidAmount(+e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <ModalBidSummary balance={10} amount={bidAmount} fee={0.025} />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton variant='contained' color='primary' size='large' loading={props.isLoading} onClick={props.handleSetBid} fullWidth>
                Place a bid
              </LoadingButton>
            </Grid>
          </Grid>
        </ModalBidContent>
      </Modal>
    </>
  )
}

export default ModalBidView

const ModalBidContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  maxWidth: '22rem',
  padding: '1.5rem 1.5rem 1.5rem 2rem',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}))
