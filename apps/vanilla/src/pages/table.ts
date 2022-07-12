import { QUANTITY_ANIME, PAGE_SIZE_DEFAULT, CURRENT_PAGE_DEFAULT } from '../core/constants/anime';

import { creatingButtonPagination, creatingDynamicButtonsPagination } from '../scripts/pagination';
import { updateAnimeList } from '../scripts/table';

import { Ordering } from './../core/constants/anime';

/**
 * Table anime class.
 */
export default class Table {

  /** Current Page. */
  private currentPage: number;

  /** Page Quantity. */
  private quantityPage: number;

  /** Current sorting. */
  private currentSorting: Ordering;

  /** Variable that tracks data loading. */
  private isLoading: boolean;

  public constructor() {
    this.currentPage = CURRENT_PAGE_DEFAULT;
    this.quantityPage = Math.ceil(QUANTITY_ANIME / PAGE_SIZE_DEFAULT);
    this.currentSorting = Ordering.None;
    this.isLoading = false;
    updateAnimeList(this.currentPage, this.currentSorting);
    this.setPagination();
    this.sortAnimeList();
  }

  /**
   * The setPagination function, which creates a pagination of anime pages.
   */
  private setPagination(): void {
    const paginationButtons = document.querySelector<HTMLDivElement>('.pagination');
    const pageNumber = document.querySelector<HTMLDivElement>('.page-number');

    if (paginationButtons === null || pageNumber === null) {
      throw new Error('error');
    }
    pageNumber.innerHTML = `Page ${this.currentPage}`;
    paginationButtons.innerHTML = ``;

    const prevButton = creatingButtonPagination('<<');
    prevButton.addEventListener('click', () => {
      this.updatePagination(prevButton);
    });
    const nextButton = creatingButtonPagination('>>');
    nextButton.addEventListener('click', () => {
      this.updatePagination(nextButton);
    });

    if (this.currentPage === CURRENT_PAGE_DEFAULT) {
      prevButton.disabled = true;
    }
    if (this.currentPage === this.quantityPage) {
      nextButton.disabled = true;
    }

    paginationButtons.append(prevButton);
    creatingDynamicButtonsPagination(this.currentPage, this.quantityPage).forEach(page => {
      if (page !== '...') {
        const buttonDynamic = creatingButtonPagination(String(page));
        buttonDynamic.addEventListener('click', () => {
          this.updatePagination(buttonDynamic);
        });
        if (page === this.currentPage) {
          buttonDynamic.classList.add('active');
        }
        paginationButtons.append(buttonDynamic);
      } else {
        const buttonPoints = creatingButtonPagination(page, true);
        paginationButtons.append(buttonPoints);
      }
    });
    paginationButtons.append(nextButton);
  }

  /**
   * Checks what the current page is equal to.
   * @param pageButton Button in pagination.
   */
  private updatePagination(pageButton: HTMLButtonElement): void {
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
    updateAnimeList(this.currentPage, this.currentSorting);
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
      switch (order) {
        case Ordering.TitleEng:
          this.currentSorting = Ordering.TitleEng;
          break;
        case Ordering.Status:
          this.currentSorting = Ordering.Status;
          break;
        case Ordering.Aired:
          this.currentSorting = Ordering.Aired;
          break;
        default:
          this.currentSorting = Ordering.None;
          break;
      }
      updateAnimeList(this.currentPage, this.currentSorting);
    });
  }
}
