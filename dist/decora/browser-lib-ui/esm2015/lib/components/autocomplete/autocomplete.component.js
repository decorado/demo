/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, tap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop = () => {
};
const ɵ0 = noop;
//  Used to extend ngForms functions
export const /** @type {?} */ AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteComponent),
    multi: true
};
export class DecAutocompleteComponent {
    /**
     * @param {?} formBuilder
     * @param {?} service
     */
    constructor(formBuilder, service) {
        this.formBuilder = formBuilder;
        this.service = service;
        this.name = 'autocompleteInput';
        this.placeholder = '';
        // Events
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.innerOptions = [];
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.extractLabel = (item) => {
            let /** @type {?} */ label = item; // use the object itself if no label function or attribute is provided
            if (item) {
                if (this.labelFn) {
                    // Use custom label function if provided
                    label = this.labelFn(item);
                }
                else if (this.labelAttr) {
                    // Use object label attribute if provided
                    label = item[this.labelAttr] || undefined;
                }
            }
            label = this.ensureString(label);
            return label;
        };
        this.extractValue = (item) => {
            let /** @type {?} */ value = item; // use the object itself if no value function or attribute is provided
            if (item) {
                if (this.valueFn) {
                    // Use custom value function if provided
                    value = this.valueFn(item);
                }
                else if (this.valueAttr) {
                    // Use object value attribute if provided
                    value = item[this.valueAttr] || undefined;
                }
            }
            return value;
        };
        this.createInput();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set disabled(v) {
        this._disabled = v;
        if (this.autocompleteInput) {
            if (v) {
                this.autocompleteInput.disable();
            }
            else {
                this.autocompleteInput.enable();
            }
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set options(v) {
        this._options = v;
        this.innerOptions = v;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.detectRequiredData()
            .then(res => {
            this.subscribeToSearchAndSetOptionsObservable();
        });
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.setInnerValue(v);
            this.onChangeCallback(v);
        }
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
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
            this.loadRemoteObjectByWrittenValue(value)
                .then((options) => {
                this.setInnerValue(value);
            });
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onOptionSelected($event) {
        const /** @type {?} */ selectedOption = $event.option.value;
        const /** @type {?} */ selectedOptionValue = this.extractValue(selectedOption);
        if (selectedOptionValue !== this.value) {
            this.value = selectedOptionValue;
            this.optionSelected.emit({
                value: this.value,
                option: selectedOption,
                options: this.innerOptions,
            });
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onEnterButton($event) {
        this.enterButton.emit($event);
    }
    /**
     * @return {?}
     */
    setFocus() {
        this.termInput.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    openPanel() {
        this.autocompleteTrigger.openPanel();
    }
    /**
     * @return {?}
     */
    closePanel() {
        this.autocompleteTrigger.closePanel();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
    /**
     * @param {?=} reopen
     * @return {?}
     */
    clear(reopen = false) {
        this.value = undefined;
        this.autocompleteInput.setValue('');
        if (this.writtenValue === this.value) {
            this.resetInputControl();
        }
        if (reopen) {
            setTimeout(() => {
                this.openPanel();
            }, 1);
        }
    }
    /**
     * @return {?}
     */
    reset() {
        this.value = this.writtenValue;
        this.setInnerValue(this.writtenValue);
        this.resetInputControl();
    }
    /**
     * @param {?} writtenValue
     * @return {?}
     */
    loadRemoteObjectByWrittenValue(writtenValue) {
        return new Promise((resolve, reject) => {
            if (writtenValue) {
                this.searchBasedFetchingType(writtenValue)
                    .subscribe((res) => {
                    resolve(writtenValue);
                });
            }
            else {
                resolve(writtenValue);
            }
        });
    }
    /**
     * @return {?}
     */
    detectRequiredData() {
        return new Promise((resolve, reject) => {
            let /** @type {?} */ error;
            if (!this.endpoint && !this.options && !this.customFetchFunction) {
                error = 'No endpoint | options | customFetchFunction set. You must provide one of them to be able to use the Autocomplete';
            }
            if (error) {
                this.raiseError(error);
                reject(error);
            }
            else {
                resolve();
            }
        });
    }
    /**
     * @return {?}
     */
    resetInputControl() {
        this.autocompleteInput.markAsPristine();
        this.autocompleteInput.markAsUntouched();
    }
    /**
     * @param {?} v1
     * @param {?} v2
     * @return {?}
     */
    compareAsString(v1, v2) {
        const /** @type {?} */ string1 = this.ensureString(v1);
        const /** @type {?} */ string2 = this.ensureString(v2);
        return string1 === string2;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    ensureString(v) {
        if (typeof v !== 'string') {
            if (isNaN(v)) {
                v = JSON.stringify(v);
            }
            else {
                v = `${v}`;
            }
        }
        return v;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setInnerValue(v) {
        this.innerValue = v;
        this.setInputValueBasedOnInnerValue(v);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setInputValueBasedOnInnerValue(v) {
        const /** @type {?} */ option = this.getOptionBasedOnValue(v);
        this.autocompleteInput.setValue(option);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    getOptionBasedOnValue(v) {
        return this.innerOptions.find(item => {
            const /** @type {?} */ itemValue = this.extractValue(item);
            return this.compareAsString(itemValue, v);
        });
    }
    /**
     * @return {?}
     */
    createInput() {
        this.autocompleteInput = this.formBuilder.control('');
        if (this.disabled) {
            this.autocompleteInput.disable();
        }
    }
    /**
     * @return {?}
     */
    subscribeToSearchAndSetOptionsObservable() {
        this.options$ = this.autocompleteInput.valueChanges
            .pipe(startWith(''), debounceTime(300), distinctUntilChanged(), switchMap((textSearch) => {
            const /** @type {?} */ isStringTerm = typeof textSearch === 'string';
            if (isStringTerm) {
                return this.searchBasedFetchingType(textSearch);
            }
            else {
                return of(this.innerOptions);
            }
        }));
    }
    /**
     * @param {?} textSearch
     * @return {?}
     */
    searchBasedFetchingType(textSearch) {
        if (this.options) {
            return this.searchInLocalOptions(textSearch);
        }
        else if (this.customFetchFunction) {
            return this.customFetchFunction(textSearch)
                .pipe(tap(options => {
                this.innerOptions = options;
            }));
        }
        else {
            const /** @type {?} */ body = textSearch ? { textSearch } : undefined;
            return this.service.get(this.endpoint, body)
                .pipe(tap((options) => {
                this.innerOptions = options;
            }));
        }
    }
    /**
     * @param {?} term
     * @return {?}
     */
    searchInLocalOptions(term) {
        const /** @type {?} */ termString = `${term}`;
        let /** @type {?} */ filteredData = this.innerOptions;
        if (termString) {
            filteredData = this.innerOptions
                .filter(item => {
                const /** @type {?} */ label = this.extractLabel(item);
                const /** @type {?} */ lowerCaseLabel = label.toLowerCase();
                const /** @type {?} */ lowerCaseTerm = termString.toLowerCase();
                return lowerCaseLabel.search(lowerCaseTerm) >= 0;
            });
        }
        return of(filteredData);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    raiseError(error) {
        throw new Error(`DecAutocompleteComponent Error:: The autocomplete with name "${this.name}" had the follow problem: ${error}`);
    }
}
DecAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete',
                template: `<div>
  <mat-form-field>
    <input matInput
    [attr.aria-label]="name"
    #termInput
    [matAutocomplete]="autocomplete"
    [formControl]="autocompleteInput"
    [name]="name"
    [required]="required"
    [placeholder]="placeholder"
    (keyup.enter)="onEnterButton($event)"
    (blur)="onBlur($event)"
    autocomplete="off"
    readonly
    onfocus="this.removeAttribute('readonly');">

    <button mat-icon-button matSuffix (click)="clear(true)" *ngIf="!disabled && !required && autocompleteInput.value">
      <mat-icon>close</mat-icon>
    </button>

    <button mat-icon-button matSuffix (click)="reset()" *ngIf="!disabled && value !== writtenValue">
      <mat-icon>replay</mat-icon>
    </button>

  </mat-form-field>

  <mat-autocomplete #autocomplete="matAutocomplete"
  [displayWith]="extractLabel"
  (optionSelected)="onOptionSelected($event)"
  name="autocompleteValue">
    <mat-option *ngIf="!required" [value]=""></mat-option>

    <mat-option *ngFor="let item of (options$ | async)" [value]="item">
      {{ extractLabel(item) }}
    </mat-option>
  </mat-autocomplete>
</div>

`,
                styles: [],
                providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: DecApiService }
];
DecAutocompleteComponent.propDecorators = {
    autocompleteTrigger: [{ type: ViewChild, args: [MatAutocompleteTrigger,] }],
    customFetchFunction: [{ type: Input }],
    endpoint: [{ type: Input }],
    disabled: [{ type: Input }],
    labelFn: [{ type: Input }],
    labelAttr: [{ type: Input }],
    name: [{ type: Input }],
    options: [{ type: Input }],
    placeholder: [{ type: Input }],
    required: [{ type: Input }],
    valueFn: [{ type: Input }],
    valueAttr: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }],
    enterButton: [{ type: Output }],
    termInput: [{ type: ViewChild, args: ['termInput',] }]
};
function DecAutocompleteComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecAutocompleteComponent.prototype.autocompleteTrigger;
    /** @type {?} */
    DecAutocompleteComponent.prototype.autocompleteInput;
    /** @type {?} */
    DecAutocompleteComponent.prototype.options$;
    /** @type {?} */
    DecAutocompleteComponent.prototype.writtenValue;
    /** @type {?} */
    DecAutocompleteComponent.prototype.customFetchFunction;
    /** @type {?} */
    DecAutocompleteComponent.prototype.endpoint;
    /** @type {?} */
    DecAutocompleteComponent.prototype.labelFn;
    /** @type {?} */
    DecAutocompleteComponent.prototype.labelAttr;
    /** @type {?} */
    DecAutocompleteComponent.prototype.name;
    /** @type {?} */
    DecAutocompleteComponent.prototype.placeholder;
    /** @type {?} */
    DecAutocompleteComponent.prototype.required;
    /** @type {?} */
    DecAutocompleteComponent.prototype.valueFn;
    /** @type {?} */
    DecAutocompleteComponent.prototype.valueAttr;
    /** @type {?} */
    DecAutocompleteComponent.prototype.blur;
    /** @type {?} */
    DecAutocompleteComponent.prototype.optionSelected;
    /** @type {?} */
    DecAutocompleteComponent.prototype.enterButton;
    /** @type {?} */
    DecAutocompleteComponent.prototype.termInput;
    /** @type {?} */
    DecAutocompleteComponent.prototype._disabled;
    /** @type {?} */
    DecAutocompleteComponent.prototype._options;
    /** @type {?} */
    DecAutocompleteComponent.prototype.innerOptions;
    /** @type {?} */
    DecAutocompleteComponent.prototype.innerValue;
    /** @type {?} */
    DecAutocompleteComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecAutocompleteComponent.prototype.onChangeCallback;
    /** @type {?} */
    DecAutocompleteComponent.prototype.extractLabel;
    /** @type {?} */
    DecAutocompleteComponent.prototype.extractValue;
    /** @type {?} */
    DecAutocompleteComponent.prototype.formBuilder;
    /** @type {?} */
    DecAutocompleteComponent.prototype.service;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsV0FBVyxFQUFlLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ25HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFHM0QsdUJBQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtDQUNqQixDQUFDOzs7QUFHRixNQUFNLENBQUMsdUJBQU0sbUNBQW1DLEdBQVE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHdCQUF3QixDQUFDO0lBQ3ZELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQThDRixNQUFNOzs7OztJQWtGSixZQUNVLGFBQ0E7UUFEQSxnQkFBVyxHQUFYLFdBQVc7UUFDWCxZQUFPLEdBQVAsT0FBTztvQkFsREQsbUJBQW1COzJCQVdaLEVBQUU7O29CQVNXLElBQUksWUFBWSxFQUFPOzhCQUVGLElBQUksWUFBWSxFQUFrQjsyQkFFckMsSUFBSSxZQUFZLEVBQWtCOzRC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QztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0NYO2dCQUNDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2FBQ2pEOzs7O1lBN0RRLFdBQVc7WUFDWCxhQUFhOzs7a0NBK0RuQixTQUFTLFNBQUMsc0JBQXNCO2tDQVNoQyxLQUFLO3VCQUVMLEtBQUs7dUJBRUwsS0FBSztzQkFlTCxLQUFLO3dCQUVMLEtBQUs7bUJBRUwsS0FBSztzQkFFTCxLQUFLOzBCQVNMLEtBQUs7dUJBRUwsS0FBSztzQkFFTCxLQUFLO3dCQUVMLEtBQUs7bUJBR0wsTUFBTTs2QkFFTixNQUFNOzBCQUVOLE1BQU07d0JBR04sU0FBUyxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIElucHV0LCBmb3J3YXJkUmVmLCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcCwgc3RhcnRXaXRoLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYWJlbEZ1bmN0aW9uLCBWYWx1ZUZ1bmN0aW9uLCBTZWxlY3Rpb25FdmVudCwgQ3VzdG9tRmV0Y2hGdW5jdGlvbiB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLm1vZGVscyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgI3Rlcm1JbnB1dFxuICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlSW5wdXRcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwib25FbnRlckJ1dHRvbigkZXZlbnQpXCJcbiAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICByZWFkb25seVxuICAgIG9uZm9jdXM9XCJ0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcIj5cblxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY2xlYXIodHJ1ZSlcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiAhcmVxdWlyZWQgJiYgYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVcIj5cbiAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG5cbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cInJlc2V0KClcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiB2YWx1ZSAhPT0gd3JpdHRlblZhbHVlXCI+XG4gICAgICA8bWF0LWljb24+cmVwbGF5PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvY29tcGxldGU9XCJtYXRBdXRvY29tcGxldGVcIlxuICBbZGlzcGxheVdpdGhdPVwiZXh0cmFjdExhYmVsXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiXG4gIG5hbWU9XCJhdXRvY29tcGxldGVWYWx1ZVwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwiIXJlcXVpcmVkXCIgW3ZhbHVlXT1cIlwiPjwvbWF0LW9wdGlvbj5cblxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIChvcHRpb25zJCB8IGFzeW5jKVwiIFt2YWx1ZV09XCJpdGVtXCI+XG4gICAgICB7eyBleHRyYWN0TGFiZWwoaXRlbSkgfX1cbiAgICA8L21hdC1vcHRpb24+XG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQge1xuXG4gIEBWaWV3Q2hpbGQoTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcikgIGF1dG9jb21wbGV0ZVRyaWdnZXI6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXI7XG5cbiAgYXV0b2NvbXBsZXRlSW5wdXQ6IEZvcm1Db250cm9sO1xuXG4gIG9wdGlvbnMkOiBPYnNlcnZhYmxlPGFueVtdPjtcblxuICB3cml0dGVuVmFsdWU6IGFueTtcblxuICAvLyBQYXJhbXNcbiAgQElucHV0KCkgY3VzdG9tRmV0Y2hGdW5jdGlvbjogQ3VzdG9tRmV0Y2hGdW5jdGlvbjtcblxuICBASW5wdXQoKSBlbmRwb2ludDtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdjtcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGVJbnB1dCkge1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5kaXNhYmxlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgQElucHV0KCkgbGFiZWxGbjogTGFiZWxGdW5jdGlvbjtcblxuICBASW5wdXQoKSBsYWJlbEF0dHI6IHN0cmluZztcblxuICBASW5wdXQoKSBuYW1lID0gJ2F1dG9jb21wbGV0ZUlucHV0JztcblxuICBASW5wdXQoKVxuICBzZXQgb3B0aW9ucyh2OiBhbnlbXSkge1xuICAgIHRoaXMuX29wdGlvbnMgPSB2O1xuICAgIHRoaXMuaW5uZXJPcHRpb25zID0gdjtcbiAgfVxuICBnZXQgb3B0aW9ucygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHZhbHVlRm46IFZhbHVlRnVuY3Rpb247XG5cbiAgQElucHV0KCkgdmFsdWVBdHRyOiBzdHJpbmc7XG5cbiAgLy8gRXZlbnRzXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+KCk7XG5cbiAgQE91dHB1dCgpIGVudGVyQnV0dG9uOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcblxuICAvLyBWaWV3IGVsZW1lbnRzXG4gIEBWaWV3Q2hpbGQoJ3Rlcm1JbnB1dCcpIHRlcm1JbnB1dDtcblxuICAvLyBwcml2YXRlIGRhdGE7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX29wdGlvbnM6IGFueVtdO1xuXG4gIHByaXZhdGUgaW5uZXJPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNyZWF0ZUlucHV0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kZXRlY3RSZXF1aXJlZERhdGEoKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiBgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgdGhpcy5sb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUodmFsdWUpXG4gICAgICAudGhlbigob3B0aW9ucykgPT4ge1xuICAgICAgICB0aGlzLnNldElubmVyVmFsdWUodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25PcHRpb25TZWxlY3RlZCgkZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9ICRldmVudC5vcHRpb24udmFsdWU7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKHNlbGVjdGVkT3B0aW9uKTtcbiAgICBpZiAoc2VsZWN0ZWRPcHRpb25WYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkT3B0aW9uVmFsdWU7XG4gICAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQoe1xuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgb3B0aW9uOiBzZWxlY3RlZE9wdGlvbixcbiAgICAgICAgb3B0aW9uczogdGhpcy5pbm5lck9wdGlvbnMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkVudGVyQnV0dG9uKCRldmVudCkge1xuICAgIHRoaXMuZW50ZXJCdXR0b24uZW1pdCgkZXZlbnQpO1xuICB9XG5cbiAgc2V0Rm9jdXMoKSB7XG4gICAgdGhpcy50ZXJtSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgb3BlblBhbmVsKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVHJpZ2dlci5vcGVuUGFuZWwoKTtcbiAgfVxuXG4gIGNsb3NlUGFuZWwoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVUcmlnZ2VyLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIG9uQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBjbGVhcihyZW9wZW4gPSBmYWxzZSkge1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5zZXRWYWx1ZSgnJyk7XG4gICAgaWYgKHRoaXMud3JpdHRlblZhbHVlID09PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gICAgfVxuICAgIGlmIChyZW9wZW4pIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgfSwgMSk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMud3JpdHRlblZhbHVlO1xuICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh0aGlzLndyaXR0ZW5WYWx1ZSk7XG4gICAgdGhpcy5yZXNldElucHV0Q29udHJvbCgpO1xuICB9XG5cbiAgZXh0cmFjdExhYmVsOiBMYWJlbEZ1bmN0aW9uID0gKGl0ZW06IGFueSk6IHN0cmluZyA9PiB7XG4gICAgbGV0IGxhYmVsID0gaXRlbTsgLy8gdXNlIHRoZSBvYmplY3QgaXRzZWxmIGlmIG5vIGxhYmVsIGZ1bmN0aW9uIG9yIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAodGhpcy5sYWJlbEZuKSB7IC8vIFVzZSBjdXN0b20gbGFiZWwgZnVuY3Rpb24gaWYgcHJvdmlkZWRcbiAgICAgICAgbGFiZWwgPSB0aGlzLmxhYmVsRm4oaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubGFiZWxBdHRyKSB7IC8vIFVzZSBvYmplY3QgbGFiZWwgYXR0cmlidXRlIGlmIHByb3ZpZGVkXG4gICAgICAgIGxhYmVsID0gaXRlbVt0aGlzLmxhYmVsQXR0cl0gfHwgdW5kZWZpbmVkO1xuXG4gICAgICB9XG4gICAgfVxuICAgIGxhYmVsID0gdGhpcy5lbnN1cmVTdHJpbmcobGFiZWwpO1xuICAgIHJldHVybiBsYWJlbDtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKHdyaXR0ZW5WYWx1ZTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAod3JpdHRlblZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUod3JpdHRlblZhbHVlKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHdyaXR0ZW5WYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh3cml0dGVuVmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RSZXF1aXJlZERhdGEoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGVycm9yOiBzdHJpbmc7XG4gICAgICBpZiAoIXRoaXMuZW5kcG9pbnQgJiYgIXRoaXMub3B0aW9ucyAmJiAhdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG4gICAgICAgIGVycm9yID0gJ05vIGVuZHBvaW50IHwgb3B0aW9ucyB8IGN1c3RvbUZldGNoRnVuY3Rpb24gc2V0LiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvZiB0aGVtIHRvIGJlIGFibGUgdG8gdXNlIHRoZSBBdXRvY29tcGxldGUnO1xuICAgICAgfVxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMucmFpc2VFcnJvcihlcnJvcik7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0SW5wdXRDb250cm9sKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzUHJpc3RpbmUoKTtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm1hcmtBc1VudG91Y2hlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0VmFsdWU6IFZhbHVlRnVuY3Rpb24gPSAoaXRlbTogYW55KTogYW55ID0+IHtcbiAgICBsZXQgdmFsdWUgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gdmFsdWUgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlRm4pIHsgLy8gVXNlIGN1c3RvbSB2YWx1ZSBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZUF0dHIpIHsgLy8gVXNlIG9iamVjdCB2YWx1ZSBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgdmFsdWUgPSBpdGVtW3RoaXMudmFsdWVBdHRyXSB8fCB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcGFyZUFzU3RyaW5nKHYxLCB2Mikge1xuICAgIGNvbnN0IHN0cmluZzEgPSB0aGlzLmVuc3VyZVN0cmluZyh2MSk7XG4gICAgY29uc3Qgc3RyaW5nMiA9IHRoaXMuZW5zdXJlU3RyaW5nKHYyKTtcbiAgICByZXR1cm4gc3RyaW5nMSA9PT0gc3RyaW5nMjtcbiAgfVxuXG4gIHByaXZhdGUgZW5zdXJlU3RyaW5nKHYpIHtcbiAgICBpZiAodHlwZW9mIHYgIT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoaXNOYU4odikpIHtcbiAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdiA9IGAke3Z9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVmFsdWUodjogYW55KSB7XG4gICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICB0aGlzLnNldElucHV0VmFsdWVCYXNlZE9uSW5uZXJWYWx1ZSh2KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHY6IGFueSkge1xuICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHYpO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuc2V0VmFsdWUob3B0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHY6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5maW5kKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgaXRlbVZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoaXRlbSk7XG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXNTdHJpbmcoaXRlbVZhbHVlLCB2KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW5wdXQoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dCA9IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCgnJyk7XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1NlYXJjaEFuZFNldE9wdGlvbnNPYnNlcnZhYmxlKCkge1xuICAgIHRoaXMub3B0aW9ucyQgPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnZhbHVlQ2hhbmdlc1xuICAgIC5waXBlKFxuICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHN3aXRjaE1hcCgodGV4dFNlYXJjaDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzU3RyaW5nVGVybSA9IHR5cGVvZiB0ZXh0U2VhcmNoID09PSAnc3RyaW5nJztcbiAgICAgICAgaWYgKGlzU3RyaW5nVGVybSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHRleHRTZWFyY2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZih0aGlzLmlubmVyT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUodGV4dFNlYXJjaCk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWFyY2hJbkxvY2FsT3B0aW9ucyh0ZXh0U2VhcmNoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbih0ZXh0U2VhcmNoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAob3B0aW9ucyA9PiB7XG4gICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYm9keSA9IHRleHRTZWFyY2ggPyB7IHRleHRTZWFyY2ggfSA6IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0PGFueVtdPih0aGlzLmVuZHBvaW50LCBib2R5KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKG9wdGlvbnM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEluTG9jYWxPcHRpb25zKHRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHRlcm1TdHJpbmcgPSBgJHt0ZXJtfWA7XG5cbiAgICBsZXQgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnM7XG5cbiAgICBpZiAodGVybVN0cmluZykge1xuICAgICAgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnNcbiAgICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSB0aGlzLmV4dHJhY3RMYWJlbChpdGVtKTtcbiAgICAgICAgY29uc3QgbG93ZXJDYXNlTGFiZWwgPSBsYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBsb3dlckNhc2VUZXJtID0gdGVybVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbG93ZXJDYXNlTGFiZWwuc2VhcmNoKGxvd2VyQ2FzZVRlcm0pID49IDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YoZmlsdGVyZWREYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgcmFpc2VFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgRXJyb3I6OiBUaGUgYXV0b2NvbXBsZXRlIHdpdGggbmFtZSBcIiR7dGhpcy5uYW1lfVwiIGhhZCB0aGUgZm9sbG93IHByb2JsZW06ICR7ZXJyb3J9YCk7XG4gIH1cblxufVxuIl19