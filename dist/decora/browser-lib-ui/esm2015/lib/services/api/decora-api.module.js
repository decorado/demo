/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { DecApiService } from './decora-api.service';
import { DecSnackBarModule } from './../snack-bar/dec-snack-bar.module';
export const /** @type {?} */ DECORA_API_SERVICE_CONFIG = new InjectionToken('DECORA_API_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} snackbar
 * @param {?} serviceConfig
 * @return {?}
 */
export function InitDecApiService(http, snackbar, serviceConfig) {
    return new DecApiService(http, snackbar, serviceConfig);
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
                    HttpClientModule,
                    DecSnackBarModule
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBR3hFLE1BQU0sQ0FBQyx1QkFBTSx5QkFBeUIsR0FBRyxJQUFJLGNBQWMsQ0FBZ0IsMkJBQTJCLENBQUMsQ0FBQzs7Ozs7OztBQUV4RyxNQUFNLDRCQUE0QixJQUFnQixFQUFFLFFBQTRCLEVBQUUsYUFBNEI7SUFDNUcsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7Q0FDekQ7QUFTRCxNQUFNOzs7OztJQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBcUI7UUFDbEMsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQ3hEO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixVQUFVLEVBQUUsaUJBQWlCO29CQUM3QixJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUseUJBQXlCLENBQUM7aUJBQzlDO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7OztZQXBCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VydmljZUNvbmZpZyB9IGZyb20gJy4vZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJNb2R1bGUgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNTbmFja0JhclNlcnZpY2UgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTZXJ2aWNlQ29uZmlnPignREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJRycpO1xuXG5leHBvcnQgZnVuY3Rpb24gSW5pdERlY0FwaVNlcnZpY2UoaHR0cDogSHR0cENsaWVudCwgc25hY2tiYXI6IERlY1NuYWNrQmFyU2VydmljZSwgc2VydmljZUNvbmZpZzogU2VydmljZUNvbmZpZykge1xuICByZXR1cm4gbmV3IERlY0FwaVNlcnZpY2UoaHR0cCwgc25hY2tiYXIsIHNlcnZpY2VDb25maWcpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgRGVjU25hY2tCYXJNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBcGlNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFNlcnZpY2VDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERlY0FwaU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IERFQ09SQV9BUElfU0VSVklDRV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IERlY0FwaVNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogSW5pdERlY0FwaVNlcnZpY2UsXG4gICAgICAgICAgZGVwczogW0h0dHBDbGllbnQsIERFQ09SQV9BUElfU0VSVklDRV9DT05GSUddXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=