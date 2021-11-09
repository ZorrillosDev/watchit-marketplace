import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Movie} from "@state/types";

export interface RecentMoviesState {
    recent: Movie[]
}

const initialState: RecentMoviesState = {recent: [] as any}
const counter = createSlice({
    name: 'recent',
    initialState,
    reducers: {
        setMovies(state: RecentMoviesState, action: PayloadAction<Movie[]>) {
            state.recent = action.payload
        },

        addMovie(state: RecentMoviesState, action: PayloadAction<Movie>) {
            state.recent.push(action.payload)
        }
    }
})

const {actions, reducer} = counter
export const {setMovies, addMovie} = actions
export default reducer
