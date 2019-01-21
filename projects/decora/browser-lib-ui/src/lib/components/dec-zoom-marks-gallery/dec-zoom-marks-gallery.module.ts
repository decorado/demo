import { DecMarkdownsMeshQaModule } from './../dec-markdowns-mesh-qa/dec-markdowns-mesh-qa.module';
import { DecMeshQaModule } from './../dec-mesh-qa/dec-mesh-qa.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecZoomMarksGalleryComponent } from './dec-zoom-marks-gallery.component';
import { DecZoomMarksModule } from './../dec-zoom-marks/dec-zoom-marks.module';
import { DecImageModule } from './../../directives/image/image.module';
import { MatIconModule } from '@angular/material';
import { DecMarkdownsCommentModule } from './../dec-markdowns-comment/dec-markdowns-comment.module';
import { DecIconModule } from './../dec-icon/dec-icon.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecMarkdownsZoomAreaModule } from './../dec-markdowns-zoom-area/dec-markdowns-zoom-area.module';
import { DecCarouselModule } from './../dec-carousel/dec-carousel.module';

@NgModule({
  imports: [
    CommonModule,
    DecZoomMarksModule,
    DecImageModule,
    MatIconModule,
    DecMarkdownsCommentModule,
    DecIconModule,
    DecCarouselModule,
    FlexLayoutModule,
    DecMarkdownsZoomAreaModule,
    DecMeshQaModule,
    DecMarkdownsMeshQaModule
  ],
  declarations: [DecZoomMarksGalleryComponent],
  exports: [DecZoomMarksGalleryComponent]
})
export class DecZoomMarksGalleryModule { }
