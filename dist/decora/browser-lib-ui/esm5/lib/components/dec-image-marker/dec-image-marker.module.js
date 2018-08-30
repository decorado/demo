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
var DecImageMarkerModule = /** @class */ (function () {
    function DecImageMarkerModule() {
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
    return DecImageMarkerModule;
}());
export { DecImageMarkerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLW1hcmtlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWltYWdlLW1hcmtlci9kZWMtaW1hZ2UtbWFya2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Z0JBRXJELFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2Ysc0JBQXNCO3dCQUN0QixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDdkMsT0FBTyxFQUFFO3dCQUNQLHVCQUF1QjtxQkFDeEI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLHlCQUF5QjtxQkFDMUI7aUJBQ0Y7OytCQXhCRDs7U0F5QmEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNJbWFnZU1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLWltYWdlLW1hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjSW1hZ2VNYXJrc01vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWltYWdlLW1hcmtzL2RlYy1pbWFnZS1tYXJrcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjQ29tbWVudERpYWxvZ01vZHVsZSB9IGZyb20gJy4vZGVjLWNvbW1lbnQtZGlhbG9nL2RlYy1jb21tZW50LWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQ29tbWVudERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLWNvbW1lbnQtZGlhbG9nL2RlYy1jb21tZW50LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjSW1hZ2VNYXJrc01vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgRGVjQ29tbWVudERpYWxvZ01vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjSW1hZ2VNYXJrZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjSW1hZ2VNYXJrZXJDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgRGVjQ29tbWVudERpYWxvZ0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlTWFya2VyTW9kdWxlIHsgfVxuIl19