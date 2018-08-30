import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecCommentDialogComponent } from './dec-comment-dialog.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  declarations: [DecCommentDialogComponent]
})
export class DecCommentDialogModule { }
