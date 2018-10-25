/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DecColorService } from './../../services/color/dec-color.service';
var DecLabelStatusComponent = /** @class */ (function () {
    function DecLabelStatusComponent(decColorService) {
        this.decColorService = decColorService;
    }
    DecLabelStatusComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-label-status',
                    template: "<dec-label [colorHex]=\"decColorService.getStatusColor(status)\" [stretched]=\"stretched\">\n  <ng-content></ng-content>\n  {{ 'label.'+status | translate }}\n</dec-label>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecLabelStatusComponent.ctorParameters = function () { return [
        { type: DecColorService }
    ]; };
    DecLabelStatusComponent.propDecorators = {
        status: [{ type: Input }],
        stretched: [{ type: Input }]
    };
    return DecLabelStatusComponent;
}());
export { DecLabelStatusComponent };
if (false) {
    /** @type {?} */
    DecLabelStatusComponent.prototype.status;
    /** @type {?} */
    DecLabelStatusComponent.prototype.stretched;
    /** @type {?} */
    DecLabelStatusComponent.prototype.decColorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWxhYmVsLXN0YXR1cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWxhYmVsLXN0YXR1cy9kZWMtbGFiZWwtc3RhdHVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztJQWlCekUsaUNBQ1M7UUFBQSxvQkFBZSxHQUFmLGVBQWU7S0FDbkI7O2dCQWpCTixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLCtLQUlYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7OztnQkFWUSxlQUFlOzs7eUJBYXJCLEtBQUs7NEJBRUwsS0FBSzs7a0NBaEJSOztTQVlhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0NvbG9yU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvY29sb3IvZGVjLWNvbG9yLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGFiZWwtc3RhdHVzJyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWxhYmVsIFtjb2xvckhleF09XCJkZWNDb2xvclNlcnZpY2UuZ2V0U3RhdHVzQ29sb3Ioc3RhdHVzKVwiIFtzdHJldGNoZWRdPVwic3RyZXRjaGVkXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAge3sgJ2xhYmVsLicrc3RhdHVzIHwgdHJhbnNsYXRlIH19XG48L2RlYy1sYWJlbD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMYWJlbFN0YXR1c0NvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgc3RhdHVzOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgc3RyZXRjaGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkZWNDb2xvclNlcnZpY2U6IERlY0NvbG9yU2VydmljZVxuICApIHsgfVxuXG59XG4iXX0=