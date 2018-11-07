import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { BACKSPACE } from '@angular/cdk/keycodes';
import { DecRenderCommentService } from './dec-render-comment.service';
import RenderFeedback from './models/render-feedback.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import RenderComment from './models/render-comment.model';

@Component({
  selector: 'dec-render-comment',
  templateUrl: './dec-render-comment.component.html',
  styleUrls: ['./dec-render-comment.component.scss'],
})
export class DecRenderCommentComponent {

  listOptions: RenderFeedback[] = [];
  listOptionsDisplay: RenderFeedback[] = [];

  private _version: number;
  selectedChoicesDisplay = '';
  stepsChoice: RenderFeedback[] = [];

  @Output() deleteMark = new EventEmitter();

  constructor(private decRenderCommentService: DecRenderCommentService,
    public dialogRef: MatDialogRef<DecRenderCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public commentEdit: RenderComment) {
    this.getRenderfeedbacktree();
  }

  async getRenderfeedbacktree() {
    try {
      const version = this.commentEdit ? this.commentEdit.version : null;
      const resp = await this.decRenderCommentService.getRenderfeedbacktree(version);

      this._version = resp.version;
      this.listOptions = this.filloptions(resp.sub);
      this.listOptionsDisplay = [...this.listOptions];

      if (this.commentEdit) {
        const { comment } = this.commentEdit;
        for (let i = 0; i < comment.length; i++) {
          this.selectChoice(comment.charAt(i));
        }
      }
    } catch (error) {
      throw error;
    }
  }

  backspaceChoice(): void {
    this.selectedChoicesDisplay = this.selectedChoicesDisplay.slice(0, -1);

    if (this.selectedChoicesDisplay) {
      this.stepsChoice = this.stepsChoice.slice(0, -1);
      this.listOptionsDisplay = [...this.stepsChoice[this.stepsChoice.length - 1].sub];
    } else {
      this.listOptionsDisplay = [...this.listOptions];
      this.stepsChoice = [];
    }
  }

  keydownChoice(event: KeyboardEvent): void {
    event.preventDefault();

    if (event.keyCode !== BACKSPACE) {
      this.selectChoice(event.key.toLocaleUpperCase());
    }
  }

  selectChoice(key: string): void {
    if (this.listOptionsDisplay) {
      const selectedChoice = this.listOptionsDisplay.find(option => option.key === key);

      if (selectedChoice) {
        this.selectedChoicesDisplay += key;
        this.listOptionsDisplay = selectedChoice['sub'];
        this.stepsChoice.push({ ...selectedChoice });
      }
    }
  }

  descriptionLastLevel(): string {
    return this.stepsChoice.length > 0 && this.stepsChoice[this.stepsChoice.length - 1]['description'];
  }

  confirm(): void {
    if (this.descriptionLastLevel()) {
      this.dialogRef.close({ version: this._version, comment: this.selectedChoicesDisplay, description: this.descriptionLastLevel() });
    }
  }

  delete(): void {
    this.deleteMark.emit();
    this.dialogRef.close();
  }

  private filloptions(options: any): RenderFeedback[] {
    const renderFeedbackTree: any[] = [];

    Object.keys(options).forEach(key => {
      if (options[key]['sub']) {
        options[key]['sub'] = this.filloptions(options[key]['sub']);
      }
      options[key]['key'] = key;
      renderFeedbackTree.push(options[key]);
    });

    return renderFeedbackTree;
  }
}
