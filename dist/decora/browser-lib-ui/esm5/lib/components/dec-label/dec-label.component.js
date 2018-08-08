/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var DecLabelComponent = /** @class */ (function () {
    function DecLabelComponent() {
    }
    DecLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-label',
                    template: "<div [ngStyle]=\"{'background-color': colorHex}\" [ngClass]=\"decClass\" decContrastFontWithBg>\n  <ng-content></ng-content>\n</div>\n",
                    styles: ["div{margin:4px;display:inline-block;padding:7px 12px;border-radius:24px;align-items:center;cursor:default}"]
                },] },
    ];
    DecLabelComponent.propDecorators = {
        colorHex: [{ type: Input }],
        decClass: [{ type: Input }]
    };
    return DecLabelComponent;
}());
export { DecLabelComponent };
function DecLabelComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecLabelComponent.prototype.colorHex;
    /** @type {?} */
    DecLabelComponent.prototype.decClass;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtbGFiZWwvZGVjLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O2dCQUVoRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSx3SUFHWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw0R0FBNEcsQ0FBQztpQkFDdkg7OzsyQkFFRSxLQUFLOzJCQUNMLEtBQUs7OzRCQVpSOztTQVVhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxhYmVsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9ySGV4fVwiIFtuZ0NsYXNzXT1cImRlY0NsYXNzXCIgZGVjQ29udHJhc3RGb250V2l0aEJnPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BkaXZ7bWFyZ2luOjRweDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjdweCAxMnB4O2JvcmRlci1yYWRpdXM6MjRweDthbGlnbi1pdGVtczpjZW50ZXI7Y3Vyc29yOmRlZmF1bHR9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGFiZWxDb21wb25lbnQge1xuICBASW5wdXQoKSBjb2xvckhleDogc3RyaW5nO1xuICBASW5wdXQoKSBkZWNDbGFzczogc3RyaW5nO1xufVxuIl19