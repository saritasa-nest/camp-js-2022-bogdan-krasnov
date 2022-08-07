import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Login } from '../models/login';

import { AppConfigService } from './app-config.service';
import { UserSecretDto } from './mappers/dto/user-secret.dto';


/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private readonly loginUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly http: HttpClient,
  ) {
    this.loginUrl = new URL('auth/login/', appConfig.apiUrl);
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
      map(
        tokenDto => {
          localStorage.setItem('token', tokenDto.token);
        },
      ),
    );
  }
}
