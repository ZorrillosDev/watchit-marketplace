import {createSlice} from '@reduxjs/toolkit'

type CounterState = {
    counter: number
}

const initialState = {counter: 0} as CounterState
const counter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        }
    }
})

export const {increment, decrement} = counter.actions
export default counter.reducer
