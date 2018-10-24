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
export class DecColorPickerModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDekcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFrQnRGLE1BQU07OztZQWhCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxhQUFhO29CQUNiLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixpQkFBaUI7aUJBQ2xCO2dCQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixFQUFFLDRCQUE0QixDQUFDO2dCQUNyRSxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDbEMsZUFBZSxFQUFFLENBQUMsNEJBQTRCLENBQUM7YUFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0NvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0ljb25Nb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1pY29uL2RlYy1pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtY29sb3ItcGlja2VyLW1vZGFsL2RlYy1jb2xvci1waWNrZXItbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbG9yUGlja2VyTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIERlY0ljb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIENvbG9yUGlja2VyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0NvbG9yUGlja2VyQ29tcG9uZW50LCBEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0NvbG9yUGlja2VyQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGVjQ29sb3JQaWNrZXJNb2RhbENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29sb3JQaWNrZXJNb2R1bGUgeyB9XG4iXX0=