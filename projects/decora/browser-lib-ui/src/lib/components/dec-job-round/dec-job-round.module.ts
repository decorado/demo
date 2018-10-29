import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecJobRoundComponent } from './dec-job-round.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonToggleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecZoomMarksGalleryModule } from './../dec-zoom-marks-gallery/dec-zoom-marks-gallery.module';
import { DecGridModule } from './../dec-grid/dec-grid.module';
import { DecProductMeasuresComparisonModule } from './../dec-product-measures-comparison/dec-product-measures-comparison.module';
import { DecIconModule } from './../dec-icon/dec-icon.module';
import { DecZoomAreaModule } from './../dec-zoom-area/dec-zoom-area.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonToggleModule,
    DecZoomMarksGalleryModule,
    DecGridModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    DecProductMeasuresComparisonModule,
    DecIconModule,
    DecZoomAreaModule,
    TranslateModule,
  ],
  declarations: [
    DecJobRoundComponent
  ],
  exports: [
    DecJobRoundComponent
  ]
})
export class DecJobRoundModule { }
