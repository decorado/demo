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
                this.endpoint = undefined; // enforce autocomplete reload
                setTimeout(function () {
                    // ensures a digest cicle before reseting the endpoint
                    _this.setEndpointBasedOnInputs();
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
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.setEndpointBasedOnInputs = /**
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXByb2plY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9qZWN0L2F1dG9jb21wbGV0ZS1wcm9qZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFFeEUsV0FBYSxrQ0FBa0MsR0FBRyxtQkFBbUIsQ0FBQzs7QUFHdEUsSUFBTSxJQUFJLEdBQUc7Q0FDWixDQUFDOzs7QUFHRixJQUFNLDJDQUEyQyxHQUFRO0lBQ3ZELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsK0JBQStCLEVBQS9CLENBQStCLENBQUM7SUFDOUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOztJQXVGQSx5Q0FBb0IsU0FBd0I7UUFBeEIsY0FBUyxHQUFULFNBQVMsQ0FBZTt5QkEvQ2hDLEtBQUs7b0JBc0JELHNCQUFzQjsyQkFFZixzQkFBc0I7b0JBTVQsSUFBSSxZQUFZLEVBQU87OEJBRWIsSUFBSSxZQUFZLEVBQU87aUNBVzdCLElBQUk7Z0NBRUMsSUFBSTtLQUVBO0lBN0NqRCxzQkFDSSxzREFBUzs7OztRQVdiO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7Ozs7O1FBZEQsVUFDYyxDQUFTO1lBRHZCLGlCQVVDO1lBUkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2dCQUMxQixVQUFVLENBQUM7O29CQUNULEtBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2lCQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1A7U0FDRjs7O09BQUE7SUEwQ0Qsc0JBQUksa0RBQUs7UUFMVDs7VUFFRTtRQUVGLGVBQWU7Ozs7UUFDZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBRUQsb0RBQW9EOzs7OztRQUNwRCxVQUFVLENBQU07WUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7U0FDRjs7O09BUkE7Ozs7O0lBVUQsaURBQU87Ozs7SUFBUCxVQUFRLE9BQU87UUFDYixNQUFNLENBQUksT0FBTyxDQUFDLEtBQUssVUFBSyxPQUFPLENBQUMsR0FBSyxDQUFDO0tBQzNDO0lBRUQsc0NBQXNDOzs7OztJQUN0QywwREFBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzVCO0lBRUQsc0NBQXNDOzs7OztJQUN0QywyREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQzdCOzs7OztJQUVELHdEQUFjOzs7O0lBQWQsVUFBZSxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELG9EQUFVOzs7O0lBQVYsVUFBVyxLQUFVO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUcsS0FBTyxLQUFLLEtBQUcsSUFBSSxDQUFDLEtBQU8sQ0FBQyxDQUFDLENBQUM7O1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO0tBQ0Y7Ozs7SUFFRCxrRUFBd0I7OztJQUF4QjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsa0NBQWtDLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDckY7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsa0NBQWtDLENBQUM7U0FDcEQ7S0FDRjs7Ozs7SUFFRCw0REFBa0I7Ozs7SUFBbEIsVUFBbUIsTUFBTTtRQUN2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7O2dCQTNJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFLGl0QkE0Qlg7b0JBQ0MsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsU0FBUyxFQUFFLENBQUMsMkNBQTJDLENBQUM7aUJBQ3pEOzs7O2dCQWhEUSxhQUFhOzs7NEJBdURuQixLQUFLOzJCQWdCTCxLQUFLOzJCQUVMLEtBQUs7dUJBRUwsS0FBSzs4QkFFTCxLQUFLO3dCQUVMLEtBQUs7eUJBRUwsS0FBSzt1QkFFTCxNQUFNO2lDQUVOLE1BQU07OzBDQXZGVDs7U0FtRGEsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCA9ICcvcHJvamVjdHMvb3B0aW9ucyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5jb25zdCBBVVRPQ09NUExFVEVfUFJPSkVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcHJvamVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIihlbmRwb2ludCAmJiBjb21wYW55SWQpIGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gICNhdXRvY29tcGxldGVcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsRm5dPVwibGFiZWxGblwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbbXVsdGldPVwibXVsdGlcIlxuICBbcmVwZWF0XT1cInJlcGVhdFwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIChvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2Zha2VEaXNhYmxlZD5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUFJPSkVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50O1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb21wYW55SWQodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2NvbXBhbnlJZCAhPT0gdikge1xuICAgICAgdGhpcy5fY29tcGFueUlkID0gdjtcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmVuZHBvaW50ID0gdW5kZWZpbmVkOyAvLyBlbmZvcmNlIGF1dG9jb21wbGV0ZSByZWxvYWRcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBlbnN1cmVzIGEgZGlnZXN0IGNpY2xlIGJlZm9yZSByZXNldGluZyB0aGUgZW5kcG9pbnRcbiAgICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUHJvamVjdCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1Byb2plY3QgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBtdWx0aTogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXBlYXQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX2NvbXBhbnlJZDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKSB7XG4gICAgaWYgKHRoaXMuY29tcGFueUlkKSB7XG4gICAgICB0aGlzLmVuZHBvaW50ID0gQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCArICc/Y29tcGFueUlkPScgKyB0aGlzLmNvbXBhbnlJZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmRwb2ludCA9IEJBU0VfQVVUT0NPTVBMRVRFX1BST0pFQ1RfRU5EUE9JTlQ7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG59XG4iXX0=