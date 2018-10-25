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
const AUTOCOMPLETE_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteTagsComponent),
    multi: true
};
export class DecAutocompleteTagsComponent {
    constructor() {
        this.valueAttr = 'key';
        this.labelAttr = 'value';
        this.name = 'Tags autocomplete';
        this.placeholder = 'Tags autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set endpoint(v) {
        if (v && v !== this._endpoint) {
            this.value = undefined;
            this._endpoint = undefined; // enforce autocomplete reload
            setTimeout(() => {
                // ensures a digest cicle before reseting the endpoint
                this._endpoint = v;
            }, 0);
        }
    }
    /**
     * @return {?}
     */
    get endpoint() {
        return this._endpoint;
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
     * @param {?} tags
     * @return {?}
     */
    labelFn(tags) {
        return `${tags.value} #${tags.key}`;
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
}
DecAutocompleteTagsComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-tags',
                template: `<dec-autocomplete
[disabled]="disabled"
[required]="required"
[endpoint]="endpoint"
[multi]="multi"
[repeat]="repeat"
[name]="name"
[placeholder]="placeholder"
(optionSelected)="optionSelected.emit($event)"
(enterButton)="enterButton.emit($event)"
[(ngModel)]="value"
[labelAttr]="labelAttr"
[valueAttr]="valueAttr"
(blur)="blur.emit($event)"></dec-autocomplete>
`,
                styles: [``],
                providers: [AUTOCOMPLETE_TAGS_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteTagsComponent.ctorParameters = () => [];
DecAutocompleteTagsComponent.propDecorators = {
    endpoint: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    multi: [{ type: Input }],
    repeat: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }],
    enterButton: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.valueAttr;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.labelAttr;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype._endpoint;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.disabled;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.required;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.name;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.placeholder;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.multi;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.repeat;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.blur;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.optionSelected;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.enterButton;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.innerValue;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecAutocompleteTagsComponent.prototype.onChangeCallback;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXRhZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS10YWdzL2F1dG9jb21wbGV0ZS10YWdzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUd6RSxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7Q0FDakIsQ0FBQzs7O0FBR0YsTUFBTSx3Q0FBd0MsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsNEJBQTRCLENBQUM7SUFDM0QsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBc0JGLE1BQU07SUFvREo7eUJBbkNZLEtBQUs7eUJBRUwsT0FBTztvQkFRSCxtQkFBbUI7MkJBRVosbUJBQW1CO29CQU1OLElBQUksWUFBWSxFQUFPOzhCQUViLElBQUksWUFBWSxFQUFPOzJCQUUxQixJQUFJLFlBQVksRUFBTztpQ0FTMUIsSUFBSTtnQ0FFQyxJQUFJO0tBRWpDOzs7OztJQWxEaEIsSUFDSSxRQUFRLENBQUMsQ0FBQztRQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRTs7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO0tBQ0Y7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN2Qjs7OztJQTRDRCxJQUFJLEtBQUs7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN4Qjs7Ozs7SUFHRCxJQUFJLEtBQUssQ0FBQyxDQUFNO1FBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjtLQUNGOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFJO1FBQ1YsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDckM7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUdELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDcEI7S0FDRjs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxNQUFNO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7O1lBdEhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0NBY1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxDQUFDLHdDQUF3QyxDQUFDO2FBQ3REOzs7Ozt1QkFHRSxLQUFLO3VCQXFCTCxLQUFLO3VCQUVMLEtBQUs7bUJBRUwsS0FBSzswQkFFTCxLQUFLO29CQUVMLEtBQUs7cUJBRUwsS0FBSzttQkFFTCxNQUFNOzZCQUVOLE1BQU07MEJBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9UQUdTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZVRhZ3NDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS10YWdzJyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuW211bHRpXT1cIm11bHRpXCJcbltyZXBlYXRdPVwicmVwZWF0XCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuKGVudGVyQnV0dG9uKT1cImVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfVEFHU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpXG4gIHNldCBlbmRwb2ludCh2KSB7XG4gICAgaWYgKHYgJiYgdiAhPT0gdGhpcy5fZW5kcG9pbnQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9lbmRwb2ludCA9IHVuZGVmaW5lZDsgLy8gZW5mb3JjZSBhdXRvY29tcGxldGUgcmVsb2FkXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gZW5zdXJlcyBhIGRpZ2VzdCBjaWNsZSBiZWZvcmUgcmVzZXRpbmcgdGhlIGVuZHBvaW50XG4gICAgICAgIHRoaXMuX2VuZHBvaW50ID0gdjtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBlbmRwb2ludCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZW5kcG9pbnQ7XG4gIH1cblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIF9lbmRwb2ludDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnVGFncyBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1RhZ3MgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBtdWx0aTogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXBlYXQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4odGFncykge1xuICAgIHJldHVybiBgJHt0YWdzLnZhbHVlfSAjJHt0YWdzLmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19