/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecGalleryComponent } from './dec-gallery.component';
import { DecImageModule } from './../../directives/image/image.module';
import { TranslateModule } from '@ngx-translate/core';
import { NguCarouselModule } from '@ngu/carousel';
import { MatIconModule } from '@angular/material';
import 'hammerjs';
import { DecImageZoomModule } from './../dec-image-zoom/dec-image-zoom.module';
import { FlexLayoutModule } from '@angular/flex-layout';
var DecGalleryModule = /** @class */ (function () {
    function DecGalleryModule() {
    }
    DecGalleryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DecImageModule,
                        TranslateModule,
                        MatIconModule,
                        NguCarouselModule,
                        DecImageZoomModule,
                        FlexLayoutModule
                    ],
                    declarations: [
                        DecGalleryComponent
                    ],
                    exports: [
                        DecGalleryComponent
                    ]
                },] },
    ];
    return DecGalleryModule;
}());
export { DecGalleryModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdhbGxlcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2dhbGxlcnkvZGVjLWdhbGxlcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O2dCQUV2RCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixrQkFBa0I7d0JBQ2xCLGdCQUFnQjtxQkFDakI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjtxQkFDcEI7aUJBQ0Y7OzJCQTNCRDs7U0E0QmEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjSW1hZ2VNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxNb2R1bGUgfSBmcm9tICdAbmd1L2Nhcm91c2VsJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgJ2hhbW1lcmpzJztcbmltcG9ydCB7IERlY0ltYWdlWm9vbU1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWltYWdlLXpvb20vZGVjLWltYWdlLXpvb20ubW9kdWxlJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjSW1hZ2VNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTmd1Q2Fyb3VzZWxNb2R1bGUsXG4gICAgRGVjSW1hZ2Vab29tTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjR2FsbGVyeUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjR2FsbGVyeUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlNb2R1bGUgeyB9XG4iXX0=