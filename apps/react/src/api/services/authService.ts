import { Login } from '@js-camp/core/models/login';

import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { TokenDataMapper } from '@js-camp/core/mappers/token.mapper';

import { Registration } from '@js-camp/core/models/registration';

import { User } from '@js-camp/core/models/user';

import { Token } from '@js-camp/core/models/token';

import { httpClient } from '..';

import { TokenService } from './tokenService';
import { UserService } from './userService';

/** Auth API. */
export namespace AuthService {
  const AUTH_LOGIN = 'auth/login/';
  const AUTH_REGISTER = 'auth/register/';
  const AUTH_REFRESH = 'auth/refresh/';

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<User> {
    const { data } = await httpClient.post<TokenDto>(AUTH_LOGIN, loginData);
    const token = TokenDataMapper.fromDto(data);
    TokenService.setToken(token);
    return UserService.getUser();
  }

  /**
   * Register an account.
   * @param registerData Register data.
   */
  export async function register(registerData: Registration): Promise<void> {
    const { data } = await httpClient.post<TokenDto>(
      AUTH_REGISTER.toString(),
      registerData,
    );
    const token = TokenDataMapper.fromDto(data);
    TokenService.setToken(token);
  }

  /** Logs the current user out. */
  export function logout(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Refreshes access token.
   * @param token Token object.
   */
  export async function refreshToken({ refresh }: Token): Promise<Token> {
    const tokenDto = (await httpClient.post<TokenDto>(
      AUTH_REFRESH,
      { refresh },
    )).data;
    return TokenDataMapper.fromDto(tokenDto);
  }
}
