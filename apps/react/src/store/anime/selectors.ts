import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeAdapter } from './state';

export const { selectAll: selectAnimeList } = animeAdapter.getSelectors<RootState>(state => state.animeList);

export const selectAnimeListLoading = createSelector(
  (state: RootState) => state.animeList.isLoading,
  isLoading => isLoading,
);

export const selectErrorAnimeList = createSelector(
  (state: RootState) => state.animeList.error,
  error => error,
);
