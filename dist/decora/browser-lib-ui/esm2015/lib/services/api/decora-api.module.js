/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { DecApiService } from './decora-api.service';
export const /** @type {?} */ DECORA_API_SERVICE_CONFIG = new InjectionToken('DECORA_API_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} serviceConfig
 * @return {?}
 */
export function InitDecApiService(http, serviceConfig) {
    return new DecApiService(http, serviceConfig);
}
export class DecApiModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DecApiModule,
            providers: [
                { provide: DECORA_API_SERVICE_CONFIG, useValue: config },
                {
                    provide: DecApiService,
                    useFactory: InitDecApiService,
                    deps: [HttpClient, DECORA_API_SERVICE_CONFIG]
                }
            ]
        };
    }
}
DecApiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXJELE1BQU0sQ0FBQyx1QkFBTSx5QkFBeUIsR0FBRyxJQUFJLGNBQWMsQ0FBZ0IsMkJBQTJCLENBQUMsQ0FBQzs7Ozs7O0FBRXhHLE1BQU0sNEJBQTRCLElBQWdCLEVBQUUsYUFBNEI7SUFDOUUsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztDQUMvQztBQVFELE1BQU07Ozs7O0lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFxQjtRQUNsQyxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDeEQ7b0JBQ0UsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFVBQVUsRUFBRSxpQkFBaUI7b0JBQzdCLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSx5QkFBeUIsQ0FBQztpQkFDOUM7YUFDRjtTQUNGLENBQUM7S0FDSDs7O1lBbkJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixnQkFBZ0I7aUJBQ2pCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VydmljZUNvbmZpZyB9IGZyb20gJy4vZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTZXJ2aWNlQ29uZmlnPignREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJRycpO1xuXG5leHBvcnQgZnVuY3Rpb24gSW5pdERlY0FwaVNlcnZpY2UoaHR0cDogSHR0cENsaWVudCwgc2VydmljZUNvbmZpZzogU2VydmljZUNvbmZpZykge1xuICByZXR1cm4gbmV3IERlY0FwaVNlcnZpY2UoaHR0cCwgc2VydmljZUNvbmZpZyk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0FwaU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU2VydmljZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGVjQXBpTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBJbml0RGVjQXBpU2VydmljZSxcbiAgICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJR11cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==