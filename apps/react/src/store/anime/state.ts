import { Anime } from '@js-camp/core/models/anime';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeAdapter = createEntityAdapter<Anime>({
  selectId: anime => anime.id,
});

/** Anime state. */
export interface AnimeState {

  /** Whether anime list is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: string;

}

export const initialState = animeAdapter.getInitialState<AnimeState>({
  isLoading: false,
});

export type AnimeStateType = typeof initialState;
