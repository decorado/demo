import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecGalleryComponent } from './dec-gallery.component';
import { DecImageModule } from './../../directives/image/image.module';
import { TranslateModule } from '@ngx-translate/core';
import { NguCarouselModule } from '@ngu/carousel';
import { MatIconModule } from '@angular/material';
import 'hammerjs';
import { DecZoomImageViewModule } from './../dec-zoom-image-view/dec-zoom-image-view.module';

@NgModule({
  imports: [
    CommonModule,
    DecImageModule,
    TranslateModule,
    MatIconModule,
    NguCarouselModule,
    DecZoomImageViewModule
  ],
  declarations: [
    DecGalleryComponent
  ],
  exports: [
    DecGalleryComponent
  ]
})
export class DecGalleryModule { }
