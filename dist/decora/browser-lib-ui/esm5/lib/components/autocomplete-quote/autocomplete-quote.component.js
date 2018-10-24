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
var QUOTE_ENDPOINT = '/projects/${projectId}/quotes/options';
/** @type {?} */
var AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteQuoteComponent; }),
    multi: true
};
var DecAutocompleteQuoteComponent = /** @class */ (function () {
    function DecAutocompleteQuoteComponent(decoraApi) {
        this.decoraApi = decoraApi;
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Quote autocomplete';
        this.placeholder = 'Quote autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(DecAutocompleteQuoteComponent.prototype, "projectId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._projectId;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._projectId !== v) {
                this._projectId = v;
                if (this.viewInitialized) {
                    this.setEndpointBasedOnInputs();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteQuoteComponent.prototype, "decoraProduct", {
        get: /**
         * @return {?}
         */
        function () {
            return this._decoraProduct;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._decoraProduct !== v) {
                this._decoraProduct = v;
                if (this.viewInitialized) {
                    this.setEndpointBasedOnInputs();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteQuoteComponent.prototype, "decoraProductVariant", {
        get: /**
         * @return {?}
         */
        function () {
            return this._decoraProductVariant;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._decoraProductVariant !== v) {
                this._decoraProductVariant = v;
                if (this.viewInitialized) {
                    this.setEndpointBasedOnInputs();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecAutocompleteQuoteComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.viewInitialized = true;
        this.setEndpointBasedOnInputs();
    };
    Object.defineProperty(DecAutocompleteQuoteComponent.prototype, "value", {
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
    DecAutocompleteQuoteComponent.prototype.registerOnChange = /**
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
    DecAutocompleteQuoteComponent.prototype.registerOnTouched = /**
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
    DecAutocompleteQuoteComponent.prototype.onValueChanged = /**
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
    DecAutocompleteQuoteComponent.prototype.writeValue = /**
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
    DecAutocompleteQuoteComponent.prototype.onAutocompleteBlur = /**
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
    DecAutocompleteQuoteComponent.prototype.setEndpointBasedOnInputs = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var endpoint;
        this.value = undefined;
        if (this.projectId) {
            endpoint = QUOTE_ENDPOINT.replace('${projectId}', this.projectId);
            /** @type {?} */
            var params = [];
            if (this.decoraProduct) {
                params.push("productId=" + this.decoraProduct);
            }
            if (this.decoraProductVariant) {
                params.push("productVariantId=" + this.decoraProductVariant);
            }
            if (params.length) {
                endpoint += "?" + params.join('&');
            }
        }
        if (this.endpoint !== endpoint) {
            setTimeout(function () {
                _this.endpoint = endpoint;
            }, 0);
        }
    };
    DecAutocompleteQuoteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-quote',
                    template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  [disabled]=\"!projectId || disabled\"\n  [endpoint]=\"endpoint\"\n  [labelAttr]=\"labelAttr\"\n  [name]=\"name\"\n  [multi]=\"multi\"\n  [repeat]=\"repeat\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteQuoteComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteQuoteComponent.propDecorators = {
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }],
        projectId: [{ type: Input }],
        decoraProduct: [{ type: Input }],
        decoraProductVariant: [{ type: Input }]
    };
    return DecAutocompleteQuoteComponent;
}());
export { DecAutocompleteQuoteComponent };
if (false) {
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.endpoint;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.labelAttr;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.valueAttr;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.disabled;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.required;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.name;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.placeholder;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.multi;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.repeat;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.blur;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.optionSelected;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype._projectId;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype._decoraProduct;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype._decoraProductVariant;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.viewInitialized;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.innerValue;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.onChangeCallback;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.decoraApi;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBSXhFLElBQU0sSUFBSSxHQUFHO0NBQ1osQ0FBQzs7O0FBRUYsSUFBTSxjQUFjLEdBQUcsdUNBQXVDLENBQUM7O0FBRy9ELElBQU0seUNBQXlDLEdBQVE7SUFDckQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSw2QkFBNkIsRUFBN0IsQ0FBNkIsQ0FBQztJQUM1RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7O0lBMkhBLHVDQUFvQixTQUF3QjtRQUF4QixjQUFTLEdBQVQsU0FBUyxDQUFlO3lCQXBGaEMsT0FBTzt5QkFFUCxLQUFLO29CQU1ELG9CQUFvQjsyQkFFYixvQkFBb0I7b0JBTVAsSUFBSSxZQUFZLEVBQU87OEJBRWIsSUFBSSxZQUFZLEVBQU87aUNBOEQ3QixJQUFJO2dDQUVDLElBQUk7S0FFQTtJQWhFakQsc0JBQ0ksb0RBQVM7Ozs7UUFVYjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCOzs7OztRQWJELFVBQ2MsQ0FBUztZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFC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RGEsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmNvbnN0IFFVT1RFX0VORFBPSU5UID0gJy9wcm9qZWN0cy8ke3Byb2plY3RJZH0vcXVvdGVzL29wdGlvbnMnO1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXF1b3RlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFwcm9qZWN0SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbbXVsdGldPVwibXVsdGlcIlxuICBbcmVwZWF0XT1cInJlcGVhdFwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIChvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2Zha2VEaXNhYmxlZD5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUVVPVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgZW5kcG9pbnQ6IHN0cmluZztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUXVvdGUgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdRdW90ZSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQElucHV0KClcbiAgc2V0IHByb2plY3RJZCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fcHJvamVjdElkICE9PSB2KSB7XG4gICAgICB0aGlzLl9wcm9qZWN0SWQgPSB2O1xuXG4gICAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgcHJvamVjdElkKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9qZWN0SWQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVjb3JhUHJvZHVjdCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fZGVjb3JhUHJvZHVjdCAhPT0gdikge1xuICAgICAgdGhpcy5fZGVjb3JhUHJvZHVjdCA9IHY7XG5cbiAgICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBkZWNvcmFQcm9kdWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9kZWNvcmFQcm9kdWN0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY29yYVByb2R1Y3RWYXJpYW50KHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9kZWNvcmFQcm9kdWN0VmFyaWFudCAhPT0gdikge1xuICAgICAgdGhpcy5fZGVjb3JhUHJvZHVjdFZhcmlhbnQgPSB2O1xuXG4gICAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgZGVjb3JhUHJvZHVjdFZhcmlhbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlY29yYVByb2R1Y3RWYXJpYW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvamVjdElkOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZGVjb3JhUHJvZHVjdDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2RlY29yYVByb2R1Y3RWYXJpYW50OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy52aWV3SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uSW5wdXRzKCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKSB7XG5cbiAgICBsZXQgZW5kcG9pbnQ7XG5cbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdElkKSB7XG5cbiAgICAgIGVuZHBvaW50ID0gUVVPVEVfRU5EUE9JTlQucmVwbGFjZSgnJHtwcm9qZWN0SWR9JywgdGhpcy5wcm9qZWN0SWQpO1xuXG4gICAgICBjb25zdCBwYXJhbXMgPSBbXTtcblxuICAgICAgaWYgKHRoaXMuZGVjb3JhUHJvZHVjdCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdElkPSR7dGhpcy5kZWNvcmFQcm9kdWN0fWApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kZWNvcmFQcm9kdWN0VmFyaWFudCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdFZhcmlhbnRJZD0ke3RoaXMuZGVjb3JhUHJvZHVjdFZhcmlhbnR9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG5cbiAgICAgICAgZW5kcG9pbnQgKz0gYD8ke3BhcmFtcy5qb2luKCcmJyl9YDtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kcG9pbnQgIT09IGVuZHBvaW50KSB7XG5cblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgICAgIH0sIDApO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIl19