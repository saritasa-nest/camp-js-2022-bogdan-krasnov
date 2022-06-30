import { IAnime, IAnimeResponse } from '../core/types/anime';

const DEFAULT_OFFSET = 0;
function getPage(offset: number): void {
  const RES_URL = `https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?limit=5&offset=${offset}&ordering=id`;
  fetch(RES_URL)
    .then(response => response.json())
    .then(data => {
    getAnimeList(data);
  });
}

getPage(DEFAULT_OFFSET);

/**
 * Anime get function.
 * @param response Anime response object.
 */
function getAnimeList(response: IAnimeResponse): void {
  response.results.map((anime: IAnime) => {
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

// function nextPage(){
//   console.log('123')
// }
// const next = document.querySelector('.next')
// next.addEventListener('onclick', nextPage)
