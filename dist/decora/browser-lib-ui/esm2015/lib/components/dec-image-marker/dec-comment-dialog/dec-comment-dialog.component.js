/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
export class DecCommentDialogComponent {
    /**
     * @param {?} dialogRef
     * @param {?} data
     * @param {?} translate
     */
    constructor(dialogRef, data, translate) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.translate = translate;
        this.placeholderLabel = this.translate.instant('label.choices');
        this.confirmLabel = this.translate.instant('label.confirm');
        this.deleteLabel = this.translate.instant('label.delete');
        this.cancelLabel = this.translate.instant('label.cancel');
        this.title = data.title;
        this.obj = data.comment;
        this.editing = data.editing;
        this.comment = this.obj.comment;
    }
    /**
     * @return {?}
     */
    confirm() {
        this.dialogRef.close(this.comment);
    }
    /**
     * @return {?}
     */
    delete() {
        this.dialogRef.close('delete');
    }
    /**
     * @return {?}
     */
    cancel() {
        this.dialogRef.close();
    }
}
DecCommentDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-comment-dialog',
                template: `<h2>{{title}}</h2>
<mat-form-field>
  <textarea matInput [(ngModel)]="comment" [placeholder]="placeholderLabel"></textarea>
</mat-form-field>
<div fxLayoutAlign="end" fxLayoutGap="16px">
  <button mat-button (click)="cancel()">{{cancelLabel | uppercase}}</button>
  <button mat-raised-button color="warn" *ngIf="editing" (click)="delete()">{{deleteLabel | uppercase}}</button>
  <button mat-raised-button color="primary" [disabled]="!comment" (click)="confirm()">{{confirmLabel | uppercase}}</button>
</div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecCommentDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: TranslateService }
];
function DecCommentDialogComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecCommentDialogComponent.prototype.title;
    /** @type {?} */
    DecCommentDialogComponent.prototype.obj;
    /** @type {?} */
    DecCommentDialogComponent.prototype.comment;
    /** @type {?} */
    DecCommentDialogComponent.prototype.editing;
    /** @type {?} */
    DecCommentDialogComponent.prototype.placeholderLabel;
    /** @type {?} */
    DecCommentDialogComponent.prototype.confirmLabel;
    /** @type {?} */
    DecCommentDialogComponent.prototype.deleteLabel;
    /** @type {?} */
    DecCommentDialogComponent.prototype.cancelLabel;
    /** @type {?} */
    DecCommentDialogComponent.prototype.dialogRef;
    /** @type {?} */
    DecCommentDialogComponent.prototype.data;
    /** @type {?} */
    DecCommentDialogComponent.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbW1lbnQtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtaW1hZ2UtbWFya2VyL2RlYy1jb21tZW50LWRpYWxvZy9kZWMtY29tbWVudC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBZ0J2RCxNQUFNOzs7Ozs7SUFZSixZQUNTLFdBQ3lCLElBQVMsRUFDbEM7UUFGQSxjQUFTLEdBQVQsU0FBUztRQUNnQixTQUFJLEdBQUosSUFBSSxDQUFLO1FBQ2xDLGNBQVMsR0FBVCxTQUFTO2dDQVJDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDOzJCQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7MkJBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQU9sRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0tBQ2pDOzs7O0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNwQzs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNoQzs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3hCOzs7WUEvQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7O0NBU1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7WUFoQnlCLFlBQVk7NENBK0JqQyxNQUFNLFNBQUMsZUFBZTtZQTlCbEIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1jb21tZW50LWRpYWxvZycsXG4gIHRlbXBsYXRlOiBgPGgyPnt7dGl0bGV9fTwvaDI+XG48bWF0LWZvcm0tZmllbGQ+XG4gIDx0ZXh0YXJlYSBtYXRJbnB1dCBbKG5nTW9kZWwpXT1cImNvbW1lbnRcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJMYWJlbFwiPjwvdGV4dGFyZWE+XG48L21hdC1mb3JtLWZpZWxkPlxuPGRpdiBmeExheW91dEFsaWduPVwiZW5kXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIj57e2NhbmNlbExhYmVsIHwgdXBwZXJjYXNlfX08L2J1dHRvbj5cbiAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cIndhcm5cIiAqbmdJZj1cImVkaXRpbmdcIiAoY2xpY2spPVwiZGVsZXRlKClcIj57e2RlbGV0ZUxhYmVsIHwgdXBwZXJjYXNlfX08L2J1dHRvbj5cbiAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIWNvbW1lbnRcIiAoY2xpY2spPVwiY29uZmlybSgpXCI+e3tjb25maXJtTGFiZWwgfCB1cHBlcmNhc2V9fTwvYnV0dG9uPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29tbWVudERpYWxvZ0NvbXBvbmVudCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgb2JqOiBhbnk7XG4gIGNvbW1lbnQ6IHN0cmluZztcbiAgZWRpdGluZzogYm9vbGVhbjtcblxuICBwbGFjZWhvbGRlckxhYmVsID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnbGFiZWwuY2hvaWNlcycpO1xuICBjb25maXJtTGFiZWwgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdsYWJlbC5jb25maXJtJyk7XG4gIGRlbGV0ZUxhYmVsID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnbGFiZWwuZGVsZXRlJyk7XG4gIGNhbmNlbExhYmVsID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnbGFiZWwuY2FuY2VsJyk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERlY0NvbW1lbnREaWFsb2dDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgIHB1YmxpYyB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy50aXRsZSA9IGRhdGEudGl0bGU7XG4gICAgdGhpcy5vYmogPSBkYXRhLmNvbW1lbnQ7XG4gICAgdGhpcy5lZGl0aW5nID0gZGF0YS5lZGl0aW5nO1xuICAgIHRoaXMuY29tbWVudCA9IHRoaXMub2JqLmNvbW1lbnQ7XG4gIH1cblxuICBjb25maXJtKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMuY29tbWVudCk7XG4gIH1cblxuICBkZWxldGUoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoJ2RlbGV0ZScpO1xuICB9XG5cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxufVxuIl19