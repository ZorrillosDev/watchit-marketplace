import { RootStateOrAny } from 'react-redux';
import { Movie } from '@state/movies/types';

export const selectSearchResult = (state: RootStateOrAny): Movie[] => state.movies.searchResult;
export const selectUploadProgress = (state: RootStateOrAny): number => state.movies.progress;
export const selectCollection = (state: RootStateOrAny): Movie[] => state.movies.collection;
export const selectMovie = (state: RootStateOrAny): Movie => state.movies.movie;
