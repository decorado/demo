/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, InjectionToken, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecConfigurationService } from './configuration.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
export const /** @type {?} */ DECORA_CONFIGURATION_SERVICE_CONFIG = new InjectionToken('DECORA_CONFIGURATION_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} serviceConfig
 * @return {?}
 */
export function InitDecConfigurationService(http, serviceConfig) {
    return new DecConfigurationService(http, serviceConfig);
}
export class DecConfigurationModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('DecConfigurationModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
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
    }
}
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
DecConfigurationModule.ctorParameters = () => [
    { type: DecConfigurationModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1zZXJ2aWNlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLXNlcnZpY2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHcEUsTUFBTSxDQUFDLHVCQUFNLG1DQUFtQyxHQUFHLElBQUksY0FBYyxDQUFnQyxxQ0FBcUMsQ0FBQyxDQUFDOzs7Ozs7QUFFNUksTUFBTSxzQ0FBc0MsSUFBZ0IsRUFBRSxhQUE0QztJQUN4RyxNQUFNLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7Q0FDekQ7QUFVRCxNQUFNOzs7O0lBRUosWUFBb0MsWUFBb0M7UUFDdEUsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLDJFQUEyRSxDQUFDLENBQUM7U0FDOUY7S0FDRjs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXFDO1FBRWxELE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQ2xFO29CQUNFLE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLFVBQVUsRUFBRSwyQkFBMkI7b0JBQ3ZDLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxtQ0FBbUMsQ0FBQztpQkFDeEQ7YUFDRjtTQUNGLENBQUM7S0FFSDs7O1lBL0JGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixnQkFBZ0I7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7aUJBQ2pCO2FBQ0Y7Ozs7WUFHbUQsc0JBQXNCLHVCQUEzRCxRQUFRLFlBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiwgU2tpcFNlbGYsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlLCBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2RlbHMnO1xuXG5leHBvcnQgY29uc3QgREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48RGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWc+KCdERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJRycpO1xuXG5leHBvcnQgZnVuY3Rpb24gSW5pdERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlKGh0dHA6IEh0dHBDbGllbnQsIHNlcnZpY2VDb25maWc6IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnKSB7XG4gIHJldHVybiBuZXcgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UoaHR0cCwgc2VydmljZUNvbmZpZyk7XG59XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb25maWd1cmF0aW9uTW9kdWxlIHtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IERlY0NvbmZpZ3VyYXRpb25Nb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY0NvbmZpZ3VyYXRpb25Nb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpdCBpbiB0aGUgQXBwTW9kdWxlIG9ubHknKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERlY0NvbmZpZ3VyYXRpb25Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRGVjQ29uZmlndXJhdGlvblNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogSW5pdERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICAgICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50LCBERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJR11cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG5cbiAgfVxuXG59XG4iXX0=