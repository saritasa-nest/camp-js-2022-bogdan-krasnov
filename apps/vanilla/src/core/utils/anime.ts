import { Anime } from './../../../../../libs/core/models/anime';

/**
 * Anime rendering function.
 * @param anime Anime object.
 */
export function renderAnime(anime: Anime): void {
  const { titleEng, titleJpn, status, image, type } = anime;
  const table = document.querySelector<HTMLTableElement>('table');
  if (table === null) {
    throw new Error('no table');
  }
  table.innerHTML += `
  <tr>
    <td class="image"><img src="${image}" alt=""></td>
    <td>${titleEng}</td>
    <td>${titleJpn}</td>
    <td>${status}</td>
    <td>${type}</td>
  </tr>
  `;
}
