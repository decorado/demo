/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        var /** @type {?} */ call = this.http.get(path).toPromise();
        call.then(function (res) {
            console.log("DecConfigurationService:: Initialized in " + _this.profile + " mode");
            _this.profile = _this.isValidProfile(res.profile, res) ? res.profile : _this.profile;
            _this.config = res[_this.profile];
        }, function (err) {
            console.error('DecConfigurationService:: Initialization Error. Could retrieve app configuration', err);
        });
        return call;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlsRCxxQkFBTSxXQUFXLEdBQUcseUNBQXlDLENBQUM7O0lBbUI1RCxpQ0FDVSxNQUMyRCxvQkFBbUQ7UUFEOUcsU0FBSSxHQUFKLElBQUk7UUFDdUQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUErQjt1QkFOOUcsT0FBTztLQU9iO0lBakJKLHNCQUFJLDJDQUFNOzs7O1FBTVY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQjs7Ozs7UUFSRCxVQUFXLENBQU07WUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2FBQ2xCO1NBQ0Y7OztPQUFBOzs7O0lBZUQsNENBQVU7OztJQUFWO1FBQUEsaUJBZUM7UUFkQyxxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztRQUNwRCxxQkFBTSxJQUFJLEdBQU0sUUFBUSxTQUFJLFdBQWEsQ0FBQztRQUUxQyxxQkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBNEMsS0FBSSxDQUFDLE9BQU8sVUFBTyxDQUFDLENBQUM7WUFDN0UsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEYsS0FBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDLEVBQUUsVUFBQSxHQUFHO1lBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxrRkFBa0YsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN4RyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2I7Ozs7OztJQUVPLGdEQUFjOzs7OztjQUFDLE9BQU8sRUFBRSxpQkFBaUI7UUFFL0MscUJBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVsRCxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7O2dCQTNDNUQsVUFBVTs7OztnQkFORixVQUFVO2dEQXlCZCxRQUFRLFlBQUksTUFBTSxTQUFDLHFDQUFxQzs7a0NBMUI3RDs7U0FRYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2RlbHMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jb25zdCBDT05GSUdfUEFUSCA9ICdhc3NldHMvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLmpzb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjQ29uZmlndXJhdGlvblNlcnZpY2Uge1xuXG4gIHNldCBjb25maWcodjogYW55KSB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZyAhPT0gdikge1xuICAgICAgdGhpcy5fY29uZmlnID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgY29uZmlnKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIHByb2ZpbGUgPSAnbG9jYWwnO1xuXG4gIHByaXZhdGUgX2NvbmZpZzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJRycpIHByaXZhdGUgc2VydmljZUNvbmZpZ3VyYXRpb246IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnLFxuICApIHt9XG5cbiAgbG9hZENvbmZpZygpIHtcbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuc2VydmljZUNvbmZpZ3VyYXRpb24uYmFzZVBhdGg7XG4gICAgY29uc3QgcGF0aCA9IGAke2Jhc2VQYXRofS8ke0NPTkZJR19QQVRIfWA7XG5cbiAgICBjb25zdCBjYWxsID0gdGhpcy5odHRwLmdldChwYXRoKS50b1Byb21pc2UoKTtcblxuICAgIGNhbGwudGhlbigocmVzOiBhbnkpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNDb25maWd1cmF0aW9uU2VydmljZTo6IEluaXRpYWxpemVkIGluICR7dGhpcy5wcm9maWxlfSBtb2RlYCk7XG4gICAgICB0aGlzLnByb2ZpbGUgPSB0aGlzLmlzVmFsaWRQcm9maWxlKHJlcy5wcm9maWxlLCByZXMpID8gcmVzLnByb2ZpbGUgOiB0aGlzLnByb2ZpbGU7XG4gICAgICB0aGlzLmNvbmZpZyA9IHJlc1t0aGlzLnByb2ZpbGVdO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdEZWNDb25maWd1cmF0aW9uU2VydmljZTo6IEluaXRpYWxpemF0aW9uIEVycm9yLiBDb3VsZCByZXRyaWV2ZSBhcHAgY29uZmlndXJhdGlvbicsIGVycik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHByaXZhdGUgaXNWYWxpZFByb2ZpbGUocHJvZmlsZSwgYXZhaWxhYmxlUHJvZmlsZXMpIHtcblxuICAgIGNvbnN0IGF2YWlsYWJsZXMgPSBPYmplY3Qua2V5cyhhdmFpbGFibGVQcm9maWxlcyk7XG5cbiAgICByZXR1cm4gKGF2YWlsYWJsZXMuaW5kZXhPZihwcm9maWxlKSA+PSAwKSA/IHRydWUgOiBmYWxzZTtcblxuICB9XG5cbn1cbiJdfQ==