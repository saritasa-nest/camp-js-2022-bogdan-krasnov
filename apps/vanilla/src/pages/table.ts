import { getAnimeList } from '../core/utils/anime';

/**
 * Table class.
 */
export default class Table {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(url: string | undefined) {
    if (url) {
      this.getData(url);
    }
  }

  /**
   * Reception function with a configured URL.
   * @param url Link to api data.
   */
  public getData(url: string): void {
    fetch(url)
      .then(response => response.json())
      .then(animeListResponse => {
        getAnimeList(animeListResponse);
    })
      .catch(() => {
        throw new Error('error');
      });
    this.setPagination();
  }

  /**
   * Pagination function.
   */
  public setPagination(page: number = 1): void {

    const paginator = document.querySelector('.pagination');

    const nextLink = document.createElement('button');
    nextLink.innerText = 'Next';

    // nextLink.addEventListener('click', paginatorFunction);
    if (paginator === null) {
      throw new Error('no table');
    }
    paginator.appendChild(nextLink);
  }
}
