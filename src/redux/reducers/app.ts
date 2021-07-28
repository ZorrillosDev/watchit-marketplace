import {createSlice} from '@reduxjs/toolkit'

type CounterState = {
    counter: number
}

const initialState = {counter: 0} as CounterState
export default createSlice({
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
