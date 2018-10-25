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
var noop = function () {
};
var ɵ0 = noop;
/** @type {?} */
var AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteComponent; }),
    multi: true
};
var DecAutocompleteComponent = /** @class */ (function () {
    function DecAutocompleteComponent(service) {
        var _this = this;
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
        this.extractLabel = function (item) {
            /** @type {?} */
            var label = item; // use the object itself if no label function or attribute is provided
            if (item) {
                if (_this.labelFn) {
                    // Use custom label function if provided
                    label = _this.labelFn(item);
                }
                else if (_this.labelAttr) {
                    // Use object label attribute if provided
                    label = item[_this.labelAttr] || undefined;
                }
            }
            label = _this.ensureString(label);
            return label;
        };
        this.getSelectableOptions = function (options) {
            /** @type {?} */
            var isArray = options ? Array.isArray(options) : false;
            /** @type {?} */
            var selectableOptions = options;
            if (isArray && !_this.repeat) {
                selectableOptions = options.filter(function (option) {
                    if (!_this.repeat) {
                        /** @type {?} */
                        var optionValue_1 = _this.extractValue(option);
                        /** @type {?} */
                        var alreadySelected = void 0;
                        if (_this.multi) {
                            alreadySelected = _this.optionsSelected && _this.optionsSelected.find(function (selected) {
                                /** @type {?} */
                                var selectedValue = _this.extractValue(selected);
                                return _this.compareAsString(selectedValue, optionValue_1);
                            }) ? true : false;
                        }
                        else {
                            alreadySelected = _this.compareAsString(_this.value, optionValue_1);
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
        this.extractValue = function (item) {
            /** @type {?} */
            var value = item; // use the object itself if no value function or attribute is provided
            if (item) {
                if (_this.valueFn) {
                    // Use custom value function if provided
                    value = _this.valueFn(item);
                }
                else if (_this.valueAttr) {
                    // Use object value attribute if provided
                    value = item[_this.valueAttr] || undefined;
                }
            }
            return value;
        };
    }
    Object.defineProperty(DecAutocompleteComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        /*
        ** ngModel VALUE
        */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.setInnerValue(v);
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._disabled = v;
            if (v) {
                this.autocompleteInput.disable();
            }
            else {
                this.autocompleteInput.enable();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this._options;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._options = v;
            this.innerOptions = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.detectRequiredData()
            .then(function () {
            _this.subscribeToInputValueChanges();
            _this.subscribeToSearchAndSetOptionsObservable();
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeFromInputValueChanges();
        this.unsubscribeFromSearchAndSetOptionsObservable();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.optionsSelected = [];
            this.writtenValue = value;
            this.innerValue = value;
            this.populateAutocompleteWithInitialValues(value, true);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteComponent.prototype.onOptionSelected = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var shouldEmit = true;
        /** @type {?} */
        var selectedOption = $event.option.value;
        /** @type {?} */
        var selectedOptionValue = this.extractValue(selectedOption);
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
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteComponent.prototype.onEnterButton = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.enterButton.emit($event);
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.setFocus = /**
     * @return {?}
     */
    function () {
        this.termInput.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.openPanel = /**
     * @return {?}
     */
    function () {
        this.autocompleteTrigger.openPanel();
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.closePanel = /**
     * @return {?}
     */
    function () {
        this.autocompleteTrigger.closePanel();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteComponent.prototype.onBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    /**
     * @param {?=} reopen
     * @return {?}
     */
    DecAutocompleteComponent.prototype.clear = /**
     * @param {?=} reopen
     * @return {?}
     */
    function (reopen) {
        var _this = this;
        if (reopen === void 0) { reopen = false; }
        this.value = undefined;
        this.optionsSelected = undefined;
        this.setInputValue('');
        if (this.writtenValue === this.value) {
            this.resetInputControl();
        }
        if (reopen) {
            setTimeout(function () {
                _this.openPanel();
            }, 1);
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.value = this.writtenValue;
        this.populateAutocompleteWithInitialValues(this.writtenValue);
        this.resetInputControl();
    };
    /**
     * @param {?} option
     * @return {?}
     */
    DecAutocompleteComponent.prototype.remove = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        /** @type {?} */
        var index = this.optionsSelected.indexOf(option);
        if (index >= 0) {
            this.optionsSelected.splice(index, 1);
        }
        this.updateValueWithOptionsSelected();
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.showClearButton = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var thereIsValueSet = this.detectIfHasValue(this.value);
        /** @type {?} */
        var show = !this.disabled && !this.required && thereIsValueSet;
        return show;
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.showResetButton = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var valueAsString = Array.isArray(this.value) ? JSON.stringify(this.value) : this.value;
        /** @type {?} */
        var writtenValueAsString = Array.isArray(this.writtenValue) ? JSON.stringify(this.writtenValue) : this.writtenValue;
        /** @type {?} */
        var show = !this.disabled && (valueAsString !== writtenValueAsString);
        return show;
    };
    /**
     * @param {?} variable
     * @return {?}
     */
    DecAutocompleteComponent.prototype.detectIfHasValue = /**
     * @param {?} variable
     * @return {?}
     */
    function (variable) {
        /** @type {?} */
        var thereIsValueSet = false;
        if (variable) {
            /** @type {?} */
            var isString = typeof variable === 'string';
            if (isString) {
                thereIsValueSet = variable.length;
            }
            else {
                /** @type {?} */
                var isArray = Array.isArray(variable);
                if (isArray) {
                    thereIsValueSet = variable.length;
                }
                else {
                    thereIsValueSet = true;
                }
            }
        }
        return thereIsValueSet;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.setInputValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.autocompleteInput.setValue(v);
        if (!v) {
            this.termInput.nativeElement.value = '';
        }
    };
    /**
     * @param {?} textSearch
     * @param {?=} rememberResponse
     * @return {?}
     */
    DecAutocompleteComponent.prototype.searchBasedFetchingType = /**
     * @param {?} textSearch
     * @param {?=} rememberResponse
     * @return {?}
     */
    function (textSearch, rememberResponse) {
        var _this = this;
        if (rememberResponse === void 0) { rememberResponse = false; }
        if (this.options) {
            return this.searchInLocalOptions(textSearch);
        }
        else if (this.customFetchFunction) {
            return this.customFetchFunction(textSearch)
                .pipe(tap(function (options) {
                _this.innerOptions = options;
            }));
        }
        else {
            /** @type {?} */
            var body = textSearch ? { textSearch: textSearch } : undefined;
            if (rememberResponse) {
                /** @type {?} */
                var dataInMemory = this.responses[textSearch];
                if (dataInMemory) {
                    return of(dataInMemory);
                }
                else {
                    return this.service.get(this.endpoint, body)
                        .pipe(tap(function (options) {
                        _this.responses[textSearch] = options;
                        _this.innerOptions = options;
                    }));
                }
            }
            else {
                return this.service.get(this.endpoint, body)
                    .pipe(tap(function (options) {
                    _this.innerOptions = options;
                }));
            }
        }
    };
    /**
     * @param {?} term
     * @return {?}
     */
    DecAutocompleteComponent.prototype.searchInLocalOptions = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        /** @type {?} */
        var termString = "" + term;
        /** @type {?} */
        var filteredData = this.innerOptions;
        if (termString) {
            filteredData = this.innerOptions
                .filter(function (item) {
                /** @type {?} */
                var label = _this.extractLabel(item);
                /** @type {?} */
                var lowerCaseLabel = label.toLowerCase();
                /** @type {?} */
                var lowerCaseTerm = termString.toLowerCase();
                return lowerCaseLabel.search(lowerCaseTerm) >= 0;
            });
        }
        return of(filteredData);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    DecAutocompleteComponent.prototype.raiseError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        throw new Error("DecAutocompleteComponent Error:: The autocomplete with name \"" + this.name + "\" had the follow problem: " + error);
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.blurInput = /**
     * @return {?}
     */
    function () {
        this.termInput.nativeElement.blur();
    };
    /**
     * @param {?} option
     * @return {?}
     */
    DecAutocompleteComponent.prototype.addOptionToOptionsSelected = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option) {
            /** @type {?} */
            var shouldEmit = true;
            if (this.optionsSelected && this.optionsSelected.length) {
                /** @type {?} */
                var index = this.optionsSelected.indexOf(option);
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
    };
    /**
     * @param {?} value
     * @param {?=} reloadOptions
     * @return {?}
     */
    DecAutocompleteComponent.prototype.populateAutocompleteWithInitialValues = /**
     * @param {?} value
     * @param {?=} reloadOptions
     * @return {?}
     */
    function (value, reloadOptions) {
        var _this = this;
        if (reloadOptions === void 0) { reloadOptions = false; }
        if (value) {
            if (this.multi) {
                /** @type {?} */
                var isArray = Array.isArray(value);
                if (isArray) {
                    this.optionsSelected = [];
                    value.forEach(function (optionValue) {
                        _this.loadRemoteObjectByWrittenValue(optionValue)
                            .then(function (option) {
                            _this.addOptionToOptionsSelected(option);
                        });
                    });
                }
            }
            else {
                this.loadRemoteObjectByWrittenValue(value)
                    .then(function (options) {
                    _this.setInnerValue(value);
                });
            }
        }
        else {
            // this.innerValue = this.writtenValue;
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.updateValueWithOptionsSelected = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.optionsSelected && this.optionsSelected.length) {
            this.value = this.optionsSelected.map(function (option) { return _this.extractValue(option); });
        }
        else {
            this.value = [];
        }
    };
    /**
     * @param {?} writtenValue
     * @return {?}
     */
    DecAutocompleteComponent.prototype.loadRemoteObjectByWrittenValue = /**
     * @param {?} writtenValue
     * @return {?}
     */
    function (writtenValue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (writtenValue) {
                _this.searchBasedFetchingType(writtenValue, true)
                    .subscribe(function (res) {
                    resolve(res[0]);
                });
            }
            else {
                resolve(writtenValue);
            }
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.detectRequiredData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            /** @type {?} */
            var error;
            if (!_this.endpoint && !_this.options && !_this.customFetchFunction) {
                error = 'No endpoint | options | customFetchFunction set. You must provide one of them to be able to use the Autocomplete';
            }
            if (error) {
                _this.raiseError(error);
                reject(error);
            }
            else {
                resolve();
            }
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.resetInputControl = /**
     * @return {?}
     */
    function () {
        this.autocompleteInput.markAsPristine();
        this.autocompleteInput.markAsUntouched();
        this.blurInput();
    };
    /**
     * @param {?} v1
     * @param {?} v2
     * @return {?}
     */
    DecAutocompleteComponent.prototype.compareAsString = /**
     * @param {?} v1
     * @param {?} v2
     * @return {?}
     */
    function (v1, v2) {
        /** @type {?} */
        var string1 = this.ensureString(v1);
        /** @type {?} */
        var string2 = this.ensureString(v2);
        return string1 === string2;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.ensureString = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        if (typeof v !== 'string') {
            if (isNaN(v)) {
                v = JSON.stringify(v);
            }
            else {
                v = "" + v;
            }
        }
        return v;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.setInnerValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.innerValue = v;
        this.setInputValueBasedOnInnerValue(v);
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.setInputValueBasedOnInnerValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        /** @type {?} */
        var option = this.getOptionBasedOnValue(v);
        this.setInputValue(option);
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.getOptionBasedOnValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        var _this = this;
        return this.innerOptions.find(function (item) {
            /** @type {?} */
            var itemValue = _this.extractValue(item);
            return _this.compareAsString(itemValue, v);
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.subscribeToInputValueChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.searchInputSubscription = this.autocompleteInput.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(function (searchText) {
            _this.search$.next(searchText);
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.unsubscribeFromInputValueChanges = /**
     * @return {?}
     */
    function () {
        this.searchInputSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.subscribeToSearchAndSetOptionsObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.options$ = this.search$
            .pipe(distinctUntilChanged(), switchMap(function (textSearch) {
            /** @type {?} */
            var searchTerm = textSearch || '';
            /** @type {?} */
            var isStringTerm = typeof searchTerm === 'string';
            if (isStringTerm) {
                return _this.searchBasedFetchingType(searchTerm);
            }
            else {
                return of(_this.innerOptions);
            }
        }));
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.unsubscribeFromSearchAndSetOptionsObservable = /**
     * @return {?}
     */
    function () {
        this.searchInputSubscription.unsubscribe();
    };
    DecAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete',
                    template: "<ng-container [ngSwitch]=\"multi ? true : false\">\n\n  <ng-container *ngSwitchCase=\"true\">\n    <mat-form-field>\n      <mat-chip-list #decAutocompleteChipList>\n        <mat-chip *ngFor=\"let option of optionsSelected\" [removable]=\"true\" (removed)=\"remove(option)\">\n          {{ extractLabel(option) }}\n          <mat-icon matChipRemove>cancel</mat-icon>\n        </mat-chip>\n        <input matInput [attr.aria-label]=\"name\" #termInput [matAutocomplete]=\"decAutocomplete\" [formControl]=\"autocompleteInput\"\n          [name]=\"name\" [required]=\"required\" [placeholder]=\"placeholder\" (keyup.enter)=\"onEnterButton($event)\" (blur)=\"onBlur($event)\"\n          autocomplete=\"off\" readonly onfocus=\"this.removeAttribute('readonly');\"\n          [matChipInputFor]=\"decAutocompleteChipList\" [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\">\n        <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"showClearButton()\">\n          <mat-icon>close</mat-icon>\n        </button>\n        <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"showResetButton()\">\n          <mat-icon>replay</mat-icon>\n        </button>\n      </mat-chip-list>\n      <mat-autocomplete #decAutocomplete=\"matAutocomplete\" [displayWith]=\"extractLabel\" (optionSelected)=\"onOptionSelected($event)\"\n        name=\"autocompleteValue\">\n        <mat-option *ngFor=\"let item of getSelectableOptions(options$ | async)\" [value]=\"item\">\n          {{ extractLabel(item) }}\n        </mat-option>\n      </mat-autocomplete>\n    </mat-form-field>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"false\">\n    <mat-form-field>\n      <input matInput [attr.aria-label]=\"name\" #termInput [matAutocomplete]=\"decAutocomplete\" [formControl]=\"autocompleteInput\"\n        [name]=\"name\" [required]=\"required\" [placeholder]=\"placeholder\" (keyup.enter)=\"onEnterButton($event)\" (blur)=\"onBlur($event)\"\n        autocomplete=\"off\" readonly onfocus=\"this.removeAttribute('readonly');\">\n      <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"showClearButton()\">\n        <mat-icon>close</mat-icon>\n      </button>\n      <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"showResetButton()\">\n        <mat-icon>replay</mat-icon>\n      </button>\n    </mat-form-field>\n    <mat-autocomplete #decAutocomplete=\"matAutocomplete\" [displayWith]=\"extractLabel\" (optionSelected)=\"onOptionSelected($event)\"\n      name=\"autocompleteValue\">\n      <mat-option *ngIf=\"!required\" [value]=\"\"></mat-option>\n      <mat-option *ngFor=\"let item of getSelectableOptions(options$ | async)\" [value]=\"item\">\n        {{ extractLabel(item) }}\n      </mat-option>\n    </mat-autocomplete>\n  </ng-container>\n\n</ng-container>\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
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
    return DecAutocompleteComponent;
}());
export { DecAutocompleteComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBYSxHQUFHLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RyxPQUFPLEVBQUUsc0JBQXNCLEVBQXFCLE1BQU0sbUJBQW1CLENBQUM7O0FBRzlFLElBQU0sSUFBSSxHQUFHO0NBQ1osQ0FBQzs7O0FBR0YsSUFBTSxtQ0FBbUMsR0FBUTtJQUMvQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHdCQUF3QixFQUF4QixDQUF3QixDQUFDO0lBQ3ZELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7SUF3S0Esa0NBQ1U7UUFEVixpQkFFSztRQURLLFlBQU8sR0FBUCxPQUFPO2lDQTFHRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7a0NBUVIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO29CQXlDN0IsbUJBQW1COzJCQVdaLEVBQUU7O29CQVNXLElBQUksWUFBWSxFQUFPOzhCQUVGLElBQUksWUFBWSxFQUFrQjsyQkFFckMsSUFBSSxZQUFZLEVBQWtCOzRCQVkxRCxFQUFFO3lCQUVZLEVBQUU7dUJBRTVCLElBQUksZUFBZSxDQUFTLFNBQVMsQ0FBQztpQ0FZaEIsSUFBSTtnQ0FFQyxJQUFJOzRCQXVIbkIsVUFBQyxJQUFTOztZQUN0QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7b0JBQ2pCLEtBQUssR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O29CQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUM7aUJBQzNDO2FBQ0Y7WUFDRCxLQUFLLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7b0NBY3NCLFVBQUMsT0FBTzs7WUFFN0IsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7O1lBRXpELElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDO1lBRWhDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTTtvQkFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7d0JBQ2pCLElBQU0sYUFBVyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7O3dCQUM5QyxJQUFJLGVBQWUsVUFBVTt3QkFDN0IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ2YsZUFBZSxHQUFHLEtBQUksQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFROztnQ0FDMUUsSUFBTSxhQUFhLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDbEQsTUFBTSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLGFBQVcsQ0FBQyxDQUFDOzZCQUN6RCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3lCQUNuQjt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixlQUFlLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLGFBQVcsQ0FBQyxDQUFDO3lCQUNqRTt3QkFDRCxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUM7cUJBQ3pCO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7cUJBQ2I7aUJBQ0YsQ0FBQyxDQUFDO2FBRUo7WUFFRCxNQUFNLENBQUMsaUJBQWlCLENBQUM7U0FDMUI7NEJBc1BxQyxVQUFDLElBQVM7O1lBQzlDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNULEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztvQkFDakIsS0FBSyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7b0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztpQkFDM0M7YUFDRjtZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtLQXphSTtJQTlGTCxzQkFBSSwyQ0FBSzs7OztRQU1UO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFYRDs7VUFFRTs7Ozs7UUFDRixVQUFVLENBQU07WUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNGOzs7T0FBQTtJQWNELHNCQUNJLDhDQUFROzs7O1FBUVo7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2Qjs7Ozs7UUFYRCxVQUNhLENBQVU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakM7U0FDRjs7O09BQUE7SUFXRCxzQkFDSSw2Q0FBTzs7OztRQUlYO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEI7Ozs7O1FBUEQsVUFDWSxDQUFRO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCOzs7T0FBQTs7OztJQXNERCxrREFBZTs7O0lBQWY7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTthQUN4QixJQUFJLENBQUM7WUFDSixLQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztZQUNwQyxLQUFJLENBQUMsd0NBQXdDLEVBQUUsQ0FBQztTQUNqRCxDQUFDLENBQUM7S0FDSjs7OztJQUVELDhDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyw0Q0FBNEMsRUFBRSxDQUFDO0tBQ3JEOzs7OztJQUVELG1EQUFnQjs7OztJQUFoQixVQUFpQixFQUFPO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDNUI7Ozs7O0lBRUQsb0RBQWlCOzs7O0lBQWpCLFVBQWtCLEVBQU87UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCxpREFBYzs7OztJQUFkLFVBQWUsS0FBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCw2Q0FBVTs7OztJQUFWLFVBQVcsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFHLEtBQU8sS0FBSyxLQUFHLElBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQyxDQUFDOztZQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMscUNBQXFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pEO0tBQ0Y7Ozs7O0lBRUQsbURBQWdCOzs7O0lBQWhCLFVBQWlCLE1BQU07O1FBRXJCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQzs7UUFFdEIsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7O1FBRTNDLElBQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU5RCxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUV2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFZixVQUFVLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUU3RCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBRS9CO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRU4sSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQzthQUVsQztZQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsTUFBTSxFQUFFLGNBQWM7b0JBQ3RCLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTtpQkFDM0IsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FFbEI7S0FFRjs7Ozs7SUFFRCxnREFBYTs7OztJQUFiLFVBQWMsTUFBTTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQjs7OztJQUVELDJDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3RDOzs7O0lBRUQsNENBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3RDOzs7O0lBRUQsNkNBQVU7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ3ZDOzs7OztJQUVELHlDQUFNOzs7O0lBQU4sVUFBTyxNQUFNO1FBQ1gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7OztJQUVELHdDQUFLOzs7O0lBQUwsVUFBTSxNQUFjO1FBQXBCLGlCQWNDO1FBZEssdUJBQUEsRUFBQSxjQUFjO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxVQUFVLENBQUM7Z0JBQ1QsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDUDtLQUNGOzs7O0lBRUQsd0NBQUs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQy9CLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDMUI7Ozs7O0lBZUQseUNBQU07Ozs7SUFBTixVQUFPLE1BQWM7O1FBRW5CLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5ELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7S0FFdkM7Ozs7SUFpQ0Qsa0RBQWU7OztJQUFmOztRQUNFLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBQzFELElBQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksZUFBZSxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7OztJQUVELGtEQUFlOzs7SUFBZjs7UUFDRSxJQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBQzFGLElBQU0sb0JBQW9CLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUN0SCxJQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxhQUFhLEtBQUssb0JBQW9CLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2I7Ozs7O0lBRU8sbURBQWdCOzs7O2NBQUMsUUFBUTs7UUFDL0IsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBQ2IsSUFBTSxRQUFRLEdBQUcsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsZUFBZSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7YUFDbkM7WUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ04sSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDWixlQUFlLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDbkM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sZUFBZSxHQUFHLElBQUksQ0FBQztpQkFDeEI7YUFDRjtTQUNGO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7Ozs7O0lBR2pCLGdEQUFhOzs7O2NBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDekM7Ozs7Ozs7SUFHSywwREFBdUI7Ozs7O2NBQUMsVUFBVSxFQUFFLGdCQUF3Qjs7UUFBeEIsaUNBQUEsRUFBQSx3QkFBd0I7UUFFbEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFakIsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUU5QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBRXBDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDO2lCQUN4QyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUEsT0FBTztnQkFDVCxLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQzthQUM3QixDQUFDLENBQ0gsQ0FBQztTQUVMO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBRU4sSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsWUFBQSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUVyRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7O2dCQUVyQixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVoRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUVqQixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUV6QjtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7eUJBQ2hELElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQyxPQUFjO3dCQUNqQixLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQzt3QkFDckMsS0FBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7cUJBQzdCLENBQUMsQ0FDSCxDQUFDO2lCQUVMO2FBRUY7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7cUJBQ2hELElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQyxPQUFjO29CQUNqQixLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztpQkFDN0IsQ0FBQyxDQUNILENBQUM7YUFFTDtTQUdGOzs7Ozs7SUFHSyx1REFBb0I7Ozs7Y0FBQyxJQUFZOzs7UUFDdkMsSUFBTSxVQUFVLEdBQUcsS0FBRyxJQUFNLENBQUM7O1FBRTdCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFckMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNmLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWTtpQkFDN0IsTUFBTSxDQUFDLFVBQUEsSUFBSTs7Z0JBQ1YsSUFBTSxLQUFLLEdBQVcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQzlDLElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Z0JBQzNDLElBQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xELENBQUMsQ0FBQztTQUNOO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Ozs7O0lBR2xCLDZDQUFVOzs7O2NBQUMsS0FBYTtRQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLG1FQUFnRSxJQUFJLENBQUMsSUFBSSxtQ0FBNkIsS0FBTyxDQUFDLENBQUM7Ozs7O0lBSXpILDRDQUFTOzs7O1FBRWYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7OztJQUk5Qiw2REFBMEI7Ozs7Y0FBQyxNQUFNO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBRVgsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRXRCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztnQkFDeEQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztpQkFDdkM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sVUFBVSxHQUFHLEtBQUssQ0FBQztpQkFDcEI7YUFDRjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7YUFDdkM7WUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDO1NBRW5CO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixNQUFNLENBQUMsS0FBSyxDQUFDO1NBRWQ7Ozs7Ozs7SUFJSyx3RUFBcUM7Ozs7O2NBQUMsS0FBSyxFQUFFLGFBQXFCOztRQUFyQiw4QkFBQSxFQUFBLHFCQUFxQjtRQUV4RSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRVYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O2dCQUVmLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXJDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBRVosSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7b0JBRTFCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXO3dCQUV2QixLQUFJLENBQUMsOEJBQThCLENBQUMsV0FBVyxDQUFDOzZCQUM3QyxJQUFJLENBQUMsVUFBQyxNQUFNOzRCQUVYLEtBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFFekMsQ0FBQyxDQUFDO3FCQUVOLENBQUMsQ0FBQztpQkFFSjthQUVGO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRU4sSUFBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQztxQkFDdkMsSUFBSSxDQUFDLFVBQUMsT0FBTztvQkFDWixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMzQixDQUFDLENBQUM7YUFFTjtTQUVGO1FBQUMsSUFBSSxDQUFDLENBQUM7O1NBSVA7Ozs7O0lBS0ssaUVBQThCOzs7OztRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1NBRTVFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUVqQjs7Ozs7O0lBS0ssaUVBQThCOzs7O2NBQUMsWUFBaUI7O1FBQ3RELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBTSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDO3FCQUM3QyxTQUFTLENBQUMsVUFBQyxHQUFHO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakIsQ0FBQyxDQUFDO2FBQ047WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDdkI7U0FDRixDQUFDLENBQUM7Ozs7O0lBR0cscURBQWtCOzs7OztRQUN4QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTs7WUFDakMsSUFBSSxLQUFLLENBQVM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLEtBQUssR0FBRyxrSEFBa0gsQ0FBQzthQUM1SDtZQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2Y7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0YsQ0FBQyxDQUFDOzs7OztJQUdHLG9EQUFpQjs7OztRQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7OztJQWVYLGtEQUFlOzs7OztjQUFDLEVBQUUsRUFBRSxFQUFFOztRQUM1QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUN0QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDOzs7Ozs7SUFHckIsK0NBQVk7Ozs7Y0FBQyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLENBQUMsR0FBRyxLQUFHLENBQUcsQ0FBQzthQUNaO1NBQ0Y7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFHSCxnREFBYTs7OztjQUFDLENBQU07UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFHakMsaUVBQThCOzs7O2NBQUMsQ0FBTTs7UUFDM0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztJQUdyQix3REFBcUI7Ozs7Y0FBQyxDQUFNOztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJOztZQUNoQyxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQyxDQUFDLENBQUM7Ozs7O0lBR0csK0RBQTRCOzs7OztRQUVsQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVk7YUFDL0QsSUFBSSxDQUNILFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsb0JBQW9CLEVBQUUsQ0FDdkI7YUFDQSxTQUFTLENBQUMsVUFBQSxVQUFVO1lBQ25CLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQzs7Ozs7SUFJQyxtRUFBZ0M7Ozs7UUFFdEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OztJQUlyQywyRUFBd0M7Ozs7O1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDekIsSUFBSSxDQUNILG9CQUFvQixFQUFFLEVBQ3RCLFNBQVMsQ0FBQyxVQUFDLFVBQWtCOztZQUUzQixJQUFNLFVBQVUsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFDOztZQUVwQyxJQUFNLFlBQVksR0FBRyxPQUFPLFVBQVUsS0FBSyxRQUFRLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakIsTUFBTSxDQUFDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNqRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzlCO1NBRUYsQ0FBQyxDQUNILENBQUM7Ozs7O0lBR0UsK0VBQTRDOzs7O1FBRWxELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7O2dCQTlwQjlDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsdXZGQW1EWDtvQkFDQyxNQUFNLEVBQUUsRUFBRTtvQkFDVixTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDakQ7Ozs7Z0JBekVRLGFBQWE7OztzQ0E0RW5CLFNBQVMsU0FBQyxzQkFBc0I7c0NBMEJoQyxLQUFLOzJCQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxLQUFLOzJCQUVMLEtBQUs7MEJBYUwsS0FBSzs0QkFFTCxLQUFLO3VCQUVMLEtBQUs7MEJBRUwsS0FBSzs4QkFTTCxLQUFLOzJCQUVMLEtBQUs7MEJBRUwsS0FBSzs0QkFFTCxLQUFLO3VCQUdMLE1BQU07aUNBRU4sTUFBTTs4QkFFTixNQUFNOzRCQUdOLFNBQVMsU0FBQyxXQUFXOzJCQUVyQixTQUFTLFNBQUMsVUFBVTs7bUNBL0p2Qjs7U0E2RWEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT01NQSwgRU5URVIgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAsIHN0YXJ0V2l0aCwgdGFwLCBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhYmVsRnVuY3Rpb24sIFZhbHVlRnVuY3Rpb24sIFNlbGVjdGlvbkV2ZW50LCBDdXN0b21GZXRjaEZ1bmN0aW9uIH0gZnJvbSAnLi9hdXRvY29tcGxldGUubW9kZWxzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIsIE1hdENoaXBJbnB1dEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtdWx0aSA/IHRydWUgOiBmYWxzZVwiPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICA8bWF0LWNoaXAtbGlzdCAjZGVjQXV0b2NvbXBsZXRlQ2hpcExpc3Q+XG4gICAgICAgIDxtYXQtY2hpcCAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNTZWxlY3RlZFwiIFtyZW1vdmFibGVdPVwidHJ1ZVwiIChyZW1vdmVkKT1cInJlbW92ZShvcHRpb24pXCI+XG4gICAgICAgICAge3sgZXh0cmFjdExhYmVsKG9wdGlvbikgfX1cbiAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICA8L21hdC1jaGlwPlxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCIgI3Rlcm1JbnB1dCBbbWF0QXV0b2NvbXBsZXRlXT1cImRlY0F1dG9jb21wbGV0ZVwiIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVJbnB1dFwiXG4gICAgICAgICAgW25hbWVdPVwibmFtZVwiIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIChrZXl1cC5lbnRlcik9XCJvbkVudGVyQnV0dG9uKCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcmVhZG9ubHkgb25mb2N1cz1cInRoaXMucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1wiXG4gICAgICAgICAgW21hdENoaXBJbnB1dEZvcl09XCJkZWNBdXRvY29tcGxldGVDaGlwTGlzdFwiIFttYXRDaGlwSW5wdXRTZXBhcmF0b3JLZXlDb2Rlc109XCJzZXBhcmF0b3JLZXlzQ29kZXNcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjbGVhcih0cnVlKVwiICpuZ0lmPVwic2hvd0NsZWFyQnV0dG9uKClcIj5cbiAgICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJyZXNldCgpXCIgKm5nSWY9XCJzaG93UmVzZXRCdXR0b24oKVwiPlxuICAgICAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvbWF0LWNoaXAtbGlzdD5cbiAgICAgIDxtYXQtYXV0b2NvbXBsZXRlICNkZWNBdXRvY29tcGxldGU9XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZXh0cmFjdExhYmVsXCIgKG9wdGlvblNlbGVjdGVkKT1cIm9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgIG5hbWU9XCJhdXRvY29tcGxldGVWYWx1ZVwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBnZXRTZWxlY3RhYmxlT3B0aW9ucyhvcHRpb25zJCB8IGFzeW5jKVwiIFt2YWx1ZV09XCJpdGVtXCI+XG4gICAgICAgICAge3sgZXh0cmFjdExhYmVsKGl0ZW0pIH19XG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiPlxuICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgIDxpbnB1dCBtYXRJbnB1dCBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIiAjdGVybUlucHV0IFttYXRBdXRvY29tcGxldGVdPVwiZGVjQXV0b2NvbXBsZXRlXCIgW2Zvcm1Db250cm9sXT1cImF1dG9jb21wbGV0ZUlucHV0XCJcbiAgICAgICAgW25hbWVdPVwibmFtZVwiIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIChrZXl1cC5lbnRlcik9XCJvbkVudGVyQnV0dG9uKCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHJlYWRvbmx5IG9uZm9jdXM9XCJ0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcIj5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY2xlYXIodHJ1ZSlcIiAqbmdJZj1cInNob3dDbGVhckJ1dHRvbigpXCI+XG4gICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwicmVzZXQoKVwiICpuZ0lmPVwic2hvd1Jlc2V0QnV0dG9uKClcIj5cbiAgICAgICAgPG1hdC1pY29uPnJlcGxheTwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDxtYXQtYXV0b2NvbXBsZXRlICNkZWNBdXRvY29tcGxldGU9XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZXh0cmFjdExhYmVsXCIgKG9wdGlvblNlbGVjdGVkKT1cIm9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICBuYW1lPVwiYXV0b2NvbXBsZXRlVmFsdWVcIj5cbiAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwiIXJlcXVpcmVkXCIgW3ZhbHVlXT1cIlwiPjwvbWF0LW9wdGlvbj5cbiAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdldFNlbGVjdGFibGVPcHRpb25zKG9wdGlvbnMkIHwgYXN5bmMpXCIgW3ZhbHVlXT1cIml0ZW1cIj5cbiAgICAgICAge3sgZXh0cmFjdExhYmVsKGl0ZW0pIH19XG4gICAgICA8L21hdC1vcHRpb24+XG4gICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICA8L25nLWNvbnRhaW5lcj5cblxuPC9uZy1jb250YWluZXI+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQFZpZXdDaGlsZChNYXRBdXRvY29tcGxldGVUcmlnZ2VyKSBhdXRvY29tcGxldGVUcmlnZ2VyOiBNYXRBdXRvY29tcGxldGVUcmlnZ2VyO1xuXG4gIGF1dG9jb21wbGV0ZUlucHV0ID0gbmV3IEZvcm1Db250cm9sKCcnKTtcblxuICBvcHRpb25zJDogT2JzZXJ2YWJsZTxhbnlbXT47XG5cbiAgb3B0aW9uc1NlbGVjdGVkOiBhbnlbXTtcblxuICB3cml0dGVuVmFsdWU6IGFueTtcblxuICBzZXBhcmF0b3JLZXlzQ29kZXM6IG51bWJlcltdID0gW0VOVEVSLCBDT01NQV07XG5cbiAgLypcbiAgKiogbmdNb2RlbCBWQUxVRVxuICAqL1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5zZXRJbm5lclZhbHVlKHYpO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gUGFyYW1zXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoRnVuY3Rpb246IEN1c3RvbUZldGNoRnVuY3Rpb247XG5cbiAgQElucHV0KCkgZW5kcG9pbnQ7XG5cbiAgQElucHV0KCkgbXVsdGk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVwZWF0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmRpc2FibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5lbmFibGUoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGxhYmVsRm46IExhYmVsRnVuY3Rpb247XG5cbiAgQElucHV0KCkgbGFiZWxBdHRyOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbmFtZSA9ICdhdXRvY29tcGxldGVJbnB1dCc7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnModjogYW55W10pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gdjtcbiAgICB0aGlzLmlubmVyT3B0aW9ucyA9IHY7XG4gIH1cbiAgZ2V0IG9wdGlvbnMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSB2YWx1ZUZuOiBWYWx1ZUZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIHZhbHVlQXR0cjogc3RyaW5nO1xuXG4gIC8vIEV2ZW50c1xuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PigpO1xuXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+KCk7XG5cbiAgLy8gVmlldyBlbGVtZW50c1xuICBAVmlld0NoaWxkKCd0ZXJtSW5wdXQnKSB0ZXJtSW5wdXQ7XG5cbiAgQFZpZXdDaGlsZCgnY2hpcExpc3QnKSBjaGlwTGlzdDtcblxuICAvLyBwcml2YXRlIGRhdGE7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX29wdGlvbnM6IGFueVtdO1xuXG4gIHByaXZhdGUgaW5uZXJPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIHByaXZhdGUgcmVzcG9uc2VzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgcHJpdmF0ZSBzZWFyY2gkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSBzZWFyY2hJbnB1dFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRldGVjdFJlcXVpcmVkRGF0YSgpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb0lucHV0VmFsdWVDaGFuZ2VzKCk7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVGcm9tSW5wdXRWYWx1ZUNoYW5nZXMoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbVNlYXJjaEFuZFNldE9wdGlvbnNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkID0gW107XG4gICAgICB0aGlzLndyaXR0ZW5WYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnBvcHVsYXRlQXV0b2NvbXBsZXRlV2l0aEluaXRpYWxWYWx1ZXModmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KSB7XG5cbiAgICBsZXQgc2hvdWxkRW1pdCA9IHRydWU7XG5cbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9ICRldmVudC5vcHRpb24udmFsdWU7XG5cbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvblZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoc2VsZWN0ZWRPcHRpb24pO1xuXG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uVmFsdWUgIT09IHRoaXMudmFsdWUpIHtcblxuICAgICAgaWYgKHRoaXMubXVsdGkpIHtcblxuICAgICAgICBzaG91bGRFbWl0ID0gdGhpcy5hZGRPcHRpb25Ub09wdGlvbnNTZWxlY3RlZChzZWxlY3RlZE9wdGlvbik7XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHVuZGVmaW5lZCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkT3B0aW9uVmFsdWU7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHNob3VsZEVtaXQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICBvcHRpb246IHNlbGVjdGVkT3B0aW9uLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMuaW5uZXJPcHRpb25zLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ibHVySW5wdXQoKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25FbnRlckJ1dHRvbigkZXZlbnQpIHtcbiAgICB0aGlzLmVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KTtcbiAgfVxuXG4gIHNldEZvY3VzKCkge1xuICAgIHRoaXMudGVybUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIG9wZW5QYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIub3BlblBhbmVsKCk7XG4gIH1cblxuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVHJpZ2dlci5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBvbkJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY2xlYXIocmVvcGVuID0gZmFsc2UpIHtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSgnJyk7XG5cbiAgICBpZiAodGhpcy53cml0dGVuVmFsdWUgPT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgICB9XG5cbiAgICBpZiAocmVvcGVuKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH0sIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLndyaXR0ZW5WYWx1ZTtcbiAgICB0aGlzLnBvcHVsYXRlQXV0b2NvbXBsZXRlV2l0aEluaXRpYWxWYWx1ZXModGhpcy53cml0dGVuVmFsdWUpO1xuICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgfVxuXG4gIGV4dHJhY3RMYWJlbDogTGFiZWxGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGxldCBsYWJlbCA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyBsYWJlbCBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMubGFiZWxGbikgeyAvLyBVc2UgY3VzdG9tIGxhYmVsIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIGxhYmVsID0gdGhpcy5sYWJlbEZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxhYmVsQXR0cikgeyAvLyBVc2Ugb2JqZWN0IGxhYmVsIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IGl0ZW1bdGhpcy5sYWJlbEF0dHJdIHx8IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFiZWwgPSB0aGlzLmVuc3VyZVN0cmluZyhsYWJlbCk7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG5cbiAgcmVtb3ZlKG9wdGlvbjogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMub3B0aW9uc1NlbGVjdGVkLmluZGV4T2Yob3B0aW9uKTtcblxuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlVmFsdWVXaXRoT3B0aW9uc1NlbGVjdGVkKCk7XG5cbiAgfVxuXG4gIGdldFNlbGVjdGFibGVPcHRpb25zID0gKG9wdGlvbnMpID0+IHtcblxuICAgIGNvbnN0IGlzQXJyYXkgPSBvcHRpb25zID8gQXJyYXkuaXNBcnJheShvcHRpb25zKSA6IGZhbHNlO1xuXG4gICAgbGV0IHNlbGVjdGFibGVPcHRpb25zID0gb3B0aW9ucztcblxuICAgIGlmIChpc0FycmF5ICYmICF0aGlzLnJlcGVhdCkge1xuXG4gICAgICBzZWxlY3RhYmxlT3B0aW9ucyA9IG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5yZXBlYXQpIHtcbiAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKG9wdGlvbik7XG4gICAgICAgICAgbGV0IGFscmVhZHlTZWxlY3RlZDogYm9vbGVhbjtcbiAgICAgICAgICBpZiAodGhpcy5tdWx0aSkge1xuICAgICAgICAgICAgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5vcHRpb25zU2VsZWN0ZWQgJiYgdGhpcy5vcHRpb25zU2VsZWN0ZWQuZmluZChzZWxlY3RlZCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShzZWxlY3RlZCk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBc1N0cmluZyhzZWxlY3RlZFZhbHVlLCBvcHRpb25WYWx1ZSk7XG4gICAgICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5jb21wYXJlQXNTdHJpbmcodGhpcy52YWx1ZSwgb3B0aW9uVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gIWFscmVhZHlTZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0YWJsZU9wdGlvbnM7XG4gIH1cblxuICBzaG93Q2xlYXJCdXR0b24oKSB7XG4gICAgY29uc3QgdGhlcmVJc1ZhbHVlU2V0ID0gdGhpcy5kZXRlY3RJZkhhc1ZhbHVlKHRoaXMudmFsdWUpO1xuICAgIGNvbnN0IHNob3cgPSAhdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZXF1aXJlZCAmJiB0aGVyZUlzVmFsdWVTZXQ7XG4gICAgcmV0dXJuIHNob3c7XG4gIH1cblxuICBzaG93UmVzZXRCdXR0b24oKSB7XG4gICAgY29uc3QgdmFsdWVBc1N0cmluZyA9IEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkgPyBKU09OLnN0cmluZ2lmeSh0aGlzLnZhbHVlKSA6IHRoaXMudmFsdWU7XG4gICAgY29uc3Qgd3JpdHRlblZhbHVlQXNTdHJpbmcgPSBBcnJheS5pc0FycmF5KHRoaXMud3JpdHRlblZhbHVlKSA/IEpTT04uc3RyaW5naWZ5KHRoaXMud3JpdHRlblZhbHVlKSA6IHRoaXMud3JpdHRlblZhbHVlO1xuICAgIGNvbnN0IHNob3cgPSAhdGhpcy5kaXNhYmxlZCAmJiAodmFsdWVBc1N0cmluZyAhPT0gd3JpdHRlblZhbHVlQXNTdHJpbmcpO1xuICAgIHJldHVybiBzaG93O1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RJZkhhc1ZhbHVlKHZhcmlhYmxlKSB7XG4gICAgbGV0IHRoZXJlSXNWYWx1ZVNldCA9IGZhbHNlO1xuICAgIGlmICh2YXJpYWJsZSkge1xuICAgICAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2YgdmFyaWFibGUgPT09ICdzdHJpbmcnO1xuICAgICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICAgIHRoZXJlSXNWYWx1ZVNldCA9IHZhcmlhYmxlLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhcmlhYmxlKTtcbiAgICAgICAgaWYgKGlzQXJyYXkpIHtcbiAgICAgICAgICB0aGVyZUlzVmFsdWVTZXQgPSB2YXJpYWJsZS5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhlcmVJc1ZhbHVlU2V0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhlcmVJc1ZhbHVlU2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dFZhbHVlKHYpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnNldFZhbHVlKHYpO1xuXG4gICAgaWYgKCF2KSB7XG4gICAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh0ZXh0U2VhcmNoLCByZW1lbWJlclJlc3BvbnNlID0gZmFsc2UpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaEluTG9jYWxPcHRpb25zKHRleHRTZWFyY2gpO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcblxuICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbih0ZXh0U2VhcmNoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAob3B0aW9ucyA9PiB7XG4gICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbnN0IGJvZHkgPSB0ZXh0U2VhcmNoID8geyB0ZXh0U2VhcmNoIH0gOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChyZW1lbWJlclJlc3BvbnNlKSB7XG5cbiAgICAgICAgY29uc3QgZGF0YUluTWVtb3J5ID0gdGhpcy5yZXNwb25zZXNbdGV4dFNlYXJjaF07XG5cbiAgICAgICAgaWYgKGRhdGFJbk1lbW9yeSkge1xuXG4gICAgICAgICAgcmV0dXJuIG9mKGRhdGFJbk1lbW9yeSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0PGFueVtdPih0aGlzLmVuZHBvaW50LCBib2R5KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIHRhcCgob3B0aW9uczogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlc1t0ZXh0U2VhcmNoXSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXQ8YW55W10+KHRoaXMuZW5kcG9pbnQsIGJvZHkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YXAoKG9wdGlvbnM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcblxuICAgICAgfVxuXG5cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEluTG9jYWxPcHRpb25zKHRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHRlcm1TdHJpbmcgPSBgJHt0ZXJtfWA7XG5cbiAgICBsZXQgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnM7XG5cbiAgICBpZiAodGVybVN0cmluZykge1xuICAgICAgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnNcbiAgICAgICAgLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICBjb25zdCBsYWJlbDogc3RyaW5nID0gdGhpcy5leHRyYWN0TGFiZWwoaXRlbSk7XG4gICAgICAgICAgY29uc3QgbG93ZXJDYXNlTGFiZWwgPSBsYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGNvbnN0IGxvd2VyQ2FzZVRlcm0gPSB0ZXJtU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgcmV0dXJuIGxvd2VyQ2FzZUxhYmVsLnNlYXJjaChsb3dlckNhc2VUZXJtKSA+PSAwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YoZmlsdGVyZWREYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgcmFpc2VFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgRXJyb3I6OiBUaGUgYXV0b2NvbXBsZXRlIHdpdGggbmFtZSBcIiR7dGhpcy5uYW1lfVwiIGhhZCB0aGUgZm9sbG93IHByb2JsZW06ICR7ZXJyb3J9YCk7XG4gIH1cblxuXG4gIHByaXZhdGUgYmx1cklucHV0KCkge1xuXG4gICAgdGhpcy50ZXJtSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgYWRkT3B0aW9uVG9PcHRpb25zU2VsZWN0ZWQob3B0aW9uKTogYm9vbGVhbiB7XG5cbiAgICBpZiAob3B0aW9uKSB7XG5cbiAgICAgIGxldCBzaG91bGRFbWl0ID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9uc1NlbGVjdGVkICYmIHRoaXMub3B0aW9uc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMub3B0aW9uc1NlbGVjdGVkLmluZGV4T2Yob3B0aW9uKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkLnB1c2gob3B0aW9uKTtcbiAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobnVsbCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZVdpdGhPcHRpb25zU2VsZWN0ZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaG91bGRFbWl0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkID0gW29wdGlvbl07XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWVXaXRoT3B0aW9uc1NlbGVjdGVkKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaG91bGRFbWl0O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHBvcHVsYXRlQXV0b2NvbXBsZXRlV2l0aEluaXRpYWxWYWx1ZXModmFsdWUsIHJlbG9hZE9wdGlvbnMgPSBmYWxzZSkge1xuXG4gICAgaWYgKHZhbHVlKSB7XG5cbiAgICAgIGlmICh0aGlzLm11bHRpKSB7XG5cbiAgICAgICAgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xuXG4gICAgICAgIGlmIChpc0FycmF5KSB7XG5cbiAgICAgICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZCA9IFtdO1xuXG4gICAgICAgICAgdmFsdWUuZm9yRWFjaChvcHRpb25WYWx1ZSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKG9wdGlvblZhbHVlKVxuICAgICAgICAgICAgICAudGhlbigob3B0aW9uKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZE9wdGlvblRvT3B0aW9uc1NlbGVjdGVkKG9wdGlvbik7XG5cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy5sb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUodmFsdWUpXG4gICAgICAgICAgLnRoZW4oKG9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMud3JpdHRlblZhbHVlO1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVmFsdWVXaXRoT3B0aW9uc1NlbGVjdGVkKCkge1xuXG4gICAgaWYgKHRoaXMub3B0aW9uc1NlbGVjdGVkICYmIHRoaXMub3B0aW9uc1NlbGVjdGVkLmxlbmd0aCkge1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5vcHRpb25zU2VsZWN0ZWQubWFwKG9wdGlvbiA9PiB0aGlzLmV4dHJhY3RWYWx1ZShvcHRpb24pKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSBbXTtcblxuICAgIH1cblxuXG4gIH1cblxuICBwcml2YXRlIGxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZSh3cml0dGVuVmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHdyaXR0ZW5WYWx1ZSkge1xuICAgICAgICB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHdyaXR0ZW5WYWx1ZSwgdHJ1ZSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzWzBdKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUod3JpdHRlblZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0UmVxdWlyZWREYXRhKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBlcnJvcjogc3RyaW5nO1xuICAgICAgaWYgKCF0aGlzLmVuZHBvaW50ICYmICF0aGlzLm9wdGlvbnMgJiYgIXRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbikge1xuICAgICAgICBlcnJvciA9ICdObyBlbmRwb2ludCB8IG9wdGlvbnMgfCBjdXN0b21GZXRjaEZ1bmN0aW9uIHNldC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb2YgdGhlbSB0byBiZSBhYmxlIHRvIHVzZSB0aGUgQXV0b2NvbXBsZXRlJztcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLnJhaXNlRXJyb3IoZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldElucHV0Q29udHJvbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNVbnRvdWNoZWQoKTtcbiAgICB0aGlzLmJsdXJJbnB1dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0VmFsdWU6IFZhbHVlRnVuY3Rpb24gPSAoaXRlbTogYW55KTogYW55ID0+IHtcbiAgICBsZXQgdmFsdWUgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gdmFsdWUgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlRm4pIHsgLy8gVXNlIGN1c3RvbSB2YWx1ZSBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZUF0dHIpIHsgLy8gVXNlIG9iamVjdCB2YWx1ZSBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgdmFsdWUgPSBpdGVtW3RoaXMudmFsdWVBdHRyXSB8fCB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcGFyZUFzU3RyaW5nKHYxLCB2Mikge1xuICAgIGNvbnN0IHN0cmluZzEgPSB0aGlzLmVuc3VyZVN0cmluZyh2MSk7XG4gICAgY29uc3Qgc3RyaW5nMiA9IHRoaXMuZW5zdXJlU3RyaW5nKHYyKTtcbiAgICByZXR1cm4gc3RyaW5nMSA9PT0gc3RyaW5nMjtcbiAgfVxuXG4gIHByaXZhdGUgZW5zdXJlU3RyaW5nKHYpIHtcbiAgICBpZiAodHlwZW9mIHYgIT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoaXNOYU4odikpIHtcbiAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdiA9IGAke3Z9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVmFsdWUodjogYW55KSB7XG4gICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICB0aGlzLnNldElucHV0VmFsdWVCYXNlZE9uSW5uZXJWYWx1ZSh2KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHY6IGFueSkge1xuICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHYpO1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShvcHRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25CYXNlZE9uVmFsdWUodjogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJPcHRpb25zLmZpbmQoaXRlbSA9PiB7XG4gICAgICBjb25zdCBpdGVtVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShpdGVtKTtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBc1N0cmluZyhpdGVtVmFsdWUsIHYpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0lucHV0VmFsdWVDaGFuZ2VzKCkge1xuXG4gICAgdGhpcy5zZWFyY2hJbnB1dFN1YnNjcmlwdGlvbiA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHNlYXJjaFRleHQgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaCQubmV4dChzZWFyY2hUZXh0KTtcbiAgICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlRnJvbUlucHV0VmFsdWVDaGFuZ2VzKCkge1xuXG4gICAgdGhpcy5zZWFyY2hJbnB1dFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKSB7XG4gICAgdGhpcy5vcHRpb25zJCA9IHRoaXMuc2VhcmNoJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCgodGV4dFNlYXJjaDogc3RyaW5nKSA9PiB7XG5cbiAgICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGV4dFNlYXJjaCB8fCAnJztcblxuICAgICAgICAgIGNvbnN0IGlzU3RyaW5nVGVybSA9IHR5cGVvZiBzZWFyY2hUZXJtID09PSAnc3RyaW5nJztcblxuICAgICAgICAgIGlmIChpc1N0cmluZ1Rlcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHNlYXJjaFRlcm0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5pbm5lck9wdGlvbnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVGcm9tU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKSB7XG5cbiAgICB0aGlzLnNlYXJjaElucHV0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgfVxuXG59XG4iXX0=