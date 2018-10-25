/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
/** @type {?} */
const noop = () => {
};
const ɵ0 = noop;
/** @type {?} */
const QUOTE_ENDPOINT = '/projects/${projectId}/quotes/options';
/** @type {?} */
const AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR = {
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
        if (this._projectId !== v) {
            this._projectId = v;
            this.value = undefined;
            this.endpoint = undefined; // enforce autocomplete reload
            setTimeout(() => {
                // ensures a digest cicle before reseting the endpoint
                this.setEndpointBasedOnInputs();
            }, 0);
        }
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
        if (this._decoraProduct !== v) {
            this._decoraProduct = v;
            if (this.viewInitialized) {
                this.setEndpointBasedOnInputs();
            }
        }
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
        if (this._decoraProductVariant !== v) {
            this._decoraProductVariant = v;
            if (this.viewInitialized) {
                this.setEndpointBasedOnInputs();
            }
        }
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
    ngAfterViewInit() {
        this.viewInitialized = true;
        this.setEndpointBasedOnInputs();
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
        if (`${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            this.value = value;
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
     * @param {?=} item
     * @return {?}
     */
    labelFn(item = {}) {
        return `${item.value} #${item.key}`;
    }
    /**
     * @return {?}
     */
    setEndpointBasedOnInputs() {
        /** @type {?} */
        let endpoint;
        this.value = undefined;
        if (this.projectId) {
            endpoint = QUOTE_ENDPOINT.replace('${projectId}', this.projectId);
            /** @type {?} */
            const params = [];
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
  [labelFn]="labelFn"
  [name]="name"
  [multi]="multi"
  [repeat]="repeat"
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
    multi: [{ type: Input }],
    repeat: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }],
    projectId: [{ type: Input }],
    decoraProduct: [{ type: Input }],
    decoraProductVariant: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecAutocompleteQuoteComponent.prototype.endpoint;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBSXhFLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtDQUNqQixDQUFDOzs7QUFFRixNQUFNLGNBQWMsR0FBRyx1Q0FBdUMsQ0FBQzs7QUFHL0QsTUFBTSx5Q0FBeUMsR0FBUTtJQUNyRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsNkJBQTZCLENBQUM7SUFDNUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBbUNGLE1BQU07Ozs7SUF3RkosWUFBb0IsU0FBd0I7UUFBeEIsY0FBUyxHQUFULFNBQVMsQ0FBZTt5QkFwRmhDLEtBQUs7b0JBTUQsb0JBQW9COzJCQUViLG9CQUFvQjtvQkFNUCxJQUFJLFlBQVksRUFBTzs4QkFFYixJQUFJLFlBQVksRUFBTztpQ0FnRTdCLElBQUk7Z0NBRUMsSUFBSTtLQUVBOzs7OztJQWxFakQsSUFDSSxTQUFTLENBQUMsQ0FBUztRQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUss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TCxNQUFNOzZCQUVOLE1BQU07d0JBRU4sS0FBSzs0QkFpQkwsS0FBSzttQ0FlTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmNvbnN0IFFVT1RFX0VORFBPSU5UID0gJy9wcm9qZWN0cy8ke3Byb2plY3RJZH0vcXVvdGVzL29wdGlvbnMnO1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXF1b3RlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFwcm9qZWN0SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxGbl09XCJsYWJlbEZuXCJcbiAgW25hbWVdPVwibmFtZVwiXG4gIFttdWx0aV09XCJtdWx0aVwiXG4gIFtyZXBlYXRdPVwicmVwZWF0XCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUXVvdGUgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdRdW90ZSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQElucHV0KClcbiAgc2V0IHByb2plY3RJZCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fcHJvamVjdElkICE9PSB2KSB7XG4gICAgICB0aGlzLl9wcm9qZWN0SWQgPSB2O1xuICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZW5kcG9pbnQgPSB1bmRlZmluZWQ7IC8vIGVuZm9yY2UgYXV0b2NvbXBsZXRlIHJlbG9hZFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGVuc3VyZXMgYSBkaWdlc3QgY2ljbGUgYmVmb3JlIHJlc2V0aW5nIHRoZSBlbmRwb2ludFxuICAgICAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHByb2plY3RJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdElkO1xuICB9XG5cblxuICBASW5wdXQoKVxuICBzZXQgZGVjb3JhUHJvZHVjdCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fZGVjb3JhUHJvZHVjdCAhPT0gdikge1xuICAgICAgdGhpcy5fZGVjb3JhUHJvZHVjdCA9IHY7XG5cbiAgICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBkZWNvcmFQcm9kdWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9kZWNvcmFQcm9kdWN0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY29yYVByb2R1Y3RWYXJpYW50KHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9kZWNvcmFQcm9kdWN0VmFyaWFudCAhPT0gdikge1xuICAgICAgdGhpcy5fZGVjb3JhUHJvZHVjdFZhcmlhbnQgPSB2O1xuXG4gICAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgZGVjb3JhUHJvZHVjdFZhcmlhbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlY29yYVByb2R1Y3RWYXJpYW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvamVjdElkOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZGVjb3JhUHJvZHVjdDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2RlY29yYVByb2R1Y3RWYXJpYW50OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy52aWV3SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uSW5wdXRzKCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgbGFiZWxGbihpdGVtOiBhbnkgPSB7fSkge1xuICAgIHJldHVybiBgJHtpdGVtLnZhbHVlfSAjJHtpdGVtLmtleX1gO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKSB7XG5cbiAgICBsZXQgZW5kcG9pbnQ7XG5cbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdElkKSB7XG5cbiAgICAgIGVuZHBvaW50ID0gUVVPVEVfRU5EUE9JTlQucmVwbGFjZSgnJHtwcm9qZWN0SWR9JywgdGhpcy5wcm9qZWN0SWQpO1xuXG4gICAgICBjb25zdCBwYXJhbXMgPSBbXTtcblxuICAgICAgaWYgKHRoaXMuZGVjb3JhUHJvZHVjdCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdElkPSR7dGhpcy5kZWNvcmFQcm9kdWN0fWApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kZWNvcmFQcm9kdWN0VmFyaWFudCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdFZhcmlhbnRJZD0ke3RoaXMuZGVjb3JhUHJvZHVjdFZhcmlhbnR9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG5cbiAgICAgICAgZW5kcG9pbnQgKz0gYD8ke3BhcmFtcy5qb2luKCcmJyl9YDtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kcG9pbnQgIT09IGVuZHBvaW50KSB7XG5cblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgICAgIH0sIDApO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIl19