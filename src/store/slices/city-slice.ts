import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../constants/cities';

type CityState = {
  currentCity: string;
};

const initialState: CityState = {
  currentCity: DEFAULT_CITY,
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
  },
});

export const { changeCity } = citySlice.actions;
export const cityReducer = citySlice.reducer;
