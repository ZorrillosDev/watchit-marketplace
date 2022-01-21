import { RootStateOrAny } from 'react-redux'
import { Movie } from '@state/movies/types'

export const selectCollection = (state: RootStateOrAny): Movie[] => state.movies.collection
export const selectMovie = (state: RootStateOrAny): Movie => state.movies.movie
