/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSketchfabComponent } from './dec-sketchfab.component';
import { DecSketchfabViewModule } from './../sketchfab-view/dec-sketchfab-view.module';
import { DecSketchfabService } from './dec-sketchfab.service';
import { MatSliderModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
var DecSketchfabModule = /** @class */ (function () {
    function DecSketchfabModule() {
    }
    DecSketchfabModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DecSketchfabViewModule,
                        MatSliderModule,
                        MatIconModule,
                        MatButtonModule,
                        MatCheckboxModule,
                        MatSelectModule,
                        FlexLayoutModule,
                        FormsModule,
                        TranslateModule
                    ],
                    declarations: [
                        DecSketchfabComponent
                    ],
                    exports: [
                        DecSketchfabComponent
                    ],
                    providers: [
                        DecSketchfabService
                    ]
                },] },
    ];
    return DecSketchfabModule;
}());
export { DecSketchfabModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXNrZXRjaGZhYi9kZWMtc2tldGNoZmFiLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDdkYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O2dCQUVyRCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osc0JBQXNCO3dCQUN0QixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixXQUFXO3dCQUNYLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDWixxQkFBcUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7cUJBQ3RCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxtQkFBbUI7cUJBQ3BCO2lCQUNGOzs2QkFoQ0Q7O1NBaUNhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU2tldGNoZmFiQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2tldGNoZmFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTa2V0Y2hmYWJWaWV3TW9kdWxlIH0gZnJvbSAnLi8uLi9za2V0Y2hmYWItdmlldy9kZWMtc2tldGNoZmFiLXZpZXcubW9kdWxlJztcbmltcG9ydCB7IERlY1NrZXRjaGZhYlNlcnZpY2UgfSBmcm9tICcuL2RlYy1za2V0Y2hmYWIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXRTbGlkZXJNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSwgTWF0Q2hlY2tib3hNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY1NrZXRjaGZhYlZpZXdNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNTa2V0Y2hmYWJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1NrZXRjaGZhYkNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNTa2V0Y2hmYWJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiTW9kdWxlIHsgfVxuIl19