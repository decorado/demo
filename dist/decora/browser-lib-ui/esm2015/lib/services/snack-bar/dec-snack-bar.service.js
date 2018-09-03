/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
import * as i2 from "@ngx-translate/core";
export class DecSnackBarService {
    /**
     * @param {?} snackBarService
     * @param {?} translate
     */
    constructor(snackBarService, translate) {
        this.snackBarService = snackBarService;
        this.translate = translate;
    }
    /**
     * @param {?} message
     * @param {?} type
     * @param {?=} duration
     * @return {?}
     */
    open(message, type, duration = 4e3) {
        const /** @type {?} */ msg = this.translate.instant(message);
        const /** @type {?} */ snackClass = this.getClass(type);
        return this.snackBarService.open(msg, '', {
            duration: duration,
            panelClass: snackClass
        });
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getClass(type) {
        switch (type) {
            case 'success':
                return 'snack-success';
            case 'primary':
                return 'snack-primary';
            case 'info':
                return 'snack-info';
            case 'warn':
                return 'snack-warn';
            case 'error':
                return 'snack-error';
        }
    }
}
DecSnackBarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
DecSnackBarService.ctorParameters = () => [
    { type: MatSnackBar },
    { type: TranslateService }
];
/** @nocollapse */ DecSnackBarService.ngInjectableDef = i0.defineInjectable({ factory: function DecSnackBarService_Factory() { return new DecSnackBarService(i0.inject(i1.MatSnackBar), i0.inject(i2.TranslateService)); }, token: DecSnackBarService, providedIn: "root" });
function DecSnackBarService_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSnackBarService.prototype.snackBarService;
    /** @type {?} */
    DecSnackBarService.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNuYWNrLWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQWtDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFRdkQsTUFBTTs7Ozs7SUFFSixZQUFtQixlQUE0QixFQUNyQztRQURTLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBQ3JDLGNBQVMsR0FBVCxTQUFTO0tBQXVCOzs7Ozs7O0lBRTFDLElBQUksQ0FBQyxPQUFlLEVBQUUsSUFBaUIsRUFBRSxRQUFRLEdBQUcsR0FBRztRQUNyRCx1QkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsdUJBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUU7WUFDeEMsUUFBUSxFQUFFLFFBQVE7WUFDbEIsVUFBVSxFQUFFLFVBQVU7U0FDdkIsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQWlCO1FBQ3hCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLFNBQVM7Z0JBQ1osTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUN6QixLQUFLLFNBQVM7Z0JBQ1osTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUN6QixLQUFLLE1BQU07Z0JBQ1QsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN0QixLQUFLLE1BQU07Z0JBQ1QsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN0QixLQUFLLE9BQU87Z0JBQ1YsTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUN4QjtLQUNGOzs7WUEvQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBUlEsV0FBVztZQUNYLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyLCBNYXRTbmFja0JhclJlZiwgU2ltcGxlU25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgTWVzc2FnZVR5cGUgPSAnc3VjY2VzcycgfCAncHJpbWFyeScgfCAnaW5mbycgfCAnd2FybicgfCAnZXJyb3InO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEZWNTbmFja0JhclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzbmFja0JhclNlcnZpY2U6IE1hdFNuYWNrQmFyLFxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cblxuICBvcGVuKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogTWVzc2FnZVR5cGUsIGR1cmF0aW9uID0gNGUzKTogTWF0U25hY2tCYXJSZWY8U2ltcGxlU25hY2tCYXI+IHtcbiAgICBjb25zdCBtc2cgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KG1lc3NhZ2UpO1xuICAgIGNvbnN0IHNuYWNrQ2xhc3MgPSB0aGlzLmdldENsYXNzKHR5cGUpO1xuXG4gICAgcmV0dXJuIHRoaXMuc25hY2tCYXJTZXJ2aWNlLm9wZW4obXNnLCAnJywge1xuICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgcGFuZWxDbGFzczogc25hY2tDbGFzc1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xhc3ModHlwZTogTWVzc2FnZVR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLXN1Y2Nlc3MnO1xuICAgICAgY2FzZSAncHJpbWFyeSc6XG4gICAgICAgIHJldHVybiAnc25hY2stcHJpbWFyeSc7XG4gICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1pbmZvJztcbiAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLXdhcm4nO1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLWVycm9yJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==