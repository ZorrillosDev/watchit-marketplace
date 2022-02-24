// REACT IMPORTS
import React, { FC, useState } from 'react'

// MUI IMPORTS
import { Box, BoxProps, Button, Grid, styled, TextField, Theme, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// PROJECT IMPORTS
import Modal from '@components/Modal'
import { Translation } from '@src/i18n'
import { SxProps } from '@mui/system'
import BidSummary from '@components/Bid/BidSummary'
import { useBalance } from '@hooks/useBalance'

// ===========================|| BID - VIEW ||=========================== //

export interface ModalBidViewProps {
  isLoading: boolean
  handleSetBid: (bid: number) => void
  buttonSx?: SxProps<Theme>
}

const BidView: FC<ModalBidViewProps> = (props): JSX.Element => {
  const [bidAmount, setBidAmount] = useState(0)
  const balance: number = useBalance()
  const [isOpen, setOpen] = useState(false)
  const onClose = (): void => setOpen(false)
  const onOpen = (): void => setOpen(true)

  return (
    <>
      <Button variant='contained' color='primary' size='large' onClick={() => onOpen()} sx={props.buttonSx}>
        <Translation target='MOVIE_PROFILE_PRICE_MAKE_OFFER' />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
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
              <TextField
                id='bidAmount' name='bidAmount' label='Your bid' variant='outlined' fullWidth
                onChange={(e) => setBidAmount(+e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <BidSummary balance={balance} amount={bidAmount} fee={0.03} />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                variant='contained'
                color='primary'
                size='large'
                loading={props.isLoading}
                onClick={() => props.handleSetBid(bidAmount)}
                fullWidth
              >
                Place a bid
              </LoadingButton>
            </Grid>
          </Grid>
        </ModalBidContent>
      </Modal>
    </>
  )
}

export default BidView

const ModalBidContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  maxWidth: '22rem',
  padding: '1.5rem 1.5rem 1.5rem 2rem',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}))
