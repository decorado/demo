/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
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
        return this.http.get(path)
            .pipe(tap((res) => {
            this.profile = this.isValidProfile(res.profile, res) ? res.profile : this.profile;
            this.config = res[this.profile];
            console.log(`DecConfigurationService:: Loaded "${this.profile}" profile`);
        })).toPromise();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsdUJBQU0sV0FBVyxHQUFHLHlDQUF5QyxDQUFDO0FBRzlELE1BQU07Ozs7O0lBZ0JKLFlBQ1UsTUFDMkQsb0JBQW1EO1FBRDlHLFNBQUksR0FBSixJQUFJO1FBQ3VELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBK0I7dUJBTjlHLE9BQU87S0FPYjs7Ozs7SUFqQkosSUFBSSxNQUFNLENBQUMsQ0FBTTtRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUNsQjtLQUNGOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDckI7Ozs7SUFXRCxVQUFVO1FBQ1IsdUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7UUFDcEQsdUJBQU0sSUFBSSxHQUFHLEdBQUcsUUFBUSxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7YUFDekIsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLElBQUksQ0FBQyxPQUFPLFdBQVcsQ0FBQyxDQUFDO1NBQzNFLENBQUMsQ0FDSCxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ2Y7Ozs7OztJQUVPLGNBQWMsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCO1FBRS9DLHVCQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbEQsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Ozs7WUF2QzVELFVBQVU7Ozs7WUFORixVQUFVOzRDQXlCZCxRQUFRLFlBQUksTUFBTSxTQUFDLHFDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZyB9IGZyb20gJy4vY29uZmlndXJhdGlvbi1zZXJ2aWNlLm1vZGVscyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IENPTkZJR19QQVRIID0gJ2Fzc2V0cy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uanNvbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNDb25maWd1cmF0aW9uU2VydmljZSB7XG5cbiAgc2V0IGNvbmZpZyh2OiBhbnkpIHtcbiAgICBpZiAodGhpcy5fY29uZmlnICE9PSB2KSB7XG4gICAgICB0aGlzLl9jb25maWcgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb25maWcoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgcHJvZmlsZSA9ICdsb2NhbCc7XG5cbiAgcHJpdmF0ZSBfY29uZmlnOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ0RFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHJykgcHJpdmF0ZSBzZXJ2aWNlQ29uZmlndXJhdGlvbjogRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcsXG4gICkge31cblxuICBsb2FkQ29uZmlnKCkge1xuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5zZXJ2aWNlQ29uZmlndXJhdGlvbi5iYXNlUGF0aDtcbiAgICBjb25zdCBwYXRoID0gYCR7YmFzZVBhdGh9LyR7Q09ORklHX1BBVEh9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChwYXRoKVxuICAgIC5waXBlKFxuICAgICAgdGFwKChyZXM6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnByb2ZpbGUgPSB0aGlzLmlzVmFsaWRQcm9maWxlKHJlcy5wcm9maWxlLCByZXMpID8gcmVzLnByb2ZpbGUgOiB0aGlzLnByb2ZpbGU7XG4gICAgICAgIHRoaXMuY29uZmlnID0gcmVzW3RoaXMucHJvZmlsZV07XG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWNDb25maWd1cmF0aW9uU2VydmljZTo6IExvYWRlZCBcIiR7dGhpcy5wcm9maWxlfVwiIHByb2ZpbGVgKTtcbiAgICAgIH0pXG4gICAgKS50b1Byb21pc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWYWxpZFByb2ZpbGUocHJvZmlsZSwgYXZhaWxhYmxlUHJvZmlsZXMpIHtcblxuICAgIGNvbnN0IGF2YWlsYWJsZXMgPSBPYmplY3Qua2V5cyhhdmFpbGFibGVQcm9maWxlcyk7XG5cbiAgICByZXR1cm4gKGF2YWlsYWJsZXMuaW5kZXhPZihwcm9maWxlKSA+PSAwKSA/IHRydWUgOiBmYWxzZTtcblxuICB9XG5cbn1cbiJdfQ==