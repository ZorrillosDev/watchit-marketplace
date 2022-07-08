// react imports
import React, { FC } from 'react';
// import { useParams } from 'react-router';

// project imports
import { MovieProfileView } from '@pages/Movie/MovieProfileView';
import { fetchMovieProfile } from '@state/movies/actions';
import { connect, RootStateOrAny } from 'react-redux';
import { selectMovie } from '@state/movies/selector';
import { MoviesActions, MoviesState } from '@state/movies/types';
import { FAKE_MOVIES } from '@src/config';

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE PROFILE CONTAINER ||=========================== //

export const MovieProfileContainer: FC<MoviesState & MoviesActions> = (): JSX.Element => {
  // const { fetchMovieProfile, movie } = props;
  // const { id } = useParams<MovieArgs>();
  //
  // useEffect((): void => {
  //   fetchMovieProfile({ id });
  // }, []);

  // return (Object.keys(movie).length > 0 ? <MovieProfileView {...movie} /> : <></>);
  return (<MovieProfileView {...FAKE_MOVIES[0]} />);
};

const mapDispatchToProps: Partial<MoviesActions> = { fetchMovieProfile };
const mapStateToProps = (state: RootStateOrAny): Partial<MoviesState> => {
  const movie = selectMovie(state);
  return { movie };
};

export const MovieProfile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieProfileContainer);
