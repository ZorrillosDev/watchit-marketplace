// react imports
import React, { FC } from 'react'

// project imports
import {Box, Typography, Avatar, Grid, styled, TypographyProps} from '@mui/material'
import { IconEth, Favorite } from '@components/Icons'
import {PosterProps} from "@components/Poster";

// ===========================|| HOME SLIDER CARD ||=========================== //

const HomeSliderCard: FC<{ slide: PosterProps }> = ({ slide }): JSX.Element => {
  return (
    <Grid
      container direction='column'
      sx={{fontWeight: 'bold', '&': {color: (theme) => theme.palette.primary.dark}}}
    >
      <Grid container direction='column' sx={{ p: 2 }}>
        <Typography variant='h2' color='primary' sx={{ mb: 1.5 }}>{slide.title}</Typography>
        <Typography variant='body2' color='primary' sx={{ display: { xs: 'none', md: 'block' } }}>
          {slide.description}
        </Typography>
        <TruncatedTypography variant='body2' color='primary' sx={{ display: { xs: '-webkit-box', md: 'none' } }}>
          {slide.description}
        </TruncatedTypography>
      </Grid>
      <Grid container alignItems='center' wrap='nowrap' justifyContent='space-between' sx={{ py: 2, px: 3 }}>
        <Box display='flex' alignItems='center'>
          <Avatar alt='Profile picture' sizes='small' src={slide.owner.profileUrl} />
          <Box sx={{ ml: 1 }}>
            <Typography variant='body1'>{slide.owner.username}</Typography>
          </Box>
        </Box>
        <Box display='flex' alignItems='center' justifyContent='center' sx={{ px: 3 }}>
          <IconEth color='primary' />
          <Box sx={{ ml: 1 }}>
            <Typography variant='body1'>{slide.price} ETH</Typography>
          </Box>
        </Box>
        <Box display='flex' alignItems='center' justifyContent='flex-end'>
          <Favorite color='error' />
          <Box sx={{ ml: 1 }}>
            <Typography variant='body1' color='error'>{slide.rate}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export const TruncatedTypography = styled(Typography)<TypographyProps>(() => ({
  marginTop: '1rem',
  overflow: 'hidden',
  display: '-webkit-box',
  width: '100%',
  lineHeight: '17px',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}))

export default HomeSliderCard
