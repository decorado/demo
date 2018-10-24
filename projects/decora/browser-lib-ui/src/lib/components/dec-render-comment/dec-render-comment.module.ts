import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecRenderCommentComponent } from './dec-render-comment.component';
import { MatDialogModule, MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DecRenderCommentService } from './../dec-render-comment/dec-render-comment.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    TranslateModule,
  ],
  declarations: [DecRenderCommentComponent],
  entryComponents: [DecRenderCommentComponent],
  providers: [DecRenderCommentService]
})
export class DecRenderCommentModule { }
