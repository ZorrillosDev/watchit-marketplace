// mui imports
import {
  styled,
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardProps,
  CardContentProps, Divider
} from '@mui/material'
import React, { FC } from 'react'
import { PosterProps } from '@components/Poster'
import TruncatedTypography from '@components/TruncatedTypography'

// ===========================|| HOME TRENDING - CARD ||=========================== //

const HomeTrendingCard: FC<PosterProps> = (props): JSX.Element => {
  return (
    <HomeTrendingCardWrapper>
      <CardMedia
        component='img'
        height='500'
        image={`${props.posterUrl}`}
        alt={`${props.posterUrl}`}
      />
      <HomeTrendingCardContent>
        <Typography gutterBottom variant='h3' color='primary.dark'>
          {props.title}
        </Typography>
        <TruncatedTypography variant='body2' color='primary' lines={3}>
          {props.description}
        </TruncatedTypography>
      </HomeTrendingCardContent>
      <Divider />
    </HomeTrendingCardWrapper>
  )
}

export default HomeTrendingCard

export const HomeTrendingCardWrapper = styled(Card)<CardProps>(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
  cursor: 'pointer'
}))

export const HomeTrendingCardContent = styled(CardContent)<CardContentProps>(() => ({
  svg: {
    width: '0.9rem',
    height: '0.9rem'
  }
}))
