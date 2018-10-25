/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
const noop = () => { };
const ɵ0 = noop;
/** @type {?} */
const DATE_PICKER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecDatePickerComponent),
    multi: true
};
export class DecDatePickerComponent {
    constructor() {
        this.placeholder = 'Date';
        this.mode = 'date';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dateValue(v) {
        if (this.innerDateValue !== v) {
            this.innerDateValue = v;
            this.innerValue = this.mode === 'date' ? v : v.getTime();
            this.onChangeCallback(this.innerValue);
        }
    }
    /**
     * @return {?}
     */
    get dateValue() {
        return this.innerDateValue;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.detectModeBasedOnInputType(value);
        this.innerValue = value;
        this.innerDateValue = new Date(/** @type {?} */ (value)); // value as any avoids type compilation error
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
    onInputBlur(event) {
        this.onTouchedCallback();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    detectModeBasedOnInputType(value) {
        if (value) {
            /** @type {?} */
            const isTimestamp = /^\d+$/.test(value);
            if (isTimestamp) {
                this.mode = 'timestamp';
            }
            else {
                this.mode = 'date';
            }
        }
    }
}
DecDatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-date-picker',
                template: `<mat-form-field>
  <input matInput
  #dueDateInput
  [matDatepicker]="decPicker"
  [placeholder]="placeholder"
  [(ngModel)]="dateValue"
  (blur)="onInputBlur($event)"
  (focus)="dueDateInput.blur(); decPicker.open();">
  <mat-datepicker-toggle matSuffix [for]="decPicker"></mat-datepicker-toggle>
  <mat-datepicker #decPicker></mat-datepicker>
</mat-form-field>
`,
                styles: [``],
                providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecDatePickerComponent.ctorParameters = () => [];
DecDatePickerComponent.propDecorators = {
    placeholder: [{ type: Input }],
    mode: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecDatePickerComponent.prototype.placeholder;
    /** @type {?} */
    DecDatePickerComponent.prototype.mode;
    /** @type {?} */
    DecDatePickerComponent.prototype.innerDateValue;
    /** @type {?} */
    DecDatePickerComponent.prototype.innerValue;
    /** @type {?} */
    DecDatePickerComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecDatePickerComponent.prototype.onChangeCallback;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRhdGUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtZGF0ZS1waWNrZXIvZGVjLWRhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFekUsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQzs7O0FBRXZCLE1BQU0sa0NBQWtDLEdBQUc7SUFDekMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQW1CRixNQUFNO0lBa0NKOzJCQWhDdUIsTUFBTTtvQkFFUyxNQUFNO2lDQTBCSixJQUFJO2dDQUVDLElBQUk7S0FFaEM7Ozs7O0lBNUJqQixJQUFJLFNBQVMsQ0FBQyxDQUFPO1FBRW5CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUV4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBRXhDO0tBRUY7Ozs7SUFFRCxJQUFJLFNBQVM7UUFFWCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztLQUU1Qjs7Ozs7SUFZRCxVQUFVLENBQUMsS0FBb0I7UUFFN0IsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxJQUFJLG1CQUFDLEtBQVksRUFBQyxDQUFDO0tBRTlDOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFFdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztLQUU1Qjs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFPO1FBRXZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7S0FFN0I7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFFZixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUUxQjs7Ozs7SUFFTywwQkFBMEIsQ0FBQyxLQUFLO1FBRXRDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O1lBRVYsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV4QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUVoQixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQzthQUV6QjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVOLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBRXBCO1NBRUY7Ozs7WUFqR0osU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Q0FXWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7YUFDaEQ7Ozs7OzBCQUdFLEtBQUs7bUJBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHsgfTtcblxuY29uc3QgREFURV9QSUNLRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0RhdGVQaWNrZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWRhdGUtcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQ+XG4gIDxpbnB1dCBtYXRJbnB1dFxuICAjZHVlRGF0ZUlucHV0XG4gIFttYXREYXRlcGlja2VyXT1cImRlY1BpY2tlclwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFsobmdNb2RlbCldPVwiZGF0ZVZhbHVlXCJcbiAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gIChmb2N1cyk9XCJkdWVEYXRlSW5wdXQuYmx1cigpOyBkZWNQaWNrZXIub3BlbigpO1wiPlxuICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cImRlY1BpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICA8bWF0LWRhdGVwaWNrZXIgI2RlY1BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbREFURV9QSUNLRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjRGF0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdEYXRlJztcblxuICBASW5wdXQoKSBtb2RlOiAnZGF0ZScgfCAndGltZXN0YW1wJyA9ICdkYXRlJztcblxuICBzZXQgZGF0ZVZhbHVlKHY6IERhdGUpIHtcblxuICAgIGlmICh0aGlzLmlubmVyRGF0ZVZhbHVlICE9PSB2KSB7XG5cbiAgICAgIHRoaXMuaW5uZXJEYXRlVmFsdWUgPSB2O1xuXG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLm1vZGUgPT09ICdkYXRlJyA/IHYgOiB2LmdldFRpbWUoKTtcblxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuaW5uZXJWYWx1ZSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBkYXRlVmFsdWUoKTogRGF0ZSB7XG5cbiAgICByZXR1cm4gdGhpcy5pbm5lckRhdGVWYWx1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBpbm5lckRhdGVWYWx1ZTogRGF0ZTtcblxuICBwcml2YXRlIGlubmVyVmFsdWU6IERhdGUgfCBudW1iZXI7XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IERhdGUgfCBudW1iZXIpOiB2b2lkIHtcblxuICAgIHRoaXMuZGV0ZWN0TW9kZUJhc2VkT25JbnB1dFR5cGUodmFsdWUpO1xuXG4gICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLmlubmVyRGF0ZVZhbHVlID0gbmV3IERhdGUodmFsdWUgYXMgYW55KTsgLy8gdmFsdWUgYXMgYW55IGF2b2lkcyB0eXBlIGNvbXBpbGF0aW9uIGVycm9yXG5cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG5cbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcblxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcblxuICB9XG5cbiAgb25JbnB1dEJsdXIoZXZlbnQpIHtcblxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RNb2RlQmFzZWRPbklucHV0VHlwZSh2YWx1ZSkge1xuXG4gICAgaWYgKHZhbHVlKSB7XG5cbiAgICAgIGNvbnN0IGlzVGltZXN0YW1wID0gL15cXGQrJC8udGVzdCh2YWx1ZSk7XG5cbiAgICAgIGlmIChpc1RpbWVzdGFtcCkge1xuXG4gICAgICAgIHRoaXMubW9kZSA9ICd0aW1lc3RhbXAnO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMubW9kZSA9ICdkYXRlJztcblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxufVxuIl19