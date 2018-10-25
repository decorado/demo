/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
var DecListTableColumnComponent = /** @class */ (function () {
    function DecListTableColumnComponent() {
        this.title = '';
        this._colSpan = 1;
    }
    Object.defineProperty(DecListTableColumnComponent.prototype, "colSpan", {
        get: /**
         * @return {?}
         */
        function () {
            return this._colSpan;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            /** @type {?} */
            var number = +v;
            this._colSpan = isNaN(number) ? 1 : number;
        },
        enumerable: true,
        configurable: true
    });
    DecListTableColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-table-column',
                    template: "<ng-content></ng-content>\n",
                    styles: [""]
                },] },
    ];
    DecListTableColumnComponent.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        prop: [{ type: Input }],
        title: [{ type: Input }],
        colSpan: [{ type: Input }]
    };
    return DecListTableColumnComponent;
}());
export { DecListTableColumnComponent };
if (false) {
    /** @type {?} */
    DecListTableColumnComponent.prototype.template;
    /** @type {?} */
    DecListTableColumnComponent.prototype.prop;
    /** @type {?} */
    DecListTableColumnComponent.prototype.title;
    /** @type {?} */
    DecListTableColumnComponent.prototype._colSpan;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7cUJBY3pELEVBQUU7d0JBV0EsQ0FBQzs7SUFUcEIsc0JBQWEsZ0RBQU87Ozs7UUFLcEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0Qjs7Ozs7UUFQRCxVQUFxQixDQUFDOztZQUNwQixJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDNUM7OztPQUFBOztnQkFqQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSw2QkFDWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7OzsyQkFHRSxZQUFZLFNBQUMsV0FBVzt1QkFFeEIsS0FBSzt3QkFFTCxLQUFLOzBCQUVMLEtBQUs7O3NDQWhCUjs7U0FRYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYmxlLWNvbHVtbicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCB7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgcHJvcDtcblxuICBASW5wdXQoKSB0aXRsZSA9ICcnO1xuXG4gIEBJbnB1dCgpIHNldCBjb2xTcGFuKHYpIHtcbiAgICBjb25zdCBudW1iZXIgPSArdjtcbiAgICB0aGlzLl9jb2xTcGFuID0gaXNOYU4obnVtYmVyKSA/IDEgOiBudW1iZXI7XG4gIH1cblxuICBnZXQgY29sU3BhbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb2xTcGFuO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sU3BhbiA9IDE7XG59XG4iXX0=