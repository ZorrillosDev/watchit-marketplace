import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BidState, Bid } from './types'

export const initialState: BidState = {
  bids: [] as any
}

const bidReducer = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setBidsToMovie (state: BidState, action: PayloadAction<Bid[]>) {
      state.bids = action.payload
    },
    addBidToMovie (state: BidState, action: PayloadAction<Bid>) {
      state.bids.push(action.payload)
    }
  }
})

const { actions, reducer } = bidReducer
export const {setBidsToMovie, addBidToMovie } = actions
export default reducer
