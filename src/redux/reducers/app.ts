import {createSlice} from '@reduxjs/toolkit'

export interface CounterState {
    counter: number
}

const initialState: CounterState = {counter: 0}
const counter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.counter += 1
        },
        decrement(state) {
            state.counter -= 1
        }
    }
})

const {actions, reducer} = counter
export const {increment, decrement} = actions
export default reducer
