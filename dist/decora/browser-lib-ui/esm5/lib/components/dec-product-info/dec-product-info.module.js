/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecProductInfoComponent } from './dec-product-info.component';
import { DecIconModule } from './../dec-icon/dec-icon.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DecProductInfoExtraComponent } from './dec-product-info-extra/dec-product-info-extra.component';
import { CategoryPipeModule } from './../../pipes/category/category-pipe.module';
var DecProductInfoModule = /** @class */ (function () {
    function DecProductInfoModule() {
    }
    DecProductInfoModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DecIconModule,
                        FlexLayoutModule,
                        TranslateModule,
                        CategoryPipeModule
                    ],
                    declarations: [
                        DecProductInfoComponent,
                        DecProductInfoExtraComponent,
                    ],
                    exports: [
                        DecProductInfoComponent,
                        DecProductInfoExtraComponent,
                    ]
                },] },
    ];
    return DecProductInfoModule;
}());
export { DecProductInfoModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXByb2R1Y3QtaW5mby5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXByb2R1Y3QtaW5mby9kZWMtcHJvZHVjdC1pbmZvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7Ozs7Z0JBRWhGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixrQkFBa0I7cUJBQ25CO29CQUNELFlBQVksRUFBRTt3QkFDWix1QkFBdUI7d0JBQ3ZCLDRCQUE0QjtxQkFDN0I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHVCQUF1Qjt3QkFDdkIsNEJBQTRCO3FCQUM3QjtpQkFDRjs7K0JBekJEOztTQTBCYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1Byb2R1Y3RJbmZvQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtcHJvZHVjdC1pbmZvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNJY29uTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtaWNvbi9kZWMtaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjUHJvZHVjdEluZm9FeHRyYUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXByb2R1Y3QtaW5mby1leHRyYS9kZWMtcHJvZHVjdC1pbmZvLWV4dHJhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXRlZ29yeVBpcGVNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3BpcGVzL2NhdGVnb3J5L2NhdGVnb3J5LXBpcGUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBEZWNJY29uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIENhdGVnb3J5UGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQcm9kdWN0SW5mb0NvbXBvbmVudCxcbiAgICBEZWNQcm9kdWN0SW5mb0V4dHJhQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUHJvZHVjdEluZm9Db21wb25lbnQsXG4gICAgRGVjUHJvZHVjdEluZm9FeHRyYUNvbXBvbmVudCxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQcm9kdWN0SW5mb01vZHVsZSB7IH1cbiJdfQ==