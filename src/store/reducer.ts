import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setOffersLoadingStatus, fetchOffers } from './action';
import { Offer } from '../types/offer';
import { DEFAULT_CITY } from '../constants/cities';

type State = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
};

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    });
});
