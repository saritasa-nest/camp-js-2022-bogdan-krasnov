import { isInputElement } from '@js-camp/core/utils/guards/element.guard';
import { PAGE_SIZE_DEFAULT, CURRENT_PAGE_DEFAULT, FIRST_PAGE, ORDERING_DEFAULT } from '../core/constants/anime';

import { createPaginationButton, createDynamicPaginationButtons } from '../scripts/pagination';
import { updateAnimeList } from '../scripts/table';

import { Ordering } from './../core/enums/table';

const INPUT_CLASS = 'input-search'
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

  /** Quantity anime. */
  private quantityAnime: number;

  /** Quantity anime. */
  private search: string = '';

  public constructor(quantityAnime: number) {
    this.quantityAnime = quantityAnime;
    this.currentPage = CURRENT_PAGE_DEFAULT;
    this.quantityPage = Math.ceil(this.quantityAnime / PAGE_SIZE_DEFAULT);
    this.currentSorting = ORDERING_DEFAULT;
    updateAnimeList(this.currentPage, this.currentSorting, this.search);
    this.setPagination();
    this.sortAnimeList();
    this.changeSearch();
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

    const prevButton = createPaginationButton('<<');
    prevButton.addEventListener('click', () => {
      this.updatePagination(prevButton);
    });
    const nextButton = createPaginationButton('>>');
    nextButton.addEventListener('click', () => {
      this.updatePagination(nextButton);
    });

    if (this.currentPage === FIRST_PAGE) {
      prevButton.disabled = true;
    }
    if (this.currentPage === this.quantityPage) {
      nextButton.disabled = true;
    }

    paginationButtons.append(prevButton);
    createDynamicPaginationButtons(this.currentPage, this.quantityPage).forEach(page => {
      if (page !== '...') {
        const buttonDynamic = createPaginationButton(String(page));
        buttonDynamic.addEventListener('click', () => {
          this.updatePagination(buttonDynamic);
        });
        if (page === this.currentPage) {
          buttonDynamic.classList.add('active');
        }
        paginationButtons.append(buttonDynamic);
      } else {
        const buttonPoints = createPaginationButton(page, true);
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
    if (pageValue === '<<' && this.currentPage > FIRST_PAGE) {
      this.currentPage--;
    }
    if (!isNaN(Number(pageValue))) {
      this.currentPage = Number(pageValue);
    }
    updateAnimeList(this.currentPage, this.currentSorting, this.search);
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
      updateAnimeList(this.currentPage, this.currentSorting, this.search);
    });
  }

  private changeSearch(): void {
    const inputElement = document.querySelector<HTMLInputElement>(`.${INPUT_CLASS}`);

    if (inputElement === null) {
      return;
    }

    inputElement.addEventListener('change', (event) => {
      event.preventDefault();
      if (event.currentTarget !== null && isInputElement(event.currentTarget)) {
        this.search = event.currentTarget.value
      }
      updateAnimeList(this.currentPage, this.currentSorting, this.search);
    })
  }
}
