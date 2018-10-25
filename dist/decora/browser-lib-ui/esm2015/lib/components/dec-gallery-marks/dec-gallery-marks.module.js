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
export class DecGalleryMarksModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdhbGxlcnktbWFya3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1nYWxsZXJ5LW1hcmtzL2RlYy1nYWxsZXJ5LW1hcmtzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFzQjlELE1BQU07OztZQXBCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsY0FBYztvQkFDZCxvQkFBb0I7b0JBQ3BCLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixrQkFBa0I7b0JBQ2xCLGFBQWE7aUJBQ2Q7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHdCQUF3QjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHdCQUF3QjtpQkFDekI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjR2FsbGVyeU1hcmtzQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZ2FsbGVyeS1tYXJrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRFeHBhbnNpb25Nb2R1bGUsIE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbE1vZHVsZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgRGVjSW1hZ2VNYXJrZXJNb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1pbWFnZS1tYXJrZXIvZGVjLWltYWdlLW1hcmtlci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjSW1hZ2VNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UubW9kdWxlJztcbmltcG9ydCAnaGFtbWVyanMnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IERlY0ljb25Nb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1pY29uL2RlYy1pY29uLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTmd1Q2Fyb3VzZWxNb2R1bGUsXG4gICAgRGVjSW1hZ2VNb2R1bGUsXG4gICAgRGVjSW1hZ2VNYXJrZXJNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBEZWNJY29uTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0dhbGxlcnlNYXJrc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjR2FsbGVyeU1hcmtzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjR2FsbGVyeU1hcmtzTW9kdWxlIHsgfVxuIl19