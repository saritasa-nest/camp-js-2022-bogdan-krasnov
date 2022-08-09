import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, switchMapTo } from 'rxjs';

import { Login } from '../models/login';
import { User } from '../models/user';

import { AppConfigService } from './app-config.service';

import { AuthService } from './auth.service';

const USER_PROFILE = 'users/profile/';
const TOKEN_KEY = 'auth-token';

/** Stateful service for storing/managing information about the current user. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly currentUserUrl: URL;

  private readonly isLoggedIn$ = new BehaviorSubject<boolean>(false);

  /** Get token. */
  public get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public constructor(
    config: AppConfigService,
    private readonly authService: AuthService,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {
    this.isLoggedIn$.next(!!this.token);
    this.currentUserUrl = new URL(USER_PROFILE, config.apiUrl);
  }

  /** Login a user with email and password.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<void> {
    return this.authService.login(loginData)
      .pipe(
        switchMapTo(this.isLoggedIn$),
        switchMap(() => this.redirectAfterAuthorization()),
      );
  }

  /** Login a user with email and password.
   * @param userData Login data.
   */
  public register(userData: User): Observable<void> {
    return this.authService.register(userData)
      .pipe(
        switchMap(() => this.redirectAfterAuthorization()),
      );
  }

  private async redirectAfterAuthorization(): Promise<void> {
    const DEFAULT_REDIRECT_URL = '/';
    const route = this.router.createUrlTree([DEFAULT_REDIRECT_URL]);
    await this.router.navigateByUrl(route);
  }

  /** Is the user logged in. */
  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }
}
