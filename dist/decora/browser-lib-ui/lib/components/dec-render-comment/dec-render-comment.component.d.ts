import { DecRenderCommentService } from './dec-render-comment.service';
import RenderFeedback from './models/render-feedback.model';
import { MatDialogRef } from '@angular/material';
import RenderComment from './models/render-comment.model';
export declare class DecRenderCommentComponent {
    private decRenderCommentService;
    dialogRef: MatDialogRef<DecRenderCommentComponent>;
    commentEdit: RenderComment;
    listOptions: RenderFeedback[];
    listOptionsDisplay: RenderFeedback[];
    private _version;
    selectedChoicesDisplay: string;
    stepsChoice: RenderFeedback[];
    constructor(decRenderCommentService: DecRenderCommentService, dialogRef: MatDialogRef<DecRenderCommentComponent>, commentEdit: RenderComment);
    getRenderfeedbacktree(): Promise<void>;
    backspaceChoice(): void;
    keydownChoice(event: KeyboardEvent): void;
    selectChoice(key: string): void;
    descriptionLastLevel(): string;
    confirm(): void;
    private filloptions(options);
}
