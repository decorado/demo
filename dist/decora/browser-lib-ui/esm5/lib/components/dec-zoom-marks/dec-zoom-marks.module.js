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
var DecZoomMarksModule = /** @class */ (function () {
    function DecZoomMarksModule() {
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
    return DecZoomMarksModule;
}());
export { DecZoomMarksModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tbWFya3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy16b29tLW1hcmtzL2RlYy16b29tLW1hcmtzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOzs7OztnQkFFeEYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixzQkFBc0I7cUJBQ3ZCO29CQUNELFlBQVksRUFBRTt3QkFDWixxQkFBcUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7cUJBQ3RCO2lCQUNGOzs2QkF4QkQ7O1NBeUJhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNab29tTWFya3NDb21wb25lbnQgfSBmcm9tICcuL2RlYy16b29tLW1hcmtzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNSZW5kZXJDb21tZW50TW9kdWxlIH0gZnJvbSAnLi4vZGVjLXJlbmRlci1jb21tZW50L2RlYy1yZW5kZXItY29tbWVudC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIERlY1JlbmRlckNvbW1lbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjWm9vbU1hcmtzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNab29tTWFya3NDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNab29tTWFya3NNb2R1bGUgeyB9XG4iXX0=