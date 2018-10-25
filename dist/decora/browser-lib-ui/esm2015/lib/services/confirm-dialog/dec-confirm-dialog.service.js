/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DecConfirmDialogConfig } from './dec-confirm-dialog.models';
import { DecDialogService } from './../dialog/dec-dialog.service';
import { DecConfirmDialogComponent } from './dec-confirm-dialog.component';
export class DecConfirmDialogService {
    /**
     * @param {?} decDialog
     */
    constructor(decDialog) {
        this.decDialog = decDialog;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    open(config) {
        config = new DecConfirmDialogConfig(config);
        /** @type {?} */
        const actions = [{ i18nLabel: config.customButtonTitle, callback: () => ref.close(true), color: 'primary' }];
        if (config.extraButtons) {
            actions.push(...config.extraButtons);
        }
        /** @type {?} */
        const ref = this.decDialog.open(DecConfirmDialogComponent, {
            width: config.width,
            height: config.height,
            title: config.title,
            context: config,
            bottomActions: actions,
            hideBackButton: true,
            showCancelButton: true,
            color: config.color
        });
        return ref;
    }
}
DecConfirmDialogService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecConfirmDialogService.ctorParameters = () => [
    { type: DecDialogService }
];
if (false) {
    /** @type {?} */
    DecConfirmDialogService.prototype.decDialog;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbmZpcm0tZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbmZpcm0tZGlhbG9nL2RlYy1jb25maXJtLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBSzNFLE1BQU07Ozs7SUFFSixZQUNVO1FBQUEsY0FBUyxHQUFULFNBQVM7S0FDZDs7Ozs7SUFFTCxJQUFJLENBQUMsTUFBOEI7UUFFakMsTUFBTSxHQUFHLElBQUksc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBRTVDLE1BQU0sT0FBTyxHQUFzQixDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUVoSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3RDOztRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ3pELEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLE9BQU8sRUFBRSxNQUFNO1lBQ2YsYUFBYSxFQUFFLE9BQU87WUFDdEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUVaOzs7WUE5QkYsVUFBVTs7OztZQUxGLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0NvbmZpcm1EaWFsb2dDb25maWcgfSBmcm9tICcuL2RlYy1jb25maXJtLWRpYWxvZy5tb2RlbHMnO1xuaW1wb3J0IHsgRGVjRGlhbG9nU2VydmljZSB9IGZyb20gJy4vLi4vZGlhbG9nL2RlYy1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNDb25maXJtRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtY29uZmlybS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0RpYWxvZ0FjdGlvbiB9IGZyb20gJy4vLi4vZGlhbG9nL2RlYy1kaWFsb2cubW9kZWxzJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0NvbmZpcm1EaWFsb2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY0RpYWxvZzogRGVjRGlhbG9nU2VydmljZVxuICApIHsgfVxuXG4gIG9wZW4oY29uZmlnOiBEZWNDb25maXJtRGlhbG9nQ29uZmlnKTogTWF0RGlhbG9nUmVmPGFueT4ge1xuXG4gICAgY29uZmlnID0gbmV3IERlY0NvbmZpcm1EaWFsb2dDb25maWcoY29uZmlnKTtcblxuICAgIGNvbnN0IGFjdGlvbnM6IERlY0RpYWxvZ0FjdGlvbltdID0gW3sgaTE4bkxhYmVsOiBjb25maWcuY3VzdG9tQnV0dG9uVGl0bGUsIGNhbGxiYWNrOiAoKSA9PiByZWYuY2xvc2UodHJ1ZSksIGNvbG9yOiAncHJpbWFyeScgfV07XG5cbiAgICBpZiAoY29uZmlnLmV4dHJhQnV0dG9ucykge1xuICAgICAgYWN0aW9ucy5wdXNoKC4uLmNvbmZpZy5leHRyYUJ1dHRvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZiA9IHRoaXMuZGVjRGlhbG9nLm9wZW4oRGVjQ29uZmlybURpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCxcbiAgICAgIGhlaWdodDogY29uZmlnLmhlaWdodCxcbiAgICAgIHRpdGxlOiBjb25maWcudGl0bGUsXG4gICAgICBjb250ZXh0OiBjb25maWcsXG4gICAgICBib3R0b21BY3Rpb25zOiBhY3Rpb25zLFxuICAgICAgaGlkZUJhY2tCdXR0b246IHRydWUsXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgY29sb3I6IGNvbmZpZy5jb2xvclxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlZjtcblxuICB9XG5cbn1cbiJdfQ==