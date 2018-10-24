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
                        ColorPickerModule
                    ],
                    declarations: [DecColorPickerComponent, DecColorPickerModalComponent],
                    exports: [DecColorPickerComponent],
                    entryComponents: [DecColorPickerModalComponent]
                },] },
    ];
    return DecColorPickerModule;
}());
export { DecColorPickerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDekcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbURBQW1ELENBQUM7Ozs7O2dCQUVyRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsZUFBZTt3QkFDZixpQkFBaUI7cUJBQ2xCO29CQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixFQUFFLDRCQUE0QixDQUFDO29CQUNyRSxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDbEMsZUFBZSxFQUFFLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hEOzsrQkF6QkQ7O1NBMEJhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1jb2xvci1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXRTbGlkZXJNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjSWNvbk1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWljb24vZGVjLWljb24ubW9kdWxlJztcbmltcG9ydCB7IERlY0NvbG9yUGlja2VyTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2RlYy1jb2xvci1waWNrZXItbW9kYWwvZGVjLWNvbG9yLXBpY2tlci1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sb3JQaWNrZXJNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgRGVjSWNvbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgQ29sb3JQaWNrZXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQ29sb3JQaWNrZXJDb21wb25lbnQsIERlY0NvbG9yUGlja2VyTW9kYWxDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQ29sb3JQaWNrZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb2xvclBpY2tlck1vZHVsZSB7IH1cbiJdfQ==