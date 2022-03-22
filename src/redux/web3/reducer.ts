import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Web3CallResult, Web3State } from '@state/web3/types'

export const initialState: Web3State = {
  callResult: {} as any
}

const recentReducer = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setCallResult (state: Web3State, action: PayloadAction<Web3CallResult>) {
      state.callResult = action.payload
    }
  }
})

const { actions, reducer } = recentReducer
export const { setCallResult } = actions
export default reducer
