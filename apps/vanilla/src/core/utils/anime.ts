import { IAnime, IAnimeResponse } from "../types/anime";

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
