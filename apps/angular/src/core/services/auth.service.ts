import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';

import { Login } from '../models/login';

import { User } from './../models/user';

import { AppConfigService } from './app-config.service';
import { UserSecretDto } from './mappers/dto/user-secret.dto';

const TOKEN = 'token';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly loginUrl: URL;

  private readonly registerUrl: URL;

  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public constructor(
    appConfig: AppConfigService,
    private readonly http: HttpClient,
  ) {
    const token = localStorage.getItem(TOKEN);
    this.isLoggedIn$.next(!!token);

    this.loginUrl = new URL('auth/login/', appConfig.apiUrl);
    this.registerUrl = new URL('auth/register/', appConfig.apiUrl);
  }

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<void> {
    return this.http.post<UserSecretDto>(
      this.loginUrl.toString(),
      loginData,
    ).pipe(
      map(tokenDto => {
          localStorage.setItem(TOKEN, tokenDto.access);
          this.isLoggedIn$.next(true);
        }),
    );
  }

  /** Register a user with email and password.
   * @param user User data.
   */
  public register(user: User): Observable<void> {
    return this.http.post<UserSecretDto>(
      this.registerUrl.toString(),
      user,
    ).pipe(
      map(
        tokenDto => {
          console.log(tokenDto);
        },
      ),
    );
  }

  /** Is the user logged in. */
  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }
}
