/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecZoomAreaComponent } from './dec-zoom-area.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecMarkdownsCommentModule } from './../dec-markdowns-comment/dec-markdowns-comment.module';
import { DecMarksModule } from './../dec-marks/dec-marks.module';
import { DecIconModule } from './../dec-icon/dec-icon.module';
import { FormsModule } from '@angular/forms';
var DecZoomAreaModule = /** @class */ (function () {
    function DecZoomAreaModule() {
    }
    DecZoomAreaModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        MatIconModule,
                        TranslateModule,
                        MatButtonModule,
                        DecMarkdownsCommentModule,
                        DecMarksModule,
                        DecIconModule,
                        FormsModule
                    ],
                    declarations: [
                        DecZoomAreaComponent
                    ],
                    exports: [
                        DecZoomAreaComponent
                    ]
                },] },
    ];
    return DecZoomAreaModule;
}());
export { DecZoomAreaModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tYXJlYS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20tYXJlYS9kZWMtem9vbS1hcmVhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDcEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O2dCQUU1QyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZix5QkFBeUI7d0JBQ3pCLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixXQUFXO3FCQUNaO29CQUNELFlBQVksRUFBRTt3QkFDWixvQkFBb0I7cUJBQ3JCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxvQkFBb0I7cUJBQ3JCO2lCQUNGOzs0QkE3QkQ7O1NBOEJhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjWm9vbUFyZWFDb21wb25lbnQgfSBmcm9tICcuL2RlYy16b29tLWFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY01hcmtkb3duc0NvbW1lbnRNb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1tYXJrZG93bnMtY29tbWVudC9kZWMtbWFya2Rvd25zLWNvbW1lbnQubW9kdWxlJztcbmltcG9ydCB7IERlY01hcmtzTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtbWFya3MvZGVjLW1hcmtzLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNJY29uTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtaWNvbi9kZWMtaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgRGVjTWFya2Rvd25zQ29tbWVudE1vZHVsZSxcbiAgICBEZWNNYXJrc01vZHVsZSxcbiAgICBEZWNJY29uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1pvb21BcmVhQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNab29tQXJlYUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1pvb21BcmVhTW9kdWxlIHsgfVxuIl19