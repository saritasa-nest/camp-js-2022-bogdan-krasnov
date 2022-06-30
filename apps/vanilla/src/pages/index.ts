import { IAnime, IAnimeResponse } from '../core/types/anime';

import { RES_URL } from './../core/constants/anime';

fetch(RES_URL)
  .then(response => response.json())
  .then(data => {
    getAnimeList(data);
  });

/**
 * Anime get function.
 * @param response Anime response object.
 */
function getAnimeList(response: IAnimeResponse) {
  response.results.map((anime: IAnime) => {
    renderAnime(anime);
  });
}

/**
 * Anime rendering function.
 * @param anime Anime object.
 */
function renderAnime(anime: IAnime) {
  const { title_eng, title_jpn, status, image, type } = anime;
  document.querySelector('table').innerHTML += `
  <tr>
    <td class="image"><img src="${image}" alt=""></td>
    <td>${title_eng}</td>
    <td>${title_jpn}</td>
    <td>${status}</td>
    <td>${type}</td>
  </tr>
  `;

}
