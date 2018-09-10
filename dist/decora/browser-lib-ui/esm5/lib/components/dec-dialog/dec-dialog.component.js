/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
var DecDialogComponent = /** @class */ (function () {
    function DecDialogComponent(factor, dialogRef) {
        var _this = this;
        this.factor = factor;
        this.dialogRef = dialogRef;
        this.actions = [];
        this.context = {};
        this.child = new EventEmitter();
        this.factoryTheComponent = function () {
            /** @type {?} */
            var componentFactory = _this.factor.resolveComponentFactory(_this.childComponentType);
            /** @type {?} */
            var componentRef = _this.childContainer.createComponent(componentFactory);
            _this.childComponentInstance = componentRef.instance;
            _this.child.emit(_this.childComponentInstance);
            _this.child.complete(); // unsubsribe subscribers
            _this.appendContextToInstance(componentRef.instance, _this.context);
            _this.loaded = true;
        };
    }
    /**
     * @return {?}
     */
    DecDialogComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.dialogRef.afterOpen()
            .toPromise()
            .then(this.factoryTheComponent);
    };
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    DecDialogComponent.prototype.appendContextToInstance = /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function (instance, context) {
        var _this = this;
        if (instance && context) {
            Object.keys(context).forEach(function (key) {
                instance[key] = _this.context[key];
            });
        }
    };
    DecDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-dialog',
                    template: "<mat-toolbar color=\"primary\">\n\n  <div fxLayout=\"row\" fxFlexFill fxLayoutAlign=\"start center\">\n    <div>\n      <button type=\"button\" mat-icon-button class=\"uppercase\" mat-dialog-close>\n        <mat-icon>arrow_back</mat-icon>\n      </button>\n    </div>\n    <div>\n      <h1>&nbsp; {{ title }}</h1>\n    </div>\n    <div fxFlex>\n      <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n        <div *ngIf=\"actions\">\n          <mat-menu #decDialogActionsMenu=\"matMenu\">\n            <button *ngFor=\"let action of actions\" mat-menu-item (click)=\"action.callback(context)\">\n              <span *ngIf=\"action.label\">{{ action.label }}</span>\n              <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n            </button>\n          </mat-menu>\n\n          <button mat-icon-button [matMenuTriggerFor]=\"decDialogActionsMenu\">\n            <mat-icon>more_vert</mat-icon>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</mat-toolbar>\n\n<div class=\"dec-dialog-child-wrapper\">\n  <template #childContainer></template>\n</div>\n\n<dec-spinner *ngIf=\"!loaded\"></dec-spinner>\n",
                    styles: [".dec-dialog-child-wrapper{padding:32px}"]
                },] },
    ];
    /** @nocollapse */
    DecDialogComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: MatDialogRef }
    ]; };
    DecDialogComponent.propDecorators = {
        childContainer: [{ type: ViewChild, args: ['childContainer', { read: ViewContainerRef },] }],
        child: [{ type: Output }]
    };
    return DecDialogComponent;
}());
export { DecDialogComponent };
if (false) {
    /** @type {?} */
    DecDialogComponent.prototype.childComponentType;
    /** @type {?} */
    DecDialogComponent.prototype.childComponentInstance;
    /** @type {?} */
    DecDialogComponent.prototype.actions;
    /** @type {?} */
    DecDialogComponent.prototype.title;
    /** @type {?} */
    DecDialogComponent.prototype.context;
    /** @type {?} */
    DecDialogComponent.prototype.loaded;
    /** @type {?} */
    DecDialogComponent.prototype.childContainer;
    /** @type {?} */
    DecDialogComponent.prototype.child;
    /** @type {?} */
    DecDialogComponent.prototype.factoryTheComponent;
    /** @type {?} */
    DecDialogComponent.prototype.factor;
    /** @type {?} */
    DecDialogComponent.prototype.dialogRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVUsd0JBQXdCLEVBQWtDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0osT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDOztJQThEL0MsNEJBQ1UsUUFDQTtRQUZWLGlCQUdJO1FBRk0sV0FBTSxHQUFOLE1BQU07UUFDTixjQUFTLEdBQVQsU0FBUzt1QkFkTyxFQUFFO3VCQUliLEVBQUU7cUJBTUMsSUFBSSxZQUFZLEVBQU87bUNBZVg7O1lBRTVCLElBQU0sZ0JBQWdCLEdBQTBCLEtBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7O1lBRTdHLElBQU0sWUFBWSxHQUFzQixLQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTlGLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBRXBELEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRTdDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFdEIsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWxFLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBRXBCO0tBMUJHOzs7O0lBRUoscUNBQVE7OztJQUFSO1FBRUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7YUFDekIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBRWpDOzs7Ozs7SUFvQk8sb0RBQXVCOzs7OztjQUFDLFFBQWEsRUFBRSxPQUFZOztRQUV6RCxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBRS9CLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBRW5DLENBQUMsQ0FBQztTQUVKOzs7Z0JBckdKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLCtvQ0FvQ1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMseUNBQXlDLENBQUM7aUJBQ3BEOzs7O2dCQTdDc0Msd0JBQXdCO2dCQUd0RCxZQUFZOzs7aUNBMERsQixTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7d0JBRXRELE1BQU07OzZCQS9EVDs7U0E4Q2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBEaWFsb2dBY3Rpb24gfSBmcm9tICcuL2RlYy1kaWFsb2cubW9kZWxzJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWRpYWxvZycsXG4gIHRlbXBsYXRlOiBgPG1hdC10b29sYmFyIGNvbG9yPVwicHJpbWFyeVwiPlxuXG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeEZsZXhGaWxsIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIGNsYXNzPVwidXBwZXJjYXNlXCIgbWF0LWRpYWxvZy1jbG9zZT5cbiAgICAgICAgPG1hdC1pY29uPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxoMT4mbmJzcDsge3sgdGl0bGUgfX08L2gxPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgZnhGbGV4PlxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgPG1hdC1tZW51ICNkZWNEaWFsb2dBY3Rpb25zTWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zXCIgbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCI+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjdGlvbi5pMThuTGFiZWxcIj57eyBhY3Rpb24uaTE4bkxhYmVsIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9tYXQtbWVudT5cblxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJkZWNEaWFsb2dBY3Rpb25zTWVudVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPm1vcmVfdmVydDwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L21hdC10b29sYmFyPlxuXG48ZGl2IGNsYXNzPVwiZGVjLWRpYWxvZy1jaGlsZC13cmFwcGVyXCI+XG4gIDx0ZW1wbGF0ZSAjY2hpbGRDb250YWluZXI+PC90ZW1wbGF0ZT5cbjwvZGl2PlxuXG48ZGVjLXNwaW5uZXIgKm5nSWY9XCIhbG9hZGVkXCI+PC9kZWMtc3Bpbm5lcj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWRpYWxvZy1jaGlsZC13cmFwcGVye3BhZGRpbmc6MzJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8vIENVUlJFTlRcbiAgY2hpbGRDb21wb25lbnRUeXBlOiBDb21wb25lbnRUeXBlPGFueT47XG5cbiAgY2hpbGRDb21wb25lbnRJbnN0YW5jZTogYW55O1xuXG4gIGFjdGlvbnM6IERpYWxvZ0FjdGlvbltdID0gW107XG5cbiAgdGl0bGU6IHN0cmluZztcblxuICBjb250ZXh0OiBhbnkgPSB7fTtcblxuICBsb2FkZWQ6IGJvb2xlYW47XG5cbiAgQFZpZXdDaGlsZCgnY2hpbGRDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgY2hpbGRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgQE91dHB1dCgpIGNoaWxkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmYWN0b3I6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERlY0RpYWxvZ0NvbXBvbmVudD5cbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJPcGVuKClcbiAgICAudG9Qcm9taXNlKClcbiAgICAudGhlbih0aGlzLmZhY3RvcnlUaGVDb21wb25lbnQpO1xuXG4gIH1cblxuICBwcml2YXRlIGZhY3RvcnlUaGVDb21wb25lbnQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT4gPSB0aGlzLmZhY3Rvci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSk7XG5cbiAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy5jaGlsZENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICB0aGlzLmNoaWxkLmVtaXQodGhpcy5jaGlsZENvbXBvbmVudEluc3RhbmNlKTtcblxuICAgIHRoaXMuY2hpbGQuY29tcGxldGUoKTsgLy8gdW5zdWJzcmliZSBzdWJzY3JpYmVyc1xuXG4gICAgdGhpcy5hcHBlbmRDb250ZXh0VG9JbnN0YW5jZShjb21wb25lbnRSZWYuaW5zdGFuY2UsIHRoaXMuY29udGV4dCk7XG5cbiAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kQ29udGV4dFRvSW5zdGFuY2UoaW5zdGFuY2U6IGFueSwgY29udGV4dDogYW55KSB7XG5cbiAgICBpZiAoaW5zdGFuY2UgJiYgY29udGV4dCkge1xuXG4gICAgICBPYmplY3Qua2V5cyhjb250ZXh0KS5mb3JFYWNoKChrZXkpID0+IHtcblxuICAgICAgICBpbnN0YW5jZVtrZXldID0gdGhpcy5jb250ZXh0W2tleV07XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIl19