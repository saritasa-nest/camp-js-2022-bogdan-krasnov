import { createSlice } from '@reduxjs/toolkit';

import { getAnimeList } from './dispatchers';
import { AnimeStateType, animeAdapter, initialState } from './state';

export const animeListSlice = createSlice({
  name: 'animeList',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(getAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAnimeList.fulfilled, (state, action) => {
      animeAdapter.setAll(state as AnimeStateType, action.payload);
      state.isLoading = false;
    })
    .addCase(getAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});
