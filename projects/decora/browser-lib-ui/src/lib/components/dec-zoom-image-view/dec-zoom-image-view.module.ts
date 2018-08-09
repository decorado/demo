import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { DecZoomImageViewComponent } from './dec-zoom-image-view.component';

@NgModule({
  imports: [
    CommonModule,
    NgxImageZoomModule.forRoot()
  ],
  declarations: [
    DecZoomImageViewComponent
  ],
  exports: [
    DecZoomImageViewComponent
  ]
})
export class DecZoomImageViewModule { }
