import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

const material = [MatTableModule];

/** Material Angular module. */
@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
