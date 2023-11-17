import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
  username: string;
  password: string;
}

interface AuthenticationState {
  user: User | null;
}

const initialState: AuthenticationState = {
  user: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: state => {
      state.user = null;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user = { ...state.user, username: action.payload };
      }
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user = { ...state.user, password: action.payload };
      }
    },
  },
});

export const {loginUser, logoutUser, updateUsername, updatePassword} =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
