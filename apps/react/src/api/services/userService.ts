import { Login } from '@js-camp/core/models/login';

import { AuthService } from './authService';

import { TokenService } from './tokenService';

/** Functionality for working with the user. */
export namespace UserService {

  /**
   * Login user.
   * @param loginData Login form data.
   */
  export async function loginUser(loginData: Login): Promise<void> {
    try {
      const token = await AuthService.login(loginData);
      TokenService.setToken(token);
    } catch (error: unknown) {
      console.error(error);
    }
  }
}
