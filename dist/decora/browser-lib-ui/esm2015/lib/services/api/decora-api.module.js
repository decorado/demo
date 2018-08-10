/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DecSnackBarModule } from './../snack-bar/dec-snack-bar.module';
import { DecConfigurationModule } from './../configuration/configuration-service.module';
import { DecApiService } from './decora-api.service';
export class DecApiModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('DecApiModule is already loaded. Import it in the AppModule only');
        }
    }
}
DecApiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    DecSnackBarModule,
                    DecConfigurationModule,
                ],
                providers: [
                    DecApiService,
                ]
            },] },
];
/** @nocollapse */
DecApiModule.ctorParameters = () => [
    { type: DecApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN6RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFhckQsTUFBTTs7OztJQUNKLFlBQW9DLFlBQTBCO1FBQzVELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FDYixpRUFBaUUsQ0FBQyxDQUFDO1NBQ3RFO0tBQ0Y7OztZQWpCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGFBQWE7aUJBQ2Q7YUFDRjs7OztZQUVtRCxZQUFZLHVCQUFqRCxRQUFRLFlBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJNb2R1bGUgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uTW9kdWxlIH0gZnJvbSAnLi8uLi9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vZGVjb3JhLWFwaS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIERlY1NuYWNrQmFyTW9kdWxlLFxuICAgIERlY0NvbmZpZ3VyYXRpb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY0FwaVNlcnZpY2UsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXBpTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBEZWNBcGlNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdEZWNBcGlNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpdCBpbiB0aGUgQXBwTW9kdWxlIG9ubHknKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==