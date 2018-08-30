import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecImageMarksComponent } from './dec-image-marks.component';
import { DecImageModule } from './../../directives/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    DecImageModule
  ],
  declarations: [
    DecImageMarksComponent
  ],
  exports: [
    DecImageMarksComponent
  ]
})
export class DecImageMarksModule { }
