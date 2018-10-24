/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
/** @type {?} */
export var BASE_AUTOCOMPLETE_PROJECT_ENDPOINT = '/projects/options';
/** @type {?} */
var noop = function () {
};
var ɵ0 = noop;
/** @type {?} */
var AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteProjectComponent; }),
    multi: true
};
var DecAutocompleteProjectComponent = /** @class */ (function () {
    function DecAutocompleteProjectComponent(decoraApi) {
        this.decoraApi = decoraApi;
        this.valueAttr = 'key';
        this.name = 'Project autocomplete';
        this.placeholder = 'Project autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(DecAutocompleteProjectComponent.prototype, "companyId", {
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
            var _this = this;
            if (this._companyId !== v) {
                this._companyId = v;
                this.value = undefined;
                this.endpoint = undefined;
                setTimeout(function () {
                    // ensures a digest cicle before reseting the endpoint
                    _this.setEndpointBasedOnCompanyId();
                }, 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteProjectComponent.prototype, "value", {
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
    /**
     * @param {?} company
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.labelFn = /**
     * @param {?} company
     * @return {?}
     */
    function (company) {
        return company.value + " #" + company.key;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.registerOnChange = /**
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
    DecAutocompleteProjectComponent.prototype.registerOnTouched = /**
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
    DecAutocompleteProjectComponent.prototype.onValueChanged = /**
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
    DecAutocompleteProjectComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.setEndpointBasedOnCompanyId = /**
     * @return {?}
     */
    function () {
        if (this.companyId) {
            this.endpoint = BASE_AUTOCOMPLETE_PROJECT_ENDPOINT + '?companyId=' + this.companyId;
        }
        else {
            this.endpoint = BASE_AUTOCOMPLETE_PROJECT_ENDPOINT;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    DecAutocompleteProjectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-project',
                    template: "<div *ngIf=\"(endpoint && companyId) else fakeDisabled\">\n  <dec-autocomplete\n  #autocomplete\n  [endpoint]=\"endpoint\"\n  [labelFn]=\"labelFn\"\n  [name]=\"name\"\n  [multi]=\"multi\"\n  [repeat]=\"repeat\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"disabled\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteProjectComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteProjectComponent.propDecorators = {
        companyId: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return DecAutocompleteProjectComponent;
}());
export { DecAutocompleteProjectComponent };
if (false) {
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.endpoint;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.valueAttr;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.disabled;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.required;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.name;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.placeholder;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.multi;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.repeat;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.blur;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.optionSelected;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype._companyId;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.innerValue;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.onChangeCallback;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.decoraApi;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXByb2plY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9qZWN0L2F1dG9jb21wbGV0ZS1wcm9qZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFFeEUsV0FBYSxrQ0FBa0MsR0FBRyxtQkFBbUIsQ0FBQzs7QUFHdEUsSUFBTSxJQUFJLEdBQUc7Q0FDWixDQUFDOzs7QUFHRixJQUFNLDJDQUEyQyxHQUFRO0lBQ3ZELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsK0JBQStCLEVBQS9CLENBQStCLENBQUM7SUFDOUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOztJQXVGQSx5Q0FBb0IsU0FBd0I7UUFBeEIsY0FBUyxHQUFULFNBQVMsQ0FBZTt5QkEvQ2hDLEtBQUs7b0JBc0JELHNCQUFzQjsyQkFFZixzQkFBc0I7b0JBTVQsSUFBSSxZQUFZLEVBQU87OEJBRWIsSUFBSSxZQUFZLEVBQU87aUNBVzdCLElBQUk7Z0NBRUMsSUFBSTtLQUVBO0lBN0NqRCxzQkFDSSxzREFBUzs7OztRQVdiO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7Ozs7O1FBZEQsVUFDYyxDQUFTO1lBRHZCLGlCQVVDO1lBUkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2dCQUMxQixVQUFVLENBQUM7O29CQUNULEtBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2lCQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1A7U0FDRjs7O09BQUE7SUEwQ0Qsc0JBQUksa0RBQUs7UUFMVDs7VUFFRTtRQUVGLGVBQWU7Ozs7UUFDZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBRUQsb0RBQW9EOzs7OztRQUNwRCxVQUFVLENBQU07WUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7U0FDRjs7O09BUkE7Ozs7O0lBVUQsaURBQU87Ozs7SUFBUCxVQUFRLE9BQU87UUFDYixNQUFNLENBQUksT0FBTyxDQUFDLEtBQUssVUFBSyxPQUFPLENBQUMsR0FBSyxDQUFDO0tBQzNDO0lBRUQsc0NBQXNDOzs7OztJQUN0QywwREFBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzVCO0lBRUQsc0NBQXNDOzs7OztJQUN0QywyREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQzdCOzs7OztJQUVELHdEQUFjOzs7O0lBQWQsVUFBZSxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELG9EQUFVOzs7O0lBQVYsVUFBVyxLQUFVO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBRyxLQUFPLEtBQUssS0FBRyxJQUFJLENBQUMsS0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDcEI7S0FDRjs7OztJQUVELHFFQUEyQjs7O0lBQTNCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxrQ0FBa0MsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNyRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxrQ0FBa0MsQ0FBQztTQUNwRDtLQUNGOzs7OztJQUVELDREQUFrQjs7OztJQUFsQixVQUFtQixNQUFNO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7Z0JBM0lGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUUsaXRCQTRCWDtvQkFDQyxNQUFNLEVBQUUsRUFBRTtvQkFDVixTQUFTLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztpQkFDekQ7Ozs7Z0JBaERRLGFBQWE7Ozs0QkF1RG5CLEtBQUs7MkJBZ0JMLEtBQUs7MkJBRUwsS0FBSzt1QkFFTCxLQUFLOzhCQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxLQUFLO3VCQUVMLE1BQU07aUNBRU4sTUFBTTs7MENBdkZUOztTQW1EYSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBCQVNFX0FVVE9DT01QTEVURV9QUk9KRUNUX0VORFBPSU5UID0gJy9wcm9qZWN0cy9vcHRpb25zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9QUk9KRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1wcm9qZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiKGVuZHBvaW50ICYmIGNvbXBhbnlJZCkgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgI2F1dG9jb21wbGV0ZVxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxGbl09XCJsYWJlbEZuXCJcbiAgW25hbWVdPVwibmFtZVwiXG4gIFttdWx0aV09XCJtdWx0aVwiXG4gIFtyZXBlYXRdPVwicmVwZWF0XCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9QUk9KRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQ7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbXBhbnlJZCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fY29tcGFueUlkICE9PSB2KSB7XG4gICAgICB0aGlzLl9jb21wYW55SWQgPSB2O1xuICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZW5kcG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gZW5zdXJlcyBhIGRpZ2VzdCBjaWNsZSBiZWZvcmUgcmVzZXRpbmcgdGhlIGVuZHBvaW50XG4gICAgICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uQ29tcGFueUlkKCk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY29tcGFueUlkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wYW55SWQ7XG4gIH1cblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1Byb2plY3QgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdQcm9qZWN0IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgbXVsdGk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVwZWF0OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9jb21wYW55SWQ6IHN0cmluZztcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2UpIHsgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4oY29tcGFueSkge1xuICAgIHJldHVybiBgJHtjb21wYW55LnZhbHVlfSAjJHtjb21wYW55LmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uQ29tcGFueUlkKCkge1xuICAgIGlmICh0aGlzLmNvbXBhbnlJZCkge1xuICAgICAgdGhpcy5lbmRwb2ludCA9IEJBU0VfQVVUT0NPTVBMRVRFX1BST0pFQ1RfRU5EUE9JTlQgKyAnP2NvbXBhbnlJZD0nICsgdGhpcy5jb21wYW55SWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5kcG9pbnQgPSBCQVNFX0FVVE9DT01QTEVURV9QUk9KRUNUX0VORFBPSU5UO1xuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxufVxuIl19