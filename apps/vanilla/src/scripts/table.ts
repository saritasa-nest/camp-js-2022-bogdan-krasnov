import { Anime } from '@js-camp/core/models/anime';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { getAnimeData } from '../core/utils/api';

/**
 * Refresh current page function.
 * @param currentPage Current Page.
 * @param currentSorting Current sorting.
 */
export function updateAnimeList(currentPage: number, currentSorting: string): void {
  const animeData = getAnimeData(currentPage, currentSorting);
  setAnimeAsync(animeData);
}

/**
 * Anime set function.
 * @param response Anime response object.
 * @todo Fix table.innerHTML.
 */
const setAnimeAsync = async(response: Promise<PaginationDto<Anime>>): Promise<void> => {
    const tbody = document.querySelector<HTMLTableElement>('tbody');
    if (tbody === null) {
      throw new Error('No table');
    }
    tbody.innerHTML = '';
    (await response).results.forEach((anime: Anime) => renderAnime(anime));
  };

/**
 * Anime rendering function.
 * @param anime Anime object.
 */
function renderAnime(anime: Anime): void {
  const { titleEng, titleJpn, status, image, type, aired } = anime;
  const table = document.querySelector<HTMLTableElement>('tbody');
  if (table === null) {
    throw new Error('no table');
  }
  table.innerHTML += `
  <tr>
    <td class="image"><img src="${image}" alt=""></td>
    <td>${titleEng === '' ? 'NO NAME' : titleEng}</td>
    <td>${titleJpn === '' ? 'NO NAME' : titleJpn}</td>
    <td>${status}</td>
    <td>${type}</td>
    <td>${formatDate(aired.start)}</td>
  </tr>
  `;
}

/**
 * The function of converting data to date format.
 * @param dateReceived Data coming from the server .
 */
function formatDate(dateReceived: Date): string {
  const date = new Date(dateReceived);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleString('ru', options);
}
