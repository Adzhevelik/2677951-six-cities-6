import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers } from './action';
import { Offer } from '../types/offer';
import { DEFAULT_CITY } from '../constants/cities';

type State = {
  city: string;
  offers: Offer[];
};

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
