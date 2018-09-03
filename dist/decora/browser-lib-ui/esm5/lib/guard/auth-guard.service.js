/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DecApiService } from './../services/api/decora-api.service';
import { map } from 'rxjs/operators';
var DecAuthGuard = /** @class */ (function () {
    function DecAuthGuard(decoraApi) {
        this.decoraApi = decoraApi;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    DecAuthGuard.prototype.canLoad = /**
     * @param {?} route
     * @return {?}
     */
    function (route) {
        return this.isAuthenticated();
    };
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    DecAuthGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        return this.isAuthenticated();
    };
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    DecAuthGuard.prototype.canActivateChild = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        return this.isAuthenticated();
    };
    /**
     * @return {?}
     */
    DecAuthGuard.prototype.isAuthenticated = /**
     * @return {?}
     */
    function () {
        return /** @type {?} */ (this.decoraApi.user$
            .pipe(map(function (user) {
            return (user && user.id) ? true : false;
        })));
    };
    DecAuthGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecAuthGuard.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    return DecAuthGuard;
}());
export { DecAuthGuard };
function DecAuthGuard_tsickle_Closure_declarations() {
    /** @type {?} */
    DecAuthGuard.prototype.decoraApi;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9ndWFyZC9hdXRoLWd1YXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFNbkMsc0JBQ1U7UUFBQSxjQUFTLEdBQVQsU0FBUztLQUNmOzs7OztJQUVKLDhCQUFPOzs7O0lBQVAsVUFBUSxLQUFZO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDL0I7Ozs7OztJQUVELGtDQUFXOzs7OztJQUFYLFVBQVksS0FBNkIsRUFBRSxLQUEwQjtRQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQy9COzs7Ozs7SUFFRCx1Q0FBZ0I7Ozs7O0lBQWhCLFVBQWlCLEtBQTZCLEVBQUUsS0FBMEI7UUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUMvQjs7OztJQUVPLHNDQUFlOzs7O1FBQ3JCLE1BQU0sbUJBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO2FBQzFCLElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQyxJQUFTO1lBQ1osTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDekMsQ0FBQyxDQUNvQixFQUFDOzs7Z0JBekI1QixVQUFVOzs7O2dCQUpGLGFBQWE7O3VCQUh0Qjs7U0FRYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIENhbkxvYWQsIFJvdXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7fVxuXG4gIGNhbkxvYWQocm91dGU6IFJvdXRlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQXV0aGVudGljYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkudXNlciRcbiAgICAucGlwZShcbiAgICAgIG1hcCgodXNlcjogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiAodXNlciAmJiB1c2VyLmlkKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pXG4gICAgKSBhcyBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICB9XG5cbn1cbiJdfQ==