import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  setOffersLoadingStatus,
  fetchOffers,
  setAuthorizationStatus,
  setUser,
  checkAuth,
  login,
  logout,
  setCurrentOffer,
  setNearbyOffers,
  setComments,
  fetchOffer,
  fetchNearbyOffers,
  fetchComments,
  postComment
} from './action';
import { Offer } from '../types/offer';
import { User } from '../types/user';
import { Review } from '../types/review';
import { DEFAULT_CITY } from '../constants/cities';
import { AuthorizationStatus } from '../constants/auth';

type State = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
};

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
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
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(fetchOffer.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.currentOffer = null;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(postComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
});
