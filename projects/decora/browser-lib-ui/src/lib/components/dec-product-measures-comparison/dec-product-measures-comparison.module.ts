import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecProductMeasuresComparisonComponent } from './dec-product-measures-comparison.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecGridModule } from './../dec-grid/dec-grid.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    DecGridModule,
    FlexLayoutModule
  ],
  declarations: [
    DecProductMeasuresComparisonComponent
  ],
  exports: [
    DecProductMeasuresComparisonComponent
  ]
})
export class DecProductMeasuresComparisonModule { }
