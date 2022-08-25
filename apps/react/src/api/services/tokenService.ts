import { Token } from '@js-camp/core/models/token';

import { LocalStorageService } from './localStorageService';

const TOKEN = 'token';

/** Functionality for working with Token. */
export namespace TokenService {

  /**
   * Adds token to local storage.
   * @param tokens Authentication tokens.
   */
  export function setToken(tokens: Token): void {
    LocalStorageService.setValue<Token>(TOKEN, tokens);
  }

  /** Gets tokens from local storage. */
  export function getToken(): Token | null {
    return LocalStorageService.getValue<Token>(TOKEN);
  }

  /** Resets tokens. */
  export function resetToken(): void {
    LocalStorageService.setValue(TOKEN, null);
  }

  /** Removes token. */
  export function removeToken(): void {
    return LocalStorageService.remove(TOKEN);
  }
}
