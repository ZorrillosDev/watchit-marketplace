import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie, MoviesState } from '@state/movies/types'

export const initialState: MoviesState = {
  movie: {} as any,
  collection: [] as any
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
    addMovie (state: MoviesState, action: PayloadAction<Movie>) {
      state.collection.push(action.payload)
    }
  }
})

const { actions, reducer } = recentReducer
export const { setMovies, setMovie, addMovie } = actions
export default reducer
