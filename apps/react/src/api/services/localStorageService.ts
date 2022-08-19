/** Functionality for working with local storage. */
export namespace LocalStorageService {

  /**
   * Gets some value by key from local storage.
   * @param key The key by which the value is stored.
   * @returns If there are no value, then null otherwise the value object.
   */
  export function getValue<T>(key: string): T | null {
    const localValue = localStorage.getItem(key);
    return JSON.parse(localValue ? localValue : 'null');
  }

  /**
   * Writes some value by key to local storage.
   * @param key The key by which the value is stored.
   * @param value Some value that needs to be stored.
   */
  export function setValue<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Removes value from storage by key.
   * @param key The key by which the value is stored.
   */
  export function remove(key: string): void {
    localStorage.removeItem(key);
  }
}
