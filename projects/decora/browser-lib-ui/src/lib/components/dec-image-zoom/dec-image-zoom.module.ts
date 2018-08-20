import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { DecImageZoomComponent } from './dec-image-zoom.component';

@NgModule({
  imports: [
    CommonModule,
    NgxImageZoomModule.forRoot()
  ],
  declarations: [
    DecImageZoomComponent
  ],
  exports: [
    DecImageZoomComponent
  ]
})
export class DecImageZoomModule { }
