import { getAnimeList } from '../core/utils/anime';

  /**
   * Table class.
   */
export default class Table {
  /**
   * Reception function with a configured URL.
   * @param url Link to api data.
   */
  public getData(url: string): void {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        getAnimeList(data);
    })
      .catch(() => {
        throw new Error('error');
      });
    this.pagePagination();
  }

  /**
   * Pagination function.
   */
  public pagePagination(): void {
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
