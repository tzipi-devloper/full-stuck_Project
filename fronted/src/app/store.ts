import { configureStore } from "@reduxjs/toolkit";
import competition from '../features/competitions/competitionStateSlice';
import authAPI from '../features/auth/authAPI';
import authUserReducer from "../features/auth/currentUserSlice";
import competitionSlice from '../features/competitions/competitionSlice';

const store = configureStore({
  reducer: {
    competition,
    authUser: authUserReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [competitionSlice.reducerPath]: competitionSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, competitionSlice.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
