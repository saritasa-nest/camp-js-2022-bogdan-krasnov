/**
 * Checks if the anime property is present.
 * @param rest Array with anime properties.
 */
export function checkAnimeProperty(...rest: (string)[]): void {

  for (const i in rest) {
    if (rest[i] === null || rest[i] === undefined) {
      throw new Error('Anime property is not present');
    }
  }
}
