import { AnimeType } from '@js-camp/core//utils/enums/table';
import { PAGE_SIZE_DEFAULT, CURRENT_PAGE_DEFAULT, FIRST_PAGE, ORDERING_DEFAULT } from '../core/constants/anime';

import { creatingPaginationButton, creatingDynamicPaginationButtons } from '../scripts/pagination';
import { updateAnimeList } from '../scripts/table';

import { Ordering } from './../core/enums/table';

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

  /** Current anime. */
  private currentFiltering: AnimeType;

  public constructor(quantityAnime: number) {
    this.quantityAnime = quantityAnime;
    this.currentFiltering = AnimeType.None;
    this.currentPage = CURRENT_PAGE_DEFAULT;
    this.quantityPage = Math.ceil(this.quantityAnime / PAGE_SIZE_DEFAULT);
    this.currentSorting = ORDERING_DEFAULT;
    updateAnimeList(this.currentPage, this.currentSorting, this.currentFiltering);
    this.setPagination();
    this.sortAnimeList();
    this.filterAnimeList();
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

    const prevButton = creatingPaginationButton('<<');
    prevButton.addEventListener('click', () => {
      this.updatePagination(prevButton);
    });
    const nextButton = creatingPaginationButton('>>');
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
    creatingDynamicPaginationButtons(this.currentPage, this.quantityPage).forEach(page => {
      if (page !== '...') {
        const buttonDynamic = creatingPaginationButton(String(page));
        buttonDynamic.addEventListener('click', () => {
          this.updatePagination(buttonDynamic);
        });
        if (page === this.currentPage) {
          buttonDynamic.classList.add('active');
        }
        paginationButtons.append(buttonDynamic);
      } else {
        const buttonPoints = creatingPaginationButton(page, true);
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
    updateAnimeList(this.currentPage, this.currentSorting, this.currentFiltering);
    this.setPagination();
  }

  /**
   * Sort function anime.
   */
  private sortAnimeList(): void {
    const sort = document.querySelector<HTMLSelectElement>('.sort__anime-table');
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
      updateAnimeList(this.currentPage, this.currentSorting, this.currentFiltering);
    });
  }


  /** filter anime list. */
  private filterAnimeList(): void {
    const filter = document.querySelector<HTMLSelectElement>('.filter__anime-table');
    if (filter === null) {
      throw new Error('no table');
    }
    filter.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const filter = target.value;
      switch (filter) {
        case AnimeType.None:
          this.currentFiltering = AnimeType.None;
          break;
        case AnimeType.Tv:
          this.currentFiltering = AnimeType.Tv;
          break;
        case AnimeType.Ova:
          this.currentFiltering = AnimeType.Ova;
          break;
        default:
          this.currentFiltering = AnimeType.None;
          break;
      }
      updateAnimeList(this.currentPage, this.currentSorting, this.currentFiltering);
    });
  }
}
