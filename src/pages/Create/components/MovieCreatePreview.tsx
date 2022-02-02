// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { styled, BoxProps, Box, Typography } from '@mui/material'

// THIRD PARTY IMPORTS
import { IconVideoPlus } from '@tabler/icons'

// PROJECT IMPORTS
import { PosterWrapper, PosterHeader, PosterFooter, PosterMedia } from '@components/Poster'
import { Movie } from '@state/movies/types'
import { Translation } from '@src/i18n'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE - CREATE - POSTER ||=========================== //

const MovieCreatePreview: FC<Partial<Movie> & { bid: number }> = (props): JSX.Element => {
  const {
    creator,
    title,
    bid
  } = props
  const image = props?.posters?.large

  return (
    <MovieCreatePreviewWrapper>
      <PosterWrapper sx={{ minHeight: image ? 'auto' : '30rem', pb: image ? 1 : 0 }}>
        {
          image ? (
            <>
              <PosterHeader creator={creator ?? ''} />
              <PosterMedia image={image} name={title ?? ''} />
              <PosterFooter price={bid} name={title ?? ''} isEthPrice />
            </>
          ) : (
            <Box width={1} height={1} display='flex' alignItems='center' justifyContent='center' position='absolute'>
              <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <MovieCreatePreviewIcon>
                  <IconVideoPlus stroke={1} />
                </MovieCreatePreviewIcon>
                <Typography variant='h5' color='text.secondary' width={1} textAlign='center'>
                  <Translation target='MOVIE_CREATE_PREVIEW_HELP' />
                </Typography>
              </Box>
            </Box>
          )
        }
      </PosterWrapper>
    </MovieCreatePreviewWrapper>
  )
}

export default MovieCreatePreview

export const MovieCreatePreviewWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  minHeight: '42rem',
  height: 'auto',
  maxHeight: '100vh',
  img: {
    width: '80% !important'
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '36rem'
  }
}))

export const MovieCreatePreviewIcon = styled(Box)<BoxProps>(({ theme }) => ({
  svg: {
    color: theme.palette.text.secondary,
    width: '3rem',
    height: '3rem',
    marginBottom: '2rem'
  }
}))
