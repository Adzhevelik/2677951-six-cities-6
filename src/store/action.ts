import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';

export const changeCity = createAction<string>('city/change');
export const loadOffers = createAction<Offer[]>('offers/load');
export const setOffersLoadingStatus = createAction<boolean>('offers/setLoadingStatus');

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);
