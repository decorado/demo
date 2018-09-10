/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/** @type {?} */
export var STORAGE_DOMAIN = 'decSidenavConfig';
var DecSidenavService = /** @class */ (function () {
    function DecSidenavService() {
        this.progressBarVisible = new BehaviorSubject(false);
    }
    /**
     * @param {?} name
     * @param {?} visibility
     * @return {?}
     */
    DecSidenavService.prototype.setSidenavVisibility = /**
     * @param {?} name
     * @param {?} visibility
     * @return {?}
     */
    function (name, visibility) {
        /** @type {?} */
        var config = this.getSidenavConfig();
        config[name] = visibility;
        this.setSidenavConfig(config);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DecSidenavService.prototype.getSidenavVisibility = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var config = this.getSidenavConfig();
        return config[name];
    };
    /**
     * @param {?=} msg
     * @return {?}
     */
    DecSidenavService.prototype.showProgressBar = /**
     * @param {?=} msg
     * @return {?}
     */
    function (msg) {
        this.progressBarVisible.next(msg || true);
    };
    /**
     * @return {?}
     */
    DecSidenavService.prototype.hideProgressbar = /**
     * @return {?}
     */
    function () {
        this.progressBarVisible.next(false);
    };
    /**
     * @return {?}
     */
    DecSidenavService.prototype.toggleProgressBar = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nextValue = !!!this.progressBarVisible.value;
        this.progressBarVisible.next(nextValue);
    };
    /**
     * @param {?} conf
     * @return {?}
     */
    DecSidenavService.prototype.setSidenavConfig = /**
     * @param {?} conf
     * @return {?}
     */
    function (conf) {
        /** @type {?} */
        var confString = JSON.stringify(conf);
        localStorage.setItem(STORAGE_DOMAIN, confString);
    };
    /**
     * @return {?}
     */
    DecSidenavService.prototype.getSidenavConfig = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var data = localStorage.getItem(STORAGE_DOMAIN);
        if (data) {
            return JSON.parse(data);
        }
        else {
            /** @type {?} */
            var newConfig = {};
            this.setSidenavConfig(newConfig);
            return newConfig;
        }
    };
    DecSidenavService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecSidenavService.ctorParameters = function () { return []; };
    return DecSidenavService;
}());
export { DecSidenavService };
if (false) {
    /** @type {?} */
    DecSidenavService.prototype.progressBarVisible;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRXZDLFdBQWEsY0FBYyxHQUFHLGtCQUFrQixDQUFDOztJQU8vQztrQ0FGcUIsSUFBSSxlQUFlLENBQW1CLEtBQUssQ0FBQztLQUVqRDs7Ozs7O0lBRWhCLGdEQUFvQjs7Ozs7SUFBcEIsVUFBcUIsSUFBSSxFQUFFLFVBQVU7O1FBRW5DLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUM7UUFFMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBRS9COzs7OztJQUVELGdEQUFvQjs7OztJQUFwQixVQUFxQixJQUFJOztRQUV2QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV2QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBRXJCOzs7OztJQUVELDJDQUFlOzs7O0lBQWYsVUFBZ0IsR0FBWTtRQUUxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztLQUUzQzs7OztJQUVELDJDQUFlOzs7SUFBZjtRQUVFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FFckM7Ozs7SUFFRCw2Q0FBaUI7OztJQUFqQjs7UUFFRSxJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1FBRW5ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FFekM7Ozs7O0lBRU8sNENBQWdCOzs7O2NBQUMsSUFBSTs7UUFFM0IsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQzs7Ozs7SUFJM0MsNENBQWdCOzs7OztRQUV0QixJQUFNLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWxELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFVCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUV6QjtRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVOLElBQU0sU0FBUyxHQUFRLEVBQUUsQ0FBQztZQUUxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFakMsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUVsQjs7O2dCQXJFSixVQUFVOzs7OzRCQUxYOztTQU1hLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY29uc3QgU1RPUkFHRV9ET01BSU4gPSAnZGVjU2lkZW5hdkNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2U2VydmljZSB7XG5cbiAgcHJvZ3Jlc3NCYXJWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHNldFNpZGVuYXZWaXNpYmlsaXR5KG5hbWUsIHZpc2liaWxpdHkpIHtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0U2lkZW5hdkNvbmZpZygpO1xuXG4gICAgY29uZmlnW25hbWVdID0gdmlzaWJpbGl0eTtcblxuICAgIHRoaXMuc2V0U2lkZW5hdkNvbmZpZyhjb25maWcpO1xuXG4gIH1cblxuICBnZXRTaWRlbmF2VmlzaWJpbGl0eShuYW1lKSB7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFNpZGVuYXZDb25maWcoKTtcblxuICAgIHJldHVybiBjb25maWdbbmFtZV07XG5cbiAgfVxuXG4gIHNob3dQcm9ncmVzc0Jhcihtc2c/OiBzdHJpbmcpIHtcblxuICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQobXNnIHx8IHRydWUpO1xuXG4gIH1cblxuICBoaWRlUHJvZ3Jlc3NiYXIoKSB7XG5cbiAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KGZhbHNlKTtcblxuICB9XG5cbiAgdG9nZ2xlUHJvZ3Jlc3NCYXIoKSB7XG5cbiAgICBjb25zdCBuZXh0VmFsdWUgPSAhISF0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcblxuICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQobmV4dFZhbHVlKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTaWRlbmF2Q29uZmlnKGNvbmYpIHtcblxuICAgIGNvbnN0IGNvbmZTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShjb25mKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfRE9NQUlOLCBjb25mU3RyaW5nKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTaWRlbmF2Q29uZmlnKCkge1xuXG4gICAgY29uc3QgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfRE9NQUlOKTtcblxuICAgIGlmIChkYXRhKSB7XG5cbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcblxuICAgICAgdGhpcy5zZXRTaWRlbmF2Q29uZmlnKG5ld0NvbmZpZyk7XG5cbiAgICAgIHJldHVybiBuZXdDb25maWc7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iXX0=