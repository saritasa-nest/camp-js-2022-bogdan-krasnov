import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime';

import { QUANTITY_ANIME, SIZE_PAGE_DEFAULT } from '../core/constants/anime';

import { renderAnime } from '../core/utils/anime';
import { getAnimeData } from '../core/utils/api';
import { createButtonPagination, paginationDynamic } from '../scripts/pagination';

/**
 * Table anime class.
 * @param currentPage Current Page.
 * @param quantityPage Page Quantity.
 */
export default class Table {
  public constructor() {
    this.currentPage = 1;
    this.quantityPage = Math.ceil(QUANTITY_ANIME / SIZE_PAGE_DEFAULT);
    this.setAnimeAsync(getAnimeData());
    this.setPagination();
  }

  private currentPage: number;

  private quantityPage: number;

  /**
   * Anime get function.
   * @param response Anime response object.
   */
  private async setAnimeAsync(response: Promise<PaginationDto<Anime>>): Promise<void> {
    const table = document.querySelector<HTMLTableElement>('table');
    if (table === null) {
      throw new Error('no table');
    }
    table.innerHTML = `
    <tr>
    <td>Image</td>
    <td>Title english</td>
    <td>Title japanese</td>
    <td>Status</td>
    <td>Type</td>
    </tr>
    `;
    (await response).results.forEach((anime: Anime) => renderAnime(anime));
  }

  /**
   * Pagination function.
   * @todo Creating function checking undefined and null for any element.
   */
  private setPagination(): void {
    const paginationButtons = document.querySelector<HTMLDivElement>('.pagination');
    const pageNumber = document.querySelector<HTMLDivElement>('.page-number');

    if (paginationButtons === null) {
      throw new Error('no table');
    }
    pageNumber.innerHTML = `Page ${this.currentPage}`;
    paginationButtons.innerHTML = ``;

    const prevButton = createButtonPagination('<<');
    prevButton.addEventListener('click', () => {
      this.updateCurrentPage(prevButton)
    });

    const nextButton = createButtonPagination('>>');
    paginationButtons.appendChild(prevButton)
    if (this.currentPage === 1) {
      prevButton.disabled = true;
    }
    if (this.currentPage === this.quantityPage) {
      nextButton.disabled = true;
    }

    paginationDynamic(this.currentPage, this.quantityPage).forEach(page => {
      if (page !== '...') {
        const buttonDynamic = createButtonPagination(String(page))
        buttonDynamic.addEventListener('click', () => {
          this.updateCurrentPage(buttonDynamic)
        });
        if (page === this.currentPage) {
          buttonDynamic.classList.add('active');
        }
        paginationButtons.appendChild(buttonDynamic);
      } else {
        const href = createButtonPagination(page, true)
        paginationButtons.appendChild(href);
      }
    });
    paginationButtons.appendChild(nextButton);
  }

  /**
   * Refresh current page function.
   * @param pageButton Button in page.
   * @param indexButton Button by index.
   * @todo Fix checking for null and undefined.
   */
  private updateCurrentPage(pageButton: HTMLButtonElement): void {
    const pageValue = pageButton.getAttribute('data-text');
    if (this.currentPage === undefined) {
      throw new Error('no table');
    }
    if (pageValue === '>>') {
      this.currentPage++;
    }
    if (pageValue === '<<' && this.currentPage > 1) {
      this.currentPage--;
    }
    if (!isNaN(Number(pageValue))) {
      this.currentPage = Number(pageValue);
    }
    const animeData = getAnimeData(this.currentPage)
    this.setAnimeAsync(animeData);
    this.setPagination();
  }
}
