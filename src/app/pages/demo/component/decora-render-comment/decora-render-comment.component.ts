import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DecRenderCommentComponent } from '@projects/decora/browser-lib-ui/src/lib/components/dec-render-comment/dec-render-comment.component';
import RenderComment from '@projects/decora/browser-lib-ui/src/lib/components/dec-render-comment/models/render-comment.model';

@Component({
  selector: 'app-decora-render-comment',
  templateUrl: './decora-render-comment.component.html',
  styleUrls: ['./decora-render-comment.component.scss']
})
export class DecoraRenderCommentComponent {

  commentResult: RenderComment;

  constructor(public dialog: MatDialog) { }

  openRenderComment(): void {
    const dialogRef = this.dialog.open(DecRenderCommentComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.commentResult = result;
    });
  }

  editRenderComment(commentEdit: RenderComment): void {
    const dialogRef = this.dialog.open(DecRenderCommentComponent, {
      data: commentEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      this.commentResult = result;
    });
  }

}
