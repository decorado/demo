/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
/** @type {?} */
var BASE_AUTOCOMPLETE_PRODUCT_ENDPOINT = '/products/options';
/** @type {?} */
var noop = function () {
};
var ɵ0 = noop;
/** @type {?} */
var AUTOCOMPLETE_PRODUCT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteProductComponent; }),
    multi: true
};
var DecAutocompleteProductComponent = /** @class */ (function () {
    function DecAutocompleteProductComponent(decoraApi) {
        this.decoraApi = decoraApi;
        this.valueAttr = 'key';
        this.name = 'Product autocomplete';
        this.placeholder = 'Product autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(DecAutocompleteProductComponent.prototype, "companyId", {
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
    Object.defineProperty(DecAutocompleteProductComponent.prototype, "value", {
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
    DecAutocompleteProductComponent.prototype.labelFn = /**
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
    DecAutocompleteProductComponent.prototype.registerOnChange = /**
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
    DecAutocompleteProductComponent.prototype.registerOnTouched = /**
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
    DecAutocompleteProductComponent.prototype.onValueChanged = /**
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
    DecAutocompleteProductComponent.prototype.writeValue = /**
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
    DecAutocompleteProductComponent.prototype.setEndpointBasedOnCompanyId = /**
     * @return {?}
     */
    function () {
        if (this.companyId) {
            this.endpoint = BASE_AUTOCOMPLETE_PRODUCT_ENDPOINT + '?companyId=' + this.companyId;
        }
        else {
            this.endpoint = BASE_AUTOCOMPLETE_PRODUCT_ENDPOINT;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteProductComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    DecAutocompleteProductComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-product',
                    template: "<div *ngIf=\"(endpoint && companyId) else fakeDisabled\">\n  <dec-autocomplete\n  #autocomplete\n  [endpoint]=\"endpoint\"\n  [labelFn]=\"labelFn\"\n  [name]=\"name\"\n  [multi]=\"multi\"\n  [repeat]=\"repeat\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"disabled\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_PRODUCT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteProductComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteProductComponent.propDecorators = {
        valueAttr: [{ type: Input }],
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
    return DecAutocompleteProductComponent;
}());
export { DecAutocompleteProductComponent };
if (false) {
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.endpoint;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.valueAttr;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.disabled;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.required;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.name;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.placeholder;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.multi;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.repeat;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.blur;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.optionSelected;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype._companyId;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.innerValue;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.onChangeCallback;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.decoraApi;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXByb2R1Y3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9kdWN0L2F1dG9jb21wbGV0ZS1wcm9kdWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFFeEUsSUFBTSxrQ0FBa0MsR0FBRyxtQkFBbUIsQ0FBQzs7QUFHL0QsSUFBTSxJQUFJLEdBQUc7Q0FDWixDQUFDOzs7QUFHRixJQUFNLDJDQUEyQyxHQUFRO0lBQ3ZELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsK0JBQStCLEVBQS9CLENBQStCLENBQUM7SUFDOUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOztJQXVGQSx5Q0FBb0IsU0FBd0I7UUFBeEIsY0FBUyxHQUFULFNBQVMsQ0FBZTt5QkEvQ3ZCLEtBQUs7b0JBc0JWLHNCQUFzQjsyQkFFZixzQkFBc0I7b0JBTVQsSUFBSSxZQUFZLEVBQU87OEJBRWIsSUFBSSxZQUFZLEVBQU87aUNBVzdCLElBQUk7Z0NBRUMsSUFBSTtLQUVBO0lBN0NqRCxzQkFDSSxzREFBUzs7OztRQVdiO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7Ozs7O1FBZEQsVUFDYyxDQUFTO1lBRHZCLGlCQVVDO1lBUkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2dCQUMxQixVQUFVLENBQUM7O29CQUNULEtBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2lCQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1A7U0FDRjs7O09BQUE7SUEwQ0Qsc0JBQUksa0RBQUs7UUFMVDs7VUFFRTtRQUVGLGVBQWU7Ozs7UUFDZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBRUQsb0RBQW9EOzs7OztRQUNwRCxVQUFVLENBQU07WUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7U0FDRjs7O09BUkE7Ozs7O0lBVUQsaURBQU87Ozs7SUFBUCxVQUFRLE9BQU87UUFDYixNQUFNLENBQUksT0FBTyxDQUFDLEtBQUssVUFBSyxPQUFPLENBQUMsR0FBSyxDQUFDO0tBQzNDO0lBRUQsc0NBQXNDOzs7OztJQUN0QywwREFBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzVCO0lBRUQsc0NBQXNDOzs7OztJQUN0QywyREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQzdCOzs7OztJQUVELHdEQUFjOzs7O0lBQWQsVUFBZSxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELG9EQUFVOzs7O0lBQVYsVUFBVyxLQUFVO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBRyxLQUFPLEtBQUssS0FBRyxJQUFJLENBQUMsS0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDcEI7S0FDRjs7OztJQUVELHFFQUEyQjs7O0lBQTNCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxrQ0FBa0MsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNyRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxrQ0FBa0MsQ0FBQztTQUNwRDtLQUNGOzs7OztJQUVELDREQUFrQjs7OztJQUFsQixVQUFtQixNQUFNO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7Z0JBM0lGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUUsaXRCQTRCWDtvQkFDQyxNQUFNLEVBQUUsRUFBRTtvQkFDVixTQUFTLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztpQkFDekQ7Ozs7Z0JBaERRLGFBQWE7Ozs0QkFxRG5CLEtBQUs7NEJBRUwsS0FBSzsyQkFnQkwsS0FBSzsyQkFFTCxLQUFLO3VCQUVMLEtBQUs7OEJBRUwsS0FBSzt3QkFFTCxLQUFLO3lCQUVMLEtBQUs7dUJBRUwsTUFBTTtpQ0FFTixNQUFNOzswQ0F2RlQ7O1NBbURhLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcblxuY29uc3QgQkFTRV9BVVRPQ09NUExFVEVfUFJPRFVDVF9FTkRQT0lOVCA9ICcvcHJvZHVjdHMvb3B0aW9ucyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5jb25zdCBBVVRPQ09NUExFVEVfUFJPRFVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVQcm9kdWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcHJvZHVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIihlbmRwb2ludCAmJiBjb21wYW55SWQpIGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gICNhdXRvY29tcGxldGVcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsRm5dPVwibGFiZWxGblwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbbXVsdGldPVwibXVsdGlcIlxuICBbcmVwZWF0XT1cInJlcGVhdFwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIChvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2Zha2VEaXNhYmxlZD5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUFJPRFVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVQcm9kdWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50O1xuXG4gIEBJbnB1dCgpIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb21wYW55SWQodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2NvbXBhbnlJZCAhPT0gdikge1xuICAgICAgdGhpcy5fY29tcGFueUlkID0gdjtcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmVuZHBvaW50ID0gdW5kZWZpbmVkO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGVuc3VyZXMgYSBkaWdlc3QgY2ljbGUgYmVmb3JlIHJlc2V0aW5nIHRoZSBlbmRwb2ludFxuICAgICAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbkNvbXBhbnlJZCgpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNvbXBhbnlJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGFueUlkO1xuICB9XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdQcm9kdWN0IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnUHJvZHVjdCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY29tcGFueUlkOiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICBsYWJlbEZuKGNvbXBhbnkpIHtcbiAgICByZXR1cm4gYCR7Y29tcGFueS52YWx1ZX0gIyR7Y29tcGFueS5rZXl9YDtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiBgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHNldEVuZHBvaW50QmFzZWRPbkNvbXBhbnlJZCgpIHtcbiAgICBpZiAodGhpcy5jb21wYW55SWQpIHtcbiAgICAgIHRoaXMuZW5kcG9pbnQgPSBCQVNFX0FVVE9DT01QTEVURV9QUk9EVUNUX0VORFBPSU5UICsgJz9jb21wYW55SWQ9JyArIHRoaXMuY29tcGFueUlkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuZHBvaW50ID0gQkFTRV9BVVRPQ09NUExFVEVfUFJPRFVDVF9FTkRQT0lOVDtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbn1cbiJdfQ==