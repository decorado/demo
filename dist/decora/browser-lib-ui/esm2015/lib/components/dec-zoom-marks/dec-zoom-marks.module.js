/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSliderModule, MatButtonModule, MatIconModule } from '@angular/material';
import { DecZoomMarksComponent } from './dec-zoom-marks.component';
import { DecRenderCommentModule } from '../dec-render-comment/dec-render-comment.module';
export class DecZoomMarksModule {
}
DecZoomMarksModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    FormsModule,
                    MatSliderModule,
                    MatButtonModule,
                    MatIconModule,
                    DecRenderCommentModule
                ],
                declarations: [
                    DecZoomMarksComponent
                ],
                exports: [
                    DecZoomMarksComponent
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tbWFya3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy16b29tLW1hcmtzL2RlYy16b29tLW1hcmtzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBbUJ6RixNQUFNOzs7WUFqQkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsV0FBVztvQkFDWCxlQUFlO29CQUNmLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixzQkFBc0I7aUJBQ3ZCO2dCQUNELFlBQVksRUFBRTtvQkFDWixxQkFBcUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxxQkFBcUI7aUJBQ3RCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFNsaWRlck1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjWm9vbU1hcmtzQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtem9vbS1tYXJrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjUmVuZGVyQ29tbWVudE1vZHVsZSB9IGZyb20gJy4uL2RlYy1yZW5kZXItY29tbWVudC9kZWMtcmVuZGVyLWNvbW1lbnQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBEZWNSZW5kZXJDb21tZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1pvb21NYXJrc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjWm9vbU1hcmtzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjWm9vbU1hcmtzTW9kdWxlIHsgfVxuIl19