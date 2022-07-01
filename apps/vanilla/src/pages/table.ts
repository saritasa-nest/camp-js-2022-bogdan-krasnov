import { getAnimeList } from "../core/utils/anime";

export default class Table {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  // constructor(resUrl: string) {
  //   if (resUrl) {
  //     this.getData(resUrl);
  //   }
  // }

  public getData(resUrl: string): void {
    fetch(resUrl)
      .then(response => response.json())
      .then(data => {
        getAnimeList(data);
    })
      .catch(() => {
        throw new Error('error');
      });
  }
}
