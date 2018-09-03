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
var DecSnackBarService = /** @class */ (function () {
    function DecSnackBarService(snackBarService, translate) {
        this.snackBarService = snackBarService;
        this.translate = translate;
    }
    /**
     * @param {?} message
     * @param {?} type
     * @param {?=} duration
     * @return {?}
     */
    DecSnackBarService.prototype.open = /**
     * @param {?} message
     * @param {?} type
     * @param {?=} duration
     * @return {?}
     */
    function (message, type, duration) {
        if (duration === void 0) { duration = 4e3; }
        var /** @type {?} */ msg = this.translate.instant(message);
        var /** @type {?} */ snackClass = this.getClass(type);
        return this.snackBarService.open(msg, '', {
            duration: duration,
            panelClass: snackClass
        });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    DecSnackBarService.prototype.getClass = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
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
    };
    DecSnackBarService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    DecSnackBarService.ctorParameters = function () { return [
        { type: MatSnackBar },
        { type: TranslateService }
    ]; };
    /** @nocollapse */ DecSnackBarService.ngInjectableDef = i0.defineInjectable({ factory: function DecSnackBarService_Factory() { return new DecSnackBarService(i0.inject(i1.MatSnackBar), i0.inject(i2.TranslateService)); }, token: DecSnackBarService, providedIn: "root" });
    return DecSnackBarService;
}());
export { DecSnackBarService };
function DecSnackBarService_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSnackBarService.prototype.snackBarService;
    /** @type {?} */
    DecSnackBarService.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNuYWNrLWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQWtDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0lBVXJELDRCQUFtQixlQUE0QixFQUNyQztRQURTLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBQ3JDLGNBQVMsR0FBVCxTQUFTO0tBQXVCOzs7Ozs7O0lBRTFDLGlDQUFJOzs7Ozs7SUFBSixVQUFLLE9BQWUsRUFBRSxJQUFpQixFQUFFLFFBQWM7UUFBZCx5QkFBQSxFQUFBLGNBQWM7UUFDckQscUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLHFCQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFO1lBQ3hDLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFVBQVUsRUFBRSxVQUFVO1NBQ3ZCLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELHFDQUFROzs7O0lBQVIsVUFBUyxJQUFpQjtRQUN4QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxTQUFTO2dCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDekIsS0FBSyxTQUFTO2dCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDekIsS0FBSyxNQUFNO2dCQUNULE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDdEIsS0FBSyxNQUFNO2dCQUNULE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDdEIsS0FBSyxPQUFPO2dCQUNWLE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FDeEI7S0FDRjs7Z0JBL0JGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUlEsV0FBVztnQkFDWCxnQkFBZ0I7Ozs2QkFGekI7O1NBVWEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIsIE1hdFNuYWNrQmFyUmVmLCBTaW1wbGVTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuXG5leHBvcnQgdHlwZSBNZXNzYWdlVHlwZSA9ICdzdWNjZXNzJyB8ICdwcmltYXJ5JyB8ICdpbmZvJyB8ICd3YXJuJyB8ICdlcnJvcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1NuYWNrQmFyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNuYWNrQmFyU2VydmljZTogTWF0U25hY2tCYXIsXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxuXG4gIG9wZW4obWVzc2FnZTogc3RyaW5nLCB0eXBlOiBNZXNzYWdlVHlwZSwgZHVyYXRpb24gPSA0ZTMpOiBNYXRTbmFja0JhclJlZjxTaW1wbGVTbmFja0Jhcj4ge1xuICAgIGNvbnN0IG1zZyA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQobWVzc2FnZSk7XG4gICAgY29uc3Qgc25hY2tDbGFzcyA9IHRoaXMuZ2V0Q2xhc3ModHlwZSk7XG5cbiAgICByZXR1cm4gdGhpcy5zbmFja0JhclNlcnZpY2Uub3Blbihtc2csICcnLCB7XG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICBwYW5lbENsYXNzOiBzbmFja0NsYXNzXG4gICAgfSk7XG4gIH1cblxuICBnZXRDbGFzcyh0eXBlOiBNZXNzYWdlVHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgIHJldHVybiAnc25hY2stc3VjY2Vzcyc7XG4gICAgICBjYXNlICdwcmltYXJ5JzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1wcmltYXJ5JztcbiAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLWluZm8nO1xuICAgICAgY2FzZSAnd2Fybic6XG4gICAgICAgIHJldHVybiAnc25hY2std2Fybic7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIHJldHVybiAnc25hY2stZXJyb3InO1xuICAgIH1cbiAgfVxufVxuIl19