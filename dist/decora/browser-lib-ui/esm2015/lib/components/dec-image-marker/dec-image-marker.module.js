/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecImageMarkerComponent } from './dec-image-marker.component';
import { DecImageMarksModule } from './../dec-image-marks/dec-image-marks.module';
import { MatDialogModule } from '@angular/material';
import { DecCommentDialogModule } from './dec-comment-dialog/dec-comment-dialog.module';
import { DecCommentDialogComponent } from './dec-comment-dialog/dec-comment-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
export class DecImageMarkerModule {
}
DecImageMarkerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    DecImageMarksModule,
                    MatDialogModule,
                    DecCommentDialogModule,
                    TranslateModule
                ],
                declarations: [DecImageMarkerComponent],
                exports: [
                    DecImageMarkerComponent
                ],
                entryComponents: [
                    DecCommentDialogComponent
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLW1hcmtlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWltYWdlLW1hcmtlci9kZWMtaW1hZ2UtbWFya2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWtCdEQsTUFBTTs7O1lBaEJMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLGVBQWU7b0JBQ2Ysc0JBQXNCO29CQUN0QixlQUFlO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDdkMsT0FBTyxFQUFFO29CQUNQLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLHlCQUF5QjtpQkFDMUI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjSW1hZ2VNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1pbWFnZS1tYXJrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0ltYWdlTWFya3NNb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1pbWFnZS1tYXJrcy9kZWMtaW1hZ2UtbWFya3MubW9kdWxlJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY0NvbW1lbnREaWFsb2dNb2R1bGUgfSBmcm9tICcuL2RlYy1jb21tZW50LWRpYWxvZy9kZWMtY29tbWVudC1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IERlY0NvbW1lbnREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RlYy1jb21tZW50LWRpYWxvZy9kZWMtY29tbWVudC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY0ltYWdlTWFya3NNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIERlY0NvbW1lbnREaWFsb2dNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0ltYWdlTWFya2VyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIERlY0ltYWdlTWFya2VyQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIERlY0NvbW1lbnREaWFsb2dDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZU1hcmtlck1vZHVsZSB7IH1cbiJdfQ==