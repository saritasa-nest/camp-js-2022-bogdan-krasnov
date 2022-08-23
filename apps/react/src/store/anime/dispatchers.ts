import { AnimeListSearchParams } from '@js-camp/core/models/anime-list-search-params';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'anime/animeList',
  async(animeListSearchParams: AnimeListSearchParams) => {
    const animeList = await AnimeService.getAnimeList(animeListSearchParams);
    return animeList;
  },
);
