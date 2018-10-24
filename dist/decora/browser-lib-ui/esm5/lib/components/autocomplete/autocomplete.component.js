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
        this.createInput();
        this.subscribeToSearchAndSetOptionsObservable();
        this.subscribeToInputValueChanges();
    }
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
            if (this.autocompleteInput) {
                if (v) {
                    this.autocompleteInput.disable();
                }
                else {
                    this.autocompleteInput.enable();
                }
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
        this.detectRequiredData();
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeToInputValueChanges();
    };
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
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.optionsSelected = [];
            this.writtenValue = value;
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
            this.value = undefined;
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
    DecAutocompleteComponent.prototype.createInput = /**
     * @return {?}
     */
    function () {
        this.autocompleteInput = new FormControl('');
        if (this.disabled) {
            this.autocompleteInput.disable();
        }
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
    DecAutocompleteComponent.prototype.unsubscribeToInputValueChanges = /**
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
            .pipe(map(function (v) { return v ? v : ''; }), distinctUntilChanged(), switchMap(function (textSearch) {
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
    DecAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete',
                    template: "<ng-container [ngSwitch]=\"multi ? true : false\">\n\n  <ng-container *ngSwitchCase=\"true\">\n    <mat-form-field>\n      <mat-chip-list #decAutocompleteChipList>\n        <mat-chip *ngFor=\"let option of optionsSelected\" [removable]=\"true\" (removed)=\"remove(option)\">\n          {{ extractLabel(option) }}\n          <mat-icon matChipRemove>cancel</mat-icon>\n        </mat-chip>\n        <input matInput [attr.aria-label]=\"name\" #termInput [matAutocomplete]=\"decAutocomplete\" [formControl]=\"autocompleteInput\"\n          [name]=\"name\" [required]=\"required\" [placeholder]=\"placeholder\" (keyup.enter)=\"onEnterButton($event)\" (blur)=\"onBlur($event)\"\n          autocomplete=\"off\" readonly onfocus=\"this.removeAttribute('readonly');\"\n          [matChipInputFor]=\"decAutocompleteChipList\" [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\">\n        <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"!disabled && !required && value\">\n          <mat-icon>close</mat-icon>\n        </button>\n        <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"!disabled && value !== writtenValue\">\n          <mat-icon>replay</mat-icon>\n        </button>\n      </mat-chip-list>\n      <mat-autocomplete #decAutocomplete=\"matAutocomplete\" [displayWith]=\"extractLabel\" (optionSelected)=\"onOptionSelected($event)\"\n        name=\"autocompleteValue\">\n        <mat-option *ngFor=\"let item of getSelectableOptions(options$ | async)\" [value]=\"item\">\n          {{ extractLabel(item) }}\n        </mat-option>\n      </mat-autocomplete>\n    </mat-form-field>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"false\">\n    <mat-form-field>\n      <input matInput [attr.aria-label]=\"name\" #termInput [matAutocomplete]=\"decAutocomplete\" [formControl]=\"autocompleteInput\"\n        [name]=\"name\" [required]=\"required\" [placeholder]=\"placeholder\" (keyup.enter)=\"onEnterButton($event)\" (blur)=\"onBlur($event)\"\n        autocomplete=\"off\" readonly onfocus=\"this.removeAttribute('readonly');\">\n      <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"!disabled && !required && value\">\n        <mat-icon>close</mat-icon>\n      </button>\n      <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"!disabled && value !== writtenValue\">\n        <mat-icon>replay</mat-icon>\n      </button>\n    </mat-form-field>\n    <mat-autocomplete #decAutocomplete=\"matAutocomplete\" [displayWith]=\"extractLabel\" (optionSelected)=\"onOptionSelected($event)\"\n      name=\"autocompleteValue\">\n      <mat-option *ngIf=\"!required\" [value]=\"\"></mat-option>\n      <mat-option *ngFor=\"let item of getSelectableOptions(options$ | async)\" [value]=\"item\">\n        {{ extractLabel(item) }}\n      </mat-option>\n    </mat-autocomplete>\n  </ng-container>\n\n</ng-container>\n",
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
    DecAutocompleteComponent.prototype.extractValue;
    /** @type {?} */
    DecAutocompleteComponent.prototype.getSelectableOptions;
    /** @type {?} */
    DecAutocompleteComponent.prototype.service;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBYSxHQUFHLEVBQVUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUcsT0FBTyxFQUFFLHNCQUFzQixFQUFxQixNQUFNLG1CQUFtQixDQUFDOztBQUc5RSxJQUFNLElBQUksR0FBRztDQUNaLENBQUM7OztBQUdGLElBQU0sbUNBQW1DLEdBQVE7SUFDL0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx3QkFBd0IsRUFBeEIsQ0FBd0IsQ0FBQztJQUN2RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7O0lBNkpBLGtDQUNVO1FBRFYsaUJBTUM7UUFMUyxZQUFPLEdBQVAsT0FBTztrQ0F2RmMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO29CQThCN0IsbUJBQW1COzJCQVdaLEVBQUU7O29CQVNXLElBQUksWUFB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QUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLHV6RkFtRFg7b0JBQ0MsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7aUJBQ2pEOzs7O2dCQXpFUSxhQUFhOzs7c0NBNEVuQixTQUFTLFNBQUMsc0JBQXNCO3NDQWFoQyxLQUFLOzJCQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxLQUFLOzJCQUVMLEtBQUs7MEJBZUwsS0FBSzs0QkFFTCxLQUFLO3VCQUVMLEtBQUs7MEJBRUwsS0FBSzs4QkFTTCxLQUFLOzJCQUVMLEtBQUs7MEJBRUwsS0FBSzs0QkFFTCxLQUFLO3VCQUdMLE1BQU07aUNBRU4sTUFBTTs4QkFFTixNQUFNOzRCQUdOLFNBQVMsU0FBQyxXQUFXOzJCQUVyQixTQUFTLFNBQUMsVUFBVTs7bUNBcEp2Qjs7U0E2RWEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT01NQSwgRU5URVIgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAsIHN0YXJ0V2l0aCwgdGFwLCBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhYmVsRnVuY3Rpb24sIFZhbHVlRnVuY3Rpb24sIFNlbGVjdGlvbkV2ZW50LCBDdXN0b21GZXRjaEZ1bmN0aW9uIH0gZnJvbSAnLi9hdXRvY29tcGxldGUubW9kZWxzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIsIE1hdENoaXBJbnB1dEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtdWx0aSA/IHRydWUgOiBmYWxzZVwiPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICA8bWF0LWNoaXAtbGlzdCAjZGVjQXV0b2NvbXBsZXRlQ2hpcExpc3Q+XG4gICAgICAgIDxtYXQtY2hpcCAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNTZWxlY3RlZFwiIFtyZW1vdmFibGVdPVwidHJ1ZVwiIChyZW1vdmVkKT1cInJlbW92ZShvcHRpb24pXCI+XG4gICAgICAgICAge3sgZXh0cmFjdExhYmVsKG9wdGlvbikgfX1cbiAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICA8L21hdC1jaGlwPlxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCIgI3Rlcm1JbnB1dCBbbWF0QXV0b2NvbXBsZXRlXT1cImRlY0F1dG9jb21wbGV0ZVwiIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVJbnB1dFwiXG4gICAgICAgICAgW25hbWVdPVwibmFtZVwiIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIChrZXl1cC5lbnRlcik9XCJvbkVudGVyQnV0dG9uKCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcmVhZG9ubHkgb25mb2N1cz1cInRoaXMucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1wiXG4gICAgICAgICAgW21hdENoaXBJbnB1dEZvcl09XCJkZWNBdXRvY29tcGxldGVDaGlwTGlzdFwiIFttYXRDaGlwSW5wdXRTZXBhcmF0b3JLZXlDb2Rlc109XCJzZXBhcmF0b3JLZXlzQ29kZXNcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjbGVhcih0cnVlKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmICFyZXF1aXJlZCAmJiB2YWx1ZVwiPlxuICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cInJlc2V0KClcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiB2YWx1ZSAhPT0gd3JpdHRlblZhbHVlXCI+XG4gICAgICAgICAgPG1hdC1pY29uPnJlcGxheTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9tYXQtY2hpcC1saXN0PlxuICAgICAgPG1hdC1hdXRvY29tcGxldGUgI2RlY0F1dG9jb21wbGV0ZT1cIm1hdEF1dG9jb21wbGV0ZVwiIFtkaXNwbGF5V2l0aF09XCJleHRyYWN0TGFiZWxcIiAob3B0aW9uU2VsZWN0ZWQpPVwib25PcHRpb25TZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgbmFtZT1cImF1dG9jb21wbGV0ZVZhbHVlXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdldFNlbGVjdGFibGVPcHRpb25zKG9wdGlvbnMkIHwgYXN5bmMpXCIgW3ZhbHVlXT1cIml0ZW1cIj5cbiAgICAgICAgICB7eyBleHRyYWN0TGFiZWwoaXRlbSkgfX1cbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgPGlucHV0IG1hdElucHV0IFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiICN0ZXJtSW5wdXQgW21hdEF1dG9jb21wbGV0ZV09XCJkZWNBdXRvY29tcGxldGVcIiBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlSW5wdXRcIlxuICAgICAgICBbbmFtZV09XCJuYW1lXCIgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgKGtleXVwLmVudGVyKT1cIm9uRW50ZXJCdXR0b24oJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcbiAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcmVhZG9ubHkgb25mb2N1cz1cInRoaXMucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1wiPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjbGVhcih0cnVlKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmICFyZXF1aXJlZCAmJiB2YWx1ZVwiPlxuICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cInJlc2V0KClcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiB2YWx1ZSAhPT0gd3JpdHRlblZhbHVlXCI+XG4gICAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8bWF0LWF1dG9jb21wbGV0ZSAjZGVjQXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImV4dHJhY3RMYWJlbFwiIChvcHRpb25TZWxlY3RlZCk9XCJvbk9wdGlvblNlbGVjdGVkKCRldmVudClcIlxuICAgICAgbmFtZT1cImF1dG9jb21wbGV0ZVZhbHVlXCI+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdJZj1cIiFyZXF1aXJlZFwiIFt2YWx1ZV09XCJcIj48L21hdC1vcHRpb24+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBnZXRTZWxlY3RhYmxlT3B0aW9ucyhvcHRpb25zJCB8IGFzeW5jKVwiIFt2YWx1ZV09XCJpdGVtXCI+XG4gICAgICAgIHt7IGV4dHJhY3RMYWJlbChpdGVtKSB9fVxuICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgPC9uZy1jb250YWluZXI+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBWaWV3Q2hpbGQoTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcikgYXV0b2NvbXBsZXRlVHJpZ2dlcjogTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcjtcblxuICBhdXRvY29tcGxldGVJbnB1dDogRm9ybUNvbnRyb2w7XG5cbiAgb3B0aW9ucyQ6IE9ic2VydmFibGU8YW55W10+O1xuXG4gIG9wdGlvbnNTZWxlY3RlZDogYW55W107XG5cbiAgd3JpdHRlblZhbHVlOiBhbnk7XG5cbiAgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUiwgQ09NTUFdO1xuXG4gIC8vIFBhcmFtc1xuICBASW5wdXQoKSBjdXN0b21GZXRjaEZ1bmN0aW9uOiBDdXN0b21GZXRjaEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGVuZHBvaW50O1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdjtcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGVJbnB1dCkge1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5kaXNhYmxlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgQElucHV0KCkgbGFiZWxGbjogTGFiZWxGdW5jdGlvbjtcblxuICBASW5wdXQoKSBsYWJlbEF0dHI6IHN0cmluZztcblxuICBASW5wdXQoKSBuYW1lID0gJ2F1dG9jb21wbGV0ZUlucHV0JztcblxuICBASW5wdXQoKVxuICBzZXQgb3B0aW9ucyh2OiBhbnlbXSkge1xuICAgIHRoaXMuX29wdGlvbnMgPSB2O1xuICAgIHRoaXMuaW5uZXJPcHRpb25zID0gdjtcbiAgfVxuICBnZXQgb3B0aW9ucygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHZhbHVlRm46IFZhbHVlRnVuY3Rpb247XG5cbiAgQElucHV0KCkgdmFsdWVBdHRyOiBzdHJpbmc7XG5cbiAgLy8gRXZlbnRzXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+KCk7XG5cbiAgQE91dHB1dCgpIGVudGVyQnV0dG9uOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcblxuICAvLyBWaWV3IGVsZW1lbnRzXG4gIEBWaWV3Q2hpbGQoJ3Rlcm1JbnB1dCcpIHRlcm1JbnB1dDtcblxuICBAVmlld0NoaWxkKCdjaGlwTGlzdCcpIGNoaXBMaXN0O1xuXG4gIC8vIHByaXZhdGUgZGF0YTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55W107XG5cbiAgcHJpdmF0ZSBpbm5lck9wdGlvbnM6IGFueVtdID0gW107XG5cbiAgcHJpdmF0ZSByZXNwb25zZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICBwcml2YXRlIHNlYXJjaCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4odW5kZWZpbmVkKTtcblxuICBwcml2YXRlIHNlYXJjaElucHV0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY3JlYXRlSW5wdXQoKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvSW5wdXRWYWx1ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRldGVjdFJlcXVpcmVkRGF0YSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvSW5wdXRWYWx1ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiBgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQgPSBbXTtcbiAgICAgIHRoaXMud3JpdHRlblZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnBvcHVsYXRlQXV0b2NvbXBsZXRlV2l0aEluaXRpYWxWYWx1ZXModmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KSB7XG5cbiAgICBsZXQgc2hvdWxkRW1pdCA9IHRydWU7XG5cbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9ICRldmVudC5vcHRpb24udmFsdWU7XG5cbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvblZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoc2VsZWN0ZWRPcHRpb24pO1xuXG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uVmFsdWUgIT09IHRoaXMudmFsdWUpIHtcblxuICAgICAgaWYgKHRoaXMubXVsdGkpIHtcblxuICAgICAgICBzaG91bGRFbWl0ID0gdGhpcy5hZGRPcHRpb25Ub09wdGlvbnNTZWxlY3RlZChzZWxlY3RlZE9wdGlvbik7XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHVuZGVmaW5lZCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkT3B0aW9uVmFsdWU7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHNob3VsZEVtaXQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICBvcHRpb246IHNlbGVjdGVkT3B0aW9uLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMuaW5uZXJPcHRpb25zLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ibHVySW5wdXQoKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25FbnRlckJ1dHRvbigkZXZlbnQpIHtcbiAgICB0aGlzLmVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KTtcbiAgfVxuXG4gIHNldEZvY3VzKCkge1xuICAgIHRoaXMudGVybUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIG9wZW5QYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIub3BlblBhbmVsKCk7XG4gIH1cblxuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVHJpZ2dlci5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBvbkJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY2xlYXIocmVvcGVuID0gZmFsc2UpIHtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSgnJyk7XG5cbiAgICBpZiAodGhpcy53cml0dGVuVmFsdWUgPT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgICB9XG5cbiAgICBpZiAocmVvcGVuKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH0sIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLndyaXR0ZW5WYWx1ZTtcbiAgICB0aGlzLnBvcHVsYXRlQXV0b2NvbXBsZXRlV2l0aEluaXRpYWxWYWx1ZXModGhpcy53cml0dGVuVmFsdWUpO1xuICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgfVxuXG4gIGV4dHJhY3RMYWJlbDogTGFiZWxGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGxldCBsYWJlbCA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyBsYWJlbCBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMubGFiZWxGbikgeyAvLyBVc2UgY3VzdG9tIGxhYmVsIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIGxhYmVsID0gdGhpcy5sYWJlbEZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxhYmVsQXR0cikgeyAvLyBVc2Ugb2JqZWN0IGxhYmVsIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IGl0ZW1bdGhpcy5sYWJlbEF0dHJdIHx8IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFiZWwgPSB0aGlzLmVuc3VyZVN0cmluZyhsYWJlbCk7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG5cbiAgcmVtb3ZlKG9wdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm9wdGlvbnNTZWxlY3RlZC5pbmRleE9mKG9wdGlvbik7XG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dFZhbHVlKHYpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnNldFZhbHVlKHYpO1xuXG4gICAgaWYgKCF2KSB7XG4gICAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBibHVySW5wdXQoKSB7XG5cbiAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBhZGRPcHRpb25Ub09wdGlvbnNTZWxlY3RlZChvcHRpb24pOiBib29sZWFuIHtcblxuICAgIGlmIChvcHRpb24pIHtcblxuICAgICAgbGV0IHNob3VsZEVtaXQgPSB0cnVlO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zU2VsZWN0ZWQgJiYgdGhpcy5vcHRpb25zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcHRpb25zU2VsZWN0ZWQuaW5kZXhPZihvcHRpb24pO1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQucHVzaChvcHRpb24pO1xuICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShudWxsKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNob3VsZEVtaXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQgPSBbb3B0aW9uXTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZVdpdGhPcHRpb25zU2VsZWN0ZWQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNob3VsZEVtaXQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgcG9wdWxhdGVBdXRvY29tcGxldGVXaXRoSW5pdGlhbFZhbHVlcyh2YWx1ZSwgcmVsb2FkT3B0aW9ucyA9IGZhbHNlKSB7XG5cbiAgICBpZiAodGhpcy5tdWx0aSkge1xuXG4gICAgICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG5cbiAgICAgIGlmIChpc0FycmF5KSB7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQgPSBbXTtcblxuICAgICAgICB2YWx1ZS5mb3JFYWNoKG9wdGlvblZhbHVlID0+IHtcblxuICAgICAgICAgIHRoaXMubG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKG9wdGlvblZhbHVlKVxuICAgICAgICAgICAgLnRoZW4oKG9wdGlvbikgPT4ge1xuXG4gICAgICAgICAgICAgIHRoaXMuYWRkT3B0aW9uVG9PcHRpb25zU2VsZWN0ZWQob3B0aW9uKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMubG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKHZhbHVlKVxuICAgICAgICAudGhlbigob3B0aW9ucykgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpIHtcblxuICAgIGlmICh0aGlzLm9wdGlvbnNTZWxlY3RlZCAmJiB0aGlzLm9wdGlvbnNTZWxlY3RlZC5sZW5ndGgpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMub3B0aW9uc1NlbGVjdGVkLm1hcChvcHRpb24gPT4gdGhpcy5leHRyYWN0VmFsdWUob3B0aW9uKSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIHByaXZhdGUgbG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKHdyaXR0ZW5WYWx1ZTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAod3JpdHRlblZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUod3JpdHRlblZhbHVlLCB0cnVlKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXNbMF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh3cml0dGVuVmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RSZXF1aXJlZERhdGEoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGVycm9yOiBzdHJpbmc7XG4gICAgICBpZiAoIXRoaXMuZW5kcG9pbnQgJiYgIXRoaXMub3B0aW9ucyAmJiAhdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG4gICAgICAgIGVycm9yID0gJ05vIGVuZHBvaW50IHwgb3B0aW9ucyB8IGN1c3RvbUZldGNoRnVuY3Rpb24gc2V0LiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvZiB0aGVtIHRvIGJlIGFibGUgdG8gdXNlIHRoZSBBdXRvY29tcGxldGUnO1xuICAgICAgfVxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMucmFpc2VFcnJvcihlcnJvcik7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0SW5wdXRDb250cm9sKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzUHJpc3RpbmUoKTtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm1hcmtBc1VudG91Y2hlZCgpO1xuICAgIHRoaXMuYmx1cklucHV0KCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RWYWx1ZTogVmFsdWVGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBhbnkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyB2YWx1ZSBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMudmFsdWVGbikgeyAvLyBVc2UgY3VzdG9tIHZhbHVlIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZUZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlQXR0cikgeyAvLyBVc2Ugb2JqZWN0IHZhbHVlIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IGl0ZW1bdGhpcy52YWx1ZUF0dHJdIHx8IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wYXJlQXNTdHJpbmcodjEsIHYyKSB7XG4gICAgY29uc3Qgc3RyaW5nMSA9IHRoaXMuZW5zdXJlU3RyaW5nKHYxKTtcbiAgICBjb25zdCBzdHJpbmcyID0gdGhpcy5lbnN1cmVTdHJpbmcodjIpO1xuICAgIHJldHVybiBzdHJpbmcxID09PSBzdHJpbmcyO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVTdHJpbmcodikge1xuICAgIGlmICh0eXBlb2YgdiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc05hTih2KSkge1xuICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ID0gYCR7dn1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHYpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodjogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9uID0gdGhpcy5nZXRPcHRpb25CYXNlZE9uVmFsdWUodik7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlKG9wdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGdldE9wdGlvbkJhc2VkT25WYWx1ZSh2OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck9wdGlvbnMuZmluZChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKGl0ZW0pO1xuICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZUFzU3RyaW5nKGl0ZW1WYWx1ZSwgdik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUlucHV0KCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZGlzYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9JbnB1dFZhbHVlQ2hhbmdlcygpIHtcblxuICAgIHRoaXMuc2VhcmNoSW5wdXRTdWJzY3JpcHRpb24gPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShzZWFyY2hUZXh0ID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2gkLm5leHQoc2VhcmNoVGV4dCk7XG4gICAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvSW5wdXRWYWx1ZUNoYW5nZXMoKSB7XG5cbiAgICB0aGlzLnNlYXJjaElucHV0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpIHtcbiAgICB0aGlzLm9wdGlvbnMkID0gdGhpcy5zZWFyY2gkXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHYgPT4gdiA/IHYgOiAnJyksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCgodGV4dFNlYXJjaDogc3RyaW5nKSA9PiB7XG5cbiAgICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGV4dFNlYXJjaCB8fCAnJztcblxuICAgICAgICAgIGNvbnN0IGlzU3RyaW5nVGVybSA9IHR5cGVvZiBzZWFyY2hUZXJtID09PSAnc3RyaW5nJztcblxuICAgICAgICAgIGlmIChpc1N0cmluZ1Rlcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHNlYXJjaFRlcm0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5pbm5lck9wdGlvbnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGdldFNlbGVjdGFibGVPcHRpb25zID0gKG9wdGlvbnMpID0+IHtcblxuICAgIGNvbnN0IGlzQXJyYXkgPSBvcHRpb25zID8gQXJyYXkuaXNBcnJheShvcHRpb25zKSA6IGZhbHNlO1xuXG4gICAgbGV0IHNlbGVjdGFibGVPcHRpb25zID0gb3B0aW9ucztcblxuICAgIGlmIChpc0FycmF5ICYmICF0aGlzLnJlcGVhdCkge1xuXG4gICAgICBzZWxlY3RhYmxlT3B0aW9ucyA9IG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5yZXBlYXQpIHtcbiAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKG9wdGlvbik7XG4gICAgICAgICAgbGV0IGFscmVhZHlTZWxlY3RlZDogYm9vbGVhbjtcbiAgICAgICAgICBpZiAodGhpcy5tdWx0aSkge1xuICAgICAgICAgICAgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5vcHRpb25zU2VsZWN0ZWQgJiYgdGhpcy5vcHRpb25zU2VsZWN0ZWQuZmluZChzZWxlY3RlZCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShzZWxlY3RlZCk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBc1N0cmluZyhzZWxlY3RlZFZhbHVlLCBvcHRpb25WYWx1ZSk7XG4gICAgICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5jb21wYXJlQXNTdHJpbmcodGhpcy52YWx1ZSwgb3B0aW9uVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gIWFscmVhZHlTZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0YWJsZU9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHRleHRTZWFyY2gsIHJlbWVtYmVyUmVzcG9uc2UgPSBmYWxzZSk6IE9ic2VydmFibGU8YW55W10+IHtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoSW5Mb2NhbE9wdGlvbnModGV4dFNlYXJjaCk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbikge1xuXG4gICAgICByZXR1cm4gdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKHRleHRTZWFyY2gpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChvcHRpb25zID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgY29uc3QgYm9keSA9IHRleHRTZWFyY2ggPyB7IHRleHRTZWFyY2ggfSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHJlbWVtYmVyUmVzcG9uc2UpIHtcblxuICAgICAgICBjb25zdCBkYXRhSW5NZW1vcnkgPSB0aGlzLnJlc3BvbnNlc1t0ZXh0U2VhcmNoXTtcblxuICAgICAgICBpZiAoZGF0YUluTWVtb3J5KSB7XG5cbiAgICAgICAgICByZXR1cm4gb2YoZGF0YUluTWVtb3J5KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXQ8YW55W10+KHRoaXMuZW5kcG9pbnQsIGJvZHkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFwKChvcHRpb25zOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VzW3RleHRTZWFyY2hdID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldDxhbnlbXT4odGhpcy5lbmRwb2ludCwgYm9keSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcCgob3B0aW9uczogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuXG4gICAgICB9XG5cblxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoSW5Mb2NhbE9wdGlvbnModGVybTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGVybVN0cmluZyA9IGAke3Rlcm19YDtcblxuICAgIGxldCBmaWx0ZXJlZERhdGEgPSB0aGlzLmlubmVyT3B0aW9ucztcblxuICAgIGlmICh0ZXJtU3RyaW5nKSB7XG4gICAgICBmaWx0ZXJlZERhdGEgPSB0aGlzLmlubmVyT3B0aW9uc1xuICAgICAgICAuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSB0aGlzLmV4dHJhY3RMYWJlbChpdGVtKTtcbiAgICAgICAgICBjb25zdCBsb3dlckNhc2VMYWJlbCA9IGxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgY29uc3QgbG93ZXJDYXNlVGVybSA9IHRlcm1TdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICByZXR1cm4gbG93ZXJDYXNlTGFiZWwuc2VhcmNoKGxvd2VyQ2FzZVRlcm0pID49IDA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBvZihmaWx0ZXJlZERhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSByYWlzZUVycm9yKGVycm9yOiBzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCBFcnJvcjo6IFRoZSBhdXRvY29tcGxldGUgd2l0aCBuYW1lIFwiJHt0aGlzLm5hbWV9XCIgaGFkIHRoZSBmb2xsb3cgcHJvYmxlbTogJHtlcnJvcn1gKTtcbiAgfVxuXG59XG4iXX0=