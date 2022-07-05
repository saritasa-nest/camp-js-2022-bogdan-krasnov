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
    this.setAnimeList(apiAnimeTable());
  }

  private currentPage: number | undefined;

  // private pageQuantity: number | undefined; TODO

  /**
   * Anime get function.
   * @param response Anime response object.
   */
  public async setAnimeList(response: Promise<IAnimeResponse>): Promise<void> {
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
    const pages = document.querySelector<HTMLDivElement>('.pagination');
    const NUMBER_ADDITIONAL_BUTTON = 3;

    const nextButton = createButtonPagination('>>');
    const prevButton = createButtonPagination('<<', true, );
    const pointsButton = createButtonPagination('...', true)
    const pageQuantityButton = createButtonPagination('1000')
    // prevLink.classList.add('prev');

    nextButton.addEventListener('click', () => {
      this.updateCurrentPage(nextButton);
    });

    prevButton.addEventListener('click', () => {
      this.updateCurrentPage(prevButton);
    });

    if (pages === null) {
      throw new Error('no table');
    }

    /** @todo Make the button turn on when we go to the next page. */

    // if (this.currentPage <= 1) {
    //   prevLink.disabled = true;
    // }
    pages.appendChild(prevButton);
    for (let i = 1; i <= NUMBER_ADDITIONAL_BUTTON; i++) {
      const buttonNumber = createButtonPagination(i)
      buttonNumber.addEventListener('click', () => {
        this.updateCurrentPage(buttonNumber)
      })
      pages.appendChild(buttonNumber);
    }
    pages.appendChild(pointsButton);
    pages.appendChild(pageQuantityButton  )
    pages.appendChild(nextButton);
  }

  /**
   * Refresh current page function.
   * @param pageButton Button in page.
   * @todo Fix checking for null and undefined.
   */
  public updateCurrentPage(pageButton: HTMLButtonElement): void {
    const pageValue = pageButton.innerText;
    if (this.currentPage === undefined) {
      throw new Error('no table');
    }
    if (pageValue === '>>') {
      this.currentPage++;
      console.log(this.currentPage)
    }
    if (pageValue === '<<' && this.currentPage > 1) {
      this.currentPage--;
    }
    /** @todo added if for buttonNumber(1,2,3 ...) */
    // if(pageValue === ''){
    //   this.currentPage = i;
    // }
    this.setAnimeList(apiAnimeTable(this.currentPage));
  }
}
