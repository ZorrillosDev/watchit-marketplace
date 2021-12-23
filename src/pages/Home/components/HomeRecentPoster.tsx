// REACT IMPORTS
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

// MUI IMPORTS
import { Grid, styled, GridProps } from '@mui/material'

// PROJECT IMPORTS
import {
  PosterWrapper,
  PosterHeader,
  PosterFooter,
  PosterMedia
} from '@components/Poster'
import { Movie } from '@state/movies/types/movies'

// ===========================|| HOME - RECENT - POSTER ||=========================== //

const HomeRecentPoster: FC<Movie> = (props): JSX.Element => {
  const {
    creator,
    posters,
    path,
    title,
    price
  } = props

  return (
    <HomeRecentPosterWrapper item>
      <Link to={path} style={{ textDecoration: 'none' }}>
        <PosterWrapper>
          <PosterHeader creator={creator} />
          <PosterMedia image={posters.medium} name={title} />
          <PosterFooter price={price} name={title} />
        </PosterWrapper>
      </Link>
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
