/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, InjectionToken, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecConfigurationService } from './configuration.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
/** @type {?} */
export const DECORA_CONFIGURATION_SERVICE_CONFIG = new InjectionToken('DECORA_CONFIGURATION_SERVICE_CONFIG');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1zZXJ2aWNlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLXNlcnZpY2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBR3BFLGFBQWEsbUNBQW1DLEdBQUcsSUFBSSxjQUFjLENBQWdDLHFDQUFxQyxDQUFDLENBQUM7Ozs7OztBQUU1SSxNQUFNLHNDQUFzQyxJQUFnQixFQUFFLGFBQTRDO0lBQ3hHLE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztDQUN6RDtBQVVELE1BQU07Ozs7SUFFSixZQUFvQyxZQUFvQztRQUN0RSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkVBQTJFLENBQUMsQ0FBQztTQUM5RjtLQUNGOzs7OztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBcUM7UUFFbEQsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDbEU7b0JBQ0UsT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsVUFBVSxFQUFFLDJCQUEyQjtvQkFDdkMsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLG1DQUFtQyxDQUFDO2lCQUN4RDthQUNGO1NBQ0YsQ0FBQztLQUVIOzs7WUEvQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGdCQUFnQjtpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGdCQUFnQjtpQkFDakI7YUFDRjs7OztZQUdtRCxzQkFBc0IsdUJBQTNELFFBQVEsWUFBSSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdGlvblRva2VuLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZyB9IGZyb20gJy4vY29uZmlndXJhdGlvbi1zZXJ2aWNlLm1vZGVscyc7XG5cbmV4cG9ydCBjb25zdCBERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZz4oJ0RFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBJbml0RGVjQ29uZmlndXJhdGlvblNlcnZpY2UoaHR0cDogSHR0cENsaWVudCwgc2VydmljZUNvbmZpZzogRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcpIHtcbiAgcmV0dXJuIG5ldyBEZWNDb25maWd1cmF0aW9uU2VydmljZShodHRwLCBzZXJ2aWNlQ29uZmlnKTtcbn1cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbmZpZ3VyYXRpb25Nb2R1bGUge1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogRGVjQ29uZmlndXJhdGlvbk1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjQ29uZmlndXJhdGlvbk1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcpIHtcblxuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGVjQ29uZmlndXJhdGlvbk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IERFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBEZWNDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBJbml0RGVjQ29uZmlndXJhdGlvblNlcnZpY2UsXG4gICAgICAgICAgZGVwczogW0h0dHBDbGllbnQsIERFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcblxuICB9XG5cbn1cbiJdfQ==