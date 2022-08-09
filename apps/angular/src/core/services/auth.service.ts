import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

import { Login } from '../models/login';
import { Token } from '../models/token';

import { User } from './../models/user';

import { AppConfigService } from './app-config.service';
import { TokenDto } from './mappers/dto/token.dto';
import { TokenDataMapper } from './mappers/token-data.mapper';
import { TokenStorageService } from './token-storage.service';

const AUTH_LOGIN = 'auth/login/';
const AUTH_REGISTER = 'auth/register/';
const AUTH_REFRESH = 'auth/token/refresh/';
const AUTH_VERIFY = 'auth/token/verify/';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly loginUrl: URL;

  private readonly registerUrl: URL;

  private readonly refreshTokenUrl: URL;

  private readonly accountVerificationUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
    private readonly tokenDataMapper: TokenDataMapper,
    private readonly tokenStorageService: TokenStorageService,
  ) {

    this.loginUrl = new URL(AUTH_LOGIN, appConfig.apiUrl);
    this.registerUrl = new URL(AUTH_REGISTER, appConfig.apiUrl);
    this.refreshTokenUrl = new URL(AUTH_REFRESH, appConfig.apiUrl);
    this.accountVerificationUrl = new URL(AUTH_VERIFY, appConfig.apiUrl);
  }

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<Token> {
    return this.httpClient.post<TokenDto>(
      this.loginUrl.toString(),
      loginData, // this.loginDataMapper.toDto(loginData),
    ).pipe(
      switchMap(token => this.tokenStorageService.saveToken(token)),
      map(tokenDto => this.tokenDataMapper.fromDto(tokenDto)),
    );
  }

  /** Register a user with email and password.
   * @param user User data.
   */
  public register(user: User): Observable<Token> {
    return this.httpClient.post<TokenDto>(
      this.registerUrl.toString(),
      user, // this.userDataMapper.toDto(user),
    ).pipe(
      switchMap(token => this.tokenStorageService.saveToken(token)),
      map(dto => this.tokenDataMapper.fromDto(dto)),
    );
  }

  /**
   * Refresh user's token.
   * @param token Token.
   * @todo Add refresh token in UserService.
   * @todo Create RefreshInterceptor.
   */
  public refreshToken(token: Token): Observable<Token> {
    return this.httpClient.post<TokenDto>(
      this.refreshTokenUrl.toString(),
      this.tokenDataMapper.toDto(token),
    ).pipe(
      map(refreshedToken => this.tokenDataMapper.fromDto(refreshedToken)),
    );
  }
}
