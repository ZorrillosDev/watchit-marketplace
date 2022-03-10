// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Box, BoxProps,
  Divider, Grid, GridProps, Link, styled, Typography
} from '@mui/material'

// PROJECT IMPORTS
import MovieProfileUser from '@pages/Movie/components/MovieProfileUser'
import ModalBid from '@components/Bid'
import AcceptOffer from '@pages/Movie/components/MovieProfileAcceptOffer'
import PayOffer from '@pages/Movie/components/MovieProfilePay'
import { IconEth } from '@components/Icons'
import { Translation } from '@src/i18n'
import { SxProps, Theme } from '@mui/system'
import { useNFTHolderOf, useNFTIsApprovedFor } from '@hooks/useNFTContract'
import { Movie, MovieBid } from '@state/movies/types'
import { BLACK_HOLE } from '@w3/CONSTANTS'
import { useEthers } from '@usedapp/core'

// ===========================|| MOVIE - PROFILE - PRICE - VIEW ||=========================== //

export type MovieProfilePriceViewProps = Movie & MovieBid

export const MovieProfilePriceView: FC<MovieProfilePriceViewProps> = (props): JSX.Element => {
  const { account } = useEthers()
  const holder = useNFTHolderOf(props.token)
  const approvedBid = useNFTIsApprovedFor(props.account, props.token)

  const currentHolder = holder !== undefined && holder !== BLACK_HOLE ? holder : props.creator
  const iamCurrentHolder = account?.toLowerCase() === currentHolder.toLowerCase()
  // Has bid available and is not approved?
  const availableToAcceptOffer = props.price > 0 && props.account !== undefined && !approvedBid
  const iamCurrentApprovedBidder = props.account !== undefined && account?.toLowerCase() == props.account.toLowerCase()

  return (
    <Grid item xs={12}>
      <MovieProfilePriceSectionWrapper>
        <Grid container width='50%' alignItems='center' justifyContent='center'>
          <Grid item xs={8} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='body1' color='primary' fontWeight={500} textAlign='left'>
                  <Translation target='MOVIE_PROFILE_PRICE_HIGHER' />
                </Typography>
              </Grid>
              <MovieProfilePriceSection item xs={12} display='flex' alignItems='center'>
                <IconEth />
                <Typography variant='h2' color='text.primary' fontWeight={500}>
                  {props.price} ETH
                </Typography>
              </MovieProfilePriceSection>
              {/* <Grid item xs={12}> */}
              {/*  <Typography variant='body2' color='text.secondary' textAlign='left'> */}
              {/*    $ {props.fiatPrice} */}
              {/*  </Typography> */}
              {/* </Grid> */}
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation='vertical' sx={{ position: 'absolute', height: '50%' }} />
        <Grid container width='50%' justifyContent='center' alignItems='center'>
          <Grid item xs={8} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='body1' fontWeight={500} color='primary' textAlign='left'>
                  <Translation target='MOVIE_PROFILE_OWNER' />
                </Typography>
              </Grid>
              <Grid item xs={12} display='flex'>
                <Link href={`https://rinkeby.etherscan.io/address/${currentHolder}`} target='__blank'>
                  <MovieProfileUser address={currentHolder} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {
                    account !== undefined && !iamCurrentHolder && !approvedBid
                      ? <ModalBid buttonSx={MovieProfileOfferButtonSx} />
                      : account !== undefined && iamCurrentHolder && availableToAcceptOffer
                        ? <AcceptOffer buttonSx={MovieProfileOfferButtonSx} {...props} />
                        : account !== undefined && approvedBid && iamCurrentApprovedBidder
                          ? <PayOffer buttonSx={MovieProfileOfferButtonSx} {...props} />
                          : <></>
                }
      </MovieProfilePriceSectionWrapper>
    </Grid>
  )
}

export const MovieProfilePriceSectionWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  paddingTop: '1.5rem',
  paddingBottom: '3rem',
  alignItems: 'flex-start',
  justifyContent: 'center',
  position: 'relative'
}))

export const MovieProfilePriceSection = styled(Grid)<GridProps>(({ theme }) => ({
  'svg, svg *': {
    fill: theme.palette.text.primary,
    marginRight: '0.5rem',
    marginLeft: '-0.5rem'
  }
}))

const MovieProfileOfferButtonSx: SxProps<Theme> = {
  position: 'absolute',
  bottom: '-20px',
  width: '15rem',
  height: '3rem',
  borderRadius: '12px !important',
  boxShadow: '0 5px 9px rgb(0 0 0 / 20%)',
  fontWeight: 600
}
