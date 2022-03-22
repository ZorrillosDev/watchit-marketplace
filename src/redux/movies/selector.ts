import { RootStateOrAny } from 'react-redux'
import { Movie, MovieBid } from '@state/movies/types'
import { MoviesResultState } from '@state/movies/reducer'

export const selectBidCollection = (state: RootStateOrAny): MovieBid[] => state.movies.bidCollection
export const selectUploadProgress = (state: RootStateOrAny): number => state.movies.progress
export const selectCollection = (state: RootStateOrAny): Movie[] => state.movies.collection
export const selectMovie = (state: RootStateOrAny): Movie => state.movies.movie
export const selectMovieResult = (state: RootStateOrAny): MoviesResultState => state.movies.result
