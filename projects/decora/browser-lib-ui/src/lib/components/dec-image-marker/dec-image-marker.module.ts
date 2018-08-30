import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecImageMarkerComponent } from './dec-image-marker.component';
import { DecImageMarksModule } from './../dec-image-marks/dec-image-marks.module';
import { MatDialogModule } from '@angular/material';
import { DecCommentDialogModule } from './dec-comment-dialog/dec-comment-dialog.module';
import { DecCommentDialogComponent } from './dec-comment-dialog/dec-comment-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DecImageMarksModule,
    MatDialogModule,
    DecCommentDialogModule,
    TranslateModule
  ],
  declarations: [DecImageMarkerComponent],
  exports: [
    DecImageMarkerComponent
  ],
  entryComponents: [
    DecCommentDialogComponent
  ]
})
export class DecImageMarkerModule { }
