/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var DecLabelComponent = /** @class */ (function () {
    function DecLabelComponent() {
    }
    DecLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-label',
                    template: "<div [ngStyle]=\"{'background-color': colorHex}\" [ngClass]=\"colorClass\" [class.stretched]=\"stretched\" decContrastFontWithBg>\n  <ng-content></ng-content>\n</div>\n",
                    styles: ["div{margin:4px;display:inline-block;padding:7px 12px;border-radius:24px;align-items:center;cursor:default;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}div.stretched{display:block;text-align:center}"]
                },] },
    ];
    DecLabelComponent.propDecorators = {
        colorHex: [{ type: Input }],
        colorClass: [{ type: Input }],
        stretched: [{ type: Input }]
    };
    return DecLabelComponent;
}());
export { DecLabelComponent };
if (false) {
    /** @type {?} */
    DecLabelComponent.prototype.colorHex;
    /** @type {?} */
    DecLabelComponent.prototype.colorClass;
    /** @type {?} */
    DecLabelComponent.prototype.stretched;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtbGFiZWwvZGVjLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O2dCQUVoRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSwwS0FHWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxvTkFBb04sQ0FBQztpQkFDL047OzsyQkFFRSxLQUFLOzZCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7NEJBYlI7O1NBVWEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGFiZWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3JIZXh9XCIgW25nQ2xhc3NdPVwiY29sb3JDbGFzc1wiIFtjbGFzcy5zdHJldGNoZWRdPVwic3RyZXRjaGVkXCIgZGVjQ29udHJhc3RGb250V2l0aEJnPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BkaXZ7bWFyZ2luOjRweDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjdweCAxMnB4O2JvcmRlci1yYWRpdXM6MjRweDthbGlnbi1pdGVtczpjZW50ZXI7Y3Vyc29yOmRlZmF1bHQ7dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVufWRpdi5zdHJldGNoZWR7ZGlzcGxheTpibG9jazt0ZXh0LWFsaWduOmNlbnRlcn1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMYWJlbENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbG9ySGV4Pzogc3RyaW5nO1xuICBASW5wdXQoKSBjb2xvckNsYXNzPzogc3RyaW5nO1xuICBASW5wdXQoKSBzdHJldGNoZWQ/OiBib29sZWFuO1xufVxuIl19