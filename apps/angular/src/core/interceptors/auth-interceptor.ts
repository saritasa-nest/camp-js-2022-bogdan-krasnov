import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';

/** Interceptor to add access token to requests using Authorization HTTP header. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfigService: AppConfigService,

    // private readonly userSecretStorage: UserSecretStorageService,
    // private readonly authService: AuthService,
  ) {}

  /**
   * Appends bearer token.
   * @inheritdoc
   */
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
      const token = localStorage.getItem('token');

      if (token) {
        const clonedReq = req.clone({
          headers: req.headers.set('Authorization',
            `Bearer ${token}`),
        });
        return next.handle(clonedReq);
      }
      return next.handle(req);

      // const userSecret$ = this.userSecretStorage.currentSecret$.pipe(first());

      // return userSecret$.pipe(
      //   map(userSecret =>
      //     userSecret ?
      //       req.clone({
      //           headers: this.authService.appendAuthorizationHeader(
      //             req.headers,
      //             userSecret,
      //           ),
      //       }) :
      //       req),
      //   switchMap(newReq => next.handle(newReq)),
      // );
    }
  }

  /**
   * Checks if a request is for authorization or refresh token.
   * @param url - Request url.
   */
  private shouldInterceptToken(url: string): boolean {
    return url.startsWith(this.appConfigService.apiUrl);
  }
}
