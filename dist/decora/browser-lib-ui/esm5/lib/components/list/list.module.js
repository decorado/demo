/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatExpansionModule } from '@angular/material';
import { DecListFilterModule } from './list-filter/list-filter.module';
import { DecListComponent } from './list.component';
import { DecListGridComponent } from './list-grid/list-grid.component';
import { DecListTableModule } from './list-table/list-table.module';
import { DecListFooterComponent } from './list-footer/list-footer.component';
import { DecListAdvancedFilterModule } from './list-advanced-filter/list-advanced-filter.module';
import { DecSpinnerModule } from './../dec-spinner/dec-spinner.module';
import { DecListActionsModule } from './list-actions/list-actions.module';
import { DecLabelModule } from './../dec-label/dec-label.module';
var DecListModule = /** @class */ (function () {
    function DecListModule() {
    }
    DecListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DecLabelModule,
                        FlexLayoutModule,
                        MatExpansionModule,
                        MatButtonModule,
                        MatIconModule,
                        MatSnackBarModule,
                        NgxDatatableModule,
                        RouterModule,
                        TranslateModule,
                        DecListAdvancedFilterModule,
                        DecListFilterModule,
                        DecListTableModule,
                        DecSpinnerModule,
                    ],
                    declarations: [
                        DecListComponent,
                        DecListGridComponent,
                        DecListFooterComponent,
                    ],
                    exports: [
                        DecListComponent,
                        DecListGridComponent,
                        DecListTableModule,
                        DecListFooterComponent,
                        DecListFilterModule,
                        DecListAdvancedFilterModule,
                        DecListActionsModule,
                    ],
                },] },
    ];
    return DecListModule;
}());
export { DecListModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Z0JBRWhFLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixjQUFjO3dCQUNkLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osZUFBZTt3QkFDZiwyQkFBMkI7d0JBQzNCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixnQkFBZ0I7cUJBQ2pCO29CQUNELFlBQVksRUFBRTt3QkFDWixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3FCQUN2QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3dCQUNoQixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsc0JBQXNCO3dCQUN0QixtQkFBbUI7d0JBQ25CLDJCQUEyQjt3QkFDM0Isb0JBQW9CO3FCQUNyQjtpQkFDRjs7d0JBbEREOztTQW1EYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRTbmFja0Jhck1vZHVsZSwgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyTW9kdWxlIH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5tb2R1bGUnO1xuXG5pbXBvcnQgeyBEZWNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0R3JpZENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1ncmlkL2xpc3QtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlTW9kdWxlIH0gZnJvbSAnLi9saXN0LXRhYmxlL2xpc3QtdGFibGUubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZm9vdGVyL2xpc3QtZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUgfSBmcm9tICcuL2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGlvbnNNb2R1bGUgfSBmcm9tICcuL2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMubW9kdWxlJztcbmltcG9ydCB7IERlY0xhYmVsTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtbGFiZWwvZGVjLWxhYmVsLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjTGFiZWxNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdFRhYmxlTW9kdWxlLFxuICAgIERlY1NwaW5uZXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0xpc3RDb21wb25lbnQsXG4gICAgRGVjTGlzdEdyaWRDb21wb25lbnQsXG4gICAgRGVjTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xpc3RDb21wb25lbnQsXG4gICAgRGVjTGlzdEdyaWRDb21wb25lbnQsXG4gICAgRGVjTGlzdFRhYmxlTW9kdWxlLFxuICAgIERlY0xpc3RGb290ZXJDb21wb25lbnQsXG4gICAgRGVjTGlzdEZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdEFjdGlvbnNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RNb2R1bGUgeyB9XG4iXX0=