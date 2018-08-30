import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dec-comment-dialog',
  templateUrl: './dec-comment-dialog.component.html',
  styleUrls: ['./dec-comment-dialog.component.scss']
})
export class DecCommentDialogComponent {

  title: string;
  obj: any;
  comment: string;
  editing: boolean;

  placeholderLabel = this.translate.instant('label.choices');
  confirmLabel = this.translate.instant('label.confirm');
  deleteLabel = this.translate.instant('label.delete');
  cancelLabel = this.translate.instant('label.cancel');

  constructor(
    public dialogRef: MatDialogRef<DecCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translate: TranslateService
  ) {
    this.title = data.title;
    this.obj = data.comment;
    this.editing = data.editing;
    this.comment = this.obj.comment;
  }

  confirm() {
    this.dialogRef.close(this.comment);
  }

  delete() {
    this.dialogRef.close('delete');
  }

  cancel() {
    this.dialogRef.close();
  }

}
