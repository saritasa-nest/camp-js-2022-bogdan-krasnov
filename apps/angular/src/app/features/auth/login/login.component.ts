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

  // public loginForm = new FormGroup({
  //   email: new FormControl(null, [
  //     Validators.required,
  //     Validators.email,
  //   ]),
  //   password: new FormGroup(null, [
  //     Validators.required,
  //   ]),
  // });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

  }

  // public onSubmit() {
  //   if (this.loginForm.valid) {
  //     this.authService.login({
  //       email: this.loginForm.value.email,
  //       password: this.loginForm.value.password,
  //     }).subscribe(data => {
  //       console.log('data SUCCESS', data);
  //     });
  //   }
  // }

  // public login() {
  //   this.onSubmit();
  // }
}
