/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
var DecCommentDialogComponent = /** @class */ (function () {
    function DecCommentDialogComponent(dialogRef, data, translate) {
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
    DecCommentDialogComponent.prototype.confirm = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(this.comment);
    };
    /**
     * @return {?}
     */
    DecCommentDialogComponent.prototype.delete = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close('delete');
    };
    /**
     * @return {?}
     */
    DecCommentDialogComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecCommentDialogComponent.prototype.pressEnter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode == 13) {
            event.stopImmediatePropagation();
            event.preventDefault();
            if (this.comment) {
                this.confirm();
            }
        }
    };
    DecCommentDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-comment-dialog',
                    template: "<h2>{{title}}</h2>\n<mat-form-field>\n  <textarea matInput (keydown)=\"pressEnter($event)\" [(ngModel)]=\"comment\" [placeholder]=\"placeholderLabel\"></textarea>\n</mat-form-field>\n<div fxLayoutAlign=\"end\" fxLayoutGap=\"16px\">\n  <button mat-button (click)=\"cancel()\">{{cancelLabel | uppercase}}</button>\n  <button mat-raised-button color=\"warn\" *ngIf=\"editing\" (click)=\"delete()\">{{deleteLabel | uppercase}}</button>\n  <button mat-raised-button color=\"primary\" [disabled]=\"!comment\" (click)=\"confirm()\">{{confirmLabel | uppercase}}</button>\n</div>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecCommentDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
        { type: TranslateService }
    ]; };
    return DecCommentDialogComponent;
}());
export { DecCommentDialogComponent };
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbW1lbnQtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtaW1hZ2UtbWFya2VyL2RlYy1jb21tZW50LWRpYWxvZy9kZWMtY29tbWVudC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQTRCckQsbUNBQ1MsV0FDeUIsSUFBUyxFQUNsQztRQUZBLGNBQVMsR0FBVCxTQUFTO1FBQ2dCLFNBQUksR0FBSixJQUFJLENBQUs7UUFDbEMsY0FBUyxHQUFULFNBQVM7Z0NBUkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDOzRCQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7MkJBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQzsyQkFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBT2xELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7S0FDakM7Ozs7SUFFRCwyQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDcEM7Ozs7SUFFRCwwQ0FBTTs7O0lBQU47UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNoQzs7OztJQUVELDBDQUFNOzs7SUFBTjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDeEI7Ozs7O0lBRUQsOENBQVU7Ozs7SUFBVixVQUFXLEtBQUs7UUFDZCxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7U0FDRjtLQUNGOztnQkF6REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSw4akJBU1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7O2dCQWhCeUIsWUFBWTtnREErQmpDLE1BQU0sU0FBQyxlQUFlO2dCQTlCbEIsZ0JBQWdCOztvQ0FGekI7O1NBa0JhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtY29tbWVudC1kaWFsb2cnLFxuICB0ZW1wbGF0ZTogYDxoMj57e3RpdGxlfX08L2gyPlxuPG1hdC1mb3JtLWZpZWxkPlxuICA8dGV4dGFyZWEgbWF0SW5wdXQgKGtleWRvd24pPVwicHJlc3NFbnRlcigkZXZlbnQpXCIgWyhuZ01vZGVsKV09XCJjb21tZW50XCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyTGFiZWxcIj48L3RleHRhcmVhPlxuPC9tYXQtZm9ybS1maWVsZD5cbjxkaXYgZnhMYXlvdXRBbGlnbj1cImVuZFwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3tjYW5jZWxMYWJlbCB8IHVwcGVyY2FzZX19PC9idXR0b24+XG4gIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJ3YXJuXCIgKm5nSWY9XCJlZGl0aW5nXCIgKGNsaWNrKT1cImRlbGV0ZSgpXCI+e3tkZWxldGVMYWJlbCB8IHVwcGVyY2FzZX19PC9idXR0b24+XG4gIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiFjb21tZW50XCIgKGNsaWNrKT1cImNvbmZpcm0oKVwiPnt7Y29uZmlybUxhYmVsIHwgdXBwZXJjYXNlfX08L2J1dHRvbj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbW1lbnREaWFsb2dDb21wb25lbnQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIG9iajogYW55O1xuICBjb21tZW50OiBzdHJpbmc7XG4gIGVkaXRpbmc6IGJvb2xlYW47XG5cbiAgcGxhY2Vob2xkZXJMYWJlbCA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ2xhYmVsLmNob2ljZXMnKTtcbiAgY29uZmlybUxhYmVsID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnbGFiZWwuY29uZmlybScpO1xuICBkZWxldGVMYWJlbCA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ2xhYmVsLmRlbGV0ZScpO1xuICBjYW5jZWxMYWJlbCA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ2xhYmVsLmNhbmNlbCcpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEZWNDb21tZW50RGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICBwdWJsaWMgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlO1xuICAgIHRoaXMub2JqID0gZGF0YS5jb21tZW50O1xuICAgIHRoaXMuZWRpdGluZyA9IGRhdGEuZWRpdGluZztcbiAgICB0aGlzLmNvbW1lbnQgPSB0aGlzLm9iai5jb21tZW50O1xuICB9XG5cbiAgY29uZmlybSgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0aGlzLmNvbW1lbnQpO1xuICB9XG5cbiAgZGVsZXRlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCdkZWxldGUnKTtcbiAgfVxuXG4gIGNhbmNlbCgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgcHJlc3NFbnRlcihldmVudCkge1xuICAgIGlmKGV2ZW50LmtleUNvZGUgPT0gMTMpIHtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICh0aGlzLmNvbW1lbnQpIHtcbiAgICAgICAgdGhpcy5jb25maXJtKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=