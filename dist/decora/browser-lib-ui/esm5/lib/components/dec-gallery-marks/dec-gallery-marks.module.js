/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecGalleryMarksComponent } from './dec-gallery-marks.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatExpansionModule, MatListModule } from '@angular/material';
import { NguCarouselModule } from '@ngu/carousel';
import { DecImageMarkerModule } from './../dec-image-marker/dec-image-marker.module';
import { DecImageModule } from './../../directives/image/image.module';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecIconModule } from './../dec-icon/dec-icon.module';
var DecGalleryMarksModule = /** @class */ (function () {
    function DecGalleryMarksModule() {
    }
    DecGalleryMarksModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TranslateModule,
                        MatIconModule,
                        NguCarouselModule,
                        DecImageModule,
                        DecImageMarkerModule,
                        FlexLayoutModule,
                        DecIconModule,
                        MatExpansionModule,
                        MatListModule
                    ],
                    declarations: [
                        DecGalleryMarksComponent
                    ],
                    exports: [
                        DecGalleryMarksComponent
                    ]
                },] },
    ];
    return DecGalleryMarksModule;
}());
export { DecGalleryMarksModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdhbGxlcnktbWFya3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1nYWxsZXJ5LW1hcmtzL2RlYy1nYWxsZXJ5LW1hcmtzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7O2dCQUU3RCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLGFBQWE7cUJBQ2Q7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHdCQUF3QjtxQkFDekI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHdCQUF3QjtxQkFDekI7aUJBQ0Y7O2dDQS9CRDs7U0FnQ2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNHYWxsZXJ5TWFya3NDb21wb25lbnQgfSBmcm9tICcuL2RlYy1nYWxsZXJ5LW1hcmtzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdEV4cGFuc2lvbk1vZHVsZSwgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5ndUNhcm91c2VsTW9kdWxlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbCc7XG5pbXBvcnQgeyBEZWNJbWFnZU1hcmtlck1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWltYWdlLW1hcmtlci9kZWMtaW1hZ2UtbWFya2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNJbWFnZU1vZHVsZSB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5tb2R1bGUnO1xuaW1wb3J0ICdoYW1tZXJqcyc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgRGVjSWNvbk1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWljb24vZGVjLWljb24ubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBOZ3VDYXJvdXNlbE1vZHVsZSxcbiAgICBEZWNJbWFnZU1vZHVsZSxcbiAgICBEZWNJbWFnZU1hcmtlck1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIERlY0ljb25Nb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjR2FsbGVyeU1hcmtzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNHYWxsZXJ5TWFya3NDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHYWxsZXJ5TWFya3NNb2R1bGUgeyB9XG4iXX0=