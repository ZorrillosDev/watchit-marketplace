import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, UserState} from '@state/users/types'

export const initialState: UserState = {creations: []}
const recentReducer = createSlice({
    name: 'creators',
    initialState,
    reducers: {
        setUsersCreations(state: UserState, action: PayloadAction<User[]>) {
            state.creations = action.payload
        }
    }
})

const {actions, reducer} = recentReducer
export const {setUsersCreations} = actions
export default reducer
