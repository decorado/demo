import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecZoomAreaComponent } from './dec-zoom-area.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecMarkdownsCommentModule } from './../dec-markdowns-comment/dec-markdowns-comment.module';
import { DecMarksModule } from './../dec-marks/dec-marks.module';
import { DecIconModule } from './../dec-icon/dec-icon.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    DecMarkdownsCommentModule,
    DecMarksModule,
    DecIconModule,
    FormsModule
  ],
  declarations: [
    DecZoomAreaComponent
  ],
  exports: [
    DecZoomAreaComponent
  ]
})
export class DecZoomAreaModule { }
