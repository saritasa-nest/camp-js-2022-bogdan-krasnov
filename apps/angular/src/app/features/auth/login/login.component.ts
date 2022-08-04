import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'apps/angular/src/core/services/authentication.service';

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {

  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormGroup(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
        console.log('data SUCCESS', data);
      });
    }
  }

  public login() {
    this.authService.login('bogdan@mail.ru', '71ilonud').subscribe(data => {
      console.log('data SUCCESS', data);
    });
  }
}
