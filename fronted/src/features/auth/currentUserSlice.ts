import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { userInfo } from "./authTypes";
import { RootState } from '../../app/store';

interface AuthState {
  user: userInfo | null;
}

const userFromStorage = typeof window !== 'undefined' && localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : null;

const initialState: AuthState = {
  user: userFromStorage,
};


const authUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
   setUser(state, action: PayloadAction<userInfo>) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); 
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, clearUser } = authUserSlice.actions;
export const selectCurrentUser = (state: RootState) => state.authUser.user;

export default authUserSlice.reducer;
