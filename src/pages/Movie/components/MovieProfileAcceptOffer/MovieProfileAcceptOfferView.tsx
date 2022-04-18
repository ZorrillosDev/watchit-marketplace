// REACT IMPORTS
import React, { FC, useState } from 'react';

// MUI IMPORTS
import { Box, BoxProps, Button, Grid, styled, Alert, Theme, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { SxProps } from '@mui/system';

// PROJECT IMPORTS
import Modal from '@components/Modal';
import { Translation } from '@src/i18n';
import { String } from '@src/utils';
import { Web3Actions, Web3State } from '@state/web3/types';
import { Movie } from '@state/movies/types';
import { Bid } from '@src/redux/bids/types';

// ===========================|| ACCEPT OFFER - VIEW ||=========================== //

export type MovieProfileAcceptOfferViewProps = {
  isLoading: boolean
  handleAcceptOffer: () => void
  buttonSx?: SxProps<Theme>
  compact?: boolean
} & Web3State & Web3Actions & Movie & Bid;

const MovieProfileAcceptOfferView: FC<MovieProfileAcceptOfferViewProps> = (props): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const onClose = (): void => setOpen(false);
  const onOpen = (): void => setOpen(true);
  const isCompact = props.compact === true ? 'small' : 'large';

  return (
    <>
      <Button
        variant='contained' onClick={() => onOpen()} sx={props.buttonSx}
        color='primary' size={isCompact}
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
          <Grid spacing={3} container>
            <Grid xs={12} item>
              <header>
                <Typography color='primary' variant='h3'>
                  <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION' />
                </Typography>
              </header>
            </Grid>
            <Grid xs={12} item>
              <Typography color='text.primary' variant='body2'>
                <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION_ACCEPT' />
                <strong> {String.minifyHash(props.account)} </strong>
                <Translation target='MOVIE_PROFILE_PRICE_CONFIRMATION_FOR' />
                <strong> {props.price} ETH.</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {
                props.result.status > 0
                  ? (
                    <Alert severity='success'>
                      <Translation target='MOVIE_ACCEPT_OFFER_SUCCESS' />
                      <strong> Tx: {String.minifyHash(props.result.transactionHash)} </strong>
                    </Alert>
                  )
                  : props.result.status === 0
                    ? (
                      <Alert severity='error'>
                        <Translation target='MOVIE_ACCEPT_OFFER_ERROR' />
                      </Alert>
                    )
                    : (
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
  );
};

export default MovieProfileAcceptOfferView;

const AcceptOfferContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  maxWidth: '23rem',
  padding: '1.5rem 1.5rem 1.5rem 2rem',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));
