import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
export declare class DecCommentDialogComponent {
    dialogRef: MatDialogRef<DecCommentDialogComponent>;
    data: any;
    translate: TranslateService;
    title: string;
    obj: any;
    comment: string;
    editing: boolean;
    placeholderLabel: any;
    confirmLabel: any;
    deleteLabel: any;
    cancelLabel: any;
    constructor(dialogRef: MatDialogRef<DecCommentDialogComponent>, data: any, translate: TranslateService);
    confirm(): void;
    delete(): void;
    cancel(): void;
    pressEnter(event: any): void;
}
