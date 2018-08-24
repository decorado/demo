/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop = () => {
};
const ɵ0 = noop;
const /** @type {?} */ QUOTE_ENDPOINT = '/projects/${projectId}/quotes/options';
//  Used to extend ngForms functions
export const /** @type {?} */ AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteQuoteComponent),
    multi: true
};
export class DecAutocompleteQuoteComponent {
    /**
     * @param {?} decoraApi
     */
    constructor(decoraApi) {
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
    /**
     * @param {?} v
     * @return {?}
     */
    set projectId(v) {
        this._projectId = v;
        this.setEndpointBasedOnInputs();
    }
    /**
     * @return {?}
     */
    get projectId() {
        return this._projectId;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set decoraProduct(v) {
        this._decoraProduct = v;
        this.setEndpointBasedOnInputs();
    }
    /**
     * @return {?}
     */
    get decoraProduct() {
        return this._decoraProduct;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set decoraProductVariant(v) {
        this._decoraProductVariant = v;
        this.setEndpointBasedOnInputs();
    }
    /**
     * @return {?}
     */
    get decoraProductVariant() {
        return this._decoraProductVariant;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
    /**
     * @return {?}
     */
    setEndpointBasedOnInputs() {
        let /** @type {?} */ endpoint;
        this.value = undefined;
        if (this.projectId) {
            endpoint = QUOTE_ENDPOINT.replace('${projectId}', this.projectId);
            const /** @type {?} */ params = [];
            if (this.decoraProduct) {
                params.push(`productId=${this.decoraProduct}`);
            }
            if (this.decoraProductVariant) {
                params.push(`productVariantId=${this.decoraProductVariant}`);
            }
            if (params.length) {
                endpoint += `?${params.join('&')}`;
            }
        }
        if (this.endpoint !== endpoint) {
            this.endpoint = undefined;
            setTimeout(() => {
                this.endpoint = endpoint;
            }, 0);
        }
    }
}
DecAutocompleteQuoteComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-quote',
                template: `<div *ngIf="endpoint else fakeDisabled">
  <dec-autocomplete
  [disabled]="!projectId || disabled"
  [endpoint]="endpoint"
  [labelAttr]="labelAttr"
  [name]="name"
  [placeholder]="placeholder"
  [required]="required"
  [valueAttr]="valueAttr"
  [(ngModel)]="value"
  (optionSelected)="optionSelected.emit($event)"
  (blur)="blur.emit($event)"></dec-autocomplete>
</div>

<ng-template #fakeDisabled>
  <mat-form-field>
    <input matInput
    [attr.aria-label]="name"
    [name]="name"
    [required]="required"
    [disabled]="true"
    [placeholder]="placeholder">
  </mat-form-field>
</ng-template>

`,
                styles: [],
                providers: [AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteQuoteComponent.ctorParameters = () => [
    { type: DecApiService }
];
DecAutocompleteQuoteComponent.propDecorators = {
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }],
    projectId: [{ type: Input }],
    decoraProduct: [{ type: Input }],
    decoraProductVariant: [{ type: Input }]
};
function DecAutocompleteQuoteComponent_tsickle_Closure_declarations() {
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
    DecAutocompleteQuoteComponent.prototype.innerValue;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.onChangeCallback;
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.decoraApi;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFJeEUsdUJBQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtDQUNqQixDQUFDOztBQUVGLHVCQUFNLGNBQWMsR0FBRyx1Q0FBdUMsQ0FBQzs7QUFHL0QsTUFBTSxDQUFDLHVCQUFNLHlDQUF5QyxHQUFRO0lBQzVELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztJQUM1RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFpQ0YsTUFBTTs7OztJQW1FSixZQUFvQixTQUF3QjtRQUF4QixjQUFTLEdBQVQsU0FBUyxDQUFlO3lCQS9EaEMsT0FBTzt5QkFFUCxLQUFLO29CQU1ELG9CQUFvQjsyQkFFYixvQkFBb0I7b0JBRVAsSUFBSSxZQUFZLEVBQU87OEJBRWIsSUFBSSxZQUFZLEVBQU87aUNBNkM3QixJQUFJO2dDQUVDLElBQUk7S0FFQTs7Ozs7SUEvQ2pELElBQ0ksU0FBUyxDQUFDLENBQVM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7S0FDakM7Ozs7SUFFRCxJQUFJLFNBQVM7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN4Qjs7Ozs7SUFFRCxJQUNJLGFBQWEsQ0FBQyxDQUFTO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0tBQ2pDOzs7O0lBRUQsSUFBSSxhQUFhO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7S0FDNUI7Ozs7O0lBRUQsSUFDSSxvQkFBb0IsQ0FBQyxDQUFTO1FBQ2hDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7S0FDakM7Ozs7SUFFRCxJQUFJLG9CQUFvQjtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO0tBQ25DOzs7O0lBMEJELElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7OztJQUdELElBQUksS0FBSyxDQUFDLENBQU07UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0tBQ0Y7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUdELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOztZQUNyRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDcEI7U0FDRjtLQUNGOzs7OztJQUVELGtCQUFrQixDQUFDLE1BQU07UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7O0lBRU8sd0JBQXdCO1FBRTlCLHFCQUFJLFFBQVEsQ0FBQztRQUViLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBRXZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRW5CLFFBQVEsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFbEUsdUJBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQ2hEO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQzthQUM5RDtZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUVsQixRQUFRLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFFcEM7U0FFRjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUUvQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztZQUUxQixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUVkLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2FBRTFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FFUDs7OztZQXRMSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBeUJYO2dCQUNDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2FBQ3ZEOzs7O1lBOUNRLGFBQWE7Ozt1QkF1RG5CLEtBQUs7dUJBRUwsS0FBSzttQkFFTCxLQUFLOzBCQUVMLEtBQUs7bUJBRUwsTUFBTTs2QkFFTixNQUFNO3dCQUVOLEtBQUs7NEJBVUwsS0FBSzttQ0FVTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmNvbnN0IFFVT1RFX0VORFBPSU5UID0gJy9wcm9qZWN0cy8ke3Byb2plY3RJZH0vcXVvdGVzL29wdGlvbnMnO1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfUVVPVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1xdW90ZScsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImVuZHBvaW50IGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gIFtkaXNhYmxlZF09XCIhcHJvamVjdElkIHx8IGRpc2FibGVkXCJcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuICBbbmFtZV09XCJuYW1lXCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdRdW90ZSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1F1b3RlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBwcm9qZWN0SWQodjogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJvamVjdElkID0gdjtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICB9XG5cbiAgZ2V0IHByb2plY3RJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdElkO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY29yYVByb2R1Y3Qodjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZGVjb3JhUHJvZHVjdCA9IHY7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKTtcbiAgfVxuXG4gIGdldCBkZWNvcmFQcm9kdWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9kZWNvcmFQcm9kdWN0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY29yYVByb2R1Y3RWYXJpYW50KHY6IHN0cmluZykge1xuICAgIHRoaXMuX2RlY29yYVByb2R1Y3RWYXJpYW50ID0gdjtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICB9XG5cbiAgZ2V0IGRlY29yYVByb2R1Y3RWYXJpYW50KCkge1xuICAgIHJldHVybiB0aGlzLl9kZWNvcmFQcm9kdWN0VmFyaWFudDtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb2plY3RJZDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2RlY29yYVByb2R1Y3Q6IHN0cmluZztcblxuICBwcml2YXRlIF9kZWNvcmFQcm9kdWN0VmFyaWFudDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RW5kcG9pbnRCYXNlZE9uSW5wdXRzKCkge1xuXG4gICAgbGV0IGVuZHBvaW50O1xuXG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcblxuICAgIGlmICh0aGlzLnByb2plY3RJZCkge1xuXG4gICAgICBlbmRwb2ludCA9IFFVT1RFX0VORFBPSU5ULnJlcGxhY2UoJyR7cHJvamVjdElkfScsIHRoaXMucHJvamVjdElkKTtcblxuICAgICAgY29uc3QgcGFyYW1zID0gW107XG5cbiAgICAgIGlmICh0aGlzLmRlY29yYVByb2R1Y3QpIHtcbiAgICAgICAgcGFyYW1zLnB1c2goYHByb2R1Y3RJZD0ke3RoaXMuZGVjb3JhUHJvZHVjdH1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZGVjb3JhUHJvZHVjdFZhcmlhbnQpIHtcbiAgICAgICAgcGFyYW1zLnB1c2goYHByb2R1Y3RWYXJpYW50SWQ9JHt0aGlzLmRlY29yYVByb2R1Y3RWYXJpYW50fWApO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmxlbmd0aCkge1xuXG4gICAgICAgIGVuZHBvaW50ICs9IGA/JHtwYXJhbXMuam9pbignJicpfWA7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICh0aGlzLmVuZHBvaW50ICE9PSBlbmRwb2ludCkge1xuXG4gICAgICB0aGlzLmVuZHBvaW50ID0gdW5kZWZpbmVkO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XG5cbiAgICAgIH0sIDApO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIl19