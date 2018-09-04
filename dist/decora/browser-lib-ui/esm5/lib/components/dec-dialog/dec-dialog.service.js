/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DecDialogComponent } from './dec-dialog.component';
var DecDialogService = /** @class */ (function () {
    function DecDialogService(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} childComponent
     * @param {?} config
     * @return {?}
     */
    DecDialogService.prototype.open = /**
     * @param {?} childComponent
     * @param {?} config
     * @return {?}
     */
    function (childComponent, config) {
        var /** @type {?} */ dialogInstance = this.dialog.open(DecDialogComponent, {
            width: config.width || '100vw',
            height: config.heigth || '100vh',
            panelClass: 'full-screen-dialog'
        });
        dialogInstance.componentInstance.childComponentType = childComponent;
        dialogInstance.componentInstance.actions = config.actions;
        dialogInstance.componentInstance.title = config.title;
        dialogInstance.componentInstance.context = config.context;
        return dialogInstance;
    };
    DecDialogService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecDialogService.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    return DecDialogService;
}());
export { DecDialogService };
function DecDialogService_tsickle_Closure_declarations() {
    /** @type {?} */
    DecDialogService.prototype.dialog;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1kaWFsb2cvZGVjLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFFNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBTTFELDBCQUNVO1FBQUEsV0FBTSxHQUFOLE1BQU07S0FDWDs7Ozs7O0lBR0wsK0JBQUk7Ozs7O0lBQUosVUFBSyxjQUFrQyxFQUFFLE1BQXlCO1FBRWhFLHFCQUFNLGNBQWMsR0FBc0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3hELGtCQUFrQixFQUNsQjtZQUNFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU87WUFDOUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksT0FBTztZQUNoQyxVQUFVLEVBQUUsb0JBQW9CO1NBQ2pDLENBQ0YsQ0FBQztRQUVGLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUM7UUFFckUsY0FBYyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRTFELGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUV0RCxjQUFjLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFMUQsTUFBTSxDQUFDLGNBQWMsQ0FBQztLQUV2Qjs7Z0JBN0JGLFVBQVU7Ozs7Z0JBTEYsU0FBUzs7MkJBRGxCOztTQU9hLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRGVjRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcGVuQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vZGVjLWRpYWxvZy5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjRGlhbG9nU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZ1xuICApIHsgfVxuXG5cbiAgb3BlbihjaGlsZENvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+LCBjb25maWc6IE9wZW5Db25maWd1cmF0aW9uKSB7XG5cbiAgICBjb25zdCBkaWFsb2dJbnN0YW5jZTogTWF0RGlhbG9nUmVmPGFueT4gPSB0aGlzLmRpYWxvZy5vcGVuKFxuICAgICAgRGVjRGlhbG9nQ29tcG9uZW50LFxuICAgICAge1xuICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoIHx8ICcxMDB2dycsXG4gICAgICAgIGhlaWdodDogY29uZmlnLmhlaWd0aCB8fCAnMTAwdmgnLFxuICAgICAgICBwYW5lbENsYXNzOiAnZnVsbC1zY3JlZW4tZGlhbG9nJ1xuICAgICAgfVxuICAgICk7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5jaGlsZENvbXBvbmVudFR5cGUgPSBjaGlsZENvbXBvbmVudDtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmFjdGlvbnMgPSBjb25maWcuYWN0aW9ucztcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gY29uZmlnLnRpdGxlO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UuY29udGV4dCA9IGNvbmZpZy5jb250ZXh0O1xuXG4gICAgcmV0dXJuIGRpYWxvZ0luc3RhbmNlO1xuXG4gIH1cbn1cbiJdfQ==