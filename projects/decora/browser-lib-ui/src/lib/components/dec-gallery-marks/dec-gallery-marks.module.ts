import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecGalleryMarksComponent } from './dec-gallery-marks.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatExpansionModule, MatListModule } from '@angular/material';
import { NguCarouselModule } from '@ngu/carousel';
import { DecImageMarkerModule } from './../dec-image-marker/dec-image-marker.module';
import { DecImageModule } from './../../directives/image/image.module';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecIconModule } from './../dec-icon/dec-icon.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    NguCarouselModule,
    DecImageModule,
    DecImageMarkerModule,
    FlexLayoutModule,
    DecIconModule,
    MatExpansionModule,
    MatListModule
  ],
  declarations: [
    DecGalleryMarksComponent
  ],
  exports: [
    DecGalleryMarksComponent
  ]
})
export class DecGalleryMarksModule { }
