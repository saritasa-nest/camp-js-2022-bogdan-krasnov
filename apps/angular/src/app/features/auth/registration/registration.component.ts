import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';

/** Registration component. */
@Component({
  selector: 'camp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  /** Register form. */
  public readonly registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {

  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authService.register({
        email: String(this.registerForm.value.email),
        firstName: String(this.registerForm.value.firstName),
        lastName: String(this.registerForm.value.lastName),
        password: String(this.registerForm.value.password),
      }).subscribe();
    }
  }
}
