import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { map, Observable } from 'rxjs';

import { AppConfigService } from './app-config.service';

export interface LoginForm {

  /** Email of user. */
  readonly email: string;

  /** Password of user. */
  readonly password: string;
}


/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private readonly authLogin: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly http: HttpClient,
  ) {
    this.authLogin = new URL('auth/login/', appConfig.apiUrl);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  login(loginForm: LoginForm): Observable<void> {
    const { email, password } = loginForm;
    return this.http.post<TokenDto>(this.authLogin.toString(), { email, password }).pipe(
      map(
        tokenDto => {
          localStorage.setItem('tokenAccess', tokenDto.access);
          localStorage.setItem('tokenRefresh', tokenDto.refresh);
        },
      ),
    );
  }
}
