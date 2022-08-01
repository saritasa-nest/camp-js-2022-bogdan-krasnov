import { AuthRoutingModule } from './auth.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialExampleModule } from 'apps/angular/src/material/material.module';

import { AuthComponent } from './auth.component';

/** Anime module. */
@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialExampleModule,
  ],
})
export class AuthModule { }
