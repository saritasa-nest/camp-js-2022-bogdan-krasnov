import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime';

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
  public async setAnimeList(response: Promise<PaginationDto<Anime>>): Promise<void> {
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
    (await response).results.forEach((anime: Anime) => {
    renderAnime(anime);
    });
  }

  /**
   * Pagination function.
   */
  public setPagination(): void {
    const pagination = document.querySelector<HTMLDivElement>('.pagination');
    /** @todo Creating function checking undefined and null for any element. */
    if (pagination === null) {
      throw new Error('no table');
    }
    if (this.currentPage === undefined) {
      throw new Error('no table');
    }
    pagination.innerHTML = ``;
    const COUNT_ADDITIONALLY_BUTTONS = 3;

    const nextButton = createButtonPagination('>>');
    const prevButton = createButtonPagination('<<', true);
    const pointsButton = createButtonPagination('...', true);

    const pageQuantityButton = createButtonPagination('1000');

    nextButton.addEventListener('click', () => {
      this.updateCurrentPage(nextButton);
    });

    prevButton.addEventListener('click', () => {
      this.updateCurrentPage(prevButton);
    });

    pagination.appendChild(prevButton);
    for (let i = this.currentPage; i < COUNT_ADDITIONALLY_BUTTONS + this.currentPage; i++) {
      const buttonNumber = createButtonPagination(String(i));
      buttonNumber.addEventListener('click', () => {
        this.updateCurrentPage(buttonNumber, i);
      });
      pagination.appendChild(buttonNumber);
    }
    pagination.appendChild(pointsButton);
    pagination.appendChild(pageQuantityButton);
    pagination.appendChild(nextButton);
  }



  /**
   * Refresh current page function.
   * @param pageButton Button in page.
   * @param indexButton Button by index.
   * @todo Fix checking for null and undefined.
   */
  public updateCurrentPage(pageButton: HTMLButtonElement, indexButton = 0): void {
    const pageValue = pageButton.getAttribute('innerText');
    if (this.currentPage === undefined) {
      throw new Error('no table');
    }
    if (pageValue === '>>') {
      this.currentPage++;
    }
    if (pageValue === '<<' && this.currentPage > 1) {
      this.currentPage--;
    }
    if (Number(pageValue) === indexButton) {
      this.currentPage = indexButton;
    }

    /** @todo added if for buttonNumber(1,2,3 ...) */
    // if(pageValue === ''){
    //   this.currentPage = i;
    // }
    this.setAnimeList(apiAnimeTable(this.currentPage));
    this.setPagination();
  }
}
