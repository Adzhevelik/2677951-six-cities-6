import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffer, fetchNearbyOffers, toggleFavorite } from '../action';

type CurrentOfferState = {
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
};

const initialState: CurrentOfferState = {
  currentOffer: null,
  nearbyOffers: [],
};

export const currentOfferSlice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {
    setCurrentOffer: (state, action: PayloadAction<Offer | null>) => {
      state.currentOffer = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.currentOffer = null;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (state.currentOffer?.id === updatedOffer.id) {
          state.currentOffer = updatedOffer;
        }
        const index = state.nearbyOffers.findIndex((offer) => offer.id === updatedOffer.id);
        if (index !== -1) {
          state.nearbyOffers[index] = updatedOffer;
        }
      });
  },
});

export const { setCurrentOffer, setNearbyOffers } = currentOfferSlice.actions;
export const currentOfferReducer = currentOfferSlice.reducer;
