import { AnimeType } from '@js-camp/core/utils/enums/table';
import { Anime } from '@js-camp/core/models/anime';

import { getAnimeData, PaginationConfig } from '../core/utils/api';
import { checkNull } from '../core/utils/checkNull';
import { formatDate } from '../core/utils/date';

import { PAGE_SIZE_DEFAULT } from './../core/constants/anime';

import { Ordering } from './../core/enums/table';

/**
 * Refresh current page.
 * @param currentPage Current Page.
 * @param ordering Current ordering.
 * @param filtering Current filter.
 */
export async function updateAnimeList(currentPage: number, ordering: Ordering, filtering?: AnimeType): Promise<void> {
  const paginationConfig: PaginationConfig = { currentPage, ordering, filtering };
  const tbody = document.querySelector<HTMLTableElement>('.table-anime__body');
  checkNull(tbody);
  tbody.innerHTML = '';
  const animeData = await getAnimeData(paginationConfig);
  animeData.results.forEach(anime => {
    if (tbody.childElementCount < PAGE_SIZE_DEFAULT) {
      renderAnime(anime);
    }
  });
}

/**
 * Render single anime.
 * @param anime Anime object.
 */
function renderAnime(anime: Anime): void {
  const { titleEnglish, titleJapanese, status, imageSrc, type, airedStart } = anime;
  const tableBody = document.querySelector<HTMLTableElement>('.table-anime__body');
  checkNull(tableBody);
  tableBody.innerHTML += `
  <tr>
    <td><img src="${imageSrc}" class="image-anime"></td>
    <td class="table-anime__td-anime">${titleEnglish === '' ? 'NO NAME' : titleEnglish}</td>
    <td class="table-anime__td-anime">${titleJapanese === '' ? 'NO NAME' : titleJapanese}</td>
    <td class="table-anime__td-anime">${status}</td>
    <td class="table-anime__td-anime">${type}</td>
    <td class="table-anime__td-anime">${formatDate(airedStart)}</td>
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
