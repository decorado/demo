/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export const /** @type {?} */ STORAGE_DOMAIN = 'decSidenavConfig';
export class DecSidenavService {
    constructor() {
        this.progressBarVisible = new BehaviorSubject(false);
    }
    /**
     * @param {?} name
     * @param {?} visibility
     * @return {?}
     */
    setSidenavVisibility(name, visibility) {
        const /** @type {?} */ config = this.getSidenavConfig();
        config[name] = visibility;
        this.setSidenavConfig(config);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getSidenavVisibility(name) {
        const /** @type {?} */ config = this.getSidenavConfig();
        return config[name];
    }
    /**
     * @param {?=} msg
     * @return {?}
     */
    showProgressBar(msg) {
        this.progressBarVisible.next(msg || true);
    }
    /**
     * @return {?}
     */
    hideProgressbar() {
        this.progressBarVisible.next(false);
    }
    /**
     * @return {?}
     */
    toggleProgressBar() {
        const /** @type {?} */ nextValue = !!!this.progressBarVisible.value;
        this.progressBarVisible.next(nextValue);
    }
    /**
     * @param {?} conf
     * @return {?}
     */
    setSidenavConfig(conf) {
        const /** @type {?} */ confString = JSON.stringify(conf);
        localStorage.setItem(STORAGE_DOMAIN, confString);
    }
    /**
     * @return {?}
     */
    getSidenavConfig() {
        const /** @type {?} */ data = localStorage.getItem(STORAGE_DOMAIN);
        if (data) {
            return JSON.parse(data);
        }
        else {
            const /** @type {?} */ newConfig = {};
            this.setSidenavConfig(newConfig);
            return newConfig;
        }
    }
}
DecSidenavService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecSidenavService.ctorParameters = () => [];
function DecSidenavService_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSidenavService.prototype.progressBarVisible;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkMsTUFBTSxDQUFDLHVCQUFNLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztBQUdqRCxNQUFNO0lBSUo7a0NBRnFCLElBQUksZUFBZSxDQUFtQixLQUFLLENBQUM7S0FFakQ7Ozs7OztJQUVoQixvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsVUFBVTtRQUVuQyx1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUUxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7S0FFL0I7Ozs7O0lBRUQsb0JBQW9CLENBQUMsSUFBSTtRQUV2Qix1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUVyQjs7Ozs7SUFFRCxlQUFlLENBQUMsR0FBWTtRQUUxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztLQUUzQzs7OztJQUVELGVBQWU7UUFFYixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBRXJDOzs7O0lBRUQsaUJBQWlCO1FBRWYsdUJBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7UUFFbkQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUV6Qzs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxJQUFJO1FBRTNCLHVCQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhDLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7OztJQUkzQyxnQkFBZ0I7UUFFdEIsdUJBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVULE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBRXpCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTix1QkFBTSxTQUFTLEdBQVEsRUFBRSxDQUFDO1lBRTFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVqQyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBRWxCOzs7O1lBckVKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfRE9NQUlOID0gJ2RlY1NpZGVuYXZDb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlNlcnZpY2Uge1xuXG4gIHByb2dyZXNzQmFyVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgYm9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRTaWRlbmF2VmlzaWJpbGl0eShuYW1lLCB2aXNpYmlsaXR5KSB7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFNpZGVuYXZDb25maWcoKTtcblxuICAgIGNvbmZpZ1tuYW1lXSA9IHZpc2liaWxpdHk7XG5cbiAgICB0aGlzLnNldFNpZGVuYXZDb25maWcoY29uZmlnKTtcblxuICB9XG5cbiAgZ2V0U2lkZW5hdlZpc2liaWxpdHkobmFtZSkge1xuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRTaWRlbmF2Q29uZmlnKCk7XG5cbiAgICByZXR1cm4gY29uZmlnW25hbWVdO1xuXG4gIH1cblxuICBzaG93UHJvZ3Jlc3NCYXIobXNnPzogc3RyaW5nKSB7XG5cbiAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KG1zZyB8fCB0cnVlKTtcblxuICB9XG5cbiAgaGlkZVByb2dyZXNzYmFyKCkge1xuXG4gICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUubmV4dChmYWxzZSk7XG5cbiAgfVxuXG4gIHRvZ2dsZVByb2dyZXNzQmFyKCkge1xuXG4gICAgY29uc3QgbmV4dFZhbHVlID0gISEhdGhpcy5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG5cbiAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KG5leHRWYWx1ZSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0U2lkZW5hdkNvbmZpZyhjb25mKSB7XG5cbiAgICBjb25zdCBjb25mU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoY29uZik7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0RPTUFJTiwgY29uZlN0cmluZyk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2lkZW5hdkNvbmZpZygpIHtcblxuICAgIGNvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0RPTUFJTik7XG5cbiAgICBpZiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG5cbiAgICAgIHRoaXMuc2V0U2lkZW5hdkNvbmZpZyhuZXdDb25maWcpO1xuXG4gICAgICByZXR1cm4gbmV3Q29uZmlnO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIl19