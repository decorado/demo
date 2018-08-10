/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, InjectionToken, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecConfigurationService } from './configuration.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
export var /** @type {?} */ DECORA_CONFIGURATION_SERVICE_CONFIG = new InjectionToken('DECORA_CONFIGURATION_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} serviceConfig
 * @return {?}
 */
export function InitDecConfigurationService(http, serviceConfig) {
    return new DecConfigurationService(http, serviceConfig);
}
var DecConfigurationModule = /** @class */ (function () {
    function DecConfigurationModule(parentModule) {
        if (parentModule) {
            throw new Error('DecConfigurationModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    DecConfigurationModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: DecConfigurationModule,
            providers: [
                { provide: DECORA_CONFIGURATION_SERVICE_CONFIG, useValue: config },
                {
                    provide: DecConfigurationService,
                    useFactory: InitDecConfigurationService,
                    deps: [HttpClient, DECORA_CONFIGURATION_SERVICE_CONFIG]
                }
            ]
        };
    };
    DecConfigurationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule
                    ],
                    exports: [
                        HttpClientModule
                    ]
                },] },
    ];
    /** @nocollapse */
    DecConfigurationModule.ctorParameters = function () { return [
        { type: DecConfigurationModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return DecConfigurationModule;
}());
export { DecConfigurationModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1zZXJ2aWNlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLXNlcnZpY2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHcEUsTUFBTSxDQUFDLHFCQUFNLG1DQUFtQyxHQUFHLElBQUksY0FBYyxDQUFnQyxxQ0FBcUMsQ0FBQyxDQUFDOzs7Ozs7QUFFNUksTUFBTSxzQ0FBc0MsSUFBZ0IsRUFBRSxhQUE0QztJQUN4RyxNQUFNLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7Q0FDekQ7O0lBWUMsZ0NBQW9DLFlBQW9DO1FBQ3RFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQywyRUFBMkUsQ0FBQyxDQUFDO1NBQzlGO0tBQ0Y7Ozs7O0lBRU0sOEJBQU87Ozs7SUFBZCxVQUFlLE1BQXFDO1FBRWxELE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQ2xFO29CQUNFLE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLFVBQVUsRUFBRSwyQkFBMkI7b0JBQ3ZDLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxtQ0FBbUMsQ0FBQztpQkFDeEQ7YUFDRjtTQUNGLENBQUM7S0FFSDs7Z0JBL0JGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixnQkFBZ0I7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7cUJBQ2pCO2lCQUNGOzs7O2dCQUdtRCxzQkFBc0IsdUJBQTNELFFBQVEsWUFBSSxRQUFROztpQ0F0Qm5DOztTQW9CYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0aW9uVG9rZW4sIFNraXBTZWxmLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXNlcnZpY2UubW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IERFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnPignREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEluaXREZWNDb25maWd1cmF0aW9uU2VydmljZShodHRwOiBIdHRwQ2xpZW50LCBzZXJ2aWNlQ29uZmlnOiBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZykge1xuICByZXR1cm4gbmV3IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlKGh0dHAsIHNlcnZpY2VDb25maWcpO1xufVxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29uZmlndXJhdGlvbk1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBEZWNDb25maWd1cmF0aW9uTW9kdWxlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZWNDb25maWd1cmF0aW9uTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZWNDb25maWd1cmF0aW9uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IEluaXREZWNDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUddXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuXG4gIH1cblxufVxuIl19