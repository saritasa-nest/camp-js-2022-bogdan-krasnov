import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';

import { LoginComponent } from './login/login.component';
import { AuthorizedGuard } from 'apps/angular/src/core/guards/authorized.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [AuthorizedGuard]
  },
];

/** Anime routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
