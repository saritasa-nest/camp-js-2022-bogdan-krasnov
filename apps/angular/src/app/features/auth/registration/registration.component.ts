import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { NavigateService } from '../../../../core/services/navigate.service';

import { UserService } from './../../../../core/services/user.service';

/** Registration component. */
@Component({
  selector: 'camp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {

  /** Register form. */
  public readonly registrationForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  public constructor(
    private readonly userService: UserService,
    private readonly navigateService: NavigateService,
  ) { }

  /** On submit. */
  public onSubmit(): void {
    const { email, firstName, lastName, password, confirmPassword } = this.registrationForm.value;
    if (this.registrationForm.invalid) {
      return;
    }

    if (password !== confirmPassword) {
      this.registrationForm.setErrors({
        confirmPassword: 'Passwords do not match',
      });
      return;
    }

    this.userService.register({
      email: String(email),
      firstName: String(firstName),
      lastName: String(lastName),
      password: String(password),
    }).pipe(
      tap(() => this.navigateService.navigateToLogin()),
    )
      .subscribe();
  }
}
