import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { User } from '../types/user';
import { Review } from '../types/review';
import { AuthorizationStatus } from '../constants/auth';
import { saveToken, dropToken } from '../services/token';

export const changeCity = createAction<string>('city/change');
export const loadOffers = createAction<Offer[]>('offers/load');
export const setOffersLoadingStatus = createAction<boolean>('offers/setLoadingStatus');
export const setAuthorizationStatus =
  createAction<AuthorizationStatus>('user/setAuthorizationStatus');
export const setUser = createAction<User | null>('user/setUser');
export const setCurrentOffer = createAction<Offer | null>('offer/setCurrent');
export const setNearbyOffers = createAction<Offer[]>('offer/setNearby');
export const setComments = createAction<Review[]>('comments/set');

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);

export const checkAuth = createAsyncThunk<
  User,
  undefined,
  { extra: AxiosInstance }
>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>('/login');
    return data;
  }
);

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { extra: AxiosInstance }
>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<User>('/login', { email, password });
    saveToken(data.token);
    return data;
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete('/logout');
    dropToken();
  }
);

export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  { extra: AxiosInstance }
>(
  'offer/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`/offers/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  { extra: AxiosInstance }
>(
  'offer/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);

export const fetchComments = createAsyncThunk<
  Review[],
  string,
  { extra: AxiosInstance }
>(
  'comments/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  }
);

export const postComment = createAsyncThunk<
  Review,
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance }
>(
  'comments/post',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(
      `/comments/${offerId}`,
      { comment, rating }
    );
    return data;
  }
);

export const toggleFavorite = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  { extra: AxiosInstance }
>(
  'favorites/toggle',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<Offer>(
      `/favorite/${offerId}/${status}`
    );
    return data;
  }
);

export const fetchFavorites = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>(
  'favorites/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/favorite');
    return data;
  }
);
