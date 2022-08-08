import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';

import { AuthService } from './../services/auth.service';

/** Interceptor to add access token to requests using Authorization HTTP header. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfigService: AppConfigService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Appends bearer token.
   * @inheritdoc
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.token) {
      const clonedReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.authService.token}`,
        ),
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
