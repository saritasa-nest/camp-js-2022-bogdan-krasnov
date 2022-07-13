import { Anime } from '@js-camp/core/models/anime';

import { getAnimeData, PaginationConfig } from '../core/utils/api';
import { formatDate } from '../core/utils/date';

import { Ordering } from './../core/enums/table';

/**
 * Refresh current page.
 * @param currentPage Current Page.
 * @param currentSorting Current sorting.
 */
export async function updateAnimeList(currentPage: number, currentSorting: Ordering): Promise<void> {
  const ordering = currentSorting;
  const paginationConfig: PaginationConfig = { currentPage, ordering };
  const tbody = document.querySelector<HTMLTableElement>('.table-anime__body');
  if (tbody === null) {
    throw new Error('No table');
  }
  tbody.innerHTML = '';

  const animeData = await getAnimeData(paginationConfig);
  animeData.results.forEach(anime => renderAnime(anime))
}

/**
 * Rendering of one anime.
 * @param anime Anime object.
 */
function renderAnime(anime: Anime): void {
  const { titleEnglish: titleEng, titleJapanese: titleJpn, status, image, type, aired } = anime;
  const table = document.querySelector<HTMLTableElement>('.table-anime__body');
  if (table === null) {
    throw new Error('no table');
  }
  table.innerHTML += `
  <tr>
    <td class="imageAnime"><img src="${image}" alt="Anime image"></td>
    <td>${titleEng === '' ? 'NO NAME' : titleEng}</td>
    <td>${titleJpn === '' ? 'NO NAME' : titleJpn}</td>
    <td>${status}</td>
    <td>${type}</td>
    <td>${formatDate(aired.start)}</td>
  </tr>
  `;
}
