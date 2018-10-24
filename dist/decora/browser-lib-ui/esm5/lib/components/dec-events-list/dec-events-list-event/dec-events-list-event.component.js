/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
var DecEventsListEventComponent = /** @class */ (function () {
    function DecEventsListEventComponent() {
    }
    DecEventsListEventComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-events-list-event',
                    template: "<ng-template #contentTemplate>\n  <span #ref>\n    <ng-content></ng-content>\n  </span>\n  <span *ngIf=\"!ref.innerHTML.trim()\">\n    -\n  </span>\n</ng-template>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecEventsListEventComponent.ctorParameters = function () { return []; };
    DecEventsListEventComponent.propDecorators = {
        label: [{ type: Input }],
        contentTemplate: [{ type: ViewChild, args: ['contentTemplate',] }]
    };
    return DecEventsListEventComponent;
}());
export { DecEventsListEventComponent };
if (false) {
    /** @type {?} */
    DecEventsListEventComponent.prototype.label;
    /** @type {?} */
    DecEventsListEventComponent.prototype.contentTemplate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWV2ZW50cy1saXN0LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtZXZlbnRzLWxpc3QvZGVjLWV2ZW50cy1saXN0LWV2ZW50L2RlYy1ldmVudHMtbGlzdC1ldmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBcUJ2RTtLQUFpQjs7Z0JBbkJsQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLHVLQVFYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7Ozs7d0JBR0UsS0FBSztrQ0FFTCxTQUFTLFNBQUMsaUJBQWlCOztzQ0FuQjlCOztTQWVhLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWV2ZW50cy1saXN0LWV2ZW50JyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgI2NvbnRlbnRUZW1wbGF0ZT5cbiAgPHNwYW4gI3JlZj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cbiAgPHNwYW4gKm5nSWY9XCIhcmVmLmlubmVySFRNTC50cmltKClcIj5cbiAgICAtXG4gIDwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjRXZlbnRzTGlzdEV2ZW50Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRUZW1wbGF0ZScpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=