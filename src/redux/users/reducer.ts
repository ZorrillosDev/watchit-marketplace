import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from "@state/types/user";

export interface Userstate {
    collection: User[]
}

export const initialState: Userstate = {collection: []}
const recentReducer = createSlice({
    name: 'creators',
    initialState,
    reducers: {
        setUsers(state: Userstate, action: PayloadAction<User[]>) {
            state.collection = action.payload
        }
    }
})

const {actions, reducer} = recentReducer
export const {setUsers} = actions
export default reducer
