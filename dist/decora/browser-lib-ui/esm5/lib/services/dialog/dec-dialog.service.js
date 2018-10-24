/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DecDialogComponent } from './dec-dialog.component';
import { OpenConfiguration } from './dec-dialog.models';
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
        config = new OpenConfiguration(config);
        /** @type {?} */
        var fullscreen = !(config.width || config.height);
        /** @type {?} */
        var dialogInstance = this.dialog.open(DecDialogComponent, {
            width: fullscreen ? '100vw' : config.width,
            height: fullscreen ? '100vh' : config.height,
            panelClass: fullscreen ? 'dec-dialog-container-full-screen' : 'dec-dialog-container',
        });
        dialogInstance.componentInstance.childComponentType = childComponent;
        dialogInstance.componentInstance.topActions = config.topActions;
        dialogInstance.componentInstance.bottomActions = config.bottomActions;
        dialogInstance.componentInstance.title = config.title;
        dialogInstance.componentInstance.context = config.context;
        dialogInstance.componentInstance.hideBackButton = config.hideBackButton;
        dialogInstance.componentInstance.showCancelButton = config.showCancelButton;
        dialogInstance.componentInstance.color = config.color;
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
if (false) {
    /** @type {?} */
    DecDialogService.prototype.dialog;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9kaWFsb2cvZGVjLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFFNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBS3RELDBCQUNVO1FBQUEsV0FBTSxHQUFOLE1BQU07S0FDWDs7Ozs7O0lBR0wsK0JBQUk7Ozs7O0lBQUosVUFBSyxjQUFrQyxFQUFFLE1BQXlCO1FBRWhFLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUV2QyxJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBRXBELElBQU0sY0FBYyxHQUFzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDeEQsa0JBQWtCLEVBQ2xCO1lBQ0UsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztZQUMxQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQzVDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDckYsQ0FDRixDQUFDO1FBRUYsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztRQUVyRSxjQUFjLENBQUMsaUJBQWlCLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFFaEUsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBRXRFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUV0RCxjQUFjLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFMUQsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBRXhFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFFNUUsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRXRELE1BQU0sQ0FBQyxjQUFjLENBQUM7S0FFdkI7O2dCQXpDRixVQUFVOzs7O2dCQUxGLFNBQVM7OzJCQURsQjs7U0FPYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERlY0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3BlbkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2RlYy1kaWFsb2cubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7IH1cblxuXG4gIG9wZW4oY2hpbGRDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55PiwgY29uZmlnOiBPcGVuQ29uZmlndXJhdGlvbikge1xuXG4gICAgY29uZmlnID0gbmV3IE9wZW5Db25maWd1cmF0aW9uKGNvbmZpZyk7XG5cbiAgICBjb25zdCBmdWxsc2NyZWVuID0gIShjb25maWcud2lkdGggfHwgY29uZmlnLmhlaWdodCk7XG5cbiAgICBjb25zdCBkaWFsb2dJbnN0YW5jZTogTWF0RGlhbG9nUmVmPGFueT4gPSB0aGlzLmRpYWxvZy5vcGVuKFxuICAgICAgRGVjRGlhbG9nQ29tcG9uZW50LFxuICAgICAge1xuICAgICAgICB3aWR0aDogZnVsbHNjcmVlbiA/ICcxMDB2dycgOiBjb25maWcud2lkdGgsXG4gICAgICAgIGhlaWdodDogZnVsbHNjcmVlbiA/ICcxMDB2aCcgOiBjb25maWcuaGVpZ2h0LFxuICAgICAgICBwYW5lbENsYXNzOiBmdWxsc2NyZWVuID8gJ2RlYy1kaWFsb2ctY29udGFpbmVyLWZ1bGwtc2NyZWVuJyA6ICdkZWMtZGlhbG9nLWNvbnRhaW5lcicsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmNoaWxkQ29tcG9uZW50VHlwZSA9IGNoaWxkQ29tcG9uZW50O1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UudG9wQWN0aW9ucyA9IGNvbmZpZy50b3BBY3Rpb25zO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UuYm90dG9tQWN0aW9ucyA9IGNvbmZpZy5ib3R0b21BY3Rpb25zO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSBjb25maWcudGl0bGU7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5jb250ZXh0ID0gY29uZmlnLmNvbnRleHQ7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5oaWRlQmFja0J1dHRvbiA9IGNvbmZpZy5oaWRlQmFja0J1dHRvbjtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLnNob3dDYW5jZWxCdXR0b24gPSBjb25maWcuc2hvd0NhbmNlbEJ1dHRvbjtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmNvbG9yID0gY29uZmlnLmNvbG9yO1xuXG4gICAgcmV0dXJuIGRpYWxvZ0luc3RhbmNlO1xuXG4gIH1cbn1cbiJdfQ==