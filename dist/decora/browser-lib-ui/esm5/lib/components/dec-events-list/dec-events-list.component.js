/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, QueryList } from '@angular/core';
import { DecEventsListEventComponent } from './dec-events-list-event/dec-events-list-event.component';
var DecEventsListComponent = /** @class */ (function () {
    function DecEventsListComponent() {
    }
    DecEventsListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-events-list',
                    template: "<div fxLayout=\"column\">\n  <div fxFlex *ngFor=\"let event of events\">\n    <div fxLayout=\"row\" fxLayoutGap=\"8px\">\n      <div fxFlex=\"72px\" class=\"text-right\">{{ event.label }}</div>\n      <div fxFlex=\"80px\">\n        <strong>\n          <ng-container [ngTemplateOutlet]=\"event.contentTemplate\"></ng-container>\n        </strong>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecEventsListComponent.ctorParameters = function () { return []; };
    DecEventsListComponent.propDecorators = {
        events: [{ type: ContentChildren, args: [DecEventsListEventComponent,] }]
    };
    return DecEventsListComponent;
}());
export { DecEventsListComponent };
if (false) {
    /** @type {?} */
    DecEventsListComponent.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWV2ZW50cy1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtZXZlbnRzLWxpc3QvZGVjLWV2ZW50cy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDOztJQXVCcEc7S0FBaUI7O2dCQXJCbEIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSx5WUFZWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7O3lCQUdFLGVBQWUsU0FBQywyQkFBMkI7O2lDQXRCOUM7O1NBb0JhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0V2ZW50c0xpc3RFdmVudENvbXBvbmVudCB9IGZyb20gJy4vZGVjLWV2ZW50cy1saXN0LWV2ZW50L2RlYy1ldmVudHMtbGlzdC1ldmVudC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZXZlbnRzLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgPGRpdiBmeEZsZXggKm5nRm9yPVwibGV0IGV2ZW50IG9mIGV2ZW50c1wiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPGRpdiBmeEZsZXg9XCI3MnB4XCIgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+e3sgZXZlbnQubGFiZWwgfX08L2Rpdj5cbiAgICAgIDxkaXYgZnhGbGV4PVwiODBweFwiPlxuICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZXZlbnQuY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvc3Ryb25nPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjRXZlbnRzTGlzdENvbXBvbmVudCB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNFdmVudHNMaXN0RXZlbnRDb21wb25lbnQpIGV2ZW50czogUXVlcnlMaXN0PERlY0V2ZW50c0xpc3RFdmVudENvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIl19