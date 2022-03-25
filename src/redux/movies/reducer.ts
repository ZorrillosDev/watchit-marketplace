import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie, MoviesState } from '@state/movies/types'

export const initialState: MoviesState = {
  progress: 0,
  movie: {} as any,
  collection: [] as any
}

const movieReducer = createSlice({
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

    addMovie (state: MoviesState, action: PayloadAction<Movie>) {
      state.collection.push(action.payload)
    }
  }
})

const { actions, reducer } = movieReducer
export const { setMovies, setMovie, addMovie, setUploadProgress } = actions
export default reducer
