import { createSlice } from '@reduxjs/toolkit'

interface CounterState {
  counter: number
}

const initialState: CounterState = { counter: 0 }
const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment (state) {
      state.counter++
    },
    decrement (state) {
      state.counter--
    }
  }
})

const { actions, reducer } = counter
export const { increment, decrement } = actions
export default reducer
