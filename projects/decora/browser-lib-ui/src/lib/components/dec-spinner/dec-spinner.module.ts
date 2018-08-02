import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSpinnerComponent } from './dec-spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DecSpinnerComponent],
  exports: [DecSpinnerComponent]
})
export class DecSpinnerModule { }
