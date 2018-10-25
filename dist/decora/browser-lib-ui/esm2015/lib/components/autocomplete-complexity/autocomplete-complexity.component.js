/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
const noop = () => {
};
const ɵ0 = noop;
/** @type {?} */
const AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComplexityComponent),
    multi: true
};
/** @type {?} */
const BASIC_ENDPOINT = 'jobs/complexities/options';
export class AutocompleteComplexityComponent {
    constructor() {
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
    /**
     * @param {?} v
     * @return {?}
     */
    set type(v) {
        if (v !== this._type) {
            this._type = v;
            this.value = undefined;
            this.endpoint = undefined; // enforce autocomplete reload
            setTimeout(() => {
                // ensures a digest cicle before reseting the endpoint
                this.setEndpointBasedOnInputs();
            });
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
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
     * @param {?} complexity
     * @return {?}
     */
    labelFn(complexity) {
        return `${complexity.value} #${complexity.key}`;
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
     * @return {?}
     */
    setEndpointBasedOnInputs() {
        /** @type {?} */
        const params = [];
        /** @type {?} */
        let endpoint = `${BASIC_ENDPOINT}`;
        params.push(`type=${this.type}`);
        endpoint += `?${params.join('&')}`;
        this.endpoint = endpoint;
    }
}
AutocompleteComplexityComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-complexity',
                template: `<dec-autocomplete
[disabled]="disabled"
[required]="required"
[endpoint]="endpoint"
[name]="name"
[placeholder]="placeholder"
(optionSelected)="optionSelected.emit($event)"
(enterButton)="enterButton.emit($event)"
[multi]="multi"
[repeat]="repeat"
[(ngModel)]="value"
[labelAttr]="labelAttr"
[valueAttr]="valueAttr"
(blur)="blur.emit($event)"></dec-autocomplete>
`,
                styles: [``],
                providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
AutocompleteComplexityComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWNvbXBsZXhpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wbGV4aXR5L2F1dG9jb21wbGV0ZS1jb21wbGV4aXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHekUsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0NBQ2pCLENBQUM7OztBQUdGLE1BQU0seUNBQXlDLEdBQVE7SUFDckQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLCtCQUErQixDQUFDO0lBQzlELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7QUFFRixNQUFNLGNBQWMsR0FBRywyQkFBMkIsQ0FBQztBQXNCbkQsTUFBTTtJQXVESjt3QkFyRFcsMkJBQTJCO3lCQUUxQixLQUFLO3lCQUVMLE9BQU87b0JBd0JILHlCQUF5QjsyQkFNbEIseUJBQXlCO29CQUVaLElBQUksWUFBWSxFQUFPOzhCQUViLElBQUksWUFBWSxFQUFPOzJCQUUxQixJQUFJLFlBQVksRUFBTzswQkFPeEMsRUFBRTtpQ0FFWSxJQUFJO2dDQUVDLElBQUk7S0FFaEM7Ozs7O0lBL0NqQixJQUNJLElBQUksQ0FBQyxDQUFDO1FBQ1IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7WUFDMUIsVUFBVSxDQUFDLEdBQUcsRUFBRTs7Z0JBQ2QsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7YUFDakMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7OztJQUVELElBQUksSUFBSTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7O0lBd0NELElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7OztJQUdELElBQUksS0FBSyxDQUFDLENBQU07UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0tBQ0Y7Ozs7O0lBRUQsT0FBTyxDQUFDLFVBQVU7UUFDaEIsTUFBTSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDakQ7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUdELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDcEI7S0FDRjs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxNQUFNO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7OztJQUVELHdCQUF3Qjs7UUFDdEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDOztRQUNsQixJQUFJLFFBQVEsR0FBRyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVqQyxRQUFRLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDMUI7OztZQXBJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztDQWNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDWixTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQzthQUN2RDs7Ozs7bUJBU0UsS0FBSzt1QkFrQkwsS0FBSzt1QkFFTCxLQUFLO21CQUVMLEtBQUs7b0JBRUwsS0FBSztxQkFFTCxLQUFLOzBCQUVMLEtBQUs7bUJBRUwsTUFBTTs2QkFFTixNQUFNOzBCQUVOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5jb25zdCBBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXV0b2NvbXBsZXRlQ29tcGxleGl0eUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5jb25zdCBCQVNJQ19FTkRQT0lOVCA9ICdqb2JzL2NvbXBsZXhpdGllcy9vcHRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1jb21wbGV4aXR5JyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4oZW50ZXJCdXR0b24pPVwiZW50ZXJCdXR0b24uZW1pdCgkZXZlbnQpXCJcblttdWx0aV09XCJtdWx0aVwiXG5bcmVwZWF0XT1cInJlcGVhdFwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlQ29tcGxleGl0eUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludCA9ICdqb2JzL2NvbXBsZXhpdGllcy9vcHRpb25zJztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB0eXBlKHYpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdHlwZSkge1xuICAgICAgdGhpcy5fdHlwZSA9IHY7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5lbmRwb2ludCA9IHVuZGVmaW5lZDsgLy8gZW5mb3JjZSBhdXRvY29tcGxldGUgcmVsb2FkXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gZW5zdXJlcyBhIGRpZ2VzdCBjaWNsZSBiZWZvcmUgcmVzZXRpbmcgdGhlIGVuZHBvaW50XG4gICAgICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uSW5wdXRzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIHByaXZhdGUgX3R5cGU6IHN0cmluZztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0NvbXBsZXhpdHkgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBtdWx0aTogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXBlYXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnQ29tcGxleGl0eSBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgZW50ZXJCdXR0b246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICBsYWJlbEZuKGNvbXBsZXhpdHkpIHtcbiAgICByZXR1cm4gYCR7Y29tcGxleGl0eS52YWx1ZX0gIyR7Y29tcGxleGl0eS5rZXl9YDtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgbGV0IGVuZHBvaW50ID0gYCR7QkFTSUNfRU5EUE9JTlR9YDtcblxuICAgIHBhcmFtcy5wdXNoKGB0eXBlPSR7dGhpcy50eXBlfWApO1xuXG4gICAgZW5kcG9pbnQgKz0gYD8ke3BhcmFtcy5qb2luKCcmJyl9YDtcblxuICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgfVxufVxuIl19