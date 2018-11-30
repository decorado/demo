import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecProductSource3dmodelColorComponent } from './dec-product-source3dmodel-color.component';
import { TranslateModule } from '@ngx-translate/core';
import { DecGalleryModule } from '../gallery/dec-gallery.module';
import { MatButtonModule } from '@angular/material';
import { DecZoomMarksGalleryModule } from './../dec-zoom-marks-gallery/dec-zoom-marks-gallery.module';
import { DecGridModule } from './../dec-grid/dec-grid.module';
import { DecProductMeasuresComparisonModule } from './../dec-product-measures-comparison/dec-product-measures-comparison.module';

@NgModule({
  declarations: [DecProductSource3dmodelColorComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MatButtonModule,
    DecGalleryModule,
    DecZoomMarksGalleryModule,
    DecGridModule,
    DecProductMeasuresComparisonModule
  ],
  exports: [DecProductSource3dmodelColorComponent]
})
export class DecProductSource3dmodelColorModule { }
