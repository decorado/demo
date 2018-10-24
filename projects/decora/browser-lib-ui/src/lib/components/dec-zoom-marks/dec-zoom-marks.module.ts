import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSliderModule, MatButtonModule, MatIconModule } from '@angular/material';
import { DecZoomMarksComponent } from './dec-zoom-marks.component';
import { DecRenderCommentModule } from '../dec-render-comment/dec-render-comment.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    DecRenderCommentModule
  ],
  declarations: [
    DecZoomMarksComponent
  ],
  exports: [
    DecZoomMarksComponent
  ]
})
export class DecZoomMarksModule { }
