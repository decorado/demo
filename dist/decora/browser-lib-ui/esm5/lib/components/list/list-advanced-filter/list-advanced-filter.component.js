/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, TemplateRef } from '@angular/core';
var DecListAdvancedFilterComponent = /** @class */ (function () {
    function DecListAdvancedFilterComponent() {
        this.form = {};
        this.onSearch = function () { };
        this.onClear = function () { };
    }
    /**
     * @return {?}
     */
    DecListAdvancedFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DecListAdvancedFilterComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.onClear();
    };
    /**
     * @return {?}
     */
    DecListAdvancedFilterComponent.prototype.submit = /**
     * @return {?}
     */
    function () {
        this.onSearch();
    };
    DecListAdvancedFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-advanced-filter',
                    template: "<div fxLayout=\"column\" fxLayoutGap=\"16px\">\n\n  <div fxFlex>\n\n    <ng-container\n      [ngTemplateOutlet]=\"templateRef\"\n      [ngTemplateOutletContext]=\"{form: form}\"\n    ></ng-container>\n\n  </div>\n\n  <div fxFlex>\n\n    <div fxLayout=\"row\" fxLayoutAlign=\"end end\" fxLayoutGap=\"8px\">\n\n      <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"submit()\">{{ 'label.search' | translate | uppercase }}</button>\n\n      <button type=\"button\" mat-button (click)=\"reset()\">{{ 'label.reset' | translate | uppercase }}</button>\n\n    </div>\n\n  </div>\n\n</div>\n\n\n\n\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecListAdvancedFilterComponent.ctorParameters = function () { return []; };
    DecListAdvancedFilterComponent.propDecorators = {
        templateRef: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return DecListAdvancedFilterComponent;
}());
export { DecListAdvancedFilterComponent };
function DecListAdvancedFilterComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecListAdvancedFilterComponent.prototype.form;
    /** @type {?} */
    DecListAdvancedFilterComponent.prototype.templateRef;
    /** @type {?} */
    DecListAdvancedFilterComponent.prototype.onSearch;
    /** @type {?} */
    DecListAdvancedFilterComponent.prototype.onClear;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hZHZhbmNlZC1maWx0ZXIvbGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBNkMzRTtvQkFSWSxFQUFFO3dCQUlILGVBQVE7dUJBRVQsZUFBUTtLQUVEOzs7O0lBRWpCLGlEQUFROzs7SUFBUjtLQUNDOzs7O0lBRUQsOENBQUs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hCOzs7O0lBRUQsK0NBQU07OztJQUFOO1FBQ0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2pCOztnQkF0REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSxzbUJBNEJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7Ozs7OEJBS0UsWUFBWSxTQUFDLFdBQVc7O3lDQXZDM0I7O1NBbUNhLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWFkdmFuY2VkLWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuXG4gIDxkaXYgZnhGbGV4PlxuXG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVSZWZcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntmb3JtOiBmb3JtfVwiXG4gICAgPjwvbmctY29udGFpbmVyPlxuXG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4PlxuXG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgZW5kXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cblxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInN1Ym1pdCgpXCI+e3sgJ2xhYmVsLnNlYXJjaCcgfCB0cmFuc2xhdGUgfCB1cHBlcmNhc2UgfX08L2J1dHRvbj5cblxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWJ1dHRvbiAoY2xpY2spPVwicmVzZXQoKVwiPnt7ICdsYWJlbC5yZXNldCcgfCB0cmFuc2xhdGUgfCB1cHBlcmNhc2UgfX08L2J1dHRvbj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG48L2Rpdj5cblxuXG5cblxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZm9ybTogYW55ID0ge307XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgb25TZWFyY2ggPSAoKSA9PiB7fTtcblxuICBvbkNsZWFyID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMub25DbGVhcigpO1xuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIHRoaXMub25TZWFyY2goKTtcbiAgfVxuXG59XG4iXX0=