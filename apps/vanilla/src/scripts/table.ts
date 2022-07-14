import { Anime } from '@js-camp/core/models/anime';

import { getAnimeData, PaginationConfig } from '../core/utils/api';
import { formatDate } from '../core/utils/date';

import { Ordering } from './../core/enums/table';

/**
 * Refresh current page.
 * @param currentPage Current Page.
 * @param currentSorting Current sorting.
 * @param search Search line.
 */
export async function updateAnimeList(currentPage: number, currentSorting: Ordering, search: string): Promise<void> {
  const ordering = currentSorting;
  const paginationConfig: PaginationConfig = { currentPage, ordering, search };
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
