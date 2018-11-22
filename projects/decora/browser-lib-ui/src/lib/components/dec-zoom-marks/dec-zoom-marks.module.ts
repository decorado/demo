import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSliderModule, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { DecZoomMarksComponent } from './dec-zoom-marks.component';
import { DecRenderCommentModule } from '../dec-render-comment/dec-render-comment.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DecRenderCommentModule,
    TranslateModule
  ],
  declarations: [
    DecZoomMarksComponent
  ],
  exports: [
    DecZoomMarksComponent
  ]
})
export class DecZoomMarksModule { }
