import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie } from '@state/types/movies'

export interface MoviesState {
  collection: Movie[]
}

export const initialState: MoviesState = { collection: [] as any }
const recentReducer = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies (state: MoviesState, action: PayloadAction<Movie[]>) {
      state.collection = action.payload
    },

    addMovie (state: MoviesState, action: PayloadAction<Movie>) {
      state.collection.push(action.payload)
    }
  }
})

const { actions, reducer } = recentReducer
export const { setMovies, addMovie } = actions
export default reducer
