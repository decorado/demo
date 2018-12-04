import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecMarkdownsCommentComponent } from './dec-markdowns-comment.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatMenuModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  declarations: [
    DecMarkdownsCommentComponent
  ],
  exports: [
    DecMarkdownsCommentComponent
  ]
})
export class DecMarkdownsCommentModule { }
