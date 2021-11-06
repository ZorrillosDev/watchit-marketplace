// mui imports
import {
  Avatar,
  styled,
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardProps,
  CardContentProps,
  AvatarProps, Divider, TypographyProps
} from '@mui/material'
import React, { FC } from 'react'
import {PosterProps} from "@components/Poster";

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
        <TruncatedTypography variant='body2' color='primary'>
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

export const TruncatedTypography = styled(Typography)<TypographyProps>(() => ({
  marginTop: '1rem',
  overflow: 'hidden',
  display: '-webkit-box',
  width: '100%',
  lineHeight: '17px',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
}))
