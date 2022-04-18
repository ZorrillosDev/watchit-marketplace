import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '@state/users/types';

export const initialState: UserState = { creators: [] };
const recentReducer = createSlice({
  name: 'creators',
  initialState,
  reducers: {
    setCreators(state: UserState, action: PayloadAction<User[]>) {
      state.creators = action.payload;
    },
  },
});

const { actions, reducer } = recentReducer;
export const { setCreators } = actions;
export default reducer;
