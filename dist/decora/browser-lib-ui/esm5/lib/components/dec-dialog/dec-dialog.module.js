/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DecSpinnerModule } from './../dec-spinner/dec-spinner.module';
import { DecDialogComponent } from './dec-dialog.component';
import { DecDialogService } from './dec-dialog.service';
var DecDialogModule = /** @class */ (function () {
    function DecDialogModule() {
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
    return DecDialogModule;
}());
export { DecDialogModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUV2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Z0JBRXZELFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRSxDQUFDLGtCQUFrQixDQUFDO29CQUNsQyxlQUFlLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDckMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7aUJBQzlCOzswQkF6QkQ7O1NBMEJhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIubW9kdWxlJztcblxuaW1wb3J0IHsgRGVjRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtZGlhbG9nLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBEZWNTcGlubmVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjRGlhbG9nQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGVjRGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbRGVjRGlhbG9nU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ01vZHVsZSB7IH1cbiJdfQ==