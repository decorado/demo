import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraRenderCommentRoutingModule } from './decora-render-comment-routing.module';
import { DecoraRenderCommentComponent } from './decora-render-comment.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecRenderCommentModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-render-comment/dec-render-comment.module';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DecAvatarModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-avatar/dec-avatar.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraRenderCommentRoutingModule,
    DemoContainerModule,
    FlexLayoutModule,
    FormsModule,
    DecRenderCommentModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    DecAvatarModule
  ],
  declarations: [DecoraRenderCommentComponent]
})
export class DecoraRenderCommentModule { }
