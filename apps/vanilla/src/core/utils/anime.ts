import { Anime } from '@js-camp/core/models/anime';

/**
 * Anime rendering function.
 * @param anime Anime object.
 */
export function renderAnime(anime: Anime): void {
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
 * Anime rendering function.
 * @param anime Anime object.
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
