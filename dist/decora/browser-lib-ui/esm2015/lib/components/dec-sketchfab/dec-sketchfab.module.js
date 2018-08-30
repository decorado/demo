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
export class DecSketchfabModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXNrZXRjaGZhYi9kZWMtc2tldGNoZmFiLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDdkYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUF5QnRELE1BQU07OztZQXZCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osc0JBQXNCO29CQUN0QixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixXQUFXO29CQUNYLGVBQWU7aUJBQ2hCO2dCQUNELFlBQVksRUFBRTtvQkFDWixxQkFBcUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxxQkFBcUI7aUJBQ3RCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxtQkFBbUI7aUJBQ3BCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NrZXRjaGZhYkNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNrZXRjaGZhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2tldGNoZmFiVmlld01vZHVsZSB9IGZyb20gJy4vLi4vc2tldGNoZmFiLXZpZXcvZGVjLXNrZXRjaGZhYi12aWV3Lm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNTa2V0Y2hmYWJTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtc2tldGNoZmFiLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdENoZWNrYm94TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBEZWNTa2V0Y2hmYWJWaWV3TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjU2tldGNoZmFiQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNTa2V0Y2hmYWJDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGVjU2tldGNoZmFiU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NrZXRjaGZhYk1vZHVsZSB7IH1cbiJdfQ==