import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie, MovieBid, MoviesState } from '@state/movies/types'
import { ResultState } from '@components/AlertState'

export type MoviesResultState = ResultState

export const initialState: MoviesState & MoviesResultState = {
  progress: 0,
  movie: {} as any,
  collection: [] as any,
  bidCollection: [] as any
}

const recentReducer = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovie (state: MoviesState, action: PayloadAction<Movie>) {
      state.movie = action.payload
    },
    setMovies (state: MoviesState, action: PayloadAction<Movie[]>) {
      state.collection = action.payload
    },
    setUploadProgress (state: MoviesState, action: PayloadAction<number>) {
      state.progress = action.payload
    },
    setBidsToMovie (state: MoviesState, action: PayloadAction<MovieBid[]>) {
      state.bidCollection = action.payload
    },
    addBidToMovie (state: MoviesState, action: PayloadAction<MovieBid>) {
      state.bidCollection.push(action.payload)
    },
    addMovie (state: MoviesState, action: PayloadAction<Movie>) {
      state.collection.push(action.payload)
    },
    setMovieResult: (state: MoviesResultState, action: PayloadAction<MoviesResultState>) => {
      state.result = action.payload.result
    }
  }
})

const { actions, reducer } = recentReducer
export const { setMovies, setMovie, setBidsToMovie, addMovie, setUploadProgress, addBidToMovie, setMovieResult } = actions
export default reducer
