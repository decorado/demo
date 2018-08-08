/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { DecApiService } from './decora-api.service';
import { DecSnackBarModule } from './../snack-bar/dec-snack-bar.module';
export var /** @type {?} */ DECORA_API_SERVICE_CONFIG = new InjectionToken('DECORA_API_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} snackbar
 * @param {?} serviceConfig
 * @return {?}
 */
export function InitDecApiService(http, snackbar, serviceConfig) {
    return new DecApiService(http, snackbar, serviceConfig);
}
var DecApiModule = /** @class */ (function () {
    function DecApiModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    DecApiModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
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
    };
    DecApiModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        DecSnackBarModule
                    ]
                },] },
    ];
    return DecApiModule;
}());
export { DecApiModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBR3hFLE1BQU0sQ0FBQyxxQkFBTSx5QkFBeUIsR0FBRyxJQUFJLGNBQWMsQ0FBZ0IsMkJBQTJCLENBQUMsQ0FBQzs7Ozs7OztBQUV4RyxNQUFNLDRCQUE0QixJQUFnQixFQUFFLFFBQTRCLEVBQUUsYUFBNEI7SUFDNUcsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7Q0FDekQ7Ozs7Ozs7O0lBVVEsb0JBQU87Ozs7SUFBZCxVQUFlLE1BQXFCO1FBQ2xDLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2dCQUN4RDtvQkFDRSxPQUFPLEVBQUUsYUFBYTtvQkFDdEIsVUFBVSxFQUFFLGlCQUFpQjtvQkFDN0IsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLHlCQUF5QixDQUFDO2lCQUM5QzthQUNGO1NBQ0YsQ0FBQztLQUNIOztnQkFwQkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3FCQUNsQjtpQkFDRjs7dUJBcEJEOztTQXFCYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlcnZpY2VDb25maWcgfSBmcm9tICcuL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IERlY1NuYWNrQmFyTW9kdWxlIH0gZnJvbSAnLi8uLi9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IERFQ09SQV9BUElfU0VSVklDRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48U2VydmljZUNvbmZpZz4oJ0RFQ09SQV9BUElfU0VSVklDRV9DT05GSUcnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEluaXREZWNBcGlTZXJ2aWNlKGh0dHA6IEh0dHBDbGllbnQsIHNuYWNrYmFyOiBEZWNTbmFja0JhclNlcnZpY2UsIHNlcnZpY2VDb25maWc6IFNlcnZpY2VDb25maWcpIHtcbiAgcmV0dXJuIG5ldyBEZWNBcGlTZXJ2aWNlKGh0dHAsIHNuYWNrYmFyLCBzZXJ2aWNlQ29uZmlnKTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIERlY1NuYWNrQmFyTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXBpTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTZXJ2aWNlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZWNBcGlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBERUNPUkFfQVBJX1NFUlZJQ0VfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBEZWNBcGlTZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IEluaXREZWNBcGlTZXJ2aWNlLFxuICAgICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50LCBERUNPUkFfQVBJX1NFUlZJQ0VfQ09ORklHXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19