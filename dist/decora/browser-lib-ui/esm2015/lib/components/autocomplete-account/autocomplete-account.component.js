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
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteAccountComponent),
    multi: true
};
export class DecAutocompleteAccountComponent {
    /**
     * @param {?} decoraApi
     */
    constructor(decoraApi) {
        this.decoraApi = decoraApi;
        this.endpoint = 'accounts/options';
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Account autocomplete';
        this.placeholder = 'Account autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.customFetchFunction = (textSearch) => {
            const /** @type {?} */ filterGroups = [
                {
                    filters: [
                        { property: 'name', value: textSearch }
                    ]
                }
            ];
            if (this.types) {
                filterGroups[0].filters.push({ property: 'role.$id', value: this.types });
            }
            return this.decoraApi.get(this.endpoint, { filterGroups });
        };
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
}
DecAutocompleteAccountComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-account',
                template: `<dec-autocomplete
[disabled]="disabled"
[required]="required"
[name]="name"
[placeholder]="placeholder"
(optionSelected)="optionSelected.emit($event)"
[customFetchFunction]="customFetchFunction"
[(ngModel)]="value"
[labelAttr]="labelAttr"
[valueAttr]="valueAttr"
(blur)="blur.emit($event)"></dec-autocomplete>
`,
                styles: [],
                providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteAccountComponent.ctorParameters = () => [
    { type: DecApiService }
];
DecAutocompleteAccountComponent.propDecorators = {
    types: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }]
};
function DecAutocompleteAccountComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.endpoint;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.labelAttr;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.valueAttr;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.types;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.disabled;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.required;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.name;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.placeholder;
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
    DecAutocompleteAccountComponent.prototype.customFetchFunction;
    /** @type {?} */
    DecAutocompleteAccountComponent.prototype.decoraApi;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWFjY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1hY2NvdW50L2F1dG9jb21wbGV0ZS1hY2NvdW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFJeEUsdUJBQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtDQUNqQixDQUFDOzs7QUFHRix1QkFBTSx5Q0FBeUMsR0FBUTtJQUNyRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsK0JBQStCLENBQUM7SUFDOUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBbUJGLE1BQU07Ozs7SUFpQ0osWUFDVTtRQUFBLGNBQVMsR0FBVCxTQUFTO3dCQWhDUixrQkFBa0I7eUJBRWpCLE9BQU87eUJBRVAsS0FBSztvQkFRRCxzQkFBc0I7MkJBRWYsc0JBQXNCO29CQUVULElBQUksWUFBWSxFQUFPOzhCQUViLElBQUksWUFBWSxFQUFPOzBCQU8zQyxFQUFFO2lDQUVZLElBQUk7Z0NBRUMsSUFBSTttQ0FrRDNCLENBQUMsVUFBVSxFQUFtQixFQUFFO1lBRXBELHVCQUFNLFlBQVksR0FBRztnQkFDbkI7b0JBQ0UsT0FBTyxFQUFFO3dCQUNQLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO3FCQUN4QztpQkFDRjthQUNGLENBQUM7WUFFRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFZixZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2FBRTNFO1lBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO0tBaEVHOzs7O0lBT0osSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDeEI7Ozs7O0lBR0QsSUFBSSxLQUFLLENBQUMsQ0FBTTtRQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUI7S0FDRjs7Ozs7SUFHRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDNUI7Ozs7O0lBR0QsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQzdCOzs7OztJQUVELGNBQWMsQ0FBQyxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOztZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDcEI7U0FDRjtLQUNGOzs7OztJQUVELGtCQUFrQixDQUFDLE1BQU07UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7WUFoR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Q0FXWDtnQkFDQyxNQUFNLEVBQUUsRUFBRTtnQkFDVixTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQzthQUN2RDs7OztZQTlCUSxhQUFhOzs7b0JBdUNuQixLQUFLO3VCQUVMLEtBQUs7dUJBRUwsS0FBSzttQkFFTCxLQUFLOzBCQUVMLEtBQUs7bUJBRUwsTUFBTTs2QkFFTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1hY2NvdW50JyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bbmFtZV09XCJuYW1lXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbltjdXN0b21GZXRjaEZ1bmN0aW9uXT1cImN1c3RvbUZldGNoRnVuY3Rpb25cIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG5bdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50ID0gJ2FjY291bnRzL29wdGlvbnMnO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KCkgdHlwZXM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnQWNjb3VudCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0FjY291bnQgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBjdXN0b21GZXRjaEZ1bmN0aW9uID0gKHRleHRTZWFyY2gpOiBPYnNlcnZhYmxlPGFueT4gPT4ge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBzID0gW1xuICAgICAge1xuICAgICAgICBmaWx0ZXJzOiBbXG4gICAgICAgICAgeyBwcm9wZXJ0eTogJ25hbWUnLCB2YWx1ZTogdGV4dFNlYXJjaCB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdO1xuXG4gICAgaWYgKHRoaXMudHlwZXMpIHtcblxuICAgICAgZmlsdGVyR3JvdXBzWzBdLmZpbHRlcnMucHVzaCh7IHByb3BlcnR5OiAncm9sZS4kaWQnLCB2YWx1ZTogdGhpcy50eXBlcyB9KTtcblxuICAgIH1cblxuXG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLmdldCh0aGlzLmVuZHBvaW50LCB7IGZpbHRlckdyb3VwcyB9KTtcbiAgfVxuXG59XG4iXX0=