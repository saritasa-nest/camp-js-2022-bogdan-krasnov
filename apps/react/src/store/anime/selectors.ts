import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeAdapter } from './state';

export const selectAnimeList = createSelector(
  (state: RootState) => animeAdapter.getSelectors().selectAll(state.animeList),
  animeList => animeList,
);

export const selectAnimeListLoading = createSelector(
  (state: RootState) => state.animeList.isLoading,
  isLoading => isLoading,
);

export const selectErrorAnimeList = createSelector(
  (state: RootState) => state.animeList.error,
  error => error,
);
