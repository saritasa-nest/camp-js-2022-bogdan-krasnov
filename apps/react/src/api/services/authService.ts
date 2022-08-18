import { Login } from '@js-camp/core/models/login';

import { Token } from '@js-camp/core/models/token';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { TokenDataMapper } from '@js-camp/core/mappers/token.mapper';

import { Registration } from '@js-camp/core/models/registration';

import { httpClient } from '..';

import { TokenService } from './tokenService';

/** Auth API. */
export namespace AuthService {

  const AUTH_LOGIN = 'auth/login/';
  const AUTH_REGISTER = 'auth/register/';

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<Token> {
    const { data } = await httpClient.post<TokenDto>(AUTH_LOGIN, loginData);
    const token = TokenDataMapper.fromDto(data);
    await TokenService.setToken(token);
    return token;
  }

  /**
   * Register an account.
   * @param registerData Register data.
   */
  export async function register(registerData: Registration): Promise<Token> {
    const { data } = await httpClient.post<TokenDto>(AUTH_REGISTER.toString(), registerData);
    const token = TokenDataMapper.fromDto(data);
    await TokenService.setToken(token);
    return token;
  }

  /** Logs the current user out. */
  export function logout(): Promise<void> {
    return Promise.resolve();
  }
}
