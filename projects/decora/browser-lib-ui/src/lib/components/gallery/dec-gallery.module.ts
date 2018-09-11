import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecGalleryComponent } from './dec-gallery.component';
import { DecImageModule } from './../../directives/image/image.module';
import { TranslateModule } from '@ngx-translate/core';
import { NguCarouselModule } from '@ngu/carousel';
import { MatIconModule } from '@angular/material';
import 'hammerjs';
import { DecImageZoomModule } from './../dec-image-zoom/dec-image-zoom.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DecImageModule,
    TranslateModule,
    MatIconModule,
    NguCarouselModule,
    DecImageZoomModule,
    FlexLayoutModule
  ],
  declarations: [
    DecGalleryComponent
  ],
  exports: [
    DecGalleryComponent
  ]
})
export class DecGalleryModule { }
