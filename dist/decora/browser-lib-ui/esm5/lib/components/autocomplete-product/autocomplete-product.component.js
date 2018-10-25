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
        this.params = [];
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
            if (this._companyId !== v) {
                this._companyId = v;
                this.value = undefined;
                this.endpoint = undefined; // enforce autocomplete reload
                if (this.initialized) {
                    this.setEndpointBasedOnInputs();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteProductComponent.prototype, "modelApproved", {
        get: /**
         * @return {?}
         */
        function () {
            return this._modelApproved;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._modelApproved !== v) {
                this._modelApproved = v;
                if (this.initialized) {
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
    DecAutocompleteProductComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.initialized = true;
        setTimeout(function () {
            _this.setEndpointBasedOnInputs();
        }, 0);
    };
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
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteProductComponent.prototype.setEndpointBasedOnInputs = /**
     * @return {?}
     */
    function () {
        this.indentifyParams();
        this.endpoint = BASE_AUTOCOMPLETE_PRODUCT_ENDPOINT;
        if (this.params.length > 0) {
            this.params.forEach(function (param, index) {
                /** @type {?} */
                var paramName = Object.keys(param)[0];
                /** @type {?} */
                var paramValue = param[paramName];
                this.endpoint += index === 0 ? '?' : '&';
                this.endpoint += paramName;
                this.endpoint += '=';
                this.endpoint += paramValue;
            }, this);
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
    /**
     * @return {?}
     */
    DecAutocompleteProductComponent.prototype.indentifyParams = /**
     * @return {?}
     */
    function () {
        this.params = [];
        if (this.companyId) {
            this.params.push({
                companyId: this.companyId
            });
        }
        if (this.modelApproved) {
            this.params.push({
                modelApproved: this.modelApproved
            });
        }
    };
    DecAutocompleteProductComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-product',
                    template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  #autocomplete\n  [endpoint]=\"endpoint\"\n  [labelFn]=\"labelFn\"\n  [name]=\"name\"\n  [multi]=\"multi\"\n  [repeat]=\"repeat\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"disabled\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
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
        modelApproved: [{ type: Input }],
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
    DecAutocompleteProductComponent.prototype._modelApproved;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.params;
    /** @type {?} */
    DecAutocompleteProductComponent.prototype.initialized;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXByb2R1Y3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9kdWN0L2F1dG9jb21wbGV0ZS1wcm9kdWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBRXhFLElBQU0sa0NBQWtDLEdBQUcsbUJBQW1CLENBQUM7O0FBRy9ELElBQU0sSUFBSSxHQUFHO0NBQ1osQ0FBQzs7O0FBR0YsSUFBTSwyQ0FBMkMsR0FBUTtJQUN2RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLCtCQUErQixFQUEvQixDQUErQixDQUFDO0lBQzlELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7SUEyR0EseUNBQW9CLFNBQXdCO1FBQXhCLGNBQVMsR0FBVCxTQUFTLENBQWU7eUJBbkV2QixLQUFLO29CQW9DVixzQkFBc0I7MkJBRWYsc0JBQXNCO29CQU1ULElBQUksWUFBWSxFQUFPOzhCQUViLElBQUksWUFBWSxFQUFPO3NCQU0vQyxFQUFFO2lDQVdnQixJQUFJO2dDQUVDLElBQUk7S0FFQTtJQWpFakQsc0JBQ0ksc0RBQVM7Ozs7UUFXYjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCOzs7OztRQWRELFVBQ2MsQ0FBUztZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENB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RUwsS0FBSzt1QkFFTCxLQUFLOzhCQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxLQUFLO3VCQUVMLE1BQU07aUNBRU4sTUFBTTs7MENBckdUOztTQW1EYSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5cbmNvbnN0IEJBU0VfQVVUT0NPTVBMRVRFX1BST0RVQ1RfRU5EUE9JTlQgPSAnL3Byb2R1Y3RzL29wdGlvbnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX1BST0RVQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlUHJvZHVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXByb2R1Y3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJlbmRwb2ludCBlbHNlIGZha2VEaXNhYmxlZFwiPlxuICA8ZGVjLWF1dG9jb21wbGV0ZVxuICAjYXV0b2NvbXBsZXRlXG4gIFtlbmRwb2ludF09XCJlbmRwb2ludFwiXG4gIFtsYWJlbEZuXT1cImxhYmVsRm5cIlxuICBbbmFtZV09XCJuYW1lXCJcbiAgW211bHRpXT1cIm11bHRpXCJcbiAgW3JlcGVhdF09XCJyZXBlYXRcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1BST0RVQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUHJvZHVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcblxuICBlbmRwb2ludDtcblxuICBASW5wdXQoKSB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgY29tcGFueUlkKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9jb21wYW55SWQgIT09IHYpIHtcbiAgICAgIHRoaXMuX2NvbXBhbnlJZCA9IHY7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5lbmRwb2ludCA9IHVuZGVmaW5lZDsgLy8gZW5mb3JjZSBhdXRvY29tcGxldGUgcmVsb2FkXG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RlbEFwcHJvdmVkKHY6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fbW9kZWxBcHByb3ZlZCAhPT0gdikge1xuICAgICAgdGhpcy5fbW9kZWxBcHByb3ZlZCA9IHY7XG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBtb2RlbEFwcHJvdmVkKCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbEFwcHJvdmVkO1xuICB9XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdQcm9kdWN0IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnUHJvZHVjdCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY29tcGFueUlkOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfbW9kZWxBcHByb3ZlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIHBhcmFtczogYW55ID0gW107XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplZDtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2UpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKTtcbiAgICB9LCAwKTtcblxuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKSB7XG4gICAgdGhpcy5pbmRlbnRpZnlQYXJhbXMoKTtcbiAgICB0aGlzLmVuZHBvaW50ID0gQkFTRV9BVVRPQ09NUExFVEVfUFJPRFVDVF9FTkRQT0lOVDtcbiAgICBpZiAodGhpcy5wYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wYXJhbXMuZm9yRWFjaChmdW5jdGlvbihwYXJhbSwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgcGFyYW1OYW1lID0gT2JqZWN0LmtleXMocGFyYW0pWzBdO1xuICAgICAgICBjb25zdCBwYXJhbVZhbHVlID0gcGFyYW1bcGFyYW1OYW1lXTtcbiAgICAgICAgdGhpcy5lbmRwb2ludCArPSBpbmRleCA9PT0gMCA/ICc/JyA6ICcmJztcbiAgICAgICAgdGhpcy5lbmRwb2ludCArPSBwYXJhbU5hbWU7XG4gICAgICAgIHRoaXMuZW5kcG9pbnQgKz0gJz0nO1xuICAgICAgICB0aGlzLmVuZHBvaW50ICs9IHBhcmFtVmFsdWU7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbmRlbnRpZnlQYXJhbXMoKSB7XG5cbiAgICB0aGlzLnBhcmFtcyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuY29tcGFueUlkKSB7XG4gICAgICB0aGlzLnBhcmFtcy5wdXNoKHtcbiAgICAgICAgY29tcGFueUlkOiB0aGlzLmNvbXBhbnlJZFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW9kZWxBcHByb3ZlZCkge1xuICAgICAgdGhpcy5wYXJhbXMucHVzaCh7XG4gICAgICAgIG1vZGVsQXBwcm92ZWQ6IHRoaXMubW9kZWxBcHByb3ZlZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==