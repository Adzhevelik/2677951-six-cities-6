import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { cityReducer } from './slices/city-slice';
import { offersReducer } from './slices/offers-slice';
import { currentOfferReducer } from './slices/current-offer-slice';
import { userReducer } from './slices/user-slice';
import { commentsReducer } from './slices/comments-slice';

const api = createAPI();

const rootReducer = combineReducers({
  city: cityReducer,
  offers: offersReducer,
  currentOffer: currentOfferReducer,
  user: userReducer,
  comments: commentsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
