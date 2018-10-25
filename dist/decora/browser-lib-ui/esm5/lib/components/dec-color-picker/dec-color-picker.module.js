/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecColorPickerComponent } from './dec-color-picker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule, MatButtonModule, MatInputModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DecIconModule } from './../dec-icon/dec-icon.module';
import { DecColorPickerModalComponent } from './dec-color-picker-modal/dec-color-picker-modal.component';
import { ColorPickerModule } from './../../services/color-picker/color-picker.module';
import { TranslateModule } from '@ngx-translate/core';
var DecColorPickerModule = /** @class */ (function () {
    function DecColorPickerModule() {
    }
    DecColorPickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        MatSliderModule,
                        MatButtonModule,
                        MatInputModule,
                        DecIconModule,
                        FormsModule,
                        MatDialogModule,
                        ColorPickerModule,
                        TranslateModule,
                    ],
                    declarations: [DecColorPickerComponent, DecColorPickerModalComponent],
                    exports: [DecColorPickerComponent],
                    entryComponents: [DecColorPickerModalComponent]
                },] },
    ];
    return DecColorPickerModule;
}());
export { DecColorPickerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDekcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDdEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztnQkFFckQsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSw0QkFBNEIsQ0FBQztvQkFDckUsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQ2xDLGVBQWUsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUNoRDs7K0JBM0JEOztTQTRCYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0NvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0ljb25Nb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1pY29uL2RlYy1pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtY29sb3ItcGlja2VyLW1vZGFsL2RlYy1jb2xvci1waWNrZXItbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbG9yUGlja2VyTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgRGVjSWNvbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgQ29sb3JQaWNrZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNDb2xvclBpY2tlckNvbXBvbmVudCwgRGVjQ29sb3JQaWNrZXJNb2RhbENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNDb2xvclBpY2tlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0RlY0NvbG9yUGlja2VyTW9kYWxDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbG9yUGlja2VyTW9kdWxlIHsgfVxuIl19