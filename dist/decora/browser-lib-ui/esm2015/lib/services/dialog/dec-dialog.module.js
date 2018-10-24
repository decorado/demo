/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DecSpinnerModule } from './../../components/dec-spinner/dec-spinner.module';
import { DecDialogComponent } from './dec-dialog.component';
import { DecDialogService } from './dec-dialog.service';
export class DecDialogModule {
}
DecDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatDialogModule,
                    MatToolbarModule,
                    MatIconModule,
                    MatMenuModule,
                    MatButtonModule,
                    FlexLayoutModule,
                    DecSpinnerModule,
                    TranslateModule,
                ],
                declarations: [DecDialogComponent],
                entryComponents: [DecDialogComponent],
                providers: [DecDialogService],
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RpYWxvZy9kZWMtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUVyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQWtCeEQsTUFBTTs7O1lBaEJMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixhQUFhO29CQUNiLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixnQkFBZ0I7b0JBQ2hCLGVBQWU7aUJBQ2hCO2dCQUNELFlBQVksRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUNsQyxlQUFlLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDckMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vLi4vLi4vY29tcG9uZW50cy9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUnO1xuXG5pbXBvcnQgeyBEZWNEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RlYy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2RlYy1kaWFsb2cuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIERlY1NwaW5uZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNEaWFsb2dDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtEZWNEaWFsb2dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtEZWNEaWFsb2dTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjRGlhbG9nTW9kdWxlIHsgfVxuIl19