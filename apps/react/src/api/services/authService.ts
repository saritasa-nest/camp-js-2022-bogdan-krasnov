import { Login } from '@js-camp/core/models/login';

import { Token } from '@js-camp/core/models/token';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { TokenDataMapper } from '@js-camp/core/mappers/token.mapper';

import { httpClient } from '..';

const AUTH_LOGIN = 'auth/login/';

/** Auth API. */
export namespace AuthService {

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<Token> {
    const { data } = await httpClient.post<TokenDto>(AUTH_LOGIN, loginData);
    return TokenDataMapper.fromDto(data);
  }

  /** Logs the current user out. */
  export function logout(): Promise<void> {
    return Promise.resolve();
  }
}
