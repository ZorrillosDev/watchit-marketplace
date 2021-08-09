import { createSlice } from '@reduxjs/toolkit'

interface WalletButtonState {
  connecting: boolean,
  connected: boolean,
  error: boolean
}


const initialState: WalletButtonState = {
  connected: false, connecting: false, error: false
}

const counter = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connect (state) {
      state.connecting = true
    },
    connected(state){
      state.connecting = false
      state.connected = true
    },
    error (state) {
      state.error = true
    }
  }
})

const { actions, reducer } = counter
export const { connect, connected, error } = actions
export default reducer
