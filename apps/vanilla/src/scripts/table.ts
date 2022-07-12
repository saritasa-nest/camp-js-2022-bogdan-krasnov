import { Anime } from '@js-camp/core/models/anime';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { getAnimeData, PaginationConfig } from '../core/utils/api';
import { formatDate } from '../core/utils/date';

import { Ordering } from './../core/constants/anime';

/**
 * Refresh current page function.
 * @param currentPage Current Page.
 * @param currentSorting Current sorting.
 */
export function updateAnimeList(currentPage: number, currentSorting: Ordering): void {
  const ordering = currentSorting;
  const paginationConfig: PaginationConfig = { currentPage, ordering };
  const tbody = document.querySelector<HTMLTableElement>('tbody');
  if (tbody === null) {
    throw new Error('No table');
  }
  tbody.innerHTML = '';

  const animeData = getAnimeData(paginationConfig);
  setAnime(animeData);
}

/**
 * A function that transmits data for rendering anime.
 * @param response Anime response object.
 */
const setAnime = async(response: Promise<PaginationDto<Anime>>): Promise<void> => {
    (await response).results.forEach(anime => renderAnime(anime));
  };

/**
 * Single anime rendering function.
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
    <td class="imageAnime"><img src="${image}" alt="Anime image"></td>
    <td>${titleEng === '' ? 'NO NAME' : titleEng}</td>
    <td>${titleJpn === '' ? 'NO NAME' : titleJpn}</td>
    <td>${status}</td>
    <td>${type}</td>
    <td>${formatDate(aired.start)}</td>
  </tr>
  `;
}
