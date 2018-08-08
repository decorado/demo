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
        this.filteredOptions = [];
        this.innerValue = '';
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
            this.subscribeToOptions();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeToOptions();
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
     * @param {?} v
     * @return {?}
     */
    writeValue(v) {
        this.writtenValue = v;
        v = v ? v : undefined; // avoid null values
        const /** @type {?} */ hasDifference = !this.compareAsString(v, this.value);
        if (hasDifference) {
            this.loadRemoteObjectByWrittenValue(v)
                .then((options) => {
                this.setInnerValue(v);
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
                filteredOptions: this.filteredOptions,
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
     * @return {?}
     */
    subscribeToOptions() {
        this.options$Subscription = this.options$.subscribe(options => {
            this.filteredOptions = options;
        });
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
        const /** @type {?} */ label = this.extractLabel(option);
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
        this.autocompleteInput = this.formBuilder.control({ value: undefined, disabled: this.disabled, required: this.required });
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
     * @return {?}
     */
    unsubscribeToOptions() {
        this.options$Subscription.unsubscribe();
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
    (blur)="onBlur($event)">

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
    DecAutocompleteComponent.prototype.options$Subscription;
    /** @type {?} */
    DecAutocompleteComponent.prototype._disabled;
    /** @type {?} */
    DecAutocompleteComponent.prototype._options;
    /** @type {?} */
    DecAutocompleteComponent.prototype.innerOptions;
    /** @type {?} */
    DecAutocompleteComponent.prototype.filteredOptions;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFlLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ25HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQWMsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRzNELHVCQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7Q0FDakIsQ0FBQzs7O0FBR0YsTUFBTSxDQUFDLHVCQUFNLG1DQUFtQyxHQUFRO0lBQ3RELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztJQUN2RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUF5Q0YsTUFBTTs7Ozs7SUFxRkosWUFDVSxhQUNBO1FBREEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsWUFBTyxHQUFQLE9BQU87b0JBckRELG1CQUFtQjsyQkFXWixFQUFFOztvQkFTVyxJQUFJLFlBQVksRUFBTzs4QkFFRixJQUFJLFlBQVksRUFBa0I7MkJBRXJDLElBQUksWUFBWSxFQUFrQjs0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b25lbnQsIEFmdGVyVmlld0luaXQsIElucHV0LCBmb3J3YXJkUmVmLCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAsIHN0YXJ0V2l0aCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGFiZWxGdW5jdGlvbiwgVmFsdWVGdW5jdGlvbiwgU2VsZWN0aW9uRXZlbnQsIEN1c3RvbUZldGNoRnVuY3Rpb24gfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5tb2RlbHMnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlVHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgICN0ZXJtSW5wdXRcbiAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXG4gICAgW2Zvcm1Db250cm9sXT1cImF1dG9jb21wbGV0ZUlucHV0XCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgKGtleXVwLmVudGVyKT1cIm9uRW50ZXJCdXR0b24oJGV2ZW50KVwiXG4gICAgKGJsdXIpPVwib25CbHVyKCRldmVudClcIj5cblxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY2xlYXIodHJ1ZSlcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiAhcmVxdWlyZWQgJiYgYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVcIj5cbiAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG5cbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cInJlc2V0KClcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiB2YWx1ZSAhPT0gd3JpdHRlblZhbHVlXCI+XG4gICAgICA8bWF0LWljb24+cmVwbGF5PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvY29tcGxldGU9XCJtYXRBdXRvY29tcGxldGVcIlxuICBbZGlzcGxheVdpdGhdPVwiZXh0cmFjdExhYmVsXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiXG4gIG5hbWU9XCJhdXRvY29tcGxldGVWYWx1ZVwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIChvcHRpb25zJCB8IGFzeW5jKVwiIFt2YWx1ZV09XCJpdGVtXCI+XG4gICAgICB7eyBleHRyYWN0TGFiZWwoaXRlbSkgfX1cbiAgICA8L21hdC1vcHRpb24+XG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQFZpZXdDaGlsZChNYXRBdXRvY29tcGxldGVUcmlnZ2VyKSAgYXV0b2NvbXBsZXRlVHJpZ2dlcjogTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcjtcblxuICBhdXRvY29tcGxldGVJbnB1dDogRm9ybUNvbnRyb2w7XG5cbiAgb3B0aW9ucyQ6IE9ic2VydmFibGU8YW55W10+O1xuXG4gIHdyaXR0ZW5WYWx1ZTogYW55O1xuXG4gIC8vIFBhcmFtc1xuICBASW5wdXQoKSBjdXN0b21GZXRjaEZ1bmN0aW9uOiBDdXN0b21GZXRjaEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGVuZHBvaW50O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZUlucHV0KSB7XG4gICAgICBpZiAodikge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmRpc2FibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBsYWJlbEZuOiBMYWJlbEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGxhYmVsQXR0cjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnYXV0b2NvbXBsZXRlSW5wdXQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKHY6IGFueVtdKSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHY7XG4gICAgdGhpcy5pbm5lck9wdGlvbnMgPSB2O1xuICB9XG4gIGdldCBvcHRpb25zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgdmFsdWVGbjogVmFsdWVGdW5jdGlvbjtcblxuICBASW5wdXQoKSB2YWx1ZUF0dHI6IHN0cmluZztcblxuICAvLyBFdmVudHNcbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcbiAgXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+KCk7XG5cbiAgLy8gVmlldyBlbGVtZW50c1xuICBAVmlld0NoaWxkKCd0ZXJtSW5wdXQnKSB0ZXJtSW5wdXQ7XG5cbiAgLy8gcHJpdmF0ZSBkYXRhO1xuICBwcml2YXRlIG9wdGlvbnMkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55W107XG5cbiAgaW5uZXJPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIHByaXZhdGUgZmlsdGVyZWRPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNyZWF0ZUlucHV0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kZXRlY3RSZXF1aXJlZERhdGEoKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9PcHRpb25zKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9PcHRpb25zKCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIFZBTFVFXG4gICovXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLnNldElubmVyVmFsdWUodik7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMud3JpdHRlblZhbHVlID0gdjtcbiAgICB2ID0gdiA/IHYgOiB1bmRlZmluZWQ7IC8vIGF2b2lkIG51bGwgdmFsdWVzXG4gICAgY29uc3QgaGFzRGlmZmVyZW5jZSA9ICF0aGlzLmNvbXBhcmVBc1N0cmluZyh2LCB0aGlzLnZhbHVlKTtcbiAgICBpZiAoaGFzRGlmZmVyZW5jZSkge1xuICAgICAgdGhpcy5sb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUodilcbiAgICAgIC50aGVuKChvcHRpb25zKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShzZWxlY3RlZE9wdGlvbik7XG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uVmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlO1xuICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgIG9wdGlvbjogc2VsZWN0ZWRPcHRpb24sXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuaW5uZXJPcHRpb25zLFxuICAgICAgICBmaWx0ZXJlZE9wdGlvbnM6IHRoaXMuZmlsdGVyZWRPcHRpb25zLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25FbnRlckJ1dHRvbigkZXZlbnQpIHtcbiAgICB0aGlzLmVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KTtcbiAgfSBcblxuICBzZXRGb2N1cygpIHtcbiAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBvcGVuUGFuZWwoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVUcmlnZ2VyLm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgb25CbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGNsZWFyKHJlb3BlbiA9IGZhbHNlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnNldFZhbHVlKCcnKTtcbiAgICBpZiAodGhpcy53cml0dGVuVmFsdWUgPT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgICB9XG4gICAgaWYgKHJlb3Blbikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICB9LCAxKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy53cml0dGVuVmFsdWU7XG4gICAgdGhpcy5zZXRJbm5lclZhbHVlKHRoaXMud3JpdHRlblZhbHVlKTtcbiAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gIH1cblxuICBleHRyYWN0TGFiZWw6IExhYmVsRnVuY3Rpb24gPSAoaXRlbTogYW55KTogc3RyaW5nID0+IHtcbiAgICBsZXQgbGFiZWwgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gbGFiZWwgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLmxhYmVsRm4pIHsgLy8gVXNlIGN1c3RvbSBsYWJlbCBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IHRoaXMubGFiZWxGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sYWJlbEF0dHIpIHsgLy8gVXNlIG9iamVjdCBsYWJlbCBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgbGFiZWwgPSBpdGVtW3RoaXMubGFiZWxBdHRyXSB8fCB1bmRlZmluZWQ7XG5cbiAgICAgIH1cbiAgICB9XG4gICAgbGFiZWwgPSB0aGlzLmVuc3VyZVN0cmluZyhsYWJlbCk7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUod3JpdHRlblZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3cml0dGVuVmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh3cml0dGVuVmFsdWUpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgIHJlc29sdmUod3JpdHRlblZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHdyaXR0ZW5WYWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFJlcXVpcmVkRGF0YSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgZXJyb3I6IHN0cmluZztcbiAgICAgIGlmICghdGhpcy5lbmRwb2ludCAmJiAhdGhpcy5vcHRpb25zICYmICF0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcbiAgICAgICAgZXJyb3IgPSAnTm8gZW5kcG9pbnQgfCBvcHRpb25zIHwgY3VzdG9tRmV0Y2hGdW5jdGlvbiBzZXQuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9mIHRoZW0gdG8gYmUgYWJsZSB0byB1c2UgdGhlIEF1dG9jb21wbGV0ZSc7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5yYWlzZUVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRJbnB1dENvbnRyb2woKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNQcmlzdGluZSgpO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzVW50b3VjaGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RWYWx1ZTogVmFsdWVGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBhbnkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyB2YWx1ZSBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMudmFsdWVGbikgeyAvLyBVc2UgY3VzdG9tIHZhbHVlIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZUZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlQXR0cikgeyAvLyBVc2Ugb2JqZWN0IHZhbHVlIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IGl0ZW1bdGhpcy52YWx1ZUF0dHJdIHx8IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wYXJlQXNTdHJpbmcodjEsIHYyKSB7XG4gICAgY29uc3Qgc3RyaW5nMSA9IHRoaXMuZW5zdXJlU3RyaW5nKHYxKTtcbiAgICBjb25zdCBzdHJpbmcyID0gdGhpcy5lbnN1cmVTdHJpbmcodjIpO1xuICAgIHJldHVybiBzdHJpbmcxID09PSBzdHJpbmcyO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVTdHJpbmcodikge1xuICAgIGlmICh0eXBlb2YgdiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc05hTih2KSkge1xuICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ID0gYCR7dn1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9PcHRpb25zKCkge1xuICAgIHRoaXMub3B0aW9ucyRTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbnMkLnN1YnNjcmliZShvcHRpb25zID0+IHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gb3B0aW9ucztcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHYpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodjogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9uID0gdGhpcy5nZXRPcHRpb25CYXNlZE9uVmFsdWUodik7XG4gICAgY29uc3QgbGFiZWwgPSB0aGlzLmV4dHJhY3RMYWJlbChvcHRpb24pO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuc2V0VmFsdWUob3B0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHY6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5maW5kKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgaXRlbVZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoaXRlbSk7XG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXNTdHJpbmcoaXRlbVZhbHVlLCB2KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW5wdXQoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dCA9IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCh7dmFsdWU6IHVuZGVmaW5lZCwgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKSB7XG4gICAgdGhpcy5vcHRpb25zJCA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVDaGFuZ2VzXG4gICAgLnBpcGUoXG4gICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgc3dpdGNoTWFwKCh0ZXh0U2VhcmNoOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgaXNTdHJpbmdUZXJtID0gdHlwZW9mIHRleHRTZWFyY2ggPT09ICdzdHJpbmcnO1xuICAgICAgICBpZiAoaXNTdHJpbmdUZXJtKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUodGV4dFNlYXJjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9mKHRoaXMuaW5uZXJPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaEluTG9jYWxPcHRpb25zKHRleHRTZWFyY2gpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKHRleHRTZWFyY2gpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChvcHRpb25zID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBib2R5ID0gdGV4dFNlYXJjaCA/IHsgdGV4dFNlYXJjaCB9IDogdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXQ8YW55W10+KHRoaXMuZW5kcG9pbnQsIGJvZHkpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgob3B0aW9uczogYW55W10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb09wdGlvbnMoKSB7XG4gICAgdGhpcy5vcHRpb25zJFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hJbkxvY2FsT3B0aW9ucyh0ZXJtOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0ZXJtU3RyaW5nID0gYCR7dGVybX1gO1xuXG4gICAgbGV0IGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zO1xuXG4gICAgaWYgKHRlcm1TdHJpbmcpIHtcbiAgICAgIGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zXG4gICAgICAuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBsYWJlbDogc3RyaW5nID0gdGhpcy5leHRyYWN0TGFiZWwoaXRlbSk7XG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZUxhYmVsID0gbGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbG93ZXJDYXNlVGVybSA9IHRlcm1TdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGxvd2VyQ2FzZUxhYmVsLnNlYXJjaChsb3dlckNhc2VUZXJtKSA+PSAwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mKGZpbHRlcmVkRGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHJhaXNlRXJyb3IoZXJyb3I6IHN0cmluZykge1xuICAgIHRocm93IG5ldyBFcnJvcihgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IEVycm9yOjogVGhlIGF1dG9jb21wbGV0ZSB3aXRoIG5hbWUgXCIke3RoaXMubmFtZX1cIiBoYWQgdGhlIGZvbGxvdyBwcm9ibGVtOiAke2Vycm9yfWApO1xuICB9XG5cbn1cbiJdfQ==