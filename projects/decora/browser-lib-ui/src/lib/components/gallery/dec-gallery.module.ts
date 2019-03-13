import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecGalleryComponent } from './dec-gallery.component';
import { DecImageModule } from './../../directives/image/image.module';
import { DecImageZoomModule } from './../dec-image-zoom/dec-image-zoom.module';
import { DecCarouselModule } from './../dec-carousel/dec-carousel.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DecImageModule,
    TranslateModule,
    DecImageZoomModule,
    DecCarouselModule,
  ],
  declarations: [
    DecGalleryComponent
  ],
  exports: [
    DecGalleryComponent
  ]
})
export class DecGalleryModule { }
