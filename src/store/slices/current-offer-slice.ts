import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffer, fetchNearbyOffers } from '../action';

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
      });
  },
});

export const { setCurrentOffer, setNearbyOffers } = currentOfferSlice.actions;
export const currentOfferReducer = currentOfferSlice.reducer;
