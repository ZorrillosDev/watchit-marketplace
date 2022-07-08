// REACT IMPORTS
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// MUI IMPORTS
import { styled, BoxProps, Box } from '@mui/material';

// PROJECT IMPORTS
import {
  PosterWrapper,
  PosterHeader,
  PosterFooter,
  PosterMedia,
} from '@components/Poster';
import { Movie } from '@state/movies/types/movies';

// ===========================|| HOME - RECENT - POSTER ||=========================== //

const ProfilePoster: FC<Movie> = (props): JSX.Element => {
  const {
    creator,
    posters,
    path,
    title,
    price,
  } = props;

  return (
    <ProfilePosterWrapper>
      <Link to={`m${path}`} style={{ textDecoration: 'none' }}>
        <PosterWrapper sx={{ pb: '0.5rem' }}>
          <PosterHeader creator={creator} />
          <PosterMedia image={posters.medium} name={title} />
          <PosterFooter price={price} name={title} />
        </PosterWrapper>
      </Link>
    </ProfilePosterWrapper>
  );
};

export default ProfilePoster;

export const ProfilePosterWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  marginTop: '0.5rem',
  marginRight: 'auto',
  marginLeft: 'auto',
  height: '21rem',
  [theme.breakpoints.up('xl')]: {
    maxWidth: 'calc((100% / 5) - 0.5rem)',
    // marginRight: 'auto',
    // '&:nth-of-type(5n)': {
    //   marginRight: '0',
    // },
  },
  [theme.breakpoints.down('xl')]: {
    maxWidth: 'calc((100% / 4) - 0.5rem)',
    // marginRight: 'auto',
    // '&:nth-of-type(4n)': {
    //   marginRight: '0',
    // },
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 'calc((100% / 3) - 0.5rem)',
    // marginRight: 'auto',
    // '&:nth-of-type(3n)': {
    //   marginRight: '0',
    // },
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 'calc((100% / 2) - 0.5rem)',
    // marginRight: 'auto',
    // '&:nth-of-type(2n)': {
    //   marginRight: '0',
    // },
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: '100%',
    // marginRight: '0',
  },
}));
