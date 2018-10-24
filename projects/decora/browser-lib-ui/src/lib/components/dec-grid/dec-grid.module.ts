import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecGridComponent } from './dec-grid.component';
import { DecGridRowComponent, DecGridColumnComponent } from './dec-grid-row/dec-grid-row.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [DecGridComponent, DecGridRowComponent, DecGridColumnComponent],
  exports: [DecGridComponent, DecGridRowComponent, DecGridColumnComponent],
})
export class DecGridModule { }
