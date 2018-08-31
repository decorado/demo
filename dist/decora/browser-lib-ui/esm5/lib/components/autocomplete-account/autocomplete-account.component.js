/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
/** @type {?} */
var noop = function () {
};
var ɵ0 = noop;
/** @type {?} */
var ACCOUNTS_ENDPOINT = 'accounts/options';
/** @type {?} */
var AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteAccountComponent; }),
    multi: true
};
var DecAutocompleteAccountComponent = /** @class */ (function () {
    function DecAutocompleteAccountComponent(decoraApi) {
        this.decoraApi = decoraApi;
        this.valueAttr = 'key';
        this.name = 'Account autocomplete';
        this.placeholder = 'Account autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(DecAutocompleteAccountComponent.prototype, "types", {
        get: /**
         * @return {?}
         */
        function () {
            return this._types;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._types) {
                this._types = v;
                if (this.initialized) {
                    this.setRolesParams();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.initialized = true;
        setTimeout(function () {
            _this.setRolesParams();
        }, 0);
    };
    Object.defineProperty(DecAutocompleteAccountComponent.prototype, "value", {
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
    DecAutocompleteAccountComponent.prototype.registerOnChange = /**
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
    DecAutocompleteAccountComponent.prototype.registerOnTouched = /**
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
    DecAutocompleteAccountComponent.prototype.onValueChanged = /**
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
    DecAutocompleteAccountComponent.prototype.writeValue = /**
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
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    /**
     * @param {?} account
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.labelFn = /**
     * @param {?} account
     * @return {?}
     */
    function (account) {
        return account.value + " #" + account.key;
    };
    /**
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.setRolesParams = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = [];
        /** @type {?} */
        var endpoint = "" + ACCOUNTS_ENDPOINT;
        if (this.types && this.types.length) {
            params.push("roles=" + encodeURI(JSON.stringify(this.types)));
        }
        if (params.length) {
            endpoint += "?" + params.join('&');
        }
        this.endpoint = endpoint;
    };
    DecAutocompleteAccountComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-account',
                    template: "<dec-autocomplete *ngIf=\"endpoint\"\n[disabled]=\"disabled\"\n[required]=\"required\"\n[endpoint]=\"endpoint\"\n[name]=\"name\"\n[multi]=\"multi\"\n[repeat]=\"repeat\"\n[labelFn]=\"labelFn\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[(ngModel)]=\"value\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteAccountComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteAccountComponent.propDecorators = {
        types: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return DecAutocompleteAccountComponent;
}());
export { DecAutocompleteAccountComponent };
if (false) {
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.endpoint;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.valueAttr;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype._types;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.disabled;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.required;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.name;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.placeholder;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.multi;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.repeat;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.blur;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.optionSelected;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.innerValue;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.onChangeCallback;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.initialized;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.decoraApi;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWFjY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1hY2NvdW50L2F1dG9jb21wbGV0ZS1hY2NvdW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBS3hFLElBQU0sSUFBSSxHQUFHO0NBQ1osQ0FBQzs7O0FBRUYsSUFBTSxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQzs7QUFHN0MsSUFBTSx5Q0FBeUMsR0FBUTtJQUNyRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLCtCQUErQixFQUEvQixDQUErQixDQUFDO0lBQzlELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7SUF3RUEseUNBQ1U7UUFBQSxjQUFTLEdBQVQsU0FBUzt5QkFoRFAsS0FBSztvQkFzQkQsc0JBQXNCOzJCQUVmLHNCQUFzQjtvQkFNVCxJQUFJLFlBQVksRUFBTzs4QkFFYixJQUFJLFlBQVksRUFBTztpQ0FTN0IsSUFBSTtnQ0FFQyxJQUFJO0tBTTVDO0lBL0NMLHNCQUNJLGtEQUFLOzs7O1FBVVQ7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjs7Ozs7UUFiRCxVQUNVLENBQVc7WUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFFaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDdkI7YUFDRjtTQUNGOzs7T0FBQTs7OztJQXdDRCx5REFBZTs7O0lBQWY7UUFBQSxpQkFLQztRQUpDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ1A7SUFPRCxzQkFBSSxrREFBSztRQUxUOztVQUVFO1FBRUYsZUFBZTs7OztRQUNmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFFRCxvREFBb0Q7Ozs7O1FBQ3BELFVBQVUsQ0FBTTtZQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNGOzs7T0FSQTtJQVVELHNDQUFzQzs7Ozs7SUFDdEMsMERBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztLQUM1QjtJQUVELHNDQUFzQzs7Ozs7SUFDdEMsMkRBQWlCOzs7O0lBQWpCLFVBQWtCLEVBQU87UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCx3REFBYzs7OztJQUFkLFVBQWUsS0FBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCxvREFBVTs7OztJQUFWLFVBQVcsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFHLEtBQUcsS0FBTyxLQUFLLEtBQUcsSUFBSSxDQUFDLEtBQU8sQ0FBQyxDQUFDLENBQUM7O1lBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO0tBQ0Y7Ozs7O0lBRUQsNERBQWtCOzs7O0lBQWxCLFVBQW1CLE1BQU07UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7OztJQUVELGlEQUFPOzs7O0lBQVAsVUFBUSxPQUFPO1FBQ2IsTUFBTSxDQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQUssT0FBTyxDQUFDLEdBQUssQ0FBQztLQUMzQzs7OztJQUVELHdEQUFjOzs7SUFBZDs7UUFDRSxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7O1FBQ2xCLElBQUksUUFBUSxHQUFHLEtBQUcsaUJBQW1CLENBQUM7UUFFdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFTLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBRyxDQUFDLENBQUM7U0FDL0Q7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQixRQUFRLElBQUksTUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDMUI7O2dCQTVJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFLHdYQWFYO29CQUNDLE1BQU0sRUFBRSxFQUFFO29CQUNWLFNBQVMsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2lCQUN2RDs7OztnQkFuQ1EsYUFBYTs7O3dCQTBDbkIsS0FBSzsyQkFnQkwsS0FBSzsyQkFFTCxLQUFLO3VCQUVMLEtBQUs7OEJBRUwsS0FBSzt3QkFFTCxLQUFLO3lCQUVMLEtBQUs7dUJBRUwsTUFBTTtpQ0FFTixNQUFNOzswQ0ExRVQ7O1NBc0NhLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBVcmxFbmNvZGluZ0NvZGVjIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmNvbnN0IEFDQ09VTlRTX0VORFBPSU5UID0gJ2FjY291bnRzL29wdGlvbnMnO1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtYWNjb3VudCcsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGUgKm5nSWY9XCJlbmRwb2ludFwiXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltlbmRwb2ludF09XCJlbmRwb2ludFwiXG5bbmFtZV09XCJuYW1lXCJcblttdWx0aV09XCJtdWx0aVwiXG5bcmVwZWF0XT1cInJlcGVhdFwiXG5bbGFiZWxGbl09XCJsYWJlbEZuXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB0eXBlcyh2OiBzdHJpbmdbXSkge1xuICAgIGlmICh2ICE9PSB0aGlzLl90eXBlcykge1xuICAgICAgdGhpcy5fdHlwZXMgPSB2O1xuXG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLnNldFJvbGVzUGFyYW1zKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IHR5cGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZXM7XG4gIH1cblxuICBfdHlwZXM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0FjY291bnQgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdBY2NvdW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgbXVsdGk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVwZWF0OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0Um9sZXNQYXJhbXMoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJmAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGxhYmVsRm4oYWNjb3VudCkge1xuICAgIHJldHVybiBgJHthY2NvdW50LnZhbHVlfSAjJHthY2NvdW50LmtleX1gO1xuICB9XG5cbiAgc2V0Um9sZXNQYXJhbXMoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgbGV0IGVuZHBvaW50ID0gYCR7QUNDT1VOVFNfRU5EUE9JTlR9YDtcblxuICAgIGlmICh0aGlzLnR5cGVzICYmIHRoaXMudHlwZXMubGVuZ3RoKSB7XG4gICAgICBwYXJhbXMucHVzaChgcm9sZXM9JHtlbmNvZGVVUkkoSlNPTi5zdHJpbmdpZnkodGhpcy50eXBlcykpfWApO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG4gICAgICBlbmRwb2ludCArPSBgPyR7cGFyYW1zLmpvaW4oJyYnKX1gO1xuICAgIH1cblxuICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgfVxuXG59XG4iXX0=