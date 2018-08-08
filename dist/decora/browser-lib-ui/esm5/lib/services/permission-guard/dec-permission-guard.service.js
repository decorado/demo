/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../api/decora-api.service";
import * as i2 from "@angular/router";
var DecPermissionGuard = /** @class */ (function () {
    function DecPermissionGuard(decoraApi, router) {
        this.decoraApi = decoraApi;
        this.router = router;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    DecPermissionGuard.prototype.canLoad = /**
     * @param {?} route
     * @return {?}
     */
    function (route) {
        if (route.data && !route.data["permissions"]) {
            this.notAllowed();
            return of(false);
        }
        var /** @type {?} */ permissions = route.data["permissions"];
        return this.hasAccess(permissions);
    };
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    DecPermissionGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        if (route.data && !route.data["permissions"]) {
            this.notAllowed();
            return of(false);
        }
        var /** @type {?} */ permissions = route.data["permissions"];
        return this.hasAccess(permissions);
    };
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    DecPermissionGuard.prototype.canActivateChild = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        return this.canActivate(route, state);
    };
    /**
     * @return {?}
     */
    DecPermissionGuard.prototype.notAllowed = /**
     * @return {?}
     */
    function () {
        this.router.navigate(['/forbiden']);
    };
    /**
     * @param {?} permissions
     * @return {?}
     */
    DecPermissionGuard.prototype.hasAccess = /**
     * @param {?} permissions
     * @return {?}
     */
    function (permissions) {
        var _this = this;
        return this.decoraApi.user$
            .pipe(map(function (user) {
            if (user) {
                var /** @type {?} */ allowed = _this.isAllowedAccess(user.permissions, permissions);
                if (!allowed) {
                    _this.notAllowed();
                }
                else {
                    return true;
                }
            }
        }));
    };
    /**
     * @param {?} userPermissions
     * @param {?} currentPermissions
     * @return {?}
     */
    DecPermissionGuard.prototype.isAllowedAccess = /**
     * @param {?} userPermissions
     * @param {?} currentPermissions
     * @return {?}
     */
    function (userPermissions, currentPermissions) {
        try {
            var /** @type {?} */ matchingRole = currentPermissions.find(function (userRole) {
                return userPermissions.find(function (alowedRole) {
                    return alowedRole === userRole;
                }) ? true : false;
            });
            return matchingRole ? true : false;
        }
        catch (/** @type {?} */ error) {
            return false;
        }
    };
    DecPermissionGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    DecPermissionGuard.ctorParameters = function () { return [
        { type: DecApiService },
        { type: Router }
    ]; };
    /** @nocollapse */ DecPermissionGuard.ngInjectableDef = i0.defineInjectable({ factory: function DecPermissionGuard_Factory() { return new DecPermissionGuard(i0.inject(i1.DecApiService), i0.inject(i2.Router)); }, token: DecPermissionGuard, providedIn: "root" });
    return DecPermissionGuard;
}());
export { DecPermissionGuard };
function DecPermissionGuard_tsickle_Closure_declarations() {
    /** @type {?} */
    DecPermissionGuard.prototype.decoraApi;
    /** @type {?} */
    DecPermissionGuard.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXBlcm1pc3Npb24tZ3VhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcGVybWlzc2lvbi1ndWFyZC9kZWMtcGVybWlzc2lvbi1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQThGLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JJLE9BQU8sRUFBRSxFQUFFLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztJQVFuQyw0QkFBb0IsU0FBd0IsRUFDeEI7UUFEQSxjQUFTLEdBQVQsU0FBUyxDQUFlO1FBQ3hCLFdBQU0sR0FBTixNQUFNO0tBQWE7Ozs7O0lBRXZDLG9DQUFPOzs7O0lBQVAsVUFBUSxLQUFZO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxlQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xCO1FBRUQscUJBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLGVBQVksQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNwQzs7Ozs7O0lBRUQsd0NBQVc7Ozs7O0lBQVgsVUFBWSxLQUE2QixFQUFFLEtBQTBCO1FBQ25FLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxlQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xCO1FBRUQscUJBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLGVBQVksQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNwQzs7Ozs7O0lBRUQsNkNBQWdCOzs7OztJQUFoQixVQUFpQixLQUE2QixFQUFFLEtBQTBCO1FBQ3hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN2Qzs7OztJQUVELHVDQUFVOzs7SUFBVjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztLQUNyQzs7Ozs7SUFFRCxzQ0FBUzs7OztJQUFULFVBQVUsV0FBVztRQUFyQixpQkFjQztRQWJDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7YUFDMUIsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNULHFCQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3BFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDYixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ25CO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQ2I7YUFDRjtTQUNGLENBQUMsQ0FDSCxDQUFDO0tBQ0g7Ozs7OztJQUVPLDRDQUFlOzs7OztjQUFDLGVBQXlCLEVBQUUsa0JBQTRCO1FBQzdFLElBQUksQ0FBQztZQUNILHFCQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO2dCQUNwRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFDLFVBQVU7b0JBQ3JDLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDO2lCQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ25CLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3BDO1FBQUMsS0FBSyxDQUFDLENBQUMsaUJBQUEsS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7OztnQkE5REosVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFSUSxhQUFhO2dCQUMrRSxNQUFNOzs7NkJBRjNHOztTQVVhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FuTG9hZCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIFJvdXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgb2YsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uR3VhcmQgaW1wbGVtZW50cyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxuXG4gIGNhbkxvYWQocm91dGU6IFJvdXRlKSB7XG4gICAgaWYgKHJvdXRlLmRhdGEgJiYgIXJvdXRlLmRhdGEucGVybWlzc2lvbnMpIHtcbiAgICAgIHRoaXMubm90QWxsb3dlZCgpO1xuICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJtaXNzaW9ucyA9IHJvdXRlLmRhdGEucGVybWlzc2lvbnM7XG4gICAgcmV0dXJuIHRoaXMuaGFzQWNjZXNzKHBlcm1pc3Npb25zKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xuICAgIGlmIChyb3V0ZS5kYXRhICYmICFyb3V0ZS5kYXRhLnBlcm1pc3Npb25zKSB7XG4gICAgICB0aGlzLm5vdEFsbG93ZWQoKTtcbiAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGVybWlzc2lvbnMgPSByb3V0ZS5kYXRhLnBlcm1pc3Npb25zO1xuICAgIHJldHVybiB0aGlzLmhhc0FjY2VzcyhwZXJtaXNzaW9ucyk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZUNoaWxkKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xuICAgIHJldHVybiB0aGlzLmNhbkFjdGl2YXRlKHJvdXRlLCBzdGF0ZSk7XG4gIH1cblxuICBub3RBbGxvd2VkKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2ZvcmJpZGVuJ10pO1xuICB9XG5cbiAgaGFzQWNjZXNzKHBlcm1pc3Npb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLnVzZXIkXG4gICAgLnBpcGUoXG4gICAgICBtYXAodXNlciA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgY29uc3QgYWxsb3dlZCA9IHRoaXMuaXNBbGxvd2VkQWNjZXNzKHVzZXIucGVybWlzc2lvbnMsIHBlcm1pc3Npb25zKTtcbiAgICAgICAgICBpZiAoIWFsbG93ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubm90QWxsb3dlZCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNBbGxvd2VkQWNjZXNzKHVzZXJQZXJtaXNzaW9uczogc3RyaW5nW10sIGN1cnJlbnRQZXJtaXNzaW9uczogc3RyaW5nW10pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWF0Y2hpbmdSb2xlID0gY3VycmVudFBlcm1pc3Npb25zLmZpbmQoKHVzZXJSb2xlKSA9PiB7XG4gICAgICAgIHJldHVybiB1c2VyUGVybWlzc2lvbnMuZmluZCgoYWxvd2VkUm9sZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhbG93ZWRSb2xlID09PSB1c2VyUm9sZTtcbiAgICAgICAgfSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXRjaGluZ1JvbGUgPyB0cnVlIDogZmFsc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxufVxuIl19