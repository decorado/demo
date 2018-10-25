/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
var noop = function () {
};
var ɵ0 = noop;
/** @type {?} */
var AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return AutocompleteComplexityComponent; }),
    multi: true
};
/** @type {?} */
var BASIC_ENDPOINT = 'jobs/complexities/options';
var AutocompleteComplexityComponent = /** @class */ (function () {
    function AutocompleteComplexityComponent() {
        this.endpoint = 'jobs/complexities/options';
        this.valueAttr = 'key';
        this.labelAttr = 'value';
        this.name = 'Complexity autocomplete';
        this.placeholder = 'Complexity autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(AutocompleteComplexityComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this._type;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var _this = this;
            if (v !== this._type) {
                this._type = v;
                this.value = undefined;
                this.endpoint = undefined; // enforce autocomplete reload
                setTimeout(function () {
                    // ensures a digest cicle before reseting the endpoint
                    _this.setEndpointBasedOnInputs();
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutocompleteComplexityComponent.prototype, "value", {
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
     * @param {?} complexity
     * @return {?}
     */
    AutocompleteComplexityComponent.prototype.labelFn = /**
     * @param {?} complexity
     * @return {?}
     */
    function (complexity) {
        return complexity.value + " #" + complexity.key;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    AutocompleteComplexityComponent.prototype.registerOnChange = /**
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
    AutocompleteComplexityComponent.prototype.registerOnTouched = /**
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
    AutocompleteComplexityComponent.prototype.onValueChanged = /**
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
    AutocompleteComplexityComponent.prototype.writeValue = /**
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
     * @param {?} $event
     * @return {?}
     */
    AutocompleteComplexityComponent.prototype.onAutocompleteBlur = /**
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
    AutocompleteComplexityComponent.prototype.setEndpointBasedOnInputs = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = [];
        /** @type {?} */
        var endpoint = "" + BASIC_ENDPOINT;
        params.push("type=" + this.type);
        endpoint += "?" + params.join('&');
        this.endpoint = endpoint;
    };
    AutocompleteComplexityComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-complexity',
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[endpoint]=\"endpoint\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n(enterButton)=\"enterButton.emit($event)\"\n[multi]=\"multi\"\n[repeat]=\"repeat\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                    styles: [""],
                    providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    AutocompleteComplexityComponent.ctorParameters = function () { return []; };
    AutocompleteComplexityComponent.propDecorators = {
        type: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        placeholder: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }],
        enterButton: [{ type: Output }]
    };
    return AutocompleteComplexityComponent;
}());
export { AutocompleteComplexityComponent };
if (false) {
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.endpoint;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.valueAttr;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.labelAttr;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype._type;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.disabled;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.required;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.name;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.multi;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.repeat;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.placeholder;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.blur;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.optionSelected;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.enterButton;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.innerValue;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.onTouchedCallback;
    /** @type {?} */
    AutocompleteComplexityComponent.prototype.onChangeCallback;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWNvbXBsZXhpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wbGV4aXR5L2F1dG9jb21wbGV0ZS1jb21wbGV4aXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHekUsSUFBTSxJQUFJLEdBQUc7Q0FDWixDQUFDOzs7QUFHRixJQUFNLHlDQUF5QyxHQUFRO0lBQ3JELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsK0JBQStCLEVBQS9CLENBQStCLENBQUM7SUFDOUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOztBQUVGLElBQU0sY0FBYyxHQUFHLDJCQUEyQixDQUFDOztJQTZFakQ7d0JBckRXLDJCQUEyQjt5QkFFMUIsS0FBSzt5QkFFTCxPQUFPO29CQXdCSCx5QkFBeUI7MkJBTWxCLHlCQUF5QjtvQkFFWixJQUFJLFlBQVksRUFBTzs4QkFFYixJQUFJLFlBQVksRUFBTzsyQkFFMUIsSUFBSSxZQUFZLEVBQU87MEJBT3hDLEVBQUU7aUNBRVksSUFBSTtnQ0FFQyxJQUFJO0tBRWhDO0lBL0NqQixzQkFDSSxpREFBSTs7OztRQVdSO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7Ozs7O1FBZEQsVUFDUyxDQUFDO1lBRFYsaUJBVUM7WUFSQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztnQkFDMUIsVUFBVSxDQUFDOztvQkFDVCxLQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztpQkFDakMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjs7O09BQUE7SUE0Q0Qsc0JBQUksa0RBQUs7UUFMVDs7VUFFRTtRQUVGLGVBQWU7Ozs7UUFDZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBRUQsb0RBQW9EOzs7OztRQUNwRCxVQUFVLENBQU07WUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7U0FDRjs7O09BUkE7Ozs7O0lBVUQsaURBQU87Ozs7SUFBUCxVQUFRLFVBQVU7UUFDaEIsTUFBTSxDQUFJLFVBQVUsQ0FBQyxLQUFLLFVBQUssVUFBVSxDQUFDLEdBQUssQ0FBQztLQUNqRDtJQUVELHNDQUFzQzs7Ozs7SUFDdEMsMERBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztLQUM1QjtJQUVELHNDQUFzQzs7Ozs7SUFDdEMsMkRBQWlCOzs7O0lBQWpCLFVBQWtCLEVBQU87UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCx3REFBYzs7OztJQUFkLFVBQWUsS0FBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCxvREFBVTs7OztJQUFWLFVBQVcsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFHLEtBQU8sS0FBSyxLQUFHLElBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQyxDQUFDOztZQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNwQjtLQUNGOzs7OztJQUVELDREQUFrQjs7OztJQUFsQixVQUFtQixNQUFNO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7OztJQUVELGtFQUF3Qjs7O0lBQXhCOztRQUNFLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQzs7UUFDbEIsSUFBSSxRQUFRLEdBQUcsS0FBRyxjQUFnQixDQUFDO1FBRW5DLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBUSxJQUFJLENBQUMsSUFBTSxDQUFDLENBQUM7UUFFakMsUUFBUSxJQUFJLE1BQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQztRQUVuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztLQUMxQjs7Z0JBcElGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxRQUFRLEVBQUUscVpBY1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNaLFNBQVMsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2lCQUN2RDs7Ozs7dUJBU0UsS0FBSzsyQkFrQkwsS0FBSzsyQkFFTCxLQUFLO3VCQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxLQUFLOzhCQUVMLEtBQUs7dUJBRUwsTUFBTTtpQ0FFTixNQUFNOzhCQUVOLE1BQU07OzBDQTlFVDs7U0FvQ2EsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF1dG9jb21wbGV0ZUNvbXBsZXhpdHlDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuY29uc3QgQkFTSUNfRU5EUE9JTlQgPSAnam9icy9jb21wbGV4aXRpZXMvb3B0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtY29tcGxleGl0eScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuKGVudGVyQnV0dG9uKT1cImVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KVwiXG5bbXVsdGldPVwibXVsdGlcIlxuW3JlcGVhdF09XCJyZXBlYXRcIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG5bdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZUNvbXBsZXhpdHlDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQgPSAnam9icy9jb21wbGV4aXRpZXMvb3B0aW9ucyc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICBASW5wdXQoKVxuICBzZXQgdHlwZSh2KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3R5cGUpIHtcbiAgICAgIHRoaXMuX3R5cGUgPSB2O1xuICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZW5kcG9pbnQgPSB1bmRlZmluZWQ7IC8vIGVuZm9yY2UgYXV0b2NvbXBsZXRlIHJlbG9hZFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGVuc3VyZXMgYSBkaWdlc3QgY2ljbGUgYmVmb3JlIHJlc2V0aW5nIHRoZSBlbmRwb2ludFxuICAgICAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICBwcml2YXRlIF90eXBlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdDb21wbGV4aXR5IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgbXVsdGk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVwZWF0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0NvbXBsZXhpdHkgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGVudGVyQnV0dG9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wbGV4aXR5KSB7XG4gICAgcmV0dXJuIGAke2NvbXBsZXhpdHkudmFsdWV9ICMke2NvbXBsZXhpdHkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uSW5wdXRzKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgIGxldCBlbmRwb2ludCA9IGAke0JBU0lDX0VORFBPSU5UfWA7XG5cbiAgICBwYXJhbXMucHVzaChgdHlwZT0ke3RoaXMudHlwZX1gKTtcblxuICAgIGVuZHBvaW50ICs9IGA/JHtwYXJhbXMuam9pbignJicpfWA7XG5cbiAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XG4gIH1cbn1cbiJdfQ==