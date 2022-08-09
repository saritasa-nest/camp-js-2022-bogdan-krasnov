import { defer, mapTo, Observable, ReplaySubject, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { Token } from '../models/token';

import { LocalStorageService } from './local-storage.service';

// const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user';

/** Token storage service. */
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {

  /** Current user secret. */
  private readonly tokenValue$ =
    new ReplaySubject<Token | null>(1);

  public constructor(private readonly storageService: LocalStorageService) { }

  /** Save token.
   * @param token Token to save.
   */
  public saveToken(token: Token): Observable<Token> {
    return defer(() =>
      this.storageService.save(USER_KEY, token)).pipe(
      tap(() => this.tokenValue$.next(token)),
      mapTo(token),
    );
  }

  // public getRefreshToken(): string | null {
  //   return localStorage.getItem(REFRESHTOKEN_KEY);
  // }
}
