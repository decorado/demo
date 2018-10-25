/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, TemplateRef } from '@angular/core';
var DecListAdvancedFilterComponent = /** @class */ (function () {
    function DecListAdvancedFilterComponent() {
        this.form = {};
        this.onSearch = function () { };
        this.onClear = function () { };
    }
    Object.defineProperty(DecListAdvancedFilterComponent.prototype, "opened", {
        get: /**
         * @return {?}
         */
        function () {
            return this._opened;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._opened = this._opened || v;
        },
        enumerable: true,
        configurable: true
    });
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
    DecListAdvancedFilterComponent.prototype.clearEmptyKeys = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var emptyKeys = Object.keys(this.form).filter(function (key) {
            /** @type {?} */
            var value = _this.form[key];
            if (typeof value === 'string') {
                return value === '' || value === undefined;
            }
            else if (Array.isArray(value)) {
                return value.length === 0;
            }
            else {
                return false;
            }
        });
        emptyKeys.forEach(function (key) {
            delete _this.form[key];
        });
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
        this.clearEmptyKeys();
        this.onSearch();
    };
    DecListAdvancedFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-advanced-filter',
                    template: "<form fxLayout=\"column\" fxLayoutGap=\"16px\" (submit)=\"submit()\">\n\n  <div fxFlex>\n\n    <ng-container *ngIf=\"opened\"\n      [ngTemplateOutlet]=\"templateRef\"\n      [ngTemplateOutletContext]=\"{form: form}\"\n    ></ng-container>\n\n  </div>\n\n  <div fxFlex>\n\n    <div fxLayout=\"row\" fxLayoutAlign=\"end end\" fxLayoutGap=\"8px\">\n\n      <button type=\"submit\" mat-raised-button color=\"primary\">{{ 'label.search' | translate | uppercase }}</button>\n\n      <button type=\"button\" mat-button (click)=\"reset()\">{{ 'label.reset' | translate | uppercase }}</button>\n\n    </div>\n\n  </div>\n\n</form>\n\n\n\n\n",
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
if (false) {
    /** @type {?} */
    DecListAdvancedFilterComponent.prototype.form;
    /** @type {?} */
    DecListAdvancedFilterComponent.prototype._opened;
    /** @type {?} */
    DecListAdvancedFilterComponent.prototype.templateRef;
    /** @type {?} */
    DecListAdvancedFilterComponent.prototype.onSearch;
    /** @type {?} */
    DecListAdvancedFilterComponent.prototype.onClear;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hZHZhbmNlZC1maWx0ZXIvbGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBdUQzRTtvQkFsQlksRUFBRTt3QkFjSCxlQUFTO3VCQUVWLGVBQVM7S0FFRjtJQWhCakIsc0JBQUksa0RBQU07Ozs7UUFJVjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JCOzs7OztRQU5ELFVBQVcsQ0FBQztZQUNWLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7U0FDbEM7OztPQUFBOzs7O0lBZ0JELGlEQUFROzs7SUFBUjtLQUNDOzs7O0lBRU8sdURBQWM7Ozs7OztRQUVwQixJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHOztZQUNqRCxJQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUM7YUFDNUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQzthQUMzQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDZDtTQUNGLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ25CLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QixDQUFDLENBQUM7Ozs7O0lBSUwsOENBQUs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hCOzs7O0lBRUQsK0NBQU07OztJQUFOO1FBRUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUVqQjs7Z0JBdkZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUUsMG5CQTRCWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7OzhCQWVFLFlBQVksU0FBQyxXQUFXOzt5Q0FqRDNCOztTQW1DYSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1hZHZhbmNlZC1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYDxmb3JtIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCIgKHN1Ym1pdCk9XCJzdWJtaXQoKVwiPlxuXG4gIDxkaXYgZnhGbGV4PlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9wZW5lZFwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVJlZlwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Zvcm06IGZvcm19XCJcbiAgICA+PC9uZy1jb250YWluZXI+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXg+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBlbmRcIiBmeExheW91dEdhcD1cIjhweFwiPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIj57eyAnbGFiZWwuc2VhcmNoJyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uIChjbGljayk9XCJyZXNldCgpXCI+e3sgJ2xhYmVsLnJlc2V0JyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvZm9ybT5cblxuXG5cblxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZm9ybTogYW55ID0ge307XG5cbiAgc2V0IG9wZW5lZCh2KSB7XG4gICAgdGhpcy5fb3BlbmVkID0gdGhpcy5fb3BlbmVkIHx8IHY7XG4gIH1cblxuICBnZXQgb3BlbmVkKCkge1xuICAgIHJldHVybiB0aGlzLl9vcGVuZWQ7XG4gIH1cblxuICBwcml2YXRlIF9vcGVuZWQ6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgb25TZWFyY2ggPSAoKSA9PiB7IH07XG5cbiAgb25DbGVhciA9ICgpID0+IHsgfTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckVtcHR5S2V5cygpIHtcblxuICAgIGNvbnN0IGVtcHR5S2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuZm9ybSkuZmlsdGVyKGtleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZm9ybVtrZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZW1wdHlLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGRlbGV0ZSB0aGlzLmZvcm1ba2V5XTtcbiAgICB9KTtcblxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5vbkNsZWFyKCk7XG4gIH1cblxuICBzdWJtaXQoKSB7XG5cbiAgICB0aGlzLmNsZWFyRW1wdHlLZXlzKCk7XG5cbiAgICB0aGlzLm9uU2VhcmNoKCk7XG5cbiAgfVxufVxuIl19