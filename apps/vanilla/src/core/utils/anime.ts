import { IAnime, IAnimeResponse } from '../types/anime';

import { DEFAULT_LIMIT, DEFAULT_OFFSET } from './../constants/anime';

/**
 * Reception function with a configured URL.
 * @param limit Number of anime per page.
 * @param offset Offset of pages.
 */
export function getUrl(limit: number = DEFAULT_LIMIT, offset: number = DEFAULT_OFFSET): string {
  // const url = paginatorFunction(limit);
  return `https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?limit=${limit}&offset=${offset}&ordering=id`;
}

/**
 * Anime get function.
 * @param response Anime response object.
 */
export function getAnimeList(response: IAnimeResponse): void {
  response.results.forEach((anime: IAnime) => {
    renderAnimeRow(anime);
  });
}

/**
 * Anime rendering function.
 * @param anime Anime object.
 */
function renderAnimeRow(anime: IAnime): void {
  const { title_eng, title_jpn, status, image, type } = anime;
  const table = document.querySelector<HTMLTableElement>('table');
  if (table === null) {
    throw new Error('no table');
  }
  table.innerHTML += `
  <tr>
    <td class="image"><img src="${image}" alt=""></td>
    <td>${title_eng}</td>
    <td>${title_jpn}</td>
    <td>${status}</td>
    <td>${type}</td>
  </tr>
  `;
}

// export function paginatorFunction(limit: number) {
//   DEFAULT_OFFSET += 5;
//   return `https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?limit=${limit}&offset=${DEFAULT_OFFSET}&ordering=id`;
// }
