// REACT IMPORTS
import React, { FC, useEffect, memo } from 'react';
import { connect, RootStateOrAny } from 'react-redux';

// MUI IMPORTS
import { Grid, Typography, Container, Button, useMediaQuery } from '@mui/material';

// PROJECT IMPORTS
import { FilterList } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/system';
import { MOVIES_COLUMNS, MOVIES_ROWS } from '@pages/Home/CONSTANTS';
import { fetchRecentMovies } from '@state/movies/actions';
import { Movie, MoviesState, MoviesActions } from '@state/movies/types';
import { selectCollection } from '@state/movies/selector';
import HomeRecentView from './HomeRecentView';

// ===========================|| HOME - RECENT ||=========================== //

const HomeRecentContainer: FC<MoviesState & MoviesActions> = (props): JSX.Element => {
  const theme: Theme = useTheme();
  let moviesColumns = MOVIES_COLUMNS;
  moviesColumns = useMediaQuery(theme.breakpoints.up('md')) ? 3 : moviesColumns;
  moviesColumns = useMediaQuery(theme.breakpoints.up('lg')) ? 4 : moviesColumns;
  moviesColumns = useMediaQuery(theme.breakpoints.up('xl')) ? 5 : moviesColumns;
  const { collection, fetchRecentMovies } = props;

  useEffect(() => {
    fetchRecentMovies();
  }, []);

  return (
    <Container>
      <Grid container alignItems='center' justifyContent='center' spacing={6}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='h2' color='text.primary' fontWeight={600}>
                Recent Movies
              </Typography>
            </Grid>
            <Grid item xs={6} display='flex' alignItems='center' justifyContent='flex-end'>
              <Button
                variant='outlined' color='primary' startIcon={<FilterList />}
                sx={{ borderRadius: '3rem !important' }}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} display='flex' alignItems='center' justifyContent='center'>
          <Grid container spacing={3}>
            {
              collection !== undefined
                ? collection.map((movie: Movie, i: number) => {
                  const moviesMax = moviesColumns * MOVIES_ROWS;
                  return (i < moviesMax)
                    ? <HomeRecentView {...movie} key={i} />
                    : <React.Fragment key={i} />;
                })
                : <></>
            }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapDispatchToProps: Partial<MoviesActions> = { fetchRecentMovies };
const mapStateToProps = (state: RootStateOrAny): Partial<MoviesState> => {
  const collection = selectCollection(state);
  return { collection };
};

export const HomeRecent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(HomeRecentContainer));
