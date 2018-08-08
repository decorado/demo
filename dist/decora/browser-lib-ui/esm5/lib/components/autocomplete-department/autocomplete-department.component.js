/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var /** @type {?} */ BASE_ENDPOINT = 'companies/${companyId}/departments/options';
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop = function () {
};
var ɵ0 = noop;
//  Used to extend ngForms functions
export var /** @type {?} */ AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteDepartmentComponent; }),
    multi: true
};
var DecAutocompleteDepartmentComponent = /** @class */ (function () {
    function DecAutocompleteDepartmentComponent() {
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Department autocomplete';
        this.placeholder = 'Department autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(DecAutocompleteDepartmentComponent.prototype, "companyId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._companyId;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._companyId = v;
            this.value = undefined;
            this.setEndpointBasedOncompanyId();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteDepartmentComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    /**
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.setEndpointBasedOncompanyId = /**
     * @return {?}
     */
    function () {
        this.endpoint = !this.companyId ? undefined : BASE_ENDPOINT.replace('${companyId}', this.companyId);
    };
    DecAutocompleteDepartmentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-department',
                    template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  [disabled]=\"!companyId || disabled\"\n  [endpoint]=\"endpoint\"\n  [labelAttr]=\"labelAttr\"\n  [name]=\"name\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteDepartmentComponent.ctorParameters = function () { return []; };
    DecAutocompleteDepartmentComponent.propDecorators = {
        companyId: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return DecAutocompleteDepartmentComponent;
}());
export { DecAutocompleteDepartmentComponent };
function DecAutocompleteDepartmentComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.endpoint;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.labelAttr;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.valueAttr;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.disabled;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.required;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.name;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.placeholder;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.blur;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.optionSelected;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype._companyId;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.innerValue;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecAutocompleteDepartmentComponent.prototype.onChangeCallback;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1kZXBhcnRtZW50L2F1dG9jb21wbGV0ZS1kZXBhcnRtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE1BQU0sQ0FBQyxxQkFBTSxhQUFhLEdBQUcsNENBQTRDLENBQUM7O0FBRzFFLHFCQUFNLElBQUksR0FBRztDQUNaLENBQUM7OztBQUdGLE1BQU0sQ0FBQyxxQkFBTSw4Q0FBOEMsR0FBUTtJQUNqRSxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGtDQUFrQyxFQUFsQyxDQUFrQyxDQUFDO0lBQ2pFLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7SUE2RUE7eUJBeENZLE9BQU87eUJBRVAsS0FBSztvQkFpQkQseUJBQXlCOzJCQUVsQix5QkFBeUI7b0JBRVosSUFBSSxZQUFZLEVBQU87OEJBRWIsSUFBSSxZQUFZLEVBQU87MEJBUzNDLEVBQUU7aUNBRVksSUFBSTtnQ0FFQyxJQUFJO0tBRWhDO0lBcENqQixzQkFDSSx5REFBUzs7OztRQU1iO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7Ozs7O1FBVEQsVUFDYyxDQUFTO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1NBQ3BDOzs7T0FBQTtJQXNDRCxzQkFBSSxxREFBSztRQUxUOztVQUVFO1FBRUYsZUFBZTs7OztRQUNmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFFRCxvREFBb0Q7Ozs7O1FBQ3BELFVBQVUsQ0FBTTtZQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNGOzs7T0FSQTtJQVVELHNDQUFzQzs7Ozs7SUFDdEMsNkRBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztLQUM1QjtJQUVELHNDQUFzQzs7Ozs7SUFDdEMsOERBQWlCOzs7O0lBQWpCLFVBQWtCLEVBQU87UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCwyREFBYzs7OztJQUFkLFVBQWUsS0FBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCx1REFBVTs7OztJQUFWLFVBQVcsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFHLEtBQU8sS0FBSyxLQUFHLElBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQyxDQUFDOztZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDcEI7U0FDRjtLQUNGOzs7OztJQUVELCtEQUFrQjs7OztJQUFsQixVQUFtQixNQUFNO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7OztJQUVELHdFQUEyQjs7O0lBQTNCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3JHOztnQkEzSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRSx1cEJBeUJYO29CQUNDLE1BQU0sRUFBRSxFQUFFO29CQUNWLFNBQVMsRUFBRSxDQUFDLDhDQUE4QyxDQUFDO2lCQUM1RDs7Ozs7NEJBU0UsS0FBSzsyQkFXTCxLQUFLOzJCQUVMLEtBQUs7dUJBRUwsS0FBSzs4QkFFTCxLQUFLO3VCQUVMLE1BQU07aUNBRU4sTUFBTTs7NkNBNUVUOztTQStDYSxrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9FTkRQT0lOVCA9ICdjb21wYW5pZXMvJHtjb21wYW55SWR9L2RlcGFydG1lbnRzL29wdGlvbnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9ERVBBUlRNRU5UX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1kZXBhcnRtZW50JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFjb21wYW55SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0RFUEFSVE1FTlRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbXBhbnlJZCh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb21wYW55SWQgPSB2O1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25jb21wYW55SWQoKTtcbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnRGVwYXJ0bWVudCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0RlcGFydG1lbnQgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY29tcGFueUlkOiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uY29tcGFueUlkKCkge1xuICAgIHRoaXMuZW5kcG9pbnQgPSAhdGhpcy5jb21wYW55SWQgPyB1bmRlZmluZWQgOiBCQVNFX0VORFBPSU5ULnJlcGxhY2UoJyR7Y29tcGFueUlkfScsIHRoaXMuY29tcGFueUlkKTtcbiAgfVxuXG59XG4iXX0=