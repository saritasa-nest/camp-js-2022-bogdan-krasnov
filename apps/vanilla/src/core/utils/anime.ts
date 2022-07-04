import { IAnime } from '../types/anime';

/**
 * Anime rendering function.
 * @param anime Anime object.
 */
export function renderAnime(anime: IAnime): void {
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
