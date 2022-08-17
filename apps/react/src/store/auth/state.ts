import { Token } from '@js-camp/core/models/token';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error message. */
  readonly error: string | null;

  /** Whether user is logged in or not. */
  readonly token: Token | null;
}

export const initialState: AuthState = {
  isLoading: false,
  error: null,
  token: null,
};
