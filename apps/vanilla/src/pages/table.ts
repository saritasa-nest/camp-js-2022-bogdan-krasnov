import { IAnime, IAnimeResponse } from '../core/types/anime';
import { renderAnime } from '../core/utils/anime';
import { apiAnimeTable } from '../core/utils/api';
import { createButtonPagination } from '../scripts/pagination';

/**
 * Table anime class.
 * @param currentPage Current Page.
 * @param pageQuantity Page Quantity.
 */
export default class Table {
  public constructor() {
    this.currentPage = 1;
    this.setPagination();
    this.getAnimeList(apiAnimeTable());
  }

  private currentPage: number | undefined;

  // private pageQuantity: number | undefined; TODO

  /**
   * Anime get function.
   * @param response Anime response object.
   */
  public async getAnimeList(response: Promise<IAnimeResponse>): Promise<void> {
    const table = document.querySelector<HTMLTableElement>('table');
    table.innerHTML = `
    <tr>
    <td>Image</td>
    <td>Title english</td>
    <td>Title japanese</td>
    <td>Status</td>
    <td>Type</td>
    </tr>
    `;
    (await response).results.forEach((anime: IAnime) => {
    renderAnime(anime);
    });
  }

  /**
   * Pagination function.
   */
  public setPagination(): void {
    const pages = document.querySelector('.pagination');

    const nextLink = createButtonPagination('Next');
    const prevLink = createButtonPagination('Prev');
    prevLink.classList.add('prev');

    nextLink.addEventListener('click', () => {
      this.updateCurrentPage(nextLink);
    });

    prevLink.addEventListener('click', () => {
      this.updateCurrentPage(prevLink);
    });

    if (pages === null) {
      throw new Error('no table');
    }

    /** @todo Make the button turn on when we go to the next page. */

    // if (this.currentPage <= 1) {
    //   prevLink.disabled = true;
    // }
    pages.appendChild(prevLink);
    pages.appendChild(nextLink);
  }

  /**
   * Refresh current page function.
   * @param pageButton Button in page.
   * @todo Fix checking for null and undefined.
   */
  public updateCurrentPage(pageButton: HTMLButtonElement): void {
    if (this.currentPage === undefined) {
      throw new Error('no table');
    }
    const pageValue = pageButton.innerText;
    if (pageValue === 'Next') {
      this.currentPage++;
    }
    if (pageValue === 'Prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getAnimeList(apiAnimeTable(this.currentPage));

  }
}
