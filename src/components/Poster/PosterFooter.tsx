// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Box, Grid, styled, Typography, CardContent, CardContentProps } from '@mui/material'

// PROJECT IMPORTS
import HeartCounter from '@components/HeartCounter'
import TruncatedTypography from '@components/TruncatedTypography'

// ===========================|| POSTER - FOOTER ||=========================== //

export interface PosterFooterProps {
  price: number
  title: string
  rate: number
  isFavorite: boolean
}

export const PosterFooter: FC<PosterFooterProps> = (props): JSX.Element => {
  return (
    <PosterFooterWrapper>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TruncatedTypography
            variant='body2'
            color='primary.dark'
            fontWeight={600} lines={1}
            sx={{ mt: 0 }}
          >
            {`${props.title}`}
          </TruncatedTypography>
        </Grid>
        <Grid item xs={6}>
          <Box display='flex' alignItems='center'>
            <Typography
              variant='body1'
              display='inline'
              color='text.primary'
              fontWeight='bold'
            >
              {props.price} ETH
            </Typography>
          </Box>
        </Grid>
        <Grid item display='flex' alignItems='center' justifyContent='flex-end' xs={6}>
          <HeartCounter count={props.rate} favorite={props.isFavorite} />
        </Grid>
      </Grid>
    </PosterFooterWrapper>
  )
}

export const PosterFooterWrapper = styled(CardContent)<CardContentProps>(() => ({
  padding: '0.1rem 0.9rem !important',
  svg: {
    width: '0.9rem',
    height: '0.9rem'
  }
}))
