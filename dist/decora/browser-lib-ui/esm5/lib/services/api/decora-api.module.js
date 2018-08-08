/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { DecApiService } from './decora-api.service';
export var /** @type {?} */ DECORA_API_SERVICE_CONFIG = new InjectionToken('DECORA_API_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} serviceConfig
 * @return {?}
 */
export function InitDecApiService(http, serviceConfig) {
    return new DecApiService(http, serviceConfig);
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
                        HttpClientModule
                    ]
                },] },
    ];
    return DecApiModule;
}());
export { DecApiModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxxQkFBTSx5QkFBeUIsR0FBRyxJQUFJLGNBQWMsQ0FBZ0IsMkJBQTJCLENBQUMsQ0FBQzs7Ozs7O0FBRXhHLE1BQU0sNEJBQTRCLElBQWdCLEVBQUUsYUFBNEI7SUFDOUUsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztDQUMvQzs7Ozs7Ozs7SUFTUSxvQkFBTzs7OztJQUFkLFVBQWUsTUFBcUI7UUFDbEMsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQ3hEO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixVQUFVLEVBQUUsaUJBQWlCO29CQUM3QixJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUseUJBQXlCLENBQUM7aUJBQzlDO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7O2dCQW5CRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZ0JBQWdCO3FCQUNqQjtpQkFDRjs7dUJBakJEOztTQWtCYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlcnZpY2VDb25maWcgfSBmcm9tICcuL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vZGVjb3JhLWFwaS5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IERFQ09SQV9BUElfU0VSVklDRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48U2VydmljZUNvbmZpZz4oJ0RFQ09SQV9BUElfU0VSVklDRV9DT05GSUcnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEluaXREZWNBcGlTZXJ2aWNlKGh0dHA6IEh0dHBDbGllbnQsIHNlcnZpY2VDb25maWc6IFNlcnZpY2VDb25maWcpIHtcbiAgcmV0dXJuIG5ldyBEZWNBcGlTZXJ2aWNlKGh0dHAsIHNlcnZpY2VDb25maWcpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBcGlNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFNlcnZpY2VDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERlY0FwaU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IERFQ09SQV9BUElfU0VSVklDRV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IERlY0FwaVNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogSW5pdERlY0FwaVNlcnZpY2UsXG4gICAgICAgICAgZGVwczogW0h0dHBDbGllbnQsIERFQ09SQV9BUElfU0VSVklDRV9DT05GSUddXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=