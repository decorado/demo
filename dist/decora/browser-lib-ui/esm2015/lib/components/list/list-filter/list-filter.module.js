/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecListFilterComponent } from './list-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecListActiveFilterResumeModule } from './../list-active-filter-resume/list-active-filter-resume.module';
import { DecPermissionModule } from './../../../directives/permission/dec-permission.module';
import { DecListTabsFilterComponent } from './list-tabs-filter/list-tabs-filter.component';
export class DecListFilterModule {
}
DecListFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    FormsModule,
                    DecListActiveFilterResumeModule,
                    DecPermissionModule,
                    MatButtonModule,
                    MatCardModule,
                    MatChipsModule,
                    MatIconModule,
                    MatInputModule,
                    TranslateModule,
                ],
                declarations: [DecListFilterComponent, DecListTabsFilterComponent],
                exports: [DecListFilterComponent],
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1maWx0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDbEgsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDN0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFtQjNGLE1BQU07OztZQWpCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixXQUFXO29CQUNYLCtCQUErQjtvQkFDL0IsbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsY0FBYztvQkFDZCxhQUFhO29CQUNiLGNBQWM7b0JBQ2QsZUFBZTtpQkFDaEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsc0JBQXNCLEVBQUUsMEJBQTBCLENBQUM7Z0JBQ2xFLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRDaGlwc01vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVNb2R1bGUgfSBmcm9tICcuLy4uL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjUGVybWlzc2lvbk1vZHVsZSB9IGZyb20gJy4vLi4vLi4vLi4vZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lTW9kdWxlLFxuICAgIERlY1Blcm1pc3Npb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RGaWx0ZXJDb21wb25lbnQsIERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RGaWx0ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0RmlsdGVyTW9kdWxlIHsgfVxuIl19