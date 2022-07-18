import { FIRST_PAGE } from '../core/constants/anime';
import { getAnimeData } from '../core/utils/api';

import { Table } from './table';

window.addEventListener('DOMContentLoaded', () => {
  renderTableAnime();
});

/**
 * New table return.
 */
async function renderTableAnime(): Promise<Table> {
  const animeData = await getAnimeData({ currentPage: FIRST_PAGE });
  return new Table(animeData.count);
}
