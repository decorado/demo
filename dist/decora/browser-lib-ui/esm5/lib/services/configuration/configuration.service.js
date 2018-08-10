/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
var /** @type {?} */ CONFIG_PATH = 'assets/configuration/configuration.json';
var DecConfigurationService = /** @class */ (function () {
    function DecConfigurationService(http, serviceConfiguration) {
        this.http = http;
        this.serviceConfiguration = serviceConfiguration;
        this.profile = 'local';
    }
    Object.defineProperty(DecConfigurationService.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._config !== v) {
                this._config = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecConfigurationService.prototype.loadConfig = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ basePath = this.serviceConfiguration.basePath;
        var /** @type {?} */ path = basePath + "/" + CONFIG_PATH;
        return this.http.get(path)
            .pipe(tap(function (res) {
            _this.profile = _this.isValidProfile(res.profile, res) ? res.profile : _this.profile;
            _this.config = res[_this.profile];
            console.log("DecConfigurationService:: Loaded \"" + _this.profile + "\" profile");
        })).toPromise();
    };
    /**
     * @param {?} profile
     * @param {?} availableProfiles
     * @return {?}
     */
    DecConfigurationService.prototype.isValidProfile = /**
     * @param {?} profile
     * @param {?} availableProfiles
     * @return {?}
     */
    function (profile, availableProfiles) {
        var /** @type {?} */ availables = Object.keys(availableProfiles);
        return (availables.indexOf(profile) >= 0) ? true : false;
    };
    DecConfigurationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecConfigurationService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['DECORA_CONFIGURATION_SERVICE_CONFIG',] }] }
    ]; };
    return DecConfigurationService;
}());
export { DecConfigurationService };
function DecConfigurationService_tsickle_Closure_declarations() {
    /** @type {?} */
    DecConfigurationService.prototype.profile;
    /** @type {?} */
    DecConfigurationService.prototype._config;
    /** @type {?} */
    DecConfigurationService.prototype.http;
    /** @type {?} */
    DecConfigurationService.prototype.serviceConfiguration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMscUJBQU0sV0FBVyxHQUFHLHlDQUF5QyxDQUFDOztJQW1CNUQsaUNBQ1UsTUFDMkQsb0JBQW1EO1FBRDlHLFNBQUksR0FBSixJQUFJO1FBQ3VELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBK0I7dUJBTjlHLE9BQU87S0FPYjtJQWpCSixzQkFBSSwyQ0FBTTs7OztRQU1WO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckI7Ozs7O1FBUkQsVUFBVyxDQUFNO1lBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzthQUNsQjtTQUNGOzs7T0FBQTs7OztJQWVELDRDQUFVOzs7SUFBVjtRQUFBLGlCQVdDO1FBVkMscUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7UUFDcEQscUJBQU0sSUFBSSxHQUFNLFFBQVEsU0FBSSxXQUFhLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzthQUN6QixJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUMsR0FBUTtZQUNYLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2xGLEtBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUFxQyxLQUFJLENBQUMsT0FBTyxlQUFXLENBQUMsQ0FBQztTQUMzRSxDQUFDLENBQ0gsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNmOzs7Ozs7SUFFTyxnREFBYzs7Ozs7Y0FBQyxPQUFPLEVBQUUsaUJBQWlCO1FBRS9DLHFCQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbEQsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7OztnQkF2QzVELFVBQVU7Ozs7Z0JBTkYsVUFBVTtnREF5QmQsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQ0FBcUM7O2tDQTFCN0Q7O1NBUWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXNlcnZpY2UubW9kZWxzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgQ09ORklHX1BBVEggPSAnYXNzZXRzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5qc29uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIHtcblxuICBzZXQgY29uZmlnKHY6IGFueSkge1xuICAgIGlmICh0aGlzLl9jb25maWcgIT09IHYpIHtcbiAgICAgIHRoaXMuX2NvbmZpZyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNvbmZpZygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBwcm9maWxlID0gJ2xvY2FsJztcblxuICBwcml2YXRlIF9jb25maWc6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcnKSBwcml2YXRlIHNlcnZpY2VDb25maWd1cmF0aW9uOiBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZyxcbiAgKSB7fVxuXG4gIGxvYWRDb25maWcoKSB7XG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLnNlcnZpY2VDb25maWd1cmF0aW9uLmJhc2VQYXRoO1xuICAgIGNvbnN0IHBhdGggPSBgJHtiYXNlUGF0aH0vJHtDT05GSUdfUEFUSH1gO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHBhdGgpXG4gICAgLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIHRoaXMucHJvZmlsZSA9IHRoaXMuaXNWYWxpZFByb2ZpbGUocmVzLnByb2ZpbGUsIHJlcykgPyByZXMucHJvZmlsZSA6IHRoaXMucHJvZmlsZTtcbiAgICAgICAgdGhpcy5jb25maWcgPSByZXNbdGhpcy5wcm9maWxlXTtcbiAgICAgICAgY29uc29sZS5sb2coYERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlOjogTG9hZGVkIFwiJHt0aGlzLnByb2ZpbGV9XCIgcHJvZmlsZWApO1xuICAgICAgfSlcbiAgICApLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1ZhbGlkUHJvZmlsZShwcm9maWxlLCBhdmFpbGFibGVQcm9maWxlcykge1xuXG4gICAgY29uc3QgYXZhaWxhYmxlcyA9IE9iamVjdC5rZXlzKGF2YWlsYWJsZVByb2ZpbGVzKTtcblxuICAgIHJldHVybiAoYXZhaWxhYmxlcy5pbmRleE9mKHByb2ZpbGUpID49IDApID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIH1cblxufVxuIl19