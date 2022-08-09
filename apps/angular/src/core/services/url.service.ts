import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/** Url service. */
@Injectable({
  providedIn: 'root',
})
export class UrlService {

  public constructor(
    private readonly router: Router,
  ) {}

  /** Navigate to login page. */
  public async navigateToLogin(): Promise<void> {
    const DEFAULT_REDIRECT_URL = '/auth/login';
    const route = this.router.createUrlTree([DEFAULT_REDIRECT_URL]);
    await this.router.navigateByUrl(route);
  }
}
