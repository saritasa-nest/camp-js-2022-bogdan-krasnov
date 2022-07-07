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
 * @param isLoaded Checks if the data is loaded.
 * @param isLoaded Variable that tracks data loading.
 * @param currentSorting Current sorting.
 * @todo Make a check for data load.
 */
export default class Table {
  public constructor() {
    this.currentPage = 1;
    this.quantityPage = Math.ceil(QUANTITY_ANIME / SIZE_PAGE_DEFAULT);
    this.currentSorting = '';
    this.isLoaded = false;
    this.setAnimeAsync(getAnimeData());
    this.setPagination();
    this.sortAnimeList();
  }

  private currentPage: number;

  private quantityPage: number;

  isLoaded: boolean;

  currentSorting: string;

  /**
   * Anime get function.
   * @param response Anime response object.
   * @todo Fix table.innerHTML.
   */
  private async setAnimeAsync(response: Promise<PaginationDto<Anime>>): Promise<void> {
    const tbody = document.querySelector<HTMLTableElement>('tbody');
    if (tbody === null) {
      throw new Error('No table');
    }
    tbody.innerHTML = '';
    (await response).results.forEach((anime: Anime) => renderAnime(anime));
  }

  /**
   * Pagination function.
   * @todo Creating function checking undefined and null for any element.
   * @todo I need to think about how to fix the duplication of addEventListener. Tell me pls.
   */
  private setPagination(): void {
    const paginationButtons = document.querySelector<HTMLDivElement>('.pagination');
    const pageNumber = document.querySelector<HTMLDivElement>('.page-number');

    if (paginationButtons === null || pageNumber === null) {
      throw new Error('error');
    }
    pageNumber.innerHTML = `Page ${this.currentPage}`;
    paginationButtons.innerHTML = ``;

    const prevButton = createButtonPagination('<<');
    prevButton.addEventListener('click', () => {
      this.updateCurrentPage(prevButton);
    });
    const nextButton = createButtonPagination('>>');
    nextButton.addEventListener('click', () => {
      this.updateCurrentPage(nextButton);
    });

    if (this.currentPage === 1) {
      prevButton.disabled = true;
    }
    if (this.currentPage === this.quantityPage) {
      nextButton.disabled = true;
    }

    paginationButtons.append(prevButton);
    paginationDynamic(this.currentPage, this.quantityPage).forEach(page => {
      if (page !== '...') {
        const buttonDynamic = createButtonPagination(String(page));
        buttonDynamic.addEventListener('click', () => {
          this.updateCurrentPage(buttonDynamic);
        });
        if (page === this.currentPage) {
          buttonDynamic.classList.add('active');
        }
        paginationButtons.append(buttonDynamic);
      } else {
        const buttonPoints = createButtonPagination(page, true);
        paginationButtons.append(buttonPoints);
      }
    });
    paginationButtons.append(nextButton);
  }

  /**
   * Refresh current page function.
   * @param pageButton Button in page.
   * @todo Add checking for null and undefined for currentPage.
   * @todo Make a separate pagination check.
   */
  private updateCurrentPage(pageButton: HTMLButtonElement): void {
    const pageValue = pageButton.getAttribute('data-text');
    if (this.currentPage === undefined) {
      throw new Error('no currentPage');
    }
    if (pageValue === '>>' && this.currentPage < this.quantityPage) {
      this.currentPage++;
    }
    if (pageValue === '<<' && this.currentPage > 1) {
      this.currentPage--;
    }
    if (!isNaN(Number(pageValue))) {
      this.currentPage = Number(pageValue);
    }
    const animeData = getAnimeData(this.currentPage, this.currentSorting)
    this.setAnimeAsync(animeData);
    this.setPagination();
  }

  /**
   * Sort function anime.
   */
  private sortAnimeList(): void {
    const sort = document.querySelector<HTMLSelectElement>('.sort-anime-table');
    if (sort === null) {
      throw new Error('no table');
    }
    sort.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const order = target.value;
      const animeData = getAnimeData(this.currentPage, this.currentSorting = order);
      this.setAnimeAsync(animeData);
    });
  }
}
