import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { UrlService } from '../../../../core/services/url.service';

import { AuthService } from '../../../../core/services/auth.service';

/** Registration component. */
@Component({
  selector: 'camp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {

  /** Register form. */
  public readonly registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  public constructor(
    private readonly authService: AuthService,
    private readonly urlService: UrlService,
  ) { }

  /** OnInit. */
  public onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register({
        email: String(this.registerForm.value.email),
        firstName: String(this.registerForm.value.firstName),
        lastName: String(this.registerForm.value.lastName),
        password: String(this.registerForm.value.password),
      }).pipe(
        tap(() => this.urlService.navigateToLogin()),
      )
        .subscribe();
    }
  }
}
