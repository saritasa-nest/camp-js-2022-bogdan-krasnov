import { UserService } from './../services/user.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';

const TOKEN_HEADER_KEY = 'Authorization';

/** Interceptor to add access token to requests using Authorization HTTP header. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfigService: AppConfigService,
    private readonly userService: UserService,
  ) {}

  /**
   * Appends bearer token.
   * @inheritdoc
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.userService.token) {
      const clonedReq = req.clone({
        headers: req.headers.set(
          TOKEN_HEADER_KEY,
          `Bearer ${this.userService.token}`,
        ),
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
