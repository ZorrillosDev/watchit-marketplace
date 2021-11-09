import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie } from '@state/types/movies'

export interface RecentMoviesState {
  movies: Movie[]
}

export const initialState: RecentMoviesState = { movies: [] as any }
const recentReducer = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    setMovies (state: RecentMoviesState, action: PayloadAction<Movie[]>) {
      state.movies = action.payload
    },

    addMovie (state: RecentMoviesState, action: PayloadAction<Movie>) {
      state.movies.push(action.payload)
    }
  }
})

const { actions, reducer } = recentReducer
export const { setMovies, addMovie } = actions
export default reducer
