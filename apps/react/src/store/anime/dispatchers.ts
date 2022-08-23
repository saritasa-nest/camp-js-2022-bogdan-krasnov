import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'anime/animeList',
  async() => {
    const animeList = await AnimeService.getAnimeList();
    return animeList;
  },
);
