/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const /** @type {?} */ CONFIG_PATH = 'assets/configuration/configuration.json';
export class DecConfigurationService {
    /**
     * @param {?} http
     * @param {?} serviceConfiguration
     */
    constructor(http, serviceConfiguration) {
        this.http = http;
        this.serviceConfiguration = serviceConfiguration;
        this.profile = 'local';
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set config(v) {
        if (this._config !== v) {
            this._config = v;
        }
    }
    /**
     * @return {?}
     */
    get config() {
        return this._config;
    }
    /**
     * @return {?}
     */
    loadConfig() {
        const /** @type {?} */ basePath = this.serviceConfiguration.basePath;
        const /** @type {?} */ path = `${basePath}/${CONFIG_PATH}`;
        const /** @type {?} */ call = this.http.get(path).toPromise();
        call.then((res) => {
            console.log(`DecConfigurationService:: Initialized in ${this.profile} mode`);
            this.profile = this.isValidProfile(res.profile, res) ? res.profile : this.profile;
            this.config = res[this.profile];
        }, err => {
            console.error('DecConfigurationService:: Initialization Error. Could retrieve app configuration', err);
        });
        return call;
    }
    /**
     * @param {?} profile
     * @param {?} availableProfiles
     * @return {?}
     */
    isValidProfile(profile, availableProfiles) {
        const /** @type {?} */ availables = Object.keys(availableProfiles);
        return (availables.indexOf(profile) >= 0) ? true : false;
    }
}
DecConfigurationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecConfigurationService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['DECORA_CONFIGURATION_SERVICE_CONFIG',] }] }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlsRCx1QkFBTSxXQUFXLEdBQUcseUNBQXlDLENBQUM7QUFHOUQsTUFBTTs7Ozs7SUFnQkosWUFDVSxNQUMyRCxvQkFBbUQ7UUFEOUcsU0FBSSxHQUFKLElBQUk7UUFDdUQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUErQjt1QkFOOUcsT0FBTztLQU9iOzs7OztJQWpCSixJQUFJLE1BQU0sQ0FBQyxDQUFNO1FBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO0tBQ0Y7Ozs7SUFFRCxJQUFJLE1BQU07UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjs7OztJQVdELFVBQVU7UUFDUix1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztRQUNwRCx1QkFBTSxJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksV0FBVyxFQUFFLENBQUM7UUFFMUMsdUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxJQUFJLENBQUMsT0FBTyxPQUFPLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNsRixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakMsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0ZBQWtGLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDeEcsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiOzs7Ozs7SUFFTyxjQUFjLENBQUMsT0FBTyxFQUFFLGlCQUFpQjtRQUUvQyx1QkFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWxELE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOzs7O1lBM0M1RCxVQUFVOzs7O1lBTkYsVUFBVTs0Q0F5QmQsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2RlbHMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jb25zdCBDT05GSUdfUEFUSCA9ICdhc3NldHMvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLmpzb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjQ29uZmlndXJhdGlvblNlcnZpY2Uge1xuXG4gIHNldCBjb25maWcodjogYW55KSB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZyAhPT0gdikge1xuICAgICAgdGhpcy5fY29uZmlnID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgY29uZmlnKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIHByb2ZpbGUgPSAnbG9jYWwnO1xuXG4gIHByaXZhdGUgX2NvbmZpZzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJRycpIHByaXZhdGUgc2VydmljZUNvbmZpZ3VyYXRpb246IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnLFxuICApIHt9XG5cbiAgbG9hZENvbmZpZygpIHtcbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuc2VydmljZUNvbmZpZ3VyYXRpb24uYmFzZVBhdGg7XG4gICAgY29uc3QgcGF0aCA9IGAke2Jhc2VQYXRofS8ke0NPTkZJR19QQVRIfWA7XG5cbiAgICBjb25zdCBjYWxsID0gdGhpcy5odHRwLmdldChwYXRoKS50b1Byb21pc2UoKTtcblxuICAgIGNhbGwudGhlbigocmVzOiBhbnkpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNDb25maWd1cmF0aW9uU2VydmljZTo6IEluaXRpYWxpemVkIGluICR7dGhpcy5wcm9maWxlfSBtb2RlYCk7XG4gICAgICB0aGlzLnByb2ZpbGUgPSB0aGlzLmlzVmFsaWRQcm9maWxlKHJlcy5wcm9maWxlLCByZXMpID8gcmVzLnByb2ZpbGUgOiB0aGlzLnByb2ZpbGU7XG4gICAgICB0aGlzLmNvbmZpZyA9IHJlc1t0aGlzLnByb2ZpbGVdO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdEZWNDb25maWd1cmF0aW9uU2VydmljZTo6IEluaXRpYWxpemF0aW9uIEVycm9yLiBDb3VsZCByZXRyaWV2ZSBhcHAgY29uZmlndXJhdGlvbicsIGVycik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHByaXZhdGUgaXNWYWxpZFByb2ZpbGUocHJvZmlsZSwgYXZhaWxhYmxlUHJvZmlsZXMpIHtcblxuICAgIGNvbnN0IGF2YWlsYWJsZXMgPSBPYmplY3Qua2V5cyhhdmFpbGFibGVQcm9maWxlcyk7XG5cbiAgICByZXR1cm4gKGF2YWlsYWJsZXMuaW5kZXhPZihwcm9maWxlKSA+PSAwKSA/IHRydWUgOiBmYWxzZTtcblxuICB9XG5cbn1cbiJdfQ==