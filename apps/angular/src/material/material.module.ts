import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

const material = [
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  PortalModule,
  MatFormFieldModule,
];

/** Material Angular module. */
@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
