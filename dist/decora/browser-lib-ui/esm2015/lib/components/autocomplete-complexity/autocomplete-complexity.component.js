/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop = () => {
};
const ɵ0 = noop;
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComplexityComponent),
    multi: true
};
const /** @type {?} */ BASIC_ENDPOINT = 'jobs/complexities/options';
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
            this.setTypeParams();
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
    setTypeParams() {
        const /** @type {?} */ params = [];
        let /** @type {?} */ endpoint = `${BASIC_ENDPOINT}`;
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
function AutocompleteComplexityComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWNvbXBsZXhpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wbGV4aXR5L2F1dG9jb21wbGV0ZS1jb21wbGV4aXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHekUsdUJBQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtDQUNqQixDQUFDOzs7QUFHRix1QkFBTSx5Q0FBeUMsR0FBUTtJQUNyRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsK0JBQStCLENBQUM7SUFDOUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsdUJBQU0sY0FBYyxHQUFHLDJCQUEyQixDQUFDO0FBc0JuRCxNQUFNO0lBbURKO3dCQWpEVywyQkFBMkI7eUJBRTFCLEtBQUs7eUJBRUwsT0FBTztvQkFvQkgseUJBQXlCOzJCQU1sQix5QkFBeUI7b0JBRVosSUFBSSxZQUFZLEVBQU87OEJBRWIsSUFBSSxZQUFZLEVBQU87MkJBRTFCLElBQUksWUFBWSxFQUFPOzBCQU94QyxFQUFFO2lDQUVZLElBQUk7Z0NBRUMsSUFBSTtLQUVoQzs7Ozs7SUEzQ2pCLElBQ0ksSUFBSSxDQUFDLENBQUM7UUFDUixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7S0FDRjs7OztJQUVELElBQUksSUFBSTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7O0lBd0NELElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7OztJQUdELElBQUksS0FBSyxDQUFDLENBQU07UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0tBQ0Y7Ozs7O0lBRUQsT0FBTyxDQUFDLFVBQVU7UUFDaEIsTUFBTSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDakQ7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUdELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDcEI7S0FDRjs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxNQUFNO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7OztJQUVELGFBQWE7UUFDWCx1QkFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLHFCQUFJLFFBQVEsR0FBRyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVqQyxRQUFRLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDMUI7OztZQWhJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztDQWNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDWixTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQzthQUN2RDs7Ozs7bUJBU0UsS0FBSzt1QkFjTCxLQUFLO3VCQUVMLEtBQUs7bUJBRUwsS0FBSztvQkFFTCxLQUFLO3FCQUVMLEtBQUs7MEJBRUwsS0FBSzttQkFFTCxNQUFNOzZCQUVOLE1BQU07MEJBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBdXRvY29tcGxldGVDb21wbGV4aXR5Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbmNvbnN0IEJBU0lDX0VORFBPSU5UID0gJ2pvYnMvY29tcGxleGl0aWVzL29wdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWNvbXBsZXhpdHknLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltlbmRwb2ludF09XCJlbmRwb2ludFwiXG5bbmFtZV09XCJuYW1lXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbihlbnRlckJ1dHRvbik9XCJlbnRlckJ1dHRvbi5lbWl0KCRldmVudClcIlxuW211bHRpXT1cIm11bHRpXCJcbltyZXBlYXRdPVwicmVwZWF0XCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVDb21wbGV4aXR5Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50ID0gJ2pvYnMvY29tcGxleGl0aWVzL29wdGlvbnMnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgQElucHV0KClcbiAgc2V0IHR5cGUodikge1xuICAgIGlmICh2ICE9PSB0aGlzLl90eXBlKSB7XG4gICAgICB0aGlzLl90eXBlID0gdjtcbiAgICAgIHRoaXMuc2V0VHlwZVBhcmFtcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnQ29tcGxleGl0eSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdDb21wbGV4aXR5IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4oY29tcGxleGl0eSkge1xuICAgIHJldHVybiBgJHtjb21wbGV4aXR5LnZhbHVlfSAjJHtjb21wbGV4aXR5LmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHNldFR5cGVQYXJhbXMoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgbGV0IGVuZHBvaW50ID0gYCR7QkFTSUNfRU5EUE9JTlR9YDtcblxuICAgIHBhcmFtcy5wdXNoKGB0eXBlPSR7dGhpcy50eXBlfWApO1xuXG4gICAgZW5kcG9pbnQgKz0gYD8ke3BhcmFtcy5qb2luKCcmJyl9YDtcblxuICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgfVxufVxuIl19