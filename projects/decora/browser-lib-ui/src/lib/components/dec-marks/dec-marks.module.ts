import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecMarksComponent } from './dec-marks.component';
import { MatDialogModule } from '@angular/material';
import { DecRenderCommentModule } from './../dec-render-comment/dec-render-comment.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    DecRenderCommentModule
  ],
  declarations: [
    DecMarksComponent
  ],
  exports: [
    DecMarksComponent
  ]
})
export class DecMarksModule { }
