/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecScriptLoaderModule } from './../../services/script-loader/dec-script-loader.module';
import { DecSketchfabViewComponent } from './dec-sketchfab-view.component';
import { DecColorServiceModule } from './../../services/color/dec-color-service.module';
import { MatInputModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
var DecSketchfabViewModule = /** @class */ (function () {
    function DecSketchfabViewModule() {
    }
    DecSketchfabViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DecScriptLoaderModule,
                        DecColorServiceModule,
                        MatInputModule,
                        MatCheckboxModule,
                        FormsModule,
                        FlexLayoutModule,
                    ],
                    declarations: [
                        DecSketchfabViewComponent
                    ],
                    exports: [
                        DecSketchfabViewComponent
                    ]
                },] },
    ];
    return DecSketchfabViewModule;
}());
export { DecSketchfabViewModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi12aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9za2V0Y2hmYWItdmlldy9kZWMtc2tldGNoZmFiLXZpZXcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNoRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN4RixPQUFPLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztnQkFFdkQsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsV0FBVzt3QkFDWCxnQkFBZ0I7cUJBQ2pCO29CQUNELFlBQVksRUFBRTt3QkFDWix5QkFBeUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx5QkFBeUI7cUJBQzFCO2lCQUNGOztpQ0F6QkQ7O1NBMEJhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU2NyaXB0TG9hZGVyTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9zY3JpcHQtbG9hZGVyL2RlYy1zY3JpcHQtbG9hZGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2tldGNoZmFiLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0NvbG9yU2VydmljZU1vZHVsZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvY29sb3IvZGVjLWNvbG9yLXNlcnZpY2UubW9kdWxlJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlLCBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBEZWNTY3JpcHRMb2FkZXJNb2R1bGUsXG4gICAgRGVjQ29sb3JTZXJ2aWNlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTa2V0Y2hmYWJWaWV3TW9kdWxlIHsgfVxuIl19