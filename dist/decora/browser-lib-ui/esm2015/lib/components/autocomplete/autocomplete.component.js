/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
import { of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
/** @type {?} */
const noop = () => {
};
const ɵ0 = noop;
/** @type {?} */
export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteComponent),
    multi: true
};
export class DecAutocompleteComponent {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
        this.separatorKeysCodes = [ENTER, COMMA];
        this.name = 'autocompleteInput';
        this.placeholder = '';
        // Events
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.innerOptions = [];
        this.responses = {};
        this.search$ = new BehaviorSubject(undefined);
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.extractLabel = (item) => {
            /** @type {?} */
            let label = item; // use the object itself if no label function or attribute is provided
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
            /** @type {?} */
            let value = item; // use the object itself if no value function or attribute is provided
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
        this.getSelectableOptions = (options) => {
            /** @type {?} */
            const isArray = options ? Array.isArray(options) : false;
            /** @type {?} */
            let selectableOptions = options;
            if (isArray && !this.repeat) {
                selectableOptions = options.filter(option => {
                    if (!this.repeat) {
                        /** @type {?} */
                        const optionValue = this.extractValue(option);
                        /** @type {?} */
                        let alreadySelected;
                        if (this.multi) {
                            alreadySelected = this.optionsSelected && this.optionsSelected.find(selected => {
                                /** @type {?} */
                                const selectedValue = this.extractValue(selected);
                                return this.compareAsString(selectedValue, optionValue);
                            }) ? true : false;
                        }
                        else {
                            alreadySelected = this.compareAsString(this.value, optionValue);
                            ;
                        }
                        return !alreadySelected;
                    }
                    else {
                        return true;
                    }
                });
            }
            return selectableOptions;
        };
        this.createInput();
        this.subscribeToSearchAndSetOptionsObservable();
        this.subscribeToInputValueChanges();
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
        this.detectRequiredData();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeToInputValueChanges();
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
            this.optionsSelected = [];
            this.writtenValue = value;
            this.populateAutocompleteWithInitialValues(value, true);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onOptionSelected($event) {
        /** @type {?} */
        let shouldEmit = true;
        /** @type {?} */
        const selectedOption = $event.option.value;
        /** @type {?} */
        const selectedOptionValue = this.extractValue(selectedOption);
        if (selectedOptionValue !== this.value) {
            if (this.multi) {
                shouldEmit = this.addOptionToOptionsSelected(selectedOption);
                this.setInputValue(undefined);
            }
            else {
                this.value = selectedOptionValue;
            }
            if (shouldEmit) {
                this.optionSelected.emit({
                    value: this.value,
                    option: selectedOption,
                    options: this.innerOptions,
                });
            }
            this.blurInput();
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
        this.optionsSelected = undefined;
        this.setInputValue('');
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
        this.populateAutocompleteWithInitialValues(this.writtenValue);
        this.resetInputControl();
    }
    /**
     * @param {?} option
     * @return {?}
     */
    remove(option) {
        /** @type {?} */
        const index = this.optionsSelected.indexOf(option);
        if (index >= 0) {
            this.optionsSelected.splice(index, 1);
        }
        this.updateValueWithOptionsSelected();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setInputValue(v) {
        this.autocompleteInput.setValue(v);
        if (!v) {
            this.termInput.nativeElement.value = '';
        }
    }
    /**
     * @return {?}
     */
    blurInput() {
        this.termInput.nativeElement.blur();
    }
    /**
     * @param {?} option
     * @return {?}
     */
    addOptionToOptionsSelected(option) {
        if (option) {
            /** @type {?} */
            let shouldEmit = true;
            if (this.optionsSelected && this.optionsSelected.length) {
                /** @type {?} */
                const index = this.optionsSelected.indexOf(option);
                if (index === -1) {
                    this.optionsSelected.push(option);
                    this.setInputValue(null);
                    this.updateValueWithOptionsSelected();
                }
                else {
                    shouldEmit = false;
                }
            }
            else {
                this.optionsSelected = [option];
                this.updateValueWithOptionsSelected();
            }
            return shouldEmit;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} value
     * @param {?=} reloadOptions
     * @return {?}
     */
    populateAutocompleteWithInitialValues(value, reloadOptions = false) {
        if (this.multi) {
            /** @type {?} */
            const isArray = Array.isArray(value);
            if (isArray) {
                this.optionsSelected = [];
                value.forEach(optionValue => {
                    this.loadRemoteObjectByWrittenValue(optionValue)
                        .then((option) => {
                        this.addOptionToOptionsSelected(option);
                    });
                });
            }
        }
        else {
            this.loadRemoteObjectByWrittenValue(value)
                .then((options) => {
                this.setInnerValue(value);
            });
        }
    }
    /**
     * @return {?}
     */
    updateValueWithOptionsSelected() {
        if (this.optionsSelected && this.optionsSelected.length) {
            this.value = this.optionsSelected.map(option => this.extractValue(option));
        }
        else {
            this.value = undefined;
        }
    }
    /**
     * @param {?} writtenValue
     * @return {?}
     */
    loadRemoteObjectByWrittenValue(writtenValue) {
        console.log('loadRemoteObjectByWrittenValue', writtenValue);
        return new Promise((resolve, reject) => {
            if (writtenValue) {
                this.searchBasedFetchingType(writtenValue, true)
                    .subscribe((res) => {
                    resolve(res[0]);
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
            /** @type {?} */
            let error;
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
        this.blurInput();
    }
    /**
     * @param {?} v1
     * @param {?} v2
     * @return {?}
     */
    compareAsString(v1, v2) {
        /** @type {?} */
        const string1 = this.ensureString(v1);
        /** @type {?} */
        const string2 = this.ensureString(v2);
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
        /** @type {?} */
        const option = this.getOptionBasedOnValue(v);
        this.setInputValue(option);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    getOptionBasedOnValue(v) {
        return this.innerOptions.find(item => {
            /** @type {?} */
            const itemValue = this.extractValue(item);
            return this.compareAsString(itemValue, v);
        });
    }
    /**
     * @return {?}
     */
    createInput() {
        this.autocompleteInput = new FormControl('');
        if (this.disabled) {
            this.autocompleteInput.disable();
        }
    }
    /**
     * @return {?}
     */
    subscribeToInputValueChanges() {
        this.searchInputSubscription = this.autocompleteInput.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(searchText => {
            this.search$.next(searchText);
        });
    }
    /**
     * @return {?}
     */
    unsubscribeToInputValueChanges() {
        this.searchInputSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    subscribeToSearchAndSetOptionsObservable() {
        this.options$ = this.search$
            .pipe(map(v => v ? v : ''), distinctUntilChanged(), switchMap((textSearch) => {
            /** @type {?} */
            const searchTerm = textSearch || '';
            /** @type {?} */
            const isStringTerm = typeof searchTerm === 'string';
            if (isStringTerm) {
                return this.searchBasedFetchingType(searchTerm);
            }
            else {
                return of(this.innerOptions);
            }
        }));
    }
    /**
     * @param {?} textSearch
     * @param {?=} rememberResponse
     * @return {?}
     */
    searchBasedFetchingType(textSearch, rememberResponse = false) {
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
            /** @type {?} */
            const body = textSearch ? { textSearch } : undefined;
            if (rememberResponse) {
                /** @type {?} */
                const dataInMemory = this.responses[textSearch];
                if (dataInMemory) {
                    return of(dataInMemory);
                }
                else {
                    return this.service.get(this.endpoint, body)
                        .pipe(tap((options) => {
                        this.responses[textSearch] = options;
                        this.innerOptions = options;
                    }));
                }
            }
            else {
                return this.service.get(this.endpoint, body)
                    .pipe(tap((options) => {
                    this.innerOptions = options;
                }));
            }
        }
    }
    /**
     * @param {?} term
     * @return {?}
     */
    searchInLocalOptions(term) {
        /** @type {?} */
        const termString = `${term}`;
        /** @type {?} */
        let filteredData = this.innerOptions;
        if (termString) {
            filteredData = this.innerOptions
                .filter(item => {
                /** @type {?} */
                const label = this.extractLabel(item);
                /** @type {?} */
                const lowerCaseLabel = label.toLowerCase();
                /** @type {?} */
                const lowerCaseTerm = termString.toLowerCase();
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
                template: `<ng-container [ngSwitch]="multi ? true : false">

  <ng-container *ngSwitchCase="true">
    <mat-form-field>
      <mat-chip-list #decAutocompleteChipList>
        <mat-chip *ngFor="let option of optionsSelected" [removable]="true" (removed)="remove(option)">
          {{ extractLabel(option) }}
          <mat-icon matChipRemove>cancel</mat-icon>
        </mat-chip>
        <input matInput [attr.aria-label]="name" #termInput [matAutocomplete]="decAutocomplete" [formControl]="autocompleteInput"
          [name]="name" [required]="required" [placeholder]="placeholder" (keyup.enter)="onEnterButton($event)" (blur)="onBlur($event)"
          autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"
          [matChipInputFor]="decAutocompleteChipList" [matChipInputSeparatorKeyCodes]="separatorKeysCodes">
        <button mat-icon-button matSuffix (click)="clear(true)" *ngIf="!disabled && !required && value">
          <mat-icon>close</mat-icon>
        </button>
        <button mat-icon-button matSuffix (click)="reset()" *ngIf="!disabled && value !== writtenValue">
          <mat-icon>replay</mat-icon>
        </button>
      </mat-chip-list>
      <mat-autocomplete #decAutocomplete="matAutocomplete" [displayWith]="extractLabel" (optionSelected)="onOptionSelected($event)"
        name="autocompleteValue">
        <mat-option *ngFor="let item of getSelectableOptions(options$ | async)" [value]="item">
          {{ extractLabel(item) }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </ng-container>

  <ng-container *ngSwitchCase="false">
    <mat-form-field>
      <input matInput [attr.aria-label]="name" #termInput [matAutocomplete]="decAutocomplete" [formControl]="autocompleteInput"
        [name]="name" [required]="required" [placeholder]="placeholder" (keyup.enter)="onEnterButton($event)" (blur)="onBlur($event)"
        autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
      <button mat-icon-button matSuffix (click)="clear(true)" *ngIf="!disabled && !required && value">
        <mat-icon>close</mat-icon>
      </button>
      <button mat-icon-button matSuffix (click)="reset()" *ngIf="!disabled && value !== writtenValue">
        <mat-icon>replay</mat-icon>
      </button>
    </mat-form-field>
    <mat-autocomplete #decAutocomplete="matAutocomplete" [displayWith]="extractLabel" (optionSelected)="onOptionSelected($event)"
      name="autocompleteValue">
      <mat-option *ngIf="!required" [value]=""></mat-option>
      <mat-option *ngFor="let item of getSelectableOptions(options$ | async)" [value]="item">
        {{ extractLabel(item) }}
      </mat-option>
    </mat-autocomplete>
  </ng-container>

</ng-container>
`,
                styles: [],
                providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteComponent.ctorParameters = () => [
    { type: DecApiService }
];
DecAutocompleteComponent.propDecorators = {
    autocompleteTrigger: [{ type: ViewChild, args: [MatAutocompleteTrigger,] }],
    customFetchFunction: [{ type: Input }],
    endpoint: [{ type: Input }],
    multi: [{ type: Input }],
    repeat: [{ type: Input }],
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
    termInput: [{ type: ViewChild, args: ['termInput',] }],
    chipList: [{ type: ViewChild, args: ['chipList',] }]
};
if (false) {
    /** @type {?} */
    DecAutocompleteComponent.prototype.autocompleteTrigger;
    /** @type {?} */
    DecAutocompleteComponent.prototype.autocompleteInput;
    /** @type {?} */
    DecAutocompleteComponent.prototype.options$;
    /** @type {?} */
    DecAutocompleteComponent.prototype.optionsSelected;
    /** @type {?} */
    DecAutocompleteComponent.prototype.writtenValue;
    /** @type {?} */
    DecAutocompleteComponent.prototype.separatorKeysCodes;
    /** @type {?} */
    DecAutocompleteComponent.prototype.customFetchFunction;
    /** @type {?} */
    DecAutocompleteComponent.prototype.endpoint;
    /** @type {?} */
    DecAutocompleteComponent.prototype.multi;
    /** @type {?} */
    DecAutocompleteComponent.prototype.repeat;
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
    DecAutocompleteComponent.prototype.chipList;
    /** @type {?} */
    DecAutocompleteComponent.prototype._disabled;
    /** @type {?} */
    DecAutocompleteComponent.prototype._options;
    /** @type {?} */
    DecAutocompleteComponent.prototype.innerOptions;
    /** @type {?} */
    DecAutocompleteComponent.prototype.responses;
    /** @type {?} */
    DecAutocompleteComponent.prototype.search$;
    /** @type {?} */
    DecAutocompleteComponent.prototype.searchInputSubscription;
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
    DecAutocompleteComponent.prototype.getSelectableOptions;
    /** @type {?} */
    DecAutocompleteComponent.prototype.service;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBYSxHQUFHLEVBQVUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUcsT0FBTyxFQUFFLHNCQUFzQixFQUFxQixNQUFNLG1CQUFtQixDQUFDOztBQUc5RSxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7Q0FDakIsQ0FBQzs7O0FBR0YsYUFBYSxtQ0FBbUMsR0FBUTtJQUN0RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQXdCLENBQUM7SUFDdkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBMkRGLE1BQU07Ozs7SUFrR0osWUFDVTtRQUFBLFlBQU8sR0FBUCxPQUFPO2tDQXZGYyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7b0JBOEI3QixtQkFBbUI7MkJBV1osRUFBRTs7b0JBU1csSUFB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbURYO2dCQUNDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2FBQ2pEOzs7O1lBekVRLGFBQWE7OztrQ0E0RW5CLFNBQVMsU0FBQyxzQkFBc0I7a0NBYWhDLEtBQUs7dUJBRUwsS0FBSztvQkFFTCxLQUFLO3FCQUVMLEtBQUs7dUJBRUwsS0FBSztzQkFlTCxLQUFLO3dCQUVMLEtBQUs7bUJBRUwsS0FBSztzQkFFTCxLQUFLOzBCQVNMLEtBQUs7dUJBRUwsS0FBSztzQkFFTCxLQUFLO3dCQUVMLEtBQUs7bUJBR0wsTUFBTTs2QkFFTixNQUFNOzBCQUVOLE1BQU07d0JBR04sU0FBUyxTQUFDLFdBQVc7dUJBRXJCLFNBQVMsU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT01NQSwgRU5URVIgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAsIHN0YXJ0V2l0aCwgdGFwLCBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhYmVsRnVuY3Rpb24sIFZhbHVlRnVuY3Rpb24sIFNlbGVjdGlvbkV2ZW50LCBDdXN0b21GZXRjaEZ1bmN0aW9uIH0gZnJvbSAnLi9hdXRvY29tcGxldGUubW9kZWxzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIsIE1hdENoaXBJbnB1dEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibXVsdGkgPyB0cnVlIDogZmFsc2VcIj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgPG1hdC1jaGlwLWxpc3QgI2RlY0F1dG9jb21wbGV0ZUNoaXBMaXN0PlxuICAgICAgICA8bWF0LWNoaXAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zU2VsZWN0ZWRcIiBbcmVtb3ZhYmxlXT1cInRydWVcIiAocmVtb3ZlZCk9XCJyZW1vdmUob3B0aW9uKVwiPlxuICAgICAgICAgIHt7IGV4dHJhY3RMYWJlbChvcHRpb24pIH19XG4gICAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgPGlucHV0IG1hdElucHV0IFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiICN0ZXJtSW5wdXQgW21hdEF1dG9jb21wbGV0ZV09XCJkZWNBdXRvY29tcGxldGVcIiBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlSW5wdXRcIlxuICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIiBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiAoa2V5dXAuZW50ZXIpPVwib25FbnRlckJ1dHRvbigkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyKCRldmVudClcIlxuICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHJlYWRvbmx5IG9uZm9jdXM9XCJ0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcIlxuICAgICAgICAgIFttYXRDaGlwSW5wdXRGb3JdPVwiZGVjQXV0b2NvbXBsZXRlQ2hpcExpc3RcIiBbbWF0Q2hpcElucHV0U2VwYXJhdG9yS2V5Q29kZXNdPVwic2VwYXJhdG9yS2V5c0NvZGVzXCI+XG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY2xlYXIodHJ1ZSlcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiAhcmVxdWlyZWQgJiYgdmFsdWVcIj5cbiAgICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJyZXNldCgpXCIgKm5nSWY9XCIhZGlzYWJsZWQgJiYgdmFsdWUgIT09IHdyaXR0ZW5WYWx1ZVwiPlxuICAgICAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvbWF0LWNoaXAtbGlzdD5cbiAgICAgIDxtYXQtYXV0b2NvbXBsZXRlICNkZWNBdXRvY29tcGxldGU9XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZXh0cmFjdExhYmVsXCIgKG9wdGlvblNlbGVjdGVkKT1cIm9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgIG5hbWU9XCJhdXRvY29tcGxldGVWYWx1ZVwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBnZXRTZWxlY3RhYmxlT3B0aW9ucyhvcHRpb25zJCB8IGFzeW5jKVwiIFt2YWx1ZV09XCJpdGVtXCI+XG4gICAgICAgICAge3sgZXh0cmFjdExhYmVsKGl0ZW0pIH19XG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiPlxuICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgIDxpbnB1dCBtYXRJbnB1dCBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIiAjdGVybUlucHV0IFttYXRBdXRvY29tcGxldGVdPVwiZGVjQXV0b2NvbXBsZXRlXCIgW2Zvcm1Db250cm9sXT1cImF1dG9jb21wbGV0ZUlucHV0XCJcbiAgICAgICAgW25hbWVdPVwibmFtZVwiIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIChrZXl1cC5lbnRlcik9XCJvbkVudGVyQnV0dG9uKCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHJlYWRvbmx5IG9uZm9jdXM9XCJ0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcIj5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY2xlYXIodHJ1ZSlcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiAhcmVxdWlyZWQgJiYgdmFsdWVcIj5cbiAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJyZXNldCgpXCIgKm5nSWY9XCIhZGlzYWJsZWQgJiYgdmFsdWUgIT09IHdyaXR0ZW5WYWx1ZVwiPlxuICAgICAgICA8bWF0LWljb24+cmVwbGF5PC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPG1hdC1hdXRvY29tcGxldGUgI2RlY0F1dG9jb21wbGV0ZT1cIm1hdEF1dG9jb21wbGV0ZVwiIFtkaXNwbGF5V2l0aF09XCJleHRyYWN0TGFiZWxcIiAob3B0aW9uU2VsZWN0ZWQpPVwib25PcHRpb25TZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgIG5hbWU9XCJhdXRvY29tcGxldGVWYWx1ZVwiPlxuICAgICAgPG1hdC1vcHRpb24gKm5nSWY9XCIhcmVxdWlyZWRcIiBbdmFsdWVdPVwiXCI+PC9tYXQtb3B0aW9uPlxuICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgZ2V0U2VsZWN0YWJsZU9wdGlvbnMob3B0aW9ucyQgfCBhc3luYylcIiBbdmFsdWVdPVwiaXRlbVwiPlxuICAgICAgICB7eyBleHRyYWN0TGFiZWwoaXRlbSkgfX1cbiAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gIDwvbmctY29udGFpbmVyPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBAVmlld0NoaWxkKE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIpICBhdXRvY29tcGxldGVUcmlnZ2VyOiBNYXRBdXRvY29tcGxldGVUcmlnZ2VyO1xuXG4gIGF1dG9jb21wbGV0ZUlucHV0OiBGb3JtQ29udHJvbDtcblxuICBvcHRpb25zJDogT2JzZXJ2YWJsZTxhbnlbXT47XG5cbiAgb3B0aW9uc1NlbGVjdGVkOiBhbnlbXTtcblxuICB3cml0dGVuVmFsdWU6IGFueTtcblxuICBzZXBhcmF0b3JLZXlzQ29kZXM6IG51bWJlcltdID0gW0VOVEVSLCBDT01NQV07XG5cbiAgLy8gUGFyYW1zXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoRnVuY3Rpb246IEN1c3RvbUZldGNoRnVuY3Rpb247XG5cbiAgQElucHV0KCkgZW5kcG9pbnQ7XG5cbiAgQElucHV0KCkgbXVsdGk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVwZWF0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZUlucHV0KSB7XG4gICAgICBpZiAodikge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmRpc2FibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBsYWJlbEZuOiBMYWJlbEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGxhYmVsQXR0cjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnYXV0b2NvbXBsZXRlSW5wdXQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKHY6IGFueVtdKSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHY7XG4gICAgdGhpcy5pbm5lck9wdGlvbnMgPSB2O1xuICB9XG4gIGdldCBvcHRpb25zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgdmFsdWVGbjogVmFsdWVGdW5jdGlvbjtcblxuICBASW5wdXQoKSB2YWx1ZUF0dHI6IHN0cmluZztcblxuICAvLyBFdmVudHNcbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcblxuICBAT3V0cHV0KCkgZW50ZXJCdXR0b246IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PigpO1xuXG4gIC8vIFZpZXcgZWxlbWVudHNcbiAgQFZpZXdDaGlsZCgndGVybUlucHV0JykgdGVybUlucHV0O1xuXG4gIEBWaWV3Q2hpbGQoJ2NoaXBMaXN0JykgY2hpcExpc3Q7XG5cbiAgLy8gcHJpdmF0ZSBkYXRhO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9vcHRpb25zOiBhbnlbXTtcblxuICBwcml2YXRlIGlubmVyT3B0aW9uczogYW55W10gPSBbXTtcblxuICBwcml2YXRlIHJlc3BvbnNlczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcblxuICBwcml2YXRlIHNlYXJjaCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4odW5kZWZpbmVkKTtcblxuICBwcml2YXRlIHNlYXJjaElucHV0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY3JlYXRlSW5wdXQoKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvSW5wdXRWYWx1ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRldGVjdFJlcXVpcmVkRGF0YSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvSW5wdXRWYWx1ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiBgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQgPSBbXTtcbiAgICAgIHRoaXMud3JpdHRlblZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnBvcHVsYXRlQXV0b2NvbXBsZXRlV2l0aEluaXRpYWxWYWx1ZXModmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KSB7XG5cbiAgICBsZXQgc2hvdWxkRW1pdCA9IHRydWU7XG5cbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9ICRldmVudC5vcHRpb24udmFsdWU7XG5cbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvblZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoc2VsZWN0ZWRPcHRpb24pO1xuXG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uVmFsdWUgIT09IHRoaXMudmFsdWUpIHtcblxuICAgICAgaWYgKHRoaXMubXVsdGkpIHtcblxuICAgICAgICBzaG91bGRFbWl0ID0gdGhpcy5hZGRPcHRpb25Ub09wdGlvbnNTZWxlY3RlZChzZWxlY3RlZE9wdGlvbik7XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHVuZGVmaW5lZCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkT3B0aW9uVmFsdWU7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHNob3VsZEVtaXQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICBvcHRpb246IHNlbGVjdGVkT3B0aW9uLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMuaW5uZXJPcHRpb25zLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ibHVySW5wdXQoKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25FbnRlckJ1dHRvbigkZXZlbnQpIHtcbiAgICB0aGlzLmVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KTtcbiAgfVxuXG4gIHNldEZvY3VzKCkge1xuICAgIHRoaXMudGVybUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIG9wZW5QYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIub3BlblBhbmVsKCk7XG4gIH1cblxuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVHJpZ2dlci5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBvbkJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY2xlYXIocmVvcGVuID0gZmFsc2UpIHtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSgnJyk7XG5cbiAgICBpZiAodGhpcy53cml0dGVuVmFsdWUgPT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgICB9XG5cbiAgICBpZiAocmVvcGVuKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH0sIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLndyaXR0ZW5WYWx1ZTtcbiAgICB0aGlzLnBvcHVsYXRlQXV0b2NvbXBsZXRlV2l0aEluaXRpYWxWYWx1ZXModGhpcy53cml0dGVuVmFsdWUpO1xuICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgfVxuXG4gIGV4dHJhY3RMYWJlbDogTGFiZWxGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGxldCBsYWJlbCA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyBsYWJlbCBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMubGFiZWxGbikgeyAvLyBVc2UgY3VzdG9tIGxhYmVsIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIGxhYmVsID0gdGhpcy5sYWJlbEZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxhYmVsQXR0cikgeyAvLyBVc2Ugb2JqZWN0IGxhYmVsIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IGl0ZW1bdGhpcy5sYWJlbEF0dHJdIHx8IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFiZWwgPSB0aGlzLmVuc3VyZVN0cmluZyhsYWJlbCk7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG5cbiAgcmVtb3ZlKG9wdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm9wdGlvbnNTZWxlY3RlZC5pbmRleE9mKG9wdGlvbik7XG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dFZhbHVlKHYpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnNldFZhbHVlKHYpO1xuXG4gICAgaWYgKCF2KSB7XG4gICAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBibHVySW5wdXQoKSB7XG5cbiAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBhZGRPcHRpb25Ub09wdGlvbnNTZWxlY3RlZChvcHRpb24pOiBib29sZWFuIHtcblxuICAgIGlmIChvcHRpb24pIHtcblxuICAgICAgbGV0IHNob3VsZEVtaXQgPSB0cnVlO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zU2VsZWN0ZWQgJiYgdGhpcy5vcHRpb25zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcHRpb25zU2VsZWN0ZWQuaW5kZXhPZihvcHRpb24pO1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQucHVzaChvcHRpb24pO1xuICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShudWxsKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNob3VsZEVtaXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQgPSBbb3B0aW9uXTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZVdpdGhPcHRpb25zU2VsZWN0ZWQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNob3VsZEVtaXQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgcG9wdWxhdGVBdXRvY29tcGxldGVXaXRoSW5pdGlhbFZhbHVlcyh2YWx1ZSwgcmVsb2FkT3B0aW9ucyA9IGZhbHNlKSB7XG5cbiAgICBpZiAodGhpcy5tdWx0aSkge1xuXG4gICAgICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG5cbiAgICAgIGlmIChpc0FycmF5KSB7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQgPSBbXTtcblxuICAgICAgICB2YWx1ZS5mb3JFYWNoKG9wdGlvblZhbHVlID0+IHtcblxuICAgICAgICAgIHRoaXMubG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKG9wdGlvblZhbHVlKVxuICAgICAgICAgICAgLnRoZW4oKG9wdGlvbikgPT4ge1xuXG4gICAgICAgICAgICAgIHRoaXMuYWRkT3B0aW9uVG9PcHRpb25zU2VsZWN0ZWQob3B0aW9uKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMubG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKHZhbHVlKVxuICAgICAgICAudGhlbigob3B0aW9ucykgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpIHtcblxuICAgIGlmICh0aGlzLm9wdGlvbnNTZWxlY3RlZCAmJiB0aGlzLm9wdGlvbnNTZWxlY3RlZC5sZW5ndGgpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMub3B0aW9uc1NlbGVjdGVkLm1hcChvcHRpb24gPT4gdGhpcy5leHRyYWN0VmFsdWUob3B0aW9uKSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIHByaXZhdGUgbG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKHdyaXR0ZW5WYWx1ZTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zb2xlLmxvZygnbG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlJywgd3JpdHRlblZhbHVlKVxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3cml0dGVuVmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh3cml0dGVuVmFsdWUsIHRydWUpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzWzBdKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHdyaXR0ZW5WYWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFJlcXVpcmVkRGF0YSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgZXJyb3I6IHN0cmluZztcbiAgICAgIGlmICghdGhpcy5lbmRwb2ludCAmJiAhdGhpcy5vcHRpb25zICYmICF0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcbiAgICAgICAgZXJyb3IgPSAnTm8gZW5kcG9pbnQgfCBvcHRpb25zIHwgY3VzdG9tRmV0Y2hGdW5jdGlvbiBzZXQuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9mIHRoZW0gdG8gYmUgYWJsZSB0byB1c2UgdGhlIEF1dG9jb21wbGV0ZSc7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5yYWlzZUVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRJbnB1dENvbnRyb2woKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNQcmlzdGluZSgpO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzVW50b3VjaGVkKCk7XG4gICAgdGhpcy5ibHVySW5wdXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdFZhbHVlOiBWYWx1ZUZ1bmN0aW9uID0gKGl0ZW06IGFueSk6IGFueSA9PiB7XG4gICAgbGV0IHZhbHVlID0gaXRlbTsgLy8gdXNlIHRoZSBvYmplY3QgaXRzZWxmIGlmIG5vIHZhbHVlIGZ1bmN0aW9uIG9yIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZUZuKSB7IC8vIFVzZSBjdXN0b20gdmFsdWUgZnVuY3Rpb24gaWYgcHJvdmlkZWRcbiAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlRm4oaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWVBdHRyKSB7IC8vIFVzZSBvYmplY3QgdmFsdWUgYXR0cmlidXRlIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gaXRlbVt0aGlzLnZhbHVlQXR0cl0gfHwgdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGNvbXBhcmVBc1N0cmluZyh2MSwgdjIpIHtcbiAgICBjb25zdCBzdHJpbmcxID0gdGhpcy5lbnN1cmVTdHJpbmcodjEpO1xuICAgIGNvbnN0IHN0cmluZzIgPSB0aGlzLmVuc3VyZVN0cmluZyh2Mik7XG4gICAgcmV0dXJuIHN0cmluZzEgPT09IHN0cmluZzI7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVN0cmluZyh2KSB7XG4gICAgaWYgKHR5cGVvZiB2ICE9PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGlzTmFOKHYpKSB7XG4gICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYgPSBgJHt2fWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodik7XG4gIH1cblxuICBwcml2YXRlIHNldElucHV0VmFsdWVCYXNlZE9uSW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICBjb25zdCBvcHRpb24gPSB0aGlzLmdldE9wdGlvbkJhc2VkT25WYWx1ZSh2KTtcbiAgICB0aGlzLnNldElucHV0VmFsdWUob3B0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHY6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5maW5kKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgaXRlbVZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoaXRlbSk7XG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXNTdHJpbmcoaXRlbVZhbHVlLCB2KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW5wdXQoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0lucHV0VmFsdWVDaGFuZ2VzKCkge1xuXG4gICAgdGhpcy5zZWFyY2hJbnB1dFN1YnNjcmlwdGlvbiA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVDaGFuZ2VzXG4gICAgLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoc2VhcmNoVGV4dCA9PiB7XG4gICAgICB0aGlzLnNlYXJjaCQubmV4dChzZWFyY2hUZXh0KTtcbiAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvSW5wdXRWYWx1ZUNoYW5nZXMoKSB7XG5cbiAgICB0aGlzLnNlYXJjaElucHV0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpIHtcbiAgICB0aGlzLm9wdGlvbnMkID0gdGhpcy5zZWFyY2gkXG4gICAgLnBpcGUoXG4gICAgICBtYXAodiA9PiB2ID8gdiA6ICcnKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBzd2l0Y2hNYXAoKHRleHRTZWFyY2g6IHN0cmluZykgPT4ge1xuXG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSB0ZXh0U2VhcmNoIHx8ICcnO1xuXG4gICAgICAgIGNvbnN0IGlzU3RyaW5nVGVybSA9IHR5cGVvZiBzZWFyY2hUZXJtID09PSAnc3RyaW5nJztcblxuICAgICAgICBpZiAoaXNTdHJpbmdUZXJtKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUoc2VhcmNoVGVybSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9mKHRoaXMuaW5uZXJPcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRTZWxlY3RhYmxlT3B0aW9ucyA9IChvcHRpb25zKSA9PiB7XG5cbiAgICBjb25zdCBpc0FycmF5ID0gb3B0aW9ucyA/IEFycmF5LmlzQXJyYXkob3B0aW9ucykgOiBmYWxzZTtcblxuICAgIGxldCBzZWxlY3RhYmxlT3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBpZiAoaXNBcnJheSAmJiAhdGhpcy5yZXBlYXQpIHtcblxuICAgICAgc2VsZWN0YWJsZU9wdGlvbnMgPSBvcHRpb25zLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgICBpZiAoIXRoaXMucmVwZWF0KSB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShvcHRpb24pO1xuICAgICAgICAgIGxldCBhbHJlYWR5U2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgICAgICAgaWYgKHRoaXMubXVsdGkpIHtcbiAgICAgICAgICAgIGFscmVhZHlTZWxlY3RlZCA9IHRoaXMub3B0aW9uc1NlbGVjdGVkICYmIHRoaXMub3B0aW9uc1NlbGVjdGVkLmZpbmQoc2VsZWN0ZWQgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXNTdHJpbmcoc2VsZWN0ZWRWYWx1ZSwgb3B0aW9uVmFsdWUpO1xuICAgICAgICAgICAgfSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFscmVhZHlTZWxlY3RlZCA9IHRoaXMuY29tcGFyZUFzU3RyaW5nKHRoaXMudmFsdWUsIG9wdGlvblZhbHVlKTs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAhYWxyZWFkeVNlbGVjdGVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3RhYmxlT3B0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUodGV4dFNlYXJjaCwgcmVtZW1iZXJSZXNwb25zZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xuXG4gICAgICByZXR1cm4gdGhpcy5zZWFyY2hJbkxvY2FsT3B0aW9ucyh0ZXh0U2VhcmNoKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24odGV4dFNlYXJjaClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKG9wdGlvbnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25zdCBib2R5ID0gdGV4dFNlYXJjaCA/IHsgdGV4dFNlYXJjaCB9IDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAocmVtZW1iZXJSZXNwb25zZSkge1xuXG4gICAgICAgIGNvbnN0IGRhdGFJbk1lbW9yeSA9IHRoaXMucmVzcG9uc2VzW3RleHRTZWFyY2hdO1xuXG4gICAgICAgIGlmIChkYXRhSW5NZW1vcnkpIHtcblxuICAgICAgICAgIHJldHVybiBvZihkYXRhSW5NZW1vcnkpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldDxhbnlbXT4odGhpcy5lbmRwb2ludCwgYm9keSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICB0YXAoKG9wdGlvbnM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZXNbdGV4dFNlYXJjaF0gPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0PGFueVtdPih0aGlzLmVuZHBvaW50LCBib2R5KVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFwKChvcHRpb25zOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG5cbiAgICAgIH1cblxuXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hJbkxvY2FsT3B0aW9ucyh0ZXJtOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0ZXJtU3RyaW5nID0gYCR7dGVybX1gO1xuXG4gICAgbGV0IGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zO1xuXG4gICAgaWYgKHRlcm1TdHJpbmcpIHtcbiAgICAgIGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zXG4gICAgICAuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBsYWJlbDogc3RyaW5nID0gdGhpcy5leHRyYWN0TGFiZWwoaXRlbSk7XG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZUxhYmVsID0gbGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbG93ZXJDYXNlVGVybSA9IHRlcm1TdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGxvd2VyQ2FzZUxhYmVsLnNlYXJjaChsb3dlckNhc2VUZXJtKSA+PSAwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mKGZpbHRlcmVkRGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHJhaXNlRXJyb3IoZXJyb3I6IHN0cmluZykge1xuICAgIHRocm93IG5ldyBFcnJvcihgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IEVycm9yOjogVGhlIGF1dG9jb21wbGV0ZSB3aXRoIG5hbWUgXCIke3RoaXMubmFtZX1cIiBoYWQgdGhlIGZvbGxvdyBwcm9ibGVtOiAke2Vycm9yfWApO1xuICB9XG5cbn1cbiJdfQ==