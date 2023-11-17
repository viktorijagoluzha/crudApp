import {configureStore} from '@reduxjs/toolkit';
import avatarEditSlice from '../features/avatarEditSlice';
import postsSlice from '../features/postsSlice';
import authReducer from '../features/authenticationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    avatar: avatarEditSlice,
    posts: postsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
