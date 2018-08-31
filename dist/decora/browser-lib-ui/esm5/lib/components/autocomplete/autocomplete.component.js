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
export var AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
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
        console.log('loadRemoteObjectByWrittenValue', writtenValue);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBYSxHQUFHLEVBQVUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUcsT0FBTyxFQUFFLHNCQUFzQixFQUFxQixNQUFNLG1CQUFtQixDQUFDOztBQUc5RSxJQUFNLElBQUksR0FBRztDQUNaLENBQUM7OztBQUdGLFdBQWEsbUNBQW1DLEdBQVE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx3QkFBd0IsRUFBeEIsQ0FBd0IsQ0FBQztJQUN2RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7O0lBNkpBLGtDQUNVO1FBRFYsaUJBTUM7UUFMUyxZQUFPLEdBQVAsT0FBTztrQ0F2RmMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO29CQThCN0IsbUJBQW1COzJCQVdaLEVBQUU7O29CQVNXLElBQUksWUFBWSxFQUFPOzhCQUVGLElBQUksWUFBWSxFQUFrQjsyQkFFckMsSUFBSSxZQUFZLEVBQWtCOzRCQVkxRCxFQUFFO3lCQUVVLEVBQUU7dUJBRTFCLElBQUksZUFBZSxDQUFTLFNBQVMsQ0FBQztpQ0FZaEIsSUFBSTtnQ0FFQyxJQUFJOzRCQWtJbkIsVUFBQyxJQUFTOztZQUN0QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7b0JBQ2pCLEtBQUssR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O29CQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUM7aUJBQzNDO2FBQ0Y7WUFDRCxLQUFLLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7NEJBNElxQyxVQUFDLElBQVM7O1lBQzlDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNULEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztvQkFDakIsS0FBSyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7b0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztpQkFDM0M7YUFDRjtZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtvQ0FvRnNCLFVBQUMsT0FBTzs7WUFFN0IsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7O1lBRXpELElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDO1lBRWhDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTTtvQkFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7d0JBQ2pCLElBQU0sYUFBVyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7O3dCQUM5QyxJQUFJLGVBQWUsVUFBVTt3QkFDN0IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ2YsZUFBZSxHQUFHLEtBQUksQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFROztnQ0FDMUUsSUFBTSxhQUFhLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDbEQsTUFBTSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLGFBQVcsQ0FBQyxDQUFDOzZCQUN6RCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3lCQUNuQjt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixlQUFlLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLGFBQVcsQ0FBQyxDQUFDOzRCQUFBLENBQUM7eUJBQ2xFO3dCQUNELE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQztxQkFDekI7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztxQkFDYjtpQkFDRixDQUFDLENBQUM7YUFFSjtZQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztTQUMxQjtRQS9ZQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7S0FDckM7SUFqRkQsc0JBQ0ksOENBQVE7Ozs7UUFVWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7OztRQWJELFVBQ2EsQ0FBVTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDbEM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNqQzthQUNGO1NBQ0Y7OztPQUFBO0lBV0Qsc0JBQ0ksNkNBQU87Ozs7UUFJWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3RCOzs7OztRQVBELFVBQ1ksQ0FBUTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUN2Qjs7O09BQUE7Ozs7SUEwREQsa0RBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7S0FDM0I7Ozs7SUFFRCw4Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztLQUN2QztJQUtELHNCQUFJLDJDQUFLOzs7O1FBTVQ7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QjtRQVhEOztVQUVFOzs7OztRQUNGLFVBQVUsQ0FBTTtZQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7OztPQUFBOzs7OztJQUtELG1EQUFnQjs7OztJQUFoQixVQUFpQixFQUFPO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDNUI7Ozs7O0lBRUQsb0RBQWlCOzs7O0lBQWpCLFVBQWtCLEVBQU87UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCxpREFBYzs7OztJQUFkLFVBQWUsS0FBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCw2Q0FBVTs7OztJQUFWLFVBQVcsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUcsS0FBTyxLQUFLLEtBQUcsSUFBSSxDQUFDLEtBQU8sQ0FBQyxDQUFDLENBQUM7O1lBQ3JELElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekQ7S0FDRjs7Ozs7SUFFRCxtREFBZ0I7Ozs7SUFBaEIsVUFBaUIsTUFBTTs7UUFFckIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDOztRQUV0QixJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7UUFFM0MsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTlELEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUVmLFVBQVUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRTdELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7YUFFL0I7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO2FBRWxDO1lBRUQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztvQkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixNQUFNLEVBQUUsY0FBYztvQkFDdEIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZO2lCQUMzQixDQUFDLENBQUM7YUFDSjtZQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUVsQjtLQUVGOzs7OztJQUVELGdEQUFhOzs7O0lBQWIsVUFBYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9COzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDdEM7Ozs7SUFFRCw0Q0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDdEM7Ozs7SUFFRCw2Q0FBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDdkM7Ozs7O0lBRUQseUNBQU07Ozs7SUFBTixVQUFPLE1BQU07UUFDWCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBRUQsd0NBQUs7Ozs7SUFBTCxVQUFNLE1BQWM7UUFBcEIsaUJBY0M7UUFkSyx1QkFBQSxFQUFBLGNBQWM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLFVBQVUsQ0FBQztnQkFDVCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO0tBQ0Y7Ozs7SUFFRCx3Q0FBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDL0IsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFlRCx5Q0FBTTs7OztJQUFOLFVBQU8sTUFBYzs7UUFDbkIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztLQUN2Qzs7Ozs7SUFFTyxnREFBYTs7OztjQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ3pDOzs7OztJQUdLLDRDQUFTOzs7O1FBRWYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7OztJQUk5Qiw2REFBMEI7Ozs7Y0FBQyxNQUFNO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBRVgsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRXRCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztnQkFDeEQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztpQkFDdkM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sVUFBVSxHQUFHLEtBQUssQ0FBQztpQkFDcEI7YUFDRjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7YUFDdkM7WUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDO1NBRW5CO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixNQUFNLENBQUMsS0FBSyxDQUFDO1NBRWQ7Ozs7Ozs7SUFJSyx3RUFBcUM7Ozs7O2NBQUMsS0FBSyxFQUFFLGFBQXFCOztRQUFyQiw4QkFBQSxFQUFBLHFCQUFxQjtRQUV4RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7WUFFZixJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXJDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRVosSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7Z0JBRTFCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXO29CQUV2QixLQUFJLENBQUMsOEJBQThCLENBQUMsV0FBVyxDQUFDO3lCQUM3QyxJQUFJLENBQUMsVUFBQyxNQUFNO3dCQUVYLEtBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFFekMsQ0FBQyxDQUFDO2lCQUVOLENBQUMsQ0FBQzthQUVKO1NBRUY7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ1osS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQixDQUFDLENBQUM7U0FFTjs7Ozs7SUFJSyxpRUFBOEI7Ozs7O1FBRXBDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7U0FFNUU7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBRXhCOzs7Ozs7SUFLSyxpRUFBOEI7Ozs7Y0FBQyxZQUFpQjs7UUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUMzRCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN0QyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQztxQkFDL0MsU0FBUyxDQUFDLFVBQUMsR0FBRztvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pCLENBQUMsQ0FBQzthQUNKO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDOzs7OztJQUdHLHFEQUFrQjs7Ozs7UUFDeEIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07O1lBQ2pDLElBQUksS0FBSyxDQUFTO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxLQUFLLEdBQUcsa0hBQWtILENBQUM7YUFDNUg7WUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNmO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUM7YUFDWDtTQUNGLENBQUMsQ0FBQzs7Ozs7SUFHRyxvREFBaUI7Ozs7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7Ozs7SUFlWCxrREFBZTs7Ozs7Y0FBQyxFQUFFLEVBQUUsRUFBRTs7UUFDNUIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFDdEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQzs7Ozs7O0lBR3JCLCtDQUFZOzs7O2NBQUMsQ0FBQztRQUNwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkI7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixDQUFDLEdBQUcsS0FBRyxDQUFHLENBQUM7YUFDWjtTQUNGO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBR0gsZ0RBQWE7Ozs7Y0FBQyxDQUFNO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBR2pDLGlFQUE4Qjs7OztjQUFDLENBQU07O1FBQzNDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7SUFHckIsd0RBQXFCOzs7O2NBQUMsQ0FBTTs7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTs7WUFDaEMsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxNQUFNLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0MsQ0FBQyxDQUFDOzs7OztJQUdHLDhDQUFXOzs7O1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEM7Ozs7O0lBR0ssK0RBQTRCOzs7OztRQUVsQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVk7YUFDakUsSUFBSSxDQUNILFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsb0JBQW9CLEVBQUUsQ0FDdkI7YUFDQSxTQUFTLENBQUMsVUFBQSxVQUFVO1lBQ25CLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQzs7Ozs7SUFJRyxpRUFBOEI7Ozs7UUFFcEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OztJQUlyQywyRUFBd0M7Ozs7O1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDM0IsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQVYsQ0FBVSxDQUFDLEVBQ3BCLG9CQUFvQixFQUFFLEVBQ3RCLFNBQVMsQ0FBQyxVQUFDLFVBQWtCOztZQUUzQixJQUFNLFVBQVUsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFDOztZQUVwQyxJQUFNLFlBQVksR0FBRyxPQUFPLFVBQVUsS0FBSyxRQUFRLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakIsTUFBTSxDQUFDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNqRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzlCO1NBRUYsQ0FBQyxDQUNILENBQUM7Ozs7Ozs7SUFrQ0ksMERBQXVCOzs7OztjQUFDLFVBQVUsRUFBRSxnQkFBd0I7O1FBQXhCLGlDQUFBLEVBQUEsd0JBQXdCO1FBRWxFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRWpCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7U0FFOUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUVwQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQztpQkFDeEMsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLE9BQU87Z0JBQ1QsS0FBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7YUFDN0IsQ0FBQyxDQUNILENBQUM7U0FFTDtRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVOLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFFckQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDOztnQkFFckIsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFaEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFFakIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFFekI7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBRU4sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO3lCQUNoRCxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUMsT0FBYzt3QkFDakIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUM7d0JBQ3JDLEtBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO3FCQUM3QixDQUFDLENBQ0gsQ0FBQztpQkFFTDthQUVGO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRU4sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO3FCQUNoRCxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUMsT0FBYztvQkFDakIsS0FBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7aUJBQzdCLENBQUMsQ0FDSCxDQUFDO2FBRUw7U0FHRjs7Ozs7O0lBR0ssdURBQW9COzs7O2NBQUMsSUFBWTs7O1FBQ3ZDLElBQU0sVUFBVSxHQUFHLEtBQUcsSUFBTSxDQUFDOztRQUU3QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZixZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVk7aUJBQy9CLE1BQU0sQ0FBQyxVQUFBLElBQUk7O2dCQUNWLElBQU0sS0FBSyxHQUFXLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUM5QyxJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7O2dCQUMzQyxJQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRCxDQUFDLENBQUM7U0FDSjtRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7OztJQUdsQiw2Q0FBVTs7OztjQUFDLEtBQWE7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBZ0UsSUFBSSxDQUFDLElBQUksbUNBQTZCLEtBQU8sQ0FBQyxDQUFDOzs7Z0JBeG5CbEksU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSx1ekZBbURYO29CQUNDLE1BQU0sRUFBRSxFQUFFO29CQUNWLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2lCQUNqRDs7OztnQkF6RVEsYUFBYTs7O3NDQTRFbkIsU0FBUyxTQUFDLHNCQUFzQjtzQ0FhaEMsS0FBSzsyQkFFTCxLQUFLO3dCQUVMLEtBQUs7eUJBRUwsS0FBSzsyQkFFTCxLQUFLOzBCQWVMLEtBQUs7NEJBRUwsS0FBSzt1QkFFTCxLQUFLOzBCQUVMLEtBQUs7OEJBU0wsS0FBSzsyQkFFTCxLQUFLOzBCQUVMLEtBQUs7NEJBRUwsS0FBSzt1QkFHTCxNQUFNO2lDQUVOLE1BQU07OEJBRU4sTUFBTTs0QkFHTixTQUFTLFNBQUMsV0FBVzsyQkFFckIsU0FBUyxTQUFDLFVBQVU7O21DQXBKdkI7O1NBNkVhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ09NTUEsIEVOVEVSIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCBzdGFydFdpdGgsIHRhcCwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYWJlbEZ1bmN0aW9uLCBWYWx1ZUZ1bmN0aW9uLCBTZWxlY3Rpb25FdmVudCwgQ3VzdG9tRmV0Y2hGdW5jdGlvbiB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLm1vZGVscyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVUcmlnZ2VyLCBNYXRDaGlwSW5wdXRFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm11bHRpID8gdHJ1ZSA6IGZhbHNlXCI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPlxuICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgIDxtYXQtY2hpcC1saXN0ICNkZWNBdXRvY29tcGxldGVDaGlwTGlzdD5cbiAgICAgICAgPG1hdC1jaGlwICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uc1NlbGVjdGVkXCIgW3JlbW92YWJsZV09XCJ0cnVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlKG9wdGlvbilcIj5cbiAgICAgICAgICB7eyBleHRyYWN0TGFiZWwob3B0aW9uKSB9fVxuICAgICAgICAgIDxtYXQtaWNvbiBtYXRDaGlwUmVtb3ZlPmNhbmNlbDwvbWF0LWljb24+XG4gICAgICAgIDwvbWF0LWNoaXA+XG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIiAjdGVybUlucHV0IFttYXRBdXRvY29tcGxldGVdPVwiZGVjQXV0b2NvbXBsZXRlXCIgW2Zvcm1Db250cm9sXT1cImF1dG9jb21wbGV0ZUlucHV0XCJcbiAgICAgICAgICBbbmFtZV09XCJuYW1lXCIgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgKGtleXVwLmVudGVyKT1cIm9uRW50ZXJCdXR0b24oJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIiByZWFkb25seSBvbmZvY3VzPVwidGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XCJcbiAgICAgICAgICBbbWF0Q2hpcElucHV0Rm9yXT1cImRlY0F1dG9jb21wbGV0ZUNoaXBMaXN0XCIgW21hdENoaXBJbnB1dFNlcGFyYXRvcktleUNvZGVzXT1cInNlcGFyYXRvcktleXNDb2Rlc1wiPlxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cImNsZWFyKHRydWUpXCIgKm5nSWY9XCIhZGlzYWJsZWQgJiYgIXJlcXVpcmVkICYmIHZhbHVlXCI+XG4gICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwicmVzZXQoKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmIHZhbHVlICE9PSB3cml0dGVuVmFsdWVcIj5cbiAgICAgICAgICA8bWF0LWljb24+cmVwbGF5PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L21hdC1jaGlwLWxpc3Q+XG4gICAgICA8bWF0LWF1dG9jb21wbGV0ZSAjZGVjQXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImV4dHJhY3RMYWJlbFwiIChvcHRpb25TZWxlY3RlZCk9XCJvbk9wdGlvblNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICBuYW1lPVwiYXV0b2NvbXBsZXRlVmFsdWVcIj5cbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgZ2V0U2VsZWN0YWJsZU9wdGlvbnMob3B0aW9ucyQgfCBhc3luYylcIiBbdmFsdWVdPVwiaXRlbVwiPlxuICAgICAgICAgIHt7IGV4dHJhY3RMYWJlbChpdGVtKSB9fVxuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICA8aW5wdXQgbWF0SW5wdXQgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCIgI3Rlcm1JbnB1dCBbbWF0QXV0b2NvbXBsZXRlXT1cImRlY0F1dG9jb21wbGV0ZVwiIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVJbnB1dFwiXG4gICAgICAgIFtuYW1lXT1cIm5hbWVcIiBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiAoa2V5dXAuZW50ZXIpPVwib25FbnRlckJ1dHRvbigkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyKCRldmVudClcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIiByZWFkb25seSBvbmZvY3VzPVwidGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XCI+XG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cImNsZWFyKHRydWUpXCIgKm5nSWY9XCIhZGlzYWJsZWQgJiYgIXJlcXVpcmVkICYmIHZhbHVlXCI+XG4gICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwicmVzZXQoKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmIHZhbHVlICE9PSB3cml0dGVuVmFsdWVcIj5cbiAgICAgICAgPG1hdC1pY29uPnJlcGxheTwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDxtYXQtYXV0b2NvbXBsZXRlICNkZWNBdXRvY29tcGxldGU9XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZXh0cmFjdExhYmVsXCIgKG9wdGlvblNlbGVjdGVkKT1cIm9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICBuYW1lPVwiYXV0b2NvbXBsZXRlVmFsdWVcIj5cbiAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwiIXJlcXVpcmVkXCIgW3ZhbHVlXT1cIlwiPjwvbWF0LW9wdGlvbj5cbiAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdldFNlbGVjdGFibGVPcHRpb25zKG9wdGlvbnMkIHwgYXN5bmMpXCIgW3ZhbHVlXT1cIml0ZW1cIj5cbiAgICAgICAge3sgZXh0cmFjdExhYmVsKGl0ZW0pIH19XG4gICAgICA8L21hdC1vcHRpb24+XG4gICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICA8L25nLWNvbnRhaW5lcj5cblxuPC9uZy1jb250YWluZXI+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQFZpZXdDaGlsZChNYXRBdXRvY29tcGxldGVUcmlnZ2VyKSAgYXV0b2NvbXBsZXRlVHJpZ2dlcjogTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcjtcblxuICBhdXRvY29tcGxldGVJbnB1dDogRm9ybUNvbnRyb2w7XG5cbiAgb3B0aW9ucyQ6IE9ic2VydmFibGU8YW55W10+O1xuXG4gIG9wdGlvbnNTZWxlY3RlZDogYW55W107XG5cbiAgd3JpdHRlblZhbHVlOiBhbnk7XG5cbiAgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUiwgQ09NTUFdO1xuXG4gIC8vIFBhcmFtc1xuICBASW5wdXQoKSBjdXN0b21GZXRjaEZ1bmN0aW9uOiBDdXN0b21GZXRjaEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGVuZHBvaW50O1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdjtcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGVJbnB1dCkge1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5kaXNhYmxlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgQElucHV0KCkgbGFiZWxGbjogTGFiZWxGdW5jdGlvbjtcblxuICBASW5wdXQoKSBsYWJlbEF0dHI6IHN0cmluZztcblxuICBASW5wdXQoKSBuYW1lID0gJ2F1dG9jb21wbGV0ZUlucHV0JztcblxuICBASW5wdXQoKVxuICBzZXQgb3B0aW9ucyh2OiBhbnlbXSkge1xuICAgIHRoaXMuX29wdGlvbnMgPSB2O1xuICAgIHRoaXMuaW5uZXJPcHRpb25zID0gdjtcbiAgfVxuICBnZXQgb3B0aW9ucygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHZhbHVlRm46IFZhbHVlRnVuY3Rpb247XG5cbiAgQElucHV0KCkgdmFsdWVBdHRyOiBzdHJpbmc7XG5cbiAgLy8gRXZlbnRzXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+KCk7XG5cbiAgQE91dHB1dCgpIGVudGVyQnV0dG9uOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcblxuICAvLyBWaWV3IGVsZW1lbnRzXG4gIEBWaWV3Q2hpbGQoJ3Rlcm1JbnB1dCcpIHRlcm1JbnB1dDtcblxuICBAVmlld0NoaWxkKCdjaGlwTGlzdCcpIGNoaXBMaXN0O1xuXG4gIC8vIHByaXZhdGUgZGF0YTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55W107XG5cbiAgcHJpdmF0ZSBpbm5lck9wdGlvbnM6IGFueVtdID0gW107XG5cbiAgcHJpdmF0ZSByZXNwb25zZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgcHJpdmF0ZSBzZWFyY2gkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSBzZWFyY2hJbnB1dFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNyZWF0ZUlucHV0KCk7XG4gICAgdGhpcy5zdWJzY3JpYmVUb1NlYXJjaEFuZFNldE9wdGlvbnNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVUb0lucHV0VmFsdWVDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kZXRlY3RSZXF1aXJlZERhdGEoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb0lucHV0VmFsdWVDaGFuZ2VzKCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIFZBTFVFXG4gICovXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLnNldElubmVyVmFsdWUodik7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkID0gW107XG4gICAgICB0aGlzLndyaXR0ZW5WYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5wb3B1bGF0ZUF1dG9jb21wbGV0ZVdpdGhJbml0aWFsVmFsdWVzKHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBvbk9wdGlvblNlbGVjdGVkKCRldmVudCkge1xuXG4gICAgbGV0IHNob3VsZEVtaXQgPSB0cnVlO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKHNlbGVjdGVkT3B0aW9uKTtcblxuICAgIGlmIChzZWxlY3RlZE9wdGlvblZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG5cbiAgICAgIGlmICh0aGlzLm11bHRpKSB7XG5cbiAgICAgICAgc2hvdWxkRW1pdCA9IHRoaXMuYWRkT3B0aW9uVG9PcHRpb25zU2VsZWN0ZWQoc2VsZWN0ZWRPcHRpb24pO1xuXG4gICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh1bmRlZmluZWQpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlO1xuXG4gICAgICB9XG5cbiAgICAgIGlmIChzaG91bGRFbWl0KSB7XG4gICAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgb3B0aW9uOiBzZWxlY3RlZE9wdGlvbixcbiAgICAgICAgICBvcHRpb25zOiB0aGlzLmlubmVyT3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYmx1cklucHV0KCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uRW50ZXJCdXR0b24oJGV2ZW50KSB7XG4gICAgdGhpcy5lbnRlckJ1dHRvbi5lbWl0KCRldmVudCk7XG4gIH1cblxuICBzZXRGb2N1cygpIHtcbiAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBvcGVuUGFuZWwoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVUcmlnZ2VyLm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgb25CbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGNsZWFyKHJlb3BlbiA9IGZhbHNlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNldElucHV0VmFsdWUoJycpO1xuXG4gICAgaWYgKHRoaXMud3JpdHRlblZhbHVlID09PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gICAgfVxuXG4gICAgaWYgKHJlb3Blbikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICB9LCAxKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy53cml0dGVuVmFsdWU7XG4gICAgdGhpcy5wb3B1bGF0ZUF1dG9jb21wbGV0ZVdpdGhJbml0aWFsVmFsdWVzKHRoaXMud3JpdHRlblZhbHVlKTtcbiAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gIH1cblxuICBleHRyYWN0TGFiZWw6IExhYmVsRnVuY3Rpb24gPSAoaXRlbTogYW55KTogc3RyaW5nID0+IHtcbiAgICBsZXQgbGFiZWwgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gbGFiZWwgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLmxhYmVsRm4pIHsgLy8gVXNlIGN1c3RvbSBsYWJlbCBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IHRoaXMubGFiZWxGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sYWJlbEF0dHIpIHsgLy8gVXNlIG9iamVjdCBsYWJlbCBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgbGFiZWwgPSBpdGVtW3RoaXMubGFiZWxBdHRyXSB8fCB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxhYmVsID0gdGhpcy5lbnN1cmVTdHJpbmcobGFiZWwpO1xuICAgIHJldHVybiBsYWJlbDtcbiAgfVxuXG4gIHJlbW92ZShvcHRpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcHRpb25zU2VsZWN0ZWQuaW5kZXhPZihvcHRpb24pO1xuXG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVWYWx1ZVdpdGhPcHRpb25zU2VsZWN0ZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5wdXRWYWx1ZSh2KSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5zZXRWYWx1ZSh2KTtcblxuICAgIGlmICghdikge1xuICAgICAgdGhpcy50ZXJtSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYmx1cklucHV0KCkge1xuXG4gICAgdGhpcy50ZXJtSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgYWRkT3B0aW9uVG9PcHRpb25zU2VsZWN0ZWQob3B0aW9uKTogYm9vbGVhbiB7XG5cbiAgICBpZiAob3B0aW9uKSB7XG5cbiAgICAgIGxldCBzaG91bGRFbWl0ID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9uc1NlbGVjdGVkICYmIHRoaXMub3B0aW9uc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMub3B0aW9uc1NlbGVjdGVkLmluZGV4T2Yob3B0aW9uKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkLnB1c2gob3B0aW9uKTtcbiAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobnVsbCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZVdpdGhPcHRpb25zU2VsZWN0ZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaG91bGRFbWl0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkID0gW29wdGlvbl07XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWVXaXRoT3B0aW9uc1NlbGVjdGVkKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaG91bGRFbWl0O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHBvcHVsYXRlQXV0b2NvbXBsZXRlV2l0aEluaXRpYWxWYWx1ZXModmFsdWUsIHJlbG9hZE9wdGlvbnMgPSBmYWxzZSkge1xuXG4gICAgaWYgKHRoaXMubXVsdGkpIHtcblxuICAgICAgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xuXG4gICAgICBpZiAoaXNBcnJheSkge1xuXG4gICAgICAgIHRoaXMub3B0aW9uc1NlbGVjdGVkID0gW107XG5cbiAgICAgICAgdmFsdWUuZm9yRWFjaChvcHRpb25WYWx1ZSA9PiB7XG5cbiAgICAgICAgICB0aGlzLmxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZShvcHRpb25WYWx1ZSlcbiAgICAgICAgICAgIC50aGVuKChvcHRpb24pID0+IHtcblxuICAgICAgICAgICAgICB0aGlzLmFkZE9wdGlvblRvT3B0aW9uc1NlbGVjdGVkKG9wdGlvbik7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZSh2YWx1ZSlcbiAgICAgICAgLnRoZW4oKG9wdGlvbnMpID0+IHtcbiAgICAgICAgICB0aGlzLnNldElubmVyVmFsdWUodmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZVdpdGhPcHRpb25zU2VsZWN0ZWQoKSB7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zU2VsZWN0ZWQgJiYgdGhpcy5vcHRpb25zU2VsZWN0ZWQubGVuZ3RoKSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm9wdGlvbnNTZWxlY3RlZC5tYXAob3B0aW9uID0+IHRoaXMuZXh0cmFjdFZhbHVlKG9wdGlvbikpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcblxuICAgIH1cblxuXG4gIH1cblxuICBwcml2YXRlIGxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZSh3cml0dGVuVmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc29sZS5sb2coJ2xvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZScsIHdyaXR0ZW5WYWx1ZSlcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAod3JpdHRlblZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUod3JpdHRlblZhbHVlLCB0cnVlKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHJlc1swXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh3cml0dGVuVmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RSZXF1aXJlZERhdGEoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGVycm9yOiBzdHJpbmc7XG4gICAgICBpZiAoIXRoaXMuZW5kcG9pbnQgJiYgIXRoaXMub3B0aW9ucyAmJiAhdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG4gICAgICAgIGVycm9yID0gJ05vIGVuZHBvaW50IHwgb3B0aW9ucyB8IGN1c3RvbUZldGNoRnVuY3Rpb24gc2V0LiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvZiB0aGVtIHRvIGJlIGFibGUgdG8gdXNlIHRoZSBBdXRvY29tcGxldGUnO1xuICAgICAgfVxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMucmFpc2VFcnJvcihlcnJvcik7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0SW5wdXRDb250cm9sKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzUHJpc3RpbmUoKTtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm1hcmtBc1VudG91Y2hlZCgpO1xuICAgIHRoaXMuYmx1cklucHV0KCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RWYWx1ZTogVmFsdWVGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBhbnkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyB2YWx1ZSBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMudmFsdWVGbikgeyAvLyBVc2UgY3VzdG9tIHZhbHVlIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZUZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlQXR0cikgeyAvLyBVc2Ugb2JqZWN0IHZhbHVlIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IGl0ZW1bdGhpcy52YWx1ZUF0dHJdIHx8IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wYXJlQXNTdHJpbmcodjEsIHYyKSB7XG4gICAgY29uc3Qgc3RyaW5nMSA9IHRoaXMuZW5zdXJlU3RyaW5nKHYxKTtcbiAgICBjb25zdCBzdHJpbmcyID0gdGhpcy5lbnN1cmVTdHJpbmcodjIpO1xuICAgIHJldHVybiBzdHJpbmcxID09PSBzdHJpbmcyO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVTdHJpbmcodikge1xuICAgIGlmICh0eXBlb2YgdiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc05hTih2KSkge1xuICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ID0gYCR7dn1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHYpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodjogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9uID0gdGhpcy5nZXRPcHRpb25CYXNlZE9uVmFsdWUodik7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlKG9wdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGdldE9wdGlvbkJhc2VkT25WYWx1ZSh2OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck9wdGlvbnMuZmluZChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKGl0ZW0pO1xuICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZUFzU3RyaW5nKGl0ZW1WYWx1ZSwgdik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUlucHV0KCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZGlzYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9JbnB1dFZhbHVlQ2hhbmdlcygpIHtcblxuICAgIHRoaXMuc2VhcmNoSW5wdXRTdWJzY3JpcHRpb24gPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnZhbHVlQ2hhbmdlc1xuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgIClcbiAgICAuc3Vic2NyaWJlKHNlYXJjaFRleHQgPT4ge1xuICAgICAgdGhpcy5zZWFyY2gkLm5leHQoc2VhcmNoVGV4dCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb0lucHV0VmFsdWVDaGFuZ2VzKCkge1xuXG4gICAgdGhpcy5zZWFyY2hJbnB1dFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKSB7XG4gICAgdGhpcy5vcHRpb25zJCA9IHRoaXMuc2VhcmNoJFxuICAgIC5waXBlKFxuICAgICAgbWFwKHYgPT4gdiA/IHYgOiAnJyksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgc3dpdGNoTWFwKCh0ZXh0U2VhcmNoOiBzdHJpbmcpID0+IHtcblxuICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGV4dFNlYXJjaCB8fCAnJztcblxuICAgICAgICBjb25zdCBpc1N0cmluZ1Rlcm0gPSB0eXBlb2Ygc2VhcmNoVGVybSA9PT0gJ3N0cmluZyc7XG5cbiAgICAgICAgaWYgKGlzU3RyaW5nVGVybSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHNlYXJjaFRlcm0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZih0aGlzLmlubmVyT3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0U2VsZWN0YWJsZU9wdGlvbnMgPSAob3B0aW9ucykgPT4ge1xuXG4gICAgY29uc3QgaXNBcnJheSA9IG9wdGlvbnMgPyBBcnJheS5pc0FycmF5KG9wdGlvbnMpIDogZmFsc2U7XG5cbiAgICBsZXQgc2VsZWN0YWJsZU9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgaWYgKGlzQXJyYXkgJiYgIXRoaXMucmVwZWF0KSB7XG5cbiAgICAgIHNlbGVjdGFibGVPcHRpb25zID0gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnJlcGVhdCkge1xuICAgICAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUob3B0aW9uKTtcbiAgICAgICAgICBsZXQgYWxyZWFkeVNlbGVjdGVkOiBib29sZWFuO1xuICAgICAgICAgIGlmICh0aGlzLm11bHRpKSB7XG4gICAgICAgICAgICBhbHJlYWR5U2VsZWN0ZWQgPSB0aGlzLm9wdGlvbnNTZWxlY3RlZCAmJiB0aGlzLm9wdGlvbnNTZWxlY3RlZC5maW5kKHNlbGVjdGVkID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKHNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZUFzU3RyaW5nKHNlbGVjdGVkVmFsdWUsIG9wdGlvblZhbHVlKTtcbiAgICAgICAgICAgIH0pID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbHJlYWR5U2VsZWN0ZWQgPSB0aGlzLmNvbXBhcmVBc1N0cmluZyh0aGlzLnZhbHVlLCBvcHRpb25WYWx1ZSk7O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gIWFscmVhZHlTZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0YWJsZU9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHRleHRTZWFyY2gsIHJlbWVtYmVyUmVzcG9uc2UgPSBmYWxzZSk6IE9ic2VydmFibGU8YW55W10+IHtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoSW5Mb2NhbE9wdGlvbnModGV4dFNlYXJjaCk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbikge1xuXG4gICAgICByZXR1cm4gdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKHRleHRTZWFyY2gpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChvcHRpb25zID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgY29uc3QgYm9keSA9IHRleHRTZWFyY2ggPyB7IHRleHRTZWFyY2ggfSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHJlbWVtYmVyUmVzcG9uc2UpIHtcblxuICAgICAgICBjb25zdCBkYXRhSW5NZW1vcnkgPSB0aGlzLnJlc3BvbnNlc1t0ZXh0U2VhcmNoXTtcblxuICAgICAgICBpZiAoZGF0YUluTWVtb3J5KSB7XG5cbiAgICAgICAgICByZXR1cm4gb2YoZGF0YUluTWVtb3J5KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXQ8YW55W10+KHRoaXMuZW5kcG9pbnQsIGJvZHkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFwKChvcHRpb25zOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VzW3RleHRTZWFyY2hdID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldDxhbnlbXT4odGhpcy5lbmRwb2ludCwgYm9keSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcCgob3B0aW9uczogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuXG4gICAgICB9XG5cblxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoSW5Mb2NhbE9wdGlvbnModGVybTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGVybVN0cmluZyA9IGAke3Rlcm19YDtcblxuICAgIGxldCBmaWx0ZXJlZERhdGEgPSB0aGlzLmlubmVyT3B0aW9ucztcblxuICAgIGlmICh0ZXJtU3RyaW5nKSB7XG4gICAgICBmaWx0ZXJlZERhdGEgPSB0aGlzLmlubmVyT3B0aW9uc1xuICAgICAgLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgY29uc3QgbGFiZWw6IHN0cmluZyA9IHRoaXMuZXh0cmFjdExhYmVsKGl0ZW0pO1xuICAgICAgICBjb25zdCBsb3dlckNhc2VMYWJlbCA9IGxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZVRlcm0gPSB0ZXJtU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBsb3dlckNhc2VMYWJlbC5zZWFyY2gobG93ZXJDYXNlVGVybSkgPj0gMDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBvZihmaWx0ZXJlZERhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSByYWlzZUVycm9yKGVycm9yOiBzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCBFcnJvcjo6IFRoZSBhdXRvY29tcGxldGUgd2l0aCBuYW1lIFwiJHt0aGlzLm5hbWV9XCIgaGFkIHRoZSBmb2xsb3cgcHJvYmxlbTogJHtlcnJvcn1gKTtcbiAgfVxuXG59XG4iXX0=