import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecGalleryComponent } from './dec-gallery.component';
import { DecImageModule } from './../../directives/image/image.module';
import { TranslateModule } from '@ngx-translate/core';
import { NguCarouselModule } from '@ngu/carousel';
import { MatIconModule } from '@angular/material';
import 'hammerjs';
import { DecImageZoomModule } from './../dec-image-zoom/dec-image-zoom.module';

@NgModule({
  imports: [
    CommonModule,
    DecImageModule,
    TranslateModule,
    MatIconModule,
    NguCarouselModule,
    DecImageZoomModule
  ],
  declarations: [
    DecGalleryComponent
  ],
  exports: [
    DecGalleryComponent
  ]
})
export class DecGalleryModule { }
