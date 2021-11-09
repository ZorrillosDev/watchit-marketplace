// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { styled, CardMedia, CardContent, CardContentProps, Theme } from '@mui/material'
import { SxProps } from '@mui/system'

// ===========================|| POSTER - MEDIA ||=========================== //

export interface PosterMediaProps {
  image: string
  name: string
  sx?: SxProps<Theme>
}

export const PosterMedia: FC<PosterMediaProps> = (props): JSX.Element => {
  return (
    <PosterMediaContent sx={props.sx}>
      <CardMedia
        component='img' image={`${props.image}`} alt={`${props.name}`}
        sx={{ pointerEvents: 'none', userSelect: 'none' }}
      />
    </PosterMediaContent>
  )
}

export const PosterMediaContent = styled(CardContent)<CardContentProps>(() => ({
  padding: '0.5rem !important',
  width: '100%',
  height: '100%',
  maxHeight: 'calc(100% - 6.65rem)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    height: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    borderRadius: '6px',
    width: '65%'
  }
}))
