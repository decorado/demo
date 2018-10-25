/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
import { of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
/** @type {?} */
const noop = () => {
};
const ɵ0 = noop;
/** @type {?} */
const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
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
        this.autocompleteInput = new FormControl('');
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
     * @param {?} v
     * @return {?}
     */
    set disabled(v) {
        this._disabled = v;
        if (v) {
            this.autocompleteInput.disable();
        }
        else {
            this.autocompleteInput.enable();
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
            .then(() => {
            this.subscribeToInputValueChanges();
            this.subscribeToSearchAndSetOptionsObservable();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeFromInputValueChanges();
        this.unsubscribeFromSearchAndSetOptionsObservable();
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
            this.optionsSelected = [];
            this.writtenValue = value;
            this.innerValue = value;
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
     * @return {?}
     */
    showClearButton() {
        /** @type {?} */
        const thereIsValueSet = this.detectIfHasValue(this.value);
        /** @type {?} */
        const show = !this.disabled && !this.required && thereIsValueSet;
        return show;
    }
    /**
     * @return {?}
     */
    showResetButton() {
        /** @type {?} */
        const valueAsString = Array.isArray(this.value) ? JSON.stringify(this.value) : this.value;
        /** @type {?} */
        const writtenValueAsString = Array.isArray(this.writtenValue) ? JSON.stringify(this.writtenValue) : this.writtenValue;
        /** @type {?} */
        const show = !this.disabled && (valueAsString !== writtenValueAsString);
        return show;
    }
    /**
     * @param {?} variable
     * @return {?}
     */
    detectIfHasValue(variable) {
        /** @type {?} */
        let thereIsValueSet = false;
        if (variable) {
            /** @type {?} */
            const isString = typeof variable === 'string';
            if (isString) {
                thereIsValueSet = variable.length;
            }
            else {
                /** @type {?} */
                const isArray = Array.isArray(variable);
                if (isArray) {
                    thereIsValueSet = variable.length;
                }
                else {
                    thereIsValueSet = true;
                }
            }
        }
        return thereIsValueSet;
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
        if (value) {
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
        else {
            // this.innerValue = this.writtenValue;
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
            this.value = [];
        }
    }
    /**
     * @param {?} writtenValue
     * @return {?}
     */
    loadRemoteObjectByWrittenValue(writtenValue) {
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
    unsubscribeFromInputValueChanges() {
        this.searchInputSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    subscribeToSearchAndSetOptionsObservable() {
        this.options$ = this.search$
            .pipe(distinctUntilChanged(), switchMap((textSearch) => {
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
     * @return {?}
     */
    unsubscribeFromSearchAndSetOptionsObservable() {
        this.searchInputSubscription.unsubscribe();
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
        <button mat-icon-button matSuffix (click)="clear(true)" *ngIf="showClearButton()">
          <mat-icon>close</mat-icon>
        </button>
        <button mat-icon-button matSuffix (click)="reset()" *ngIf="showResetButton()">
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
      <button mat-icon-button matSuffix (click)="clear(true)" *ngIf="showClearButton()">
        <mat-icon>close</mat-icon>
      </button>
      <button mat-icon-button matSuffix (click)="reset()" *ngIf="showResetButton()">
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
    DecAutocompleteComponent.prototype.getSelectableOptions;
    /** @type {?} */
    DecAutocompleteComponent.prototype.extractValue;
    /** @type {?} */
    DecAutocompleteComponent.prototype.service;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBYSxHQUFHLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RyxPQUFPLEVBQUUsc0JBQXNCLEVBQXFCLE1BQU0sbUJBQW1CLENBQUM7O0FBRzlFLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtDQUNqQixDQUFDOzs7QUFHRixNQUFNLG1DQUFtQyxHQUFRO0lBQy9DLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztJQUN2RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUEyREYsTUFBTTs7OztJQTZHSixZQUNVO1FBQUEsWUFBTyxHQUFQLE9BQU87aUNBMUdHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztrQ0FRUixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7b0JBeUM3QixtQkFBbUI7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LFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbURYO2dCQUNDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2FBQ2pEOzs7O1lBekVRLGFBQWE7OztrQ0E0RW5CLFNBQVMsU0FBQyxzQkFBc0I7a0NBMEJoQyxLQUFLO3VCQUVMLEtBQUs7b0JBRUwsS0FBSztxQkFFTCxLQUFLO3VCQUVMLEtBQUs7c0JBYUwsS0FBSzt3QkFFTCxLQUFLO21CQUVMLEtBQUs7c0JBRUwsS0FBSzswQkFTTCxLQUFLO3VCQUVMLEtBQUs7c0JBRUwsS0FBSzt3QkFFTCxLQUFLO21CQUdMLE1BQU07NkJBRU4sTUFBTTswQkFFTixNQUFNO3dCQUdOLFNBQVMsU0FBQyxXQUFXO3VCQUVyQixTQUFTLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ09NTUEsIEVOVEVSIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCBzdGFydFdpdGgsIHRhcCwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYWJlbEZ1bmN0aW9uLCBWYWx1ZUZ1bmN0aW9uLCBTZWxlY3Rpb25FdmVudCwgQ3VzdG9tRmV0Y2hGdW5jdGlvbiB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLm1vZGVscyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVUcmlnZ2VyLCBNYXRDaGlwSW5wdXRFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibXVsdGkgPyB0cnVlIDogZmFsc2VcIj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgPG1hdC1jaGlwLWxpc3QgI2RlY0F1dG9jb21wbGV0ZUNoaXBMaXN0PlxuICAgICAgICA8bWF0LWNoaXAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zU2VsZWN0ZWRcIiBbcmVtb3ZhYmxlXT1cInRydWVcIiAocmVtb3ZlZCk9XCJyZW1vdmUob3B0aW9uKVwiPlxuICAgICAgICAgIHt7IGV4dHJhY3RMYWJlbChvcHRpb24pIH19XG4gICAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgPGlucHV0IG1hdElucHV0IFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiICN0ZXJtSW5wdXQgW21hdEF1dG9jb21wbGV0ZV09XCJkZWNBdXRvY29tcGxldGVcIiBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlSW5wdXRcIlxuICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIiBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiAoa2V5dXAuZW50ZXIpPVwib25FbnRlckJ1dHRvbigkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyKCRldmVudClcIlxuICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHJlYWRvbmx5IG9uZm9jdXM9XCJ0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcIlxuICAgICAgICAgIFttYXRDaGlwSW5wdXRGb3JdPVwiZGVjQXV0b2NvbXBsZXRlQ2hpcExpc3RcIiBbbWF0Q2hpcElucHV0U2VwYXJhdG9yS2V5Q29kZXNdPVwic2VwYXJhdG9yS2V5c0NvZGVzXCI+XG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY2xlYXIodHJ1ZSlcIiAqbmdJZj1cInNob3dDbGVhckJ1dHRvbigpXCI+XG4gICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwicmVzZXQoKVwiICpuZ0lmPVwic2hvd1Jlc2V0QnV0dG9uKClcIj5cbiAgICAgICAgICA8bWF0LWljb24+cmVwbGF5PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L21hdC1jaGlwLWxpc3Q+XG4gICAgICA8bWF0LWF1dG9jb21wbGV0ZSAjZGVjQXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImV4dHJhY3RMYWJlbFwiIChvcHRpb25TZWxlY3RlZCk9XCJvbk9wdGlvblNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICBuYW1lPVwiYXV0b2NvbXBsZXRlVmFsdWVcIj5cbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgZ2V0U2VsZWN0YWJsZU9wdGlvbnMob3B0aW9ucyQgfCBhc3luYylcIiBbdmFsdWVdPVwiaXRlbVwiPlxuICAgICAgICAgIHt7IGV4dHJhY3RMYWJlbChpdGVtKSB9fVxuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICA8aW5wdXQgbWF0SW5wdXQgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCIgI3Rlcm1JbnB1dCBbbWF0QXV0b2NvbXBsZXRlXT1cImRlY0F1dG9jb21wbGV0ZVwiIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVJbnB1dFwiXG4gICAgICAgIFtuYW1lXT1cIm5hbWVcIiBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiAoa2V5dXAuZW50ZXIpPVwib25FbnRlckJ1dHRvbigkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyKCRldmVudClcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIiByZWFkb25seSBvbmZvY3VzPVwidGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XCI+XG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cImNsZWFyKHRydWUpXCIgKm5nSWY9XCJzaG93Q2xlYXJCdXR0b24oKVwiPlxuICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cInJlc2V0KClcIiAqbmdJZj1cInNob3dSZXNldEJ1dHRvbigpXCI+XG4gICAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8bWF0LWF1dG9jb21wbGV0ZSAjZGVjQXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImV4dHJhY3RMYWJlbFwiIChvcHRpb25TZWxlY3RlZCk9XCJvbk9wdGlvblNlbGVjdGVkKCRldmVudClcIlxuICAgICAgbmFtZT1cImF1dG9jb21wbGV0ZVZhbHVlXCI+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdJZj1cIiFyZXF1aXJlZFwiIFt2YWx1ZV09XCJcIj48L21hdC1vcHRpb24+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBnZXRTZWxlY3RhYmxlT3B0aW9ucyhvcHRpb25zJCB8IGFzeW5jKVwiIFt2YWx1ZV09XCJpdGVtXCI+XG4gICAgICAgIHt7IGV4dHJhY3RMYWJlbChpdGVtKSB9fVxuICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgPC9uZy1jb250YWluZXI+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBWaWV3Q2hpbGQoTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcikgYXV0b2NvbXBsZXRlVHJpZ2dlcjogTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcjtcblxuICBhdXRvY29tcGxldGVJbnB1dCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG5cbiAgb3B0aW9ucyQ6IE9ic2VydmFibGU8YW55W10+O1xuXG4gIG9wdGlvbnNTZWxlY3RlZDogYW55W107XG5cbiAgd3JpdHRlblZhbHVlOiBhbnk7XG5cbiAgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUiwgQ09NTUFdO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFBhcmFtc1xuICBASW5wdXQoKSBjdXN0b21GZXRjaEZ1bmN0aW9uOiBDdXN0b21GZXRjaEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGVuZHBvaW50O1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdjtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5kaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZW5hYmxlKCk7XG4gICAgfVxuICB9XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBsYWJlbEZuOiBMYWJlbEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGxhYmVsQXR0cjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnYXV0b2NvbXBsZXRlSW5wdXQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKHY6IGFueVtdKSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHY7XG4gICAgdGhpcy5pbm5lck9wdGlvbnMgPSB2O1xuICB9XG4gIGdldCBvcHRpb25zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgdmFsdWVGbjogVmFsdWVGdW5jdGlvbjtcblxuICBASW5wdXQoKSB2YWx1ZUF0dHI6IHN0cmluZztcblxuICAvLyBFdmVudHNcbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcblxuICBAT3V0cHV0KCkgZW50ZXJCdXR0b246IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PigpO1xuXG4gIC8vIFZpZXcgZWxlbWVudHNcbiAgQFZpZXdDaGlsZCgndGVybUlucHV0JykgdGVybUlucHV0O1xuXG4gIEBWaWV3Q2hpbGQoJ2NoaXBMaXN0JykgY2hpcExpc3Q7XG5cbiAgLy8gcHJpdmF0ZSBkYXRhO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9vcHRpb25zOiBhbnlbXTtcblxuICBwcml2YXRlIGlubmVyT3B0aW9uczogYW55W10gPSBbXTtcblxuICBwcml2YXRlIHJlc3BvbnNlczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4gIHByaXZhdGUgc2VhcmNoJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih1bmRlZmluZWQpO1xuXG4gIHByaXZhdGUgc2VhcmNoSW5wdXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kZXRlY3RSZXF1aXJlZERhdGEoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9JbnB1dFZhbHVlQ2hhbmdlcygpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb1NlYXJjaEFuZFNldE9wdGlvbnNPYnNlcnZhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbUlucHV0VmFsdWVDaGFuZ2VzKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZUZyb21TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZCA9IFtdO1xuICAgICAgdGhpcy53cml0dGVuVmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5wb3B1bGF0ZUF1dG9jb21wbGV0ZVdpdGhJbml0aWFsVmFsdWVzKHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBvbk9wdGlvblNlbGVjdGVkKCRldmVudCkge1xuXG4gICAgbGV0IHNob3VsZEVtaXQgPSB0cnVlO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKHNlbGVjdGVkT3B0aW9uKTtcblxuICAgIGlmIChzZWxlY3RlZE9wdGlvblZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG5cbiAgICAgIGlmICh0aGlzLm11bHRpKSB7XG5cbiAgICAgICAgc2hvdWxkRW1pdCA9IHRoaXMuYWRkT3B0aW9uVG9PcHRpb25zU2VsZWN0ZWQoc2VsZWN0ZWRPcHRpb24pO1xuXG4gICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh1bmRlZmluZWQpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlO1xuXG4gICAgICB9XG5cbiAgICAgIGlmIChzaG91bGRFbWl0KSB7XG4gICAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgb3B0aW9uOiBzZWxlY3RlZE9wdGlvbixcbiAgICAgICAgICBvcHRpb25zOiB0aGlzLmlubmVyT3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYmx1cklucHV0KCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uRW50ZXJCdXR0b24oJGV2ZW50KSB7XG4gICAgdGhpcy5lbnRlckJ1dHRvbi5lbWl0KCRldmVudCk7XG4gIH1cblxuICBzZXRGb2N1cygpIHtcbiAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBvcGVuUGFuZWwoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVUcmlnZ2VyLm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgb25CbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGNsZWFyKHJlb3BlbiA9IGZhbHNlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNldElucHV0VmFsdWUoJycpO1xuXG4gICAgaWYgKHRoaXMud3JpdHRlblZhbHVlID09PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gICAgfVxuXG4gICAgaWYgKHJlb3Blbikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICB9LCAxKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy53cml0dGVuVmFsdWU7XG4gICAgdGhpcy5wb3B1bGF0ZUF1dG9jb21wbGV0ZVdpdGhJbml0aWFsVmFsdWVzKHRoaXMud3JpdHRlblZhbHVlKTtcbiAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gIH1cblxuICBleHRyYWN0TGFiZWw6IExhYmVsRnVuY3Rpb24gPSAoaXRlbTogYW55KTogc3RyaW5nID0+IHtcbiAgICBsZXQgbGFiZWwgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gbGFiZWwgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLmxhYmVsRm4pIHsgLy8gVXNlIGN1c3RvbSBsYWJlbCBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IHRoaXMubGFiZWxGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sYWJlbEF0dHIpIHsgLy8gVXNlIG9iamVjdCBsYWJlbCBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgbGFiZWwgPSBpdGVtW3RoaXMubGFiZWxBdHRyXSB8fCB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxhYmVsID0gdGhpcy5lbnN1cmVTdHJpbmcobGFiZWwpO1xuICAgIHJldHVybiBsYWJlbDtcbiAgfVxuXG4gIHJlbW92ZShvcHRpb246IHN0cmluZyk6IHZvaWQge1xuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm9wdGlvbnNTZWxlY3RlZC5pbmRleE9mKG9wdGlvbik7XG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpO1xuXG4gIH1cblxuICBnZXRTZWxlY3RhYmxlT3B0aW9ucyA9IChvcHRpb25zKSA9PiB7XG5cbiAgICBjb25zdCBpc0FycmF5ID0gb3B0aW9ucyA/IEFycmF5LmlzQXJyYXkob3B0aW9ucykgOiBmYWxzZTtcblxuICAgIGxldCBzZWxlY3RhYmxlT3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBpZiAoaXNBcnJheSAmJiAhdGhpcy5yZXBlYXQpIHtcblxuICAgICAgc2VsZWN0YWJsZU9wdGlvbnMgPSBvcHRpb25zLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgICBpZiAoIXRoaXMucmVwZWF0KSB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShvcHRpb24pO1xuICAgICAgICAgIGxldCBhbHJlYWR5U2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgICAgICAgaWYgKHRoaXMubXVsdGkpIHtcbiAgICAgICAgICAgIGFscmVhZHlTZWxlY3RlZCA9IHRoaXMub3B0aW9uc1NlbGVjdGVkICYmIHRoaXMub3B0aW9uc1NlbGVjdGVkLmZpbmQoc2VsZWN0ZWQgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXNTdHJpbmcoc2VsZWN0ZWRWYWx1ZSwgb3B0aW9uVmFsdWUpO1xuICAgICAgICAgICAgfSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFscmVhZHlTZWxlY3RlZCA9IHRoaXMuY29tcGFyZUFzU3RyaW5nKHRoaXMudmFsdWUsIG9wdGlvblZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICFhbHJlYWR5U2VsZWN0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGFibGVPcHRpb25zO1xuICB9XG5cbiAgc2hvd0NsZWFyQnV0dG9uKCkge1xuICAgIGNvbnN0IHRoZXJlSXNWYWx1ZVNldCA9IHRoaXMuZGV0ZWN0SWZIYXNWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICBjb25zdCBzaG93ID0gIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVxdWlyZWQgJiYgdGhlcmVJc1ZhbHVlU2V0O1xuICAgIHJldHVybiBzaG93O1xuICB9XG5cbiAgc2hvd1Jlc2V0QnV0dG9uKCkge1xuICAgIGNvbnN0IHZhbHVlQXNTdHJpbmcgPSBBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpID8gSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSkgOiB0aGlzLnZhbHVlO1xuICAgIGNvbnN0IHdyaXR0ZW5WYWx1ZUFzU3RyaW5nID0gQXJyYXkuaXNBcnJheSh0aGlzLndyaXR0ZW5WYWx1ZSkgPyBKU09OLnN0cmluZ2lmeSh0aGlzLndyaXR0ZW5WYWx1ZSkgOiB0aGlzLndyaXR0ZW5WYWx1ZTtcbiAgICBjb25zdCBzaG93ID0gIXRoaXMuZGlzYWJsZWQgJiYgKHZhbHVlQXNTdHJpbmcgIT09IHdyaXR0ZW5WYWx1ZUFzU3RyaW5nKTtcbiAgICByZXR1cm4gc2hvdztcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0SWZIYXNWYWx1ZSh2YXJpYWJsZSkge1xuICAgIGxldCB0aGVyZUlzVmFsdWVTZXQgPSBmYWxzZTtcbiAgICBpZiAodmFyaWFibGUpIHtcbiAgICAgIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIHZhcmlhYmxlID09PSAnc3RyaW5nJztcbiAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICB0aGVyZUlzVmFsdWVTZXQgPSB2YXJpYWJsZS5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSh2YXJpYWJsZSk7XG4gICAgICAgIGlmIChpc0FycmF5KSB7XG4gICAgICAgICAgdGhlcmVJc1ZhbHVlU2V0ID0gdmFyaWFibGUubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoZXJlSXNWYWx1ZVNldCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoZXJlSXNWYWx1ZVNldDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5wdXRWYWx1ZSh2KSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5zZXRWYWx1ZSh2KTtcblxuICAgIGlmICghdikge1xuICAgICAgdGhpcy50ZXJtSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUodGV4dFNlYXJjaCwgcmVtZW1iZXJSZXNwb25zZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xuXG4gICAgICByZXR1cm4gdGhpcy5zZWFyY2hJbkxvY2FsT3B0aW9ucyh0ZXh0U2VhcmNoKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24odGV4dFNlYXJjaClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKG9wdGlvbnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25zdCBib2R5ID0gdGV4dFNlYXJjaCA/IHsgdGV4dFNlYXJjaCB9IDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAocmVtZW1iZXJSZXNwb25zZSkge1xuXG4gICAgICAgIGNvbnN0IGRhdGFJbk1lbW9yeSA9IHRoaXMucmVzcG9uc2VzW3RleHRTZWFyY2hdO1xuXG4gICAgICAgIGlmIChkYXRhSW5NZW1vcnkpIHtcblxuICAgICAgICAgIHJldHVybiBvZihkYXRhSW5NZW1vcnkpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldDxhbnlbXT4odGhpcy5lbmRwb2ludCwgYm9keSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICB0YXAoKG9wdGlvbnM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZXNbdGV4dFNlYXJjaF0gPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0PGFueVtdPih0aGlzLmVuZHBvaW50LCBib2R5KVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFwKChvcHRpb25zOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG5cbiAgICAgIH1cblxuXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hJbkxvY2FsT3B0aW9ucyh0ZXJtOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0ZXJtU3RyaW5nID0gYCR7dGVybX1gO1xuXG4gICAgbGV0IGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zO1xuXG4gICAgaWYgKHRlcm1TdHJpbmcpIHtcbiAgICAgIGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zXG4gICAgICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgY29uc3QgbGFiZWw6IHN0cmluZyA9IHRoaXMuZXh0cmFjdExhYmVsKGl0ZW0pO1xuICAgICAgICAgIGNvbnN0IGxvd2VyQ2FzZUxhYmVsID0gbGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBjb25zdCBsb3dlckNhc2VUZXJtID0gdGVybVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHJldHVybiBsb3dlckNhc2VMYWJlbC5zZWFyY2gobG93ZXJDYXNlVGVybSkgPj0gMDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mKGZpbHRlcmVkRGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHJhaXNlRXJyb3IoZXJyb3I6IHN0cmluZykge1xuICAgIHRocm93IG5ldyBFcnJvcihgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IEVycm9yOjogVGhlIGF1dG9jb21wbGV0ZSB3aXRoIG5hbWUgXCIke3RoaXMubmFtZX1cIiBoYWQgdGhlIGZvbGxvdyBwcm9ibGVtOiAke2Vycm9yfWApO1xuICB9XG5cblxuICBwcml2YXRlIGJsdXJJbnB1dCgpIHtcblxuICAgIHRoaXMudGVybUlucHV0Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuXG4gIH1cblxuICBwcml2YXRlIGFkZE9wdGlvblRvT3B0aW9uc1NlbGVjdGVkKG9wdGlvbik6IGJvb2xlYW4ge1xuXG4gICAgaWYgKG9wdGlvbikge1xuXG4gICAgICBsZXQgc2hvdWxkRW1pdCA9IHRydWU7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnNTZWxlY3RlZCAmJiB0aGlzLm9wdGlvbnNTZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm9wdGlvbnNTZWxlY3RlZC5pbmRleE9mKG9wdGlvbik7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZC5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKG51bGwpO1xuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWVXaXRoT3B0aW9uc1NlbGVjdGVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2hvdWxkRW1pdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZCA9IFtvcHRpb25dO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2hvdWxkRW1pdDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBwb3B1bGF0ZUF1dG9jb21wbGV0ZVdpdGhJbml0aWFsVmFsdWVzKHZhbHVlLCByZWxvYWRPcHRpb25zID0gZmFsc2UpIHtcblxuICAgIGlmICh2YWx1ZSkge1xuXG4gICAgICBpZiAodGhpcy5tdWx0aSkge1xuXG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcblxuICAgICAgICBpZiAoaXNBcnJheSkge1xuXG4gICAgICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQgPSBbXTtcblxuICAgICAgICAgIHZhbHVlLmZvckVhY2gob3B0aW9uVmFsdWUgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZShvcHRpb25WYWx1ZSlcbiAgICAgICAgICAgICAgLnRoZW4oKG9wdGlvbikgPT4ge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRPcHRpb25Ub09wdGlvbnNTZWxlY3RlZChvcHRpb24pO1xuXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMubG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKHZhbHVlKVxuICAgICAgICAgIC50aGVuKChvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldElubmVyVmFsdWUodmFsdWUpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLndyaXR0ZW5WYWx1ZTtcblxuICAgIH1cblxuXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpIHtcblxuICAgIGlmICh0aGlzLm9wdGlvbnNTZWxlY3RlZCAmJiB0aGlzLm9wdGlvbnNTZWxlY3RlZC5sZW5ndGgpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMub3B0aW9uc1NlbGVjdGVkLm1hcChvcHRpb24gPT4gdGhpcy5leHRyYWN0VmFsdWUob3B0aW9uKSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLnZhbHVlID0gW107XG5cbiAgICB9XG5cblxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUod3JpdHRlblZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3cml0dGVuVmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh3cml0dGVuVmFsdWUsIHRydWUpXG4gICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc1swXSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHdyaXR0ZW5WYWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFJlcXVpcmVkRGF0YSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgZXJyb3I6IHN0cmluZztcbiAgICAgIGlmICghdGhpcy5lbmRwb2ludCAmJiAhdGhpcy5vcHRpb25zICYmICF0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcbiAgICAgICAgZXJyb3IgPSAnTm8gZW5kcG9pbnQgfCBvcHRpb25zIHwgY3VzdG9tRmV0Y2hGdW5jdGlvbiBzZXQuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9mIHRoZW0gdG8gYmUgYWJsZSB0byB1c2UgdGhlIEF1dG9jb21wbGV0ZSc7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5yYWlzZUVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRJbnB1dENvbnRyb2woKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNQcmlzdGluZSgpO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzVW50b3VjaGVkKCk7XG4gICAgdGhpcy5ibHVySW5wdXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdFZhbHVlOiBWYWx1ZUZ1bmN0aW9uID0gKGl0ZW06IGFueSk6IGFueSA9PiB7XG4gICAgbGV0IHZhbHVlID0gaXRlbTsgLy8gdXNlIHRoZSBvYmplY3QgaXRzZWxmIGlmIG5vIHZhbHVlIGZ1bmN0aW9uIG9yIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZUZuKSB7IC8vIFVzZSBjdXN0b20gdmFsdWUgZnVuY3Rpb24gaWYgcHJvdmlkZWRcbiAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlRm4oaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWVBdHRyKSB7IC8vIFVzZSBvYmplY3QgdmFsdWUgYXR0cmlidXRlIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gaXRlbVt0aGlzLnZhbHVlQXR0cl0gfHwgdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGNvbXBhcmVBc1N0cmluZyh2MSwgdjIpIHtcbiAgICBjb25zdCBzdHJpbmcxID0gdGhpcy5lbnN1cmVTdHJpbmcodjEpO1xuICAgIGNvbnN0IHN0cmluZzIgPSB0aGlzLmVuc3VyZVN0cmluZyh2Mik7XG4gICAgcmV0dXJuIHN0cmluZzEgPT09IHN0cmluZzI7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVN0cmluZyh2KSB7XG4gICAgaWYgKHR5cGVvZiB2ICE9PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGlzTmFOKHYpKSB7XG4gICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYgPSBgJHt2fWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodik7XG4gIH1cblxuICBwcml2YXRlIHNldElucHV0VmFsdWVCYXNlZE9uSW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICBjb25zdCBvcHRpb24gPSB0aGlzLmdldE9wdGlvbkJhc2VkT25WYWx1ZSh2KTtcbiAgICB0aGlzLnNldElucHV0VmFsdWUob3B0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHY6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5maW5kKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgaXRlbVZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoaXRlbSk7XG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXNTdHJpbmcoaXRlbVZhbHVlLCB2KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9JbnB1dFZhbHVlQ2hhbmdlcygpIHtcblxuICAgIHRoaXMuc2VhcmNoSW5wdXRTdWJzY3JpcHRpb24gPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShzZWFyY2hUZXh0ID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2gkLm5leHQoc2VhcmNoVGV4dCk7XG4gICAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZUZyb21JbnB1dFZhbHVlQ2hhbmdlcygpIHtcblxuICAgIHRoaXMuc2VhcmNoSW5wdXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1NlYXJjaEFuZFNldE9wdGlvbnNPYnNlcnZhYmxlKCkge1xuICAgIHRoaXMub3B0aW9ucyQgPSB0aGlzLnNlYXJjaCRcbiAgICAgIC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBzd2l0Y2hNYXAoKHRleHRTZWFyY2g6IHN0cmluZykgPT4ge1xuXG4gICAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRleHRTZWFyY2ggfHwgJyc7XG5cbiAgICAgICAgICBjb25zdCBpc1N0cmluZ1Rlcm0gPSB0eXBlb2Ygc2VhcmNoVGVybSA9PT0gJ3N0cmluZyc7XG5cbiAgICAgICAgICBpZiAoaXNTdHJpbmdUZXJtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZShzZWFyY2hUZXJtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuaW5uZXJPcHRpb25zKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlRnJvbVNlYXJjaEFuZFNldE9wdGlvbnNPYnNlcnZhYmxlKCkge1xuXG4gICAgdGhpcy5zZWFyY2hJbnB1dFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gIH1cblxufVxuIl19