import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { DialogModule } from '@angular/cdk/dialog';

const material = [
  CdkMenuModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  OverlayModule,
  MatFormFieldModule,
  MatSelectModule,
  DialogModule,
  MatPaginatorModule,
  MatSortModule,
];

/** Material Angular module. */
@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
