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
export class DecZoomAreaModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tYXJlYS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20tYXJlYS9kZWMtem9vbS1hcmVhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDcEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFxQjdDLE1BQU07OztZQW5CTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZix5QkFBeUI7b0JBQ3pCLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixXQUFXO2lCQUNaO2dCQUNELFlBQVksRUFBRTtvQkFDWixvQkFBb0I7aUJBQ3JCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxvQkFBb0I7aUJBQ3JCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1pvb21BcmVhQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtem9vbS1hcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNNYXJrZG93bnNDb21tZW50TW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtbWFya2Rvd25zLWNvbW1lbnQvZGVjLW1hcmtkb3ducy1jb21tZW50Lm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNNYXJrc01vZHVsZSB9IGZyb20gJy4vLi4vZGVjLW1hcmtzL2RlYy1tYXJrcy5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjSWNvbk1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWljb24vZGVjLWljb24ubW9kdWxlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIERlY01hcmtkb3duc0NvbW1lbnRNb2R1bGUsXG4gICAgRGVjTWFya3NNb2R1bGUsXG4gICAgRGVjSWNvbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNab29tQXJlYUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjWm9vbUFyZWFDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNab29tQXJlYU1vZHVsZSB7IH1cbiJdfQ==