import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffers, toggleFavorite } from '../action';

type OffersState = {
  offers: Offer[];
  isLoading: boolean;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const index = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        if (index !== -1) {
          state.offers[index] = updatedOffer;
        }
      });
  },
});

export const { setOffers } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
