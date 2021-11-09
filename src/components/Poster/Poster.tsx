// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { styled, Card, CardProps } from '@mui/material'

// PROJECT IMPORTS
import { PosterMediaProps, PosterMedia } from '@components/Poster/PosterMedia'

// ===========================|| POSTER ||=========================== //

export const Poster: FC<PosterMediaProps> = (props): JSX.Element => {
  return (
    <PosterWrapper sx={{ border: 'none' }}>
      <PosterMedia {...props} sx={{ maxHeight: 'none', img: { width: '100%' } }} />
    </PosterWrapper>
  )
}

export const PosterWrapper = styled(Card)<CardProps>(() => ({
  position: 'relative',
  backgroundColor: 'transparent',
  border: '1px solid #eee',
  boxShadow: 'none',
  cursor: 'pointer',
  width: '100%',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1rem)'
  }
}))
