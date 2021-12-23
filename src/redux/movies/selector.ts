import { RootStateOrAny } from 'react-redux'
import { Movie } from '@state/movies/types'

export const selectCollection = (state: RootStateOrAny): Movie[] => state.movies.collection
