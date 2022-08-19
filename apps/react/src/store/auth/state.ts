import { User } from '@js-camp/core/models/user';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error message. */
  readonly error: string | null;

  /** Is logged in user. */
  readonly isLoggedIn: boolean;

  /** Whether user is logged in or not. */
  readonly user: User | null;
}

export const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  user: null,
};
