import { Anime } from '@js-camp/core/models/anime';

import { getAnimeData, PaginationConfig } from '../core/utils/api';
import { checkNullUndefined } from '../core/utils/checkNullUndefined';
import { formatDate } from '../core/utils/date';

import { Ordering } from './../core/enums/table';

/**
 * Refresh current page.
 * @param currentPage Current Page.
 * @param currentOrdering Current ordering.
 */
export async function updateAnimeList(currentPage: number, currentOrdering: Ordering): Promise<void> {
  const ordering = currentOrdering;
  const paginationConfig: PaginationConfig = { currentPage, ordering };
  const tbody = document.querySelector<HTMLTableElement>('.table-anime__body');
  checkNullUndefined(tbody);
  tbody.innerHTML = '';
  const animeData = await getAnimeData(paginationConfig);
  animeData.results.forEach(anime => {
    if (tbody.childElementCount < 5) {
      renderAnime(anime);
    }
  });
}

/**
 * Render single anime.
 * @param anime Anime object.
 */
function renderAnime(anime: Anime): void {
  const { titleEnglish, titleJapanese, status, image, type, airedStart } = anime;
  const tableBody = document.querySelector<HTMLTableElement>('.table-anime__body');
  checkNullUndefined(tableBody);
  tableBody.innerHTML += `
  <tr>
    <td><img src="${image}" class="image-anime" alt="Anime image"></td>
    <td class="table-anime__td-anime">${titleEnglish === '' ? 'NO NAME' : titleEnglish}</td>
    <td class="table-anime__td-anime">${titleJapanese === '' ? 'NO NAME' : titleJapanese}</td>
    <td class="table-anime__td-anime">${status}</td>
    <td class="table-anime__td-anime">${type}</td>
    <td class="table-anime__td-anime">${formatDate(airedStart)}</td>
  </tr>
  `;
}
