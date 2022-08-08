import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  /** Login form. */
  public readonly loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });

  /** Check login user. */
  public readonly isLoggedIn$ = this.authService.isLoggedIn();

  constructor(
    private readonly authService: AuthService,
  ) {

  }

  ngOnInit(): void {

  }

  /** OnSubmit. */
  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login({
        email: String(this.loginForm.value.email),
        password: String(this.loginForm.value.password),
      }).subscribe();
    }
  }
}
