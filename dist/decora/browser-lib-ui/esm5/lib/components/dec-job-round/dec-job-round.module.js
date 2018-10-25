/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecJobRoundComponent } from './dec-job-round.component';
import { DecJobRoundItemModule } from './dec-job-round-item/dec-job-round-item.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecGridModule } from './../dec-grid/dec-grid.module';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
var DecJobRoundModule = /** @class */ (function () {
    function DecJobRoundModule() {
    }
    DecJobRoundModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DecJobRoundItemModule,
                        FlexLayoutModule,
                        DecGridModule,
                        MatIconModule,
                        TranslateModule
                    ],
                    declarations: [
                        DecJobRoundComponent
                    ],
                    exports: [
                        DecJobRoundComponent
                    ]
                },] },
    ];
    return DecJobRoundModule;
}());
export { DecJobRoundModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWpvYi1yb3VuZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWpvYi1yb3VuZC9kZWMtam9iLXJvdW5kLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O2dCQUVyRCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1oscUJBQXFCO3dCQUNyQixnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osb0JBQW9CO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asb0JBQW9CO3FCQUNyQjtpQkFDRjs7NEJBeEJEOztTQXlCYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0pvYlJvdW5kQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtam9iLXJvdW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNKb2JSb3VuZEl0ZW1Nb2R1bGUgfSBmcm9tICcuL2RlYy1qb2Itcm91bmQtaXRlbS9kZWMtam9iLXJvdW5kLWl0ZW0ubW9kdWxlJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBEZWNHcmlkTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtZ3JpZC9kZWMtZ3JpZC5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY0pvYlJvdW5kSXRlbU1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIERlY0dyaWRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjSm9iUm91bmRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0pvYlJvdW5kQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSm9iUm91bmRNb2R1bGUgeyB9XG4iXX0=