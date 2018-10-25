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
                    ColorPickerModule,
                    TranslateModule,
                ],
                declarations: [DecColorPickerComponent, DecColorPickerModalComponent],
                exports: [DecColorPickerComponent],
                entryComponents: [DecColorPickerModalComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDekcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDdEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBbUJ0RCxNQUFNOzs7WUFqQkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixXQUFXO29CQUNYLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixlQUFlO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSw0QkFBNEIsQ0FBQztnQkFDckUsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7Z0JBQ2xDLGVBQWUsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2FBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNDb2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLWNvbG9yLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdFNsaWRlck1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNJY29uTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtaWNvbi9kZWMtaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQ29sb3JQaWNrZXJNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vZGVjLWNvbG9yLXBpY2tlci1tb2RhbC9kZWMtY29sb3ItcGlja2VyLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xvclBpY2tlck1vZHVsZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIERlY0ljb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIENvbG9yUGlja2VyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQ29sb3JQaWNrZXJDb21wb25lbnQsIERlY0NvbG9yUGlja2VyTW9kYWxDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQ29sb3JQaWNrZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb2xvclBpY2tlck1vZHVsZSB7IH1cbiJdfQ==