// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import { Grid, GridProps, styled, Typography } from '@mui/material';

// PROJECT IMPORTS
import { Color } from '@src/utils';
import { Movie } from '@state/movies/types';
import TruncatedTypography from '@components/TruncatedTypography';
import Poster from '@components/Poster';
import { IconStar } from '@tabler/icons';

// ===========================|| NOTIFICATIONS - ITEM ||=========================== //

const SearchItem: FC<Movie> = ({ ...movie }): JSX.Element => {
  return (
    <SearchItemWrapper item xs={12} display='flex' sx={{ p: '0' }}>
      <Poster image={movie.posters.small} name={movie.title} />
      <Grid container sx={{ p: 1 }}>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h4' color='primary'>
                {movie.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TruncatedTypography lines={4} sx={{ m: 0 }}>
                {movie.synopsis}
              </TruncatedTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h5' color='secondary' textAlign='right' fontWeight='bold'>
                {movie.year}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5' color='secondary' textAlign='right'>
                <IconStar />
                {movie.rating}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SearchItemWrapper>
  );
};

const SearchItemWrapper = styled(Grid)<GridProps>(({ theme }) => ({
  cursor: 'pointer',
  padding: '16px',
  '& > .MuiCard-root': {
    width: '6rem',
  },
  '& svg': {
    display: 'inline',
    width: '1rem',
    height: '1rem',
    marginRight: '0.25rem',
    transform: 'translateY(3px)',
  },
  '&:hover': {
    background: Color.addAlpha(theme.palette.primary.light, 0.3),
  },
  '&:last-of-type': {
    borderBottomRightRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
}));

export default SearchItem;
