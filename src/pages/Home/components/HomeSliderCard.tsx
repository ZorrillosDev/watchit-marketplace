// react imports
import React, { FC } from 'react'

// project imports
import { Box, Typography, Avatar, Grid } from '@mui/material'
import { IconEth, Favorite } from '@components/Icons'

// ===========================|| HOME SLIDER CARD ||=========================== //

export interface HomeSliderCardProps {
  title: string
  description: string
  owner: {
    name: string
    profilePicture: string
  }
  price: number
  rate: number
}

const HomeSliderCard: FC<{ slide: HomeSliderCardProps }> = ({ slide }): JSX.Element => {
  return (
    <Grid
      container
      direction='column'
      sx={{
        position: 'absolute',
        right: '5%',
        top: { xs: '5%', lg: '10%' },
        fontWeight: 'bold',
        maxWidth: { xs: '90%', lg: '35%' },
        color: (theme) => theme.palette.primary.dark
      }}
    >
      <Grid
        container
        direction='column'
        sx={{
          p: 2,
          borderRadius: '0.5rem 0.5rem 0 0',
          bgcolor: 'rgba(255,255,255,0.8)'
        }}
      >
        <Typography variant='h3' sx={{ mb: 1.5 }}>{slide.title}</Typography>
        <Typography variant='body1'>{slide.description}</Typography>
      </Grid>
      <Grid
        container
        alignItems='center'
        wrap='nowrap'
        justifyContent='space-between'
        sx={{
          py: 2,
          px: 3,
          mt: '2px',
          borderRadius: '0 0 3rem 3rem',
          bgcolor: 'rgba(255,255,255,0.8)'
        }}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='center'
        >
          <Avatar alt='Profile picture' sizes='small' src={slide.owner.profilePicture} />
          <Box sx={{ ml: 1 }}>
            <Typography variant='body1'>{slide.owner.name}</Typography>
          </Box>
        </Grid>
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          sx={{ px: 3 }}
        >
          <IconEth color='primary' />
          <Box sx={{ ml: 1 }}>
            <Typography variant='body1'>{slide.price} ETH</Typography>
          </Box>
        </Grid>
        <Grid
          container
          alignItems='center'
          justifyContent='center'
        >
          <Favorite color='error' />
          <Box sx={{ ml: 1 }}>
            <Typography variant='body1' color='error'>{slide.rate}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HomeSliderCard
