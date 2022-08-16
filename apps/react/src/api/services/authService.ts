import { http } from '..';
import { Login } from "@js-camp/core/models/login";

import { Token } from "@js-camp/core/models/token";
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { TokenDataMapper } from '@js-camp/core/mappers/token.mapper';

const LOGIN_URL = 'auth/login/';

/** Auth API. */
export namespace AuthApi {

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<Token> {
    const { data } = await http.post<TokenDto>(LOGIN_URL, loginData);
    return TokenDataMapper.fromDto(data)
  }

  /** Logs the current user out. */
  export function logout(): Promise<void> {
    return Promise.resolve();
  }
}
