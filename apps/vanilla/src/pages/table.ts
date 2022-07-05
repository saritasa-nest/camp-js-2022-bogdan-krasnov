import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime';

import { COUNT_ANIME, SIZE_PAGE_DEFAULT } from '../core/constants/anime';

import { renderAnime } from '../core/utils/anime';
import { animeResponseData } from '../core/utils/api';
import { createButtonPagination } from '../scripts/pagination';

/**
 * Table anime class.
 * @param currentPage Current Page.
 * @param pageQuantity Page Quantity.
 */
export default class Table {
  public constructor() {
    this.currentPage = 1;
    this.countPage = COUNT_ANIME / SIZE_PAGE_DEFAULT;
    this.setAnime(animeResponseData());
    this.setPagination();
  }

  private currentPage: number;

  private countPage: number;

  /**
   * Anime get function.
   * @param response Anime response object.
   */
  private async setAnime(response: Promise<PaginationDto<Anime>>): Promise<void> {
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
    const pagination = document.querySelector<HTMLDivElement>('.pagination');
    const pageNumber = document.querySelector<HTMLDivElement>('.page-number');

    if (pagination === null) {
      throw new Error('no table');
    }
    pageNumber.innerHTML = `page ${this.currentPage}`;
    pagination.innerHTML = ``;
    const COUNT_ADDITIONALLY_BUTTONS = 3;

    const nextButton = this.createButtonPagination('>>');
    const prevButton = this.createButtonPagination('<<');
    if (this.currentPage === 1) {
      prevButton.disabled = true;
    }
    if (this.currentPage === this.countPage) {
      nextButton.disabled = true;
    }
    const firstButton = this.createButtonPagination('1');
    const twoPointsButton = this.createButtonPagination('...', true);
    const firstPointButton = this.createButtonPagination('...', true);

    const lastButton = this.createButtonPagination(`${this.countPage}`);

    pagination.append(prevButton);
    pagination.append(firstButton);
    pagination.append(firstPointButton);

    for (let i = this.currentPage + 1; i <= COUNT_ADDITIONALLY_BUTTONS + this.currentPage; i++) {
      if (i <= this.countPage) {
        const buttonNumber = createButtonPagination(String(i));
        buttonNumber.addEventListener('click', () => {
          this.updateCurrentPage(buttonNumber, i);
        });
        pagination.append(buttonNumber);
      }
    }
    pagination.append(twoPointsButton);
    pagination.append(lastButton);
    pagination.append(nextButton);
  }

  /**
   * Refresh current page function.
   * @param pageButton Button in page.
   * @param indexButton Button by index.
   * @todo Fix checking for null and undefined.
   */
  private updateCurrentPage(pageButton: HTMLButtonElement, indexButton = 0): void {
    const pageValue = pageButton.getAttribute('innerText');
    if (this.currentPage === undefined) {
      throw new Error('no table');
    }
    if (pageValue === '1') {
      this.currentPage = 1;
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
    if (Number(pageValue) === this.countPage) {
      this.currentPage = this.countPage;
    }
    this.setAnime(animeResponseData(this.currentPage));
    this.setPagination();
  }

  /**
   * Create button function.
   * @param innerTextButton InnerText button.
   * @param disabled Disabled button.
   * @returns Button.
   */
  private createButtonPagination(innerTextButton: string,
    disabled = false): HTMLButtonElement {
    const buttonPaginator = document.createElement('button');
    buttonPaginator.setAttribute('innerText', innerTextButton);
    buttonPaginator.innerText = innerTextButton;
    buttonPaginator.disabled = disabled;
    buttonPaginator.addEventListener('click', () => {
      this.updateCurrentPage(buttonPaginator);
    });
    return buttonPaginator;
  }
}
