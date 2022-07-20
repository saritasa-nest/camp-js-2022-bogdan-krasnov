import { AnimeType } from '@js-camp/core/utils/enums/table';
import { Anime } from '@js-camp/core/models/anime';

import { getAnimeData, PaginationConfig } from '../core/utils/api';
import { formatDate } from '../core/utils/date';

import { Ordering } from './../core/enums/table';

/**
 * Refresh current page.
 * @param currentPage Current Page.
 * @param currentSorting Current sorting.
 * @param currentFilter Current filter.
 */
export async function updateAnimeList(currentPage: number, currentSorting: Ordering, currentFilter?: AnimeType): Promise<void> {
  const filtering = currentFilter;
  const ordering = currentSorting;
  const paginationConfig: PaginationConfig = { currentPage, ordering, filtering };
  const tbody = document.querySelector<HTMLTableElement>('.table-anime__body');
  if (tbody === null) {
    throw new Error('No table');
  }
  tbody.innerHTML = '';

  const animeData = await getAnimeData(paginationConfig);
  animeData.results.forEach(anime => renderAnime(anime));
}

/**
 * Rendering of one anime.
 * @param anime Anime object.
 */
function renderAnime(anime: Anime): void {
  const { titleEnglish, titleJapanese, status, image, type, airedStart } = anime;
  const table = document.querySelector<HTMLTableElement>('.table-anime__body');
  if (table === null) {
    throw new Error('no table');
  }
  table.innerHTML += `
  <tr>
    <td class="imageAnime"><img src="${image}" alt="Anime image"></td>
    <td>${titleEnglish === '' ? 'NO NAME' : titleEnglish}</td>
    <td>${titleJapanese === '' ? 'NO NAME' : titleJapanese}</td>
    <td>${status}</td>
    <td>${type}</td>
    <td>${formatDate(airedStart)}</td>
  </tr>
  `;
}

/**
 * Returns the current number of anime.
 * @param currentPage Current Page.
 * @param ordering Current ordering.
 * @param filtering Current filter.
 */
export async function countAnime(currentPage: number, ordering: Ordering, filtering?: AnimeType): Promise<number> {
  const { count } = await getAnimeData({ currentPage, ordering, filtering });
  return count;
}
