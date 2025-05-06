import { configureStore } from "@reduxjs/toolkit";
import competition from '../features/competitions/competitionStateSlice';
import authAPI from '../features/auth/authAPI';
import authUserReducer from "../features/auth/currentUserSlice";
import competitionSlice from '../features/competitions/competitionSlice'; // הוסף את ה-import הזה

const store = configureStore({
  reducer: {
    competition,
    authUser: authUserReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [competitionSlice.reducerPath]: competitionSlice.reducer, // הוסף את ה-reducer של ה-API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, competitionSlice.middleware), // הוסף את ה-middleware של ה-API
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
