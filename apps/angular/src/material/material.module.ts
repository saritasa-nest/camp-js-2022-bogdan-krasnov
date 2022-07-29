import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

const material = [
  MatTableModule,
];

/** Material Angular Module. */
@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialExampleModule {}
