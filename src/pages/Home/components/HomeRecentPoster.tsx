// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Grid, styled, GridProps } from '@mui/material'

// PROJECT IMPORTS
import {
  PosterWrapper, PosterHeaderProps, PosterHeader,
  PosterFooterProps, PosterFooter, PosterMediaProps,
  PosterMedia
} from '@components/Poster'

// ===========================|| HOME - RECENT - POSTER ||=========================== //

export type HomeRecentPosterProps = PosterHeaderProps & PosterFooterProps & PosterMediaProps

const HomeRecentPoster: FC<HomeRecentPosterProps> = (props): JSX.Element => {
  return (
    <HomeRecentPosterWrapper item>
      <PosterWrapper>
        <PosterHeader {...props} />
        <PosterMedia {...props} />
        <PosterFooter {...props} />
      </PosterWrapper>
    </HomeRecentPosterWrapper>
  )
}

export default HomeRecentPoster

export const HomeRecentPosterWrapper = styled(Grid)<GridProps>(({ theme }) => ({
  width: '100%',
  height: '25rem',
  [theme.breakpoints.up('xs')]: {
    maxWidth: '100%'
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: 'calc(100% / 2)'
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: 'calc(100% / 3)'
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 'calc(100% / 4)'
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 'calc(100% / 5)'
  }
}))
