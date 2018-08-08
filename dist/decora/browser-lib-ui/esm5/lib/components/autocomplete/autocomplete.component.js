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
var /** @type {?} */ noop = function () {
};
var ɵ0 = noop;
//  Used to extend ngForms functions
export var /** @type {?} */ AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteComponent; }),
    multi: true
};
var DecAutocompleteComponent = /** @class */ (function () {
    function DecAutocompleteComponent(formBuilder, service) {
        var _this = this;
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
        this.extractLabel = function (item) {
            var /** @type {?} */ label = item; // use the object itself if no label function or attribute is provided
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
            var /** @type {?} */ value = item; // use the object itself if no value function or attribute is provided
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
        this.createInput();
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
        var _this = this;
        this.detectRequiredData()
            .then(function (res) {
            _this.subscribeToSearchAndSetOptionsObservable();
            _this.subscribeToOptions();
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeToOptions();
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
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.writeValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        var _this = this;
        this.writtenValue = v;
        v = v ? v : undefined; // avoid null values
        var /** @type {?} */ hasDifference = !this.compareAsString(v, this.value);
        if (hasDifference) {
            this.loadRemoteObjectByWrittenValue(v)
                .then(function (options) {
                _this.setInnerValue(v);
            });
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
        var /** @type {?} */ selectedOption = $event.option.value;
        var /** @type {?} */ selectedOptionValue = this.extractValue(selectedOption);
        if (selectedOptionValue !== this.value) {
            this.value = selectedOptionValue;
            this.optionSelected.emit({
                value: this.value,
                option: selectedOption,
                options: this.innerOptions,
                filteredOptions: this.filteredOptions,
            });
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
        this.autocompleteInput.setValue('');
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
        this.setInnerValue(this.writtenValue);
        this.resetInputControl();
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
                _this.searchBasedFetchingType(writtenValue)
                    .subscribe(function (res) {
                    resolve(writtenValue);
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
            var /** @type {?} */ error;
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
        var /** @type {?} */ string1 = this.ensureString(v1);
        var /** @type {?} */ string2 = this.ensureString(v2);
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
     * @return {?}
     */
    DecAutocompleteComponent.prototype.subscribeToOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.options$Subscription = this.options$.subscribe(function (options) {
            _this.filteredOptions = options;
        });
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
        var /** @type {?} */ option = this.getOptionBasedOnValue(v);
        var /** @type {?} */ label = this.extractLabel(option);
        this.autocompleteInput.setValue(option);
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
            var /** @type {?} */ itemValue = _this.extractValue(item);
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
        this.autocompleteInput = this.formBuilder.control({ value: undefined, disabled: this.disabled, required: this.required });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.subscribeToSearchAndSetOptionsObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.options$ = this.autocompleteInput.valueChanges
            .pipe(startWith(''), debounceTime(300), distinctUntilChanged(), switchMap(function (textSearch) {
            var /** @type {?} */ isStringTerm = typeof textSearch === 'string';
            if (isStringTerm) {
                return _this.searchBasedFetchingType(textSearch);
            }
            else {
                return of(_this.innerOptions);
            }
        }));
    };
    /**
     * @param {?} textSearch
     * @return {?}
     */
    DecAutocompleteComponent.prototype.searchBasedFetchingType = /**
     * @param {?} textSearch
     * @return {?}
     */
    function (textSearch) {
        var _this = this;
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
            var /** @type {?} */ body = textSearch ? { textSearch: textSearch } : undefined;
            return this.service.get(this.endpoint, body)
                .pipe(tap(function (options) {
                _this.innerOptions = options;
            }));
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.unsubscribeToOptions = /**
     * @return {?}
     */
    function () {
        this.options$Subscription.unsubscribe();
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
        var /** @type {?} */ termString = "" + term;
        var /** @type {?} */ filteredData = this.innerOptions;
        if (termString) {
            filteredData = this.innerOptions
                .filter(function (item) {
                var /** @type {?} */ label = _this.extractLabel(item);
                var /** @type {?} */ lowerCaseLabel = label.toLowerCase();
                var /** @type {?} */ lowerCaseTerm = termString.toLowerCase();
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
                    template: "<div>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    #termInput\n    [matAutocomplete]=\"autocomplete\"\n    [formControl]=\"autocompleteInput\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [placeholder]=\"placeholder\"\n    (keyup.enter)=\"onEnterButton($event)\"\n    (blur)=\"onBlur($event)\">\n\n    <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"!disabled && !required && autocompleteInput.value\">\n      <mat-icon>close</mat-icon>\n    </button>\n\n    <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"!disabled && value !== writtenValue\">\n      <mat-icon>replay</mat-icon>\n    </button>\n\n  </mat-form-field>\n\n  <mat-autocomplete #autocomplete=\"matAutocomplete\"\n  [displayWith]=\"extractLabel\"\n  (optionSelected)=\"onOptionSelected($event)\"\n  name=\"autocompleteValue\">\n    <mat-option *ngFor=\"let item of (options$ | async)\" [value]=\"item\">\n      {{ extractLabel(item) }}\n    </mat-option>\n  </mat-autocomplete>\n</div>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: DecApiService }
    ]; };
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
    return DecAutocompleteComponent;
}());
export { DecAutocompleteComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFlLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ25HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQWMsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRzNELHFCQUFNLElBQUksR0FBRztDQUNaLENBQUM7OztBQUdGLE1BQU0sQ0FBQyxxQkFBTSxtQ0FBbUMsR0FBUTtJQUN0RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHdCQUF3QixFQUF4QixDQUF3QixDQUFDO0lBQ3ZELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7SUE4SEEsa0NBQ1UsYUFDQTtRQUZWLGlCQUtDO1FBSlMsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsWUFBTyxHQUFQLE9BQU87b0JBckRELG1CQUFtQjsyQkFXWixFQUFFOztvQkFTVyxJQUFJLFlBQVksRUFBTzs4QkFFRixJQUFJLFlBQVksRUFBa0I7MkJBRXJDLElBQUksWUFBWSxFQUFrQjs0QkFZbEUsRUFBRTsrQkFFUyxFQUFFOzBCQU9ULEVBQUU7aUNBRVksSUFBSTtnQ0FFQyxJQUFJOzRCQWdIbkIsVUFBQyxJQUFTO1lBQ3RDLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7b0JBQ2pCLEtBQUssR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O29CQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUM7aUJBRTNDO2FBQ0Y7WUFDRCxLQUFLLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7NEJBbUNxQyxVQUFDLElBQVM7WUFDOUMscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNULEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztvQkFDakIsS0FBSyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7b0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztpQkFDM0M7YUFDRjtZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtRQW5LQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7SUEzRUQsc0JBQ0ksOENBQVE7Ozs7UUFVWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7OztRQWJELFVBQ2EsQ0FBVTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDbEM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNqQzthQUNGO1NBQ0Y7OztPQUFBO0lBV0Qsc0JBQ0ksNkNBQU87Ozs7UUFJWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3RCOzs7OztRQVBELFVBQ1ksQ0FBUTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUN2Qjs7O09BQUE7Ozs7SUFvREQsa0RBQWU7OztJQUFmO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7YUFDeEIsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNQLEtBQUksQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDO1lBQ2hELEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsOENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7S0FDN0I7SUFLRCxzQkFBSSwyQ0FBSzs7OztRQU1UO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFYRDs7VUFFRTs7Ozs7UUFDRixVQUFVLENBQU07WUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNGOzs7T0FBQTs7Ozs7SUFLRCxtREFBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUVELG9EQUFpQjs7OztJQUFqQixVQUFrQixFQUFPO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7S0FDN0I7Ozs7O0lBRUQsaURBQWM7Ozs7SUFBZCxVQUFlLEtBQVU7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDL0I7Ozs7O0lBRUQsNkNBQVU7Ozs7SUFBVixVQUFXLENBQU07UUFBakIsaUJBVUM7UUFUQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN0QixxQkFBTSxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO2lCQUNyQyxJQUFJLENBQUMsVUFBQyxPQUFPO2dCQUNaLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkIsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7Ozs7SUFFRCxtREFBZ0I7Ozs7SUFBaEIsVUFBaUIsTUFBTTtRQUNyQixxQkFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0MscUJBQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5RCxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO2dCQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxjQUFjO2dCQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQzFCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTthQUN0QyxDQUFDLENBQUM7U0FDSjtLQUNGOzs7OztJQUVELGdEQUFhOzs7O0lBQWIsVUFBYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9COzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDdEM7Ozs7SUFFRCw0Q0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDdEM7Ozs7SUFFRCw2Q0FBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDdkM7Ozs7O0lBRUQseUNBQU07Ozs7SUFBTixVQUFPLE1BQU07UUFDWCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBRUQsd0NBQUs7Ozs7SUFBTCxVQUFNLE1BQWM7UUFBcEIsaUJBV0M7UUFYSyx1QkFBQSxFQUFBLGNBQWM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLFVBQVUsQ0FBQztnQkFDVCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO0tBQ0Y7Ozs7SUFFRCx3Q0FBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDMUI7Ozs7O0lBZ0JPLGlFQUE4Qjs7OztjQUFDLFlBQWlCOztRQUN0RCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN0QyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDO3FCQUN6QyxTQUFTLENBQUMsVUFBQyxHQUFHO29CQUNiLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDdkIsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDdkI7U0FDRixDQUFDLENBQUM7Ozs7O0lBR0cscURBQWtCOzs7OztRQUN4QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxxQkFBSSxLQUFhLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLEtBQUssR0FBRyxrSEFBa0gsQ0FBQzthQUM1SDtZQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2Y7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0YsQ0FBQyxDQUFDOzs7OztJQUdHLG9EQUFpQjs7OztRQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7O0lBZW5DLGtEQUFlOzs7OztjQUFDLEVBQUUsRUFBRSxFQUFFO1FBQzVCLHFCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLHFCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDOzs7Ozs7SUFHckIsK0NBQVk7Ozs7Y0FBQyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLENBQUMsR0FBRyxLQUFHLENBQUcsQ0FBQzthQUNaO1NBQ0Y7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7OztJQUdILHFEQUFrQjs7Ozs7UUFDeEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUN6RCxLQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztTQUNoQyxDQUFDLENBQUM7Ozs7OztJQUdHLGdEQUFhOzs7O2NBQUMsQ0FBTTtRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUdqQyxpRUFBOEI7Ozs7Y0FBQyxDQUFNO1FBQzNDLHFCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0lBR2xDLHdEQUFxQjs7OztjQUFDLENBQU07O1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDaEMscUJBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzNDLENBQUMsQ0FBQzs7Ozs7SUFHRyw4Q0FBVzs7OztRQUNqQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQzs7Ozs7SUFHbEgsMkVBQXdDOzs7OztRQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZO2FBQ2xELElBQUksQ0FDSCxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQ2IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixvQkFBb0IsRUFBRSxFQUN0QixTQUFTLENBQUMsVUFBQyxVQUFrQjtZQUMzQixxQkFBTSxZQUFZLEdBQUcsT0FBTyxVQUFVLEtBQUssUUFBUSxDQUFDO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDakQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM5QjtTQUNGLENBQUMsQ0FDSCxDQUFDOzs7Ozs7SUFHSSwwREFBdUI7Ozs7Y0FBQyxVQUFVOztRQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7aUJBQ3hDLElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQSxPQUFPO2dCQUNULEtBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2FBQzdCLENBQUMsQ0FDSCxDQUFDO1NBQ0w7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLHFCQUFNLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBUSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztpQkFDaEQsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFDLE9BQWM7Z0JBQ2pCLEtBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2FBQzdCLENBQUMsQ0FDSCxDQUFDO1NBQ0w7Ozs7O0lBR0ssdURBQW9COzs7O1FBQzFCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7O0lBR2xDLHVEQUFvQjs7OztjQUFDLElBQVk7O1FBQ3ZDLHFCQUFNLFVBQVUsR0FBRyxLQUFHLElBQU0sQ0FBQztRQUU3QixxQkFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2YsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZO2lCQUMvQixNQUFNLENBQUMsVUFBQSxJQUFJO2dCQUNWLHFCQUFNLEtBQUssR0FBVyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QyxxQkFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQyxxQkFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMvQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEQsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7Ozs7SUFHbEIsNkNBQVU7Ozs7Y0FBQyxLQUFhO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQWdFLElBQUksQ0FBQyxJQUFJLG1DQUE2QixLQUFPLENBQUMsQ0FBQzs7O2dCQS9ZbEksU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxxZ0NBaUNYO29CQUNDLE1BQU0sRUFBRSxFQUFFO29CQUNWLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2lCQUNqRDs7OztnQkF4RFEsV0FBVztnQkFDWCxhQUFhOzs7c0NBMERuQixTQUFTLFNBQUMsc0JBQXNCO3NDQVNoQyxLQUFLOzJCQUVMLEtBQUs7MkJBRUwsS0FBSzswQkFlTCxLQUFLOzRCQUVMLEtBQUs7dUJBRUwsS0FBSzswQkFFTCxLQUFLOzhCQVNMLEtBQUs7MkJBRUwsS0FBSzswQkFFTCxLQUFLOzRCQUVMLEtBQUs7dUJBR0wsTUFBTTtpQ0FFTixNQUFNOzhCQUVOLE1BQU07NEJBR04sU0FBUyxTQUFDLFdBQVc7O21DQXZIeEI7O1NBMERhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcCwgc3RhcnRXaXRoLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYWJlbEZ1bmN0aW9uLCBWYWx1ZUZ1bmN0aW9uLCBTZWxlY3Rpb25FdmVudCwgQ3VzdG9tRmV0Y2hGdW5jdGlvbiB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLm1vZGVscyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgI3Rlcm1JbnB1dFxuICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlSW5wdXRcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwib25FbnRlckJ1dHRvbigkZXZlbnQpXCJcbiAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiPlxuXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjbGVhcih0cnVlKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmICFyZXF1aXJlZCAmJiBhdXRvY29tcGxldGVJbnB1dC52YWx1ZVwiPlxuICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwicmVzZXQoKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmIHZhbHVlICE9PSB3cml0dGVuVmFsdWVcIj5cbiAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuXG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG9jb21wbGV0ZT1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gIFtkaXNwbGF5V2l0aF09XCJleHRyYWN0TGFiZWxcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib25PcHRpb25TZWxlY3RlZCgkZXZlbnQpXCJcbiAgbmFtZT1cImF1dG9jb21wbGV0ZVZhbHVlXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgKG9wdGlvbnMkIHwgYXN5bmMpXCIgW3ZhbHVlXT1cIml0ZW1cIj5cbiAgICAgIHt7IGV4dHJhY3RMYWJlbChpdGVtKSB9fVxuICAgIDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBAVmlld0NoaWxkKE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIpICBhdXRvY29tcGxldGVUcmlnZ2VyOiBNYXRBdXRvY29tcGxldGVUcmlnZ2VyO1xuXG4gIGF1dG9jb21wbGV0ZUlucHV0OiBGb3JtQ29udHJvbDtcblxuICBvcHRpb25zJDogT2JzZXJ2YWJsZTxhbnlbXT47XG5cbiAgd3JpdHRlblZhbHVlOiBhbnk7XG5cbiAgLy8gUGFyYW1zXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoRnVuY3Rpb246IEN1c3RvbUZldGNoRnVuY3Rpb247XG5cbiAgQElucHV0KCkgZW5kcG9pbnQ7XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHY7XG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQpIHtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZGlzYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGxhYmVsRm46IExhYmVsRnVuY3Rpb247XG5cbiAgQElucHV0KCkgbGFiZWxBdHRyOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbmFtZSA9ICdhdXRvY29tcGxldGVJbnB1dCc7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnModjogYW55W10pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gdjtcbiAgICB0aGlzLmlubmVyT3B0aW9ucyA9IHY7XG4gIH1cbiAgZ2V0IG9wdGlvbnMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSB2YWx1ZUZuOiBWYWx1ZUZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIHZhbHVlQXR0cjogc3RyaW5nO1xuXG4gIC8vIEV2ZW50c1xuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PigpO1xuICBcbiAgQE91dHB1dCgpIGVudGVyQnV0dG9uOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcblxuICAvLyBWaWV3IGVsZW1lbnRzXG4gIEBWaWV3Q2hpbGQoJ3Rlcm1JbnB1dCcpIHRlcm1JbnB1dDtcblxuICAvLyBwcml2YXRlIGRhdGE7XG4gIHByaXZhdGUgb3B0aW9ucyRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9vcHRpb25zOiBhbnlbXTtcblxuICBpbm5lck9wdGlvbnM6IGFueVtdID0gW107XG5cbiAgcHJpdmF0ZSBmaWx0ZXJlZE9wdGlvbnM6IGFueVtdID0gW107XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY3JlYXRlSW5wdXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRldGVjdFJlcXVpcmVkRGF0YSgpXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb09wdGlvbnMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb09wdGlvbnMoKTtcbiAgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodjogYW55KSB7XG4gICAgdGhpcy53cml0dGVuVmFsdWUgPSB2O1xuICAgIHYgPSB2ID8gdiA6IHVuZGVmaW5lZDsgLy8gYXZvaWQgbnVsbCB2YWx1ZXNcbiAgICBjb25zdCBoYXNEaWZmZXJlbmNlID0gIXRoaXMuY29tcGFyZUFzU3RyaW5nKHYsIHRoaXMudmFsdWUpO1xuICAgIGlmIChoYXNEaWZmZXJlbmNlKSB7XG4gICAgICB0aGlzLmxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZSh2KVxuICAgICAgLnRoZW4oKG9wdGlvbnMpID0+IHtcbiAgICAgICAgdGhpcy5zZXRJbm5lclZhbHVlKHYpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25PcHRpb25TZWxlY3RlZCgkZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9ICRldmVudC5vcHRpb24udmFsdWU7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKHNlbGVjdGVkT3B0aW9uKTtcbiAgICBpZiAoc2VsZWN0ZWRPcHRpb25WYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkT3B0aW9uVmFsdWU7XG4gICAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQoe1xuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgb3B0aW9uOiBzZWxlY3RlZE9wdGlvbixcbiAgICAgICAgb3B0aW9uczogdGhpcy5pbm5lck9wdGlvbnMsXG4gICAgICAgIGZpbHRlcmVkT3B0aW9uczogdGhpcy5maWx0ZXJlZE9wdGlvbnMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkVudGVyQnV0dG9uKCRldmVudCkge1xuICAgIHRoaXMuZW50ZXJCdXR0b24uZW1pdCgkZXZlbnQpO1xuICB9IFxuXG4gIHNldEZvY3VzKCkge1xuICAgIHRoaXMudGVybUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIG9wZW5QYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIub3BlblBhbmVsKCk7XG4gIH1cblxuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVHJpZ2dlci5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBvbkJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY2xlYXIocmVvcGVuID0gZmFsc2UpIHtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuc2V0VmFsdWUoJycpO1xuICAgIGlmICh0aGlzLndyaXR0ZW5WYWx1ZSA9PT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5yZXNldElucHV0Q29udHJvbCgpO1xuICAgIH1cbiAgICBpZiAocmVvcGVuKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH0sIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLndyaXR0ZW5WYWx1ZTtcbiAgICB0aGlzLnNldElubmVyVmFsdWUodGhpcy53cml0dGVuVmFsdWUpO1xuICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgfVxuXG4gIGV4dHJhY3RMYWJlbDogTGFiZWxGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGxldCBsYWJlbCA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyBsYWJlbCBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMubGFiZWxGbikgeyAvLyBVc2UgY3VzdG9tIGxhYmVsIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIGxhYmVsID0gdGhpcy5sYWJlbEZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxhYmVsQXR0cikgeyAvLyBVc2Ugb2JqZWN0IGxhYmVsIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IGl0ZW1bdGhpcy5sYWJlbEF0dHJdIHx8IHVuZGVmaW5lZDtcblxuICAgICAgfVxuICAgIH1cbiAgICBsYWJlbCA9IHRoaXMuZW5zdXJlU3RyaW5nKGxhYmVsKTtcbiAgICByZXR1cm4gbGFiZWw7XG4gIH1cblxuICBwcml2YXRlIGxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZSh3cml0dGVuVmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHdyaXR0ZW5WYWx1ZSkge1xuICAgICAgICB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHdyaXR0ZW5WYWx1ZSlcbiAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh3cml0dGVuVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUod3JpdHRlblZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0UmVxdWlyZWREYXRhKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBlcnJvcjogc3RyaW5nO1xuICAgICAgaWYgKCF0aGlzLmVuZHBvaW50ICYmICF0aGlzLm9wdGlvbnMgJiYgIXRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbikge1xuICAgICAgICBlcnJvciA9ICdObyBlbmRwb2ludCB8IG9wdGlvbnMgfCBjdXN0b21GZXRjaEZ1bmN0aW9uIHNldC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb2YgdGhlbSB0byBiZSBhYmxlIHRvIHVzZSB0aGUgQXV0b2NvbXBsZXRlJztcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLnJhaXNlRXJyb3IoZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldElucHV0Q29udHJvbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNVbnRvdWNoZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdFZhbHVlOiBWYWx1ZUZ1bmN0aW9uID0gKGl0ZW06IGFueSk6IGFueSA9PiB7XG4gICAgbGV0IHZhbHVlID0gaXRlbTsgLy8gdXNlIHRoZSBvYmplY3QgaXRzZWxmIGlmIG5vIHZhbHVlIGZ1bmN0aW9uIG9yIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZUZuKSB7IC8vIFVzZSBjdXN0b20gdmFsdWUgZnVuY3Rpb24gaWYgcHJvdmlkZWRcbiAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlRm4oaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWVBdHRyKSB7IC8vIFVzZSBvYmplY3QgdmFsdWUgYXR0cmlidXRlIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gaXRlbVt0aGlzLnZhbHVlQXR0cl0gfHwgdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGNvbXBhcmVBc1N0cmluZyh2MSwgdjIpIHtcbiAgICBjb25zdCBzdHJpbmcxID0gdGhpcy5lbnN1cmVTdHJpbmcodjEpO1xuICAgIGNvbnN0IHN0cmluZzIgPSB0aGlzLmVuc3VyZVN0cmluZyh2Mik7XG4gICAgcmV0dXJuIHN0cmluZzEgPT09IHN0cmluZzI7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVN0cmluZyh2KSB7XG4gICAgaWYgKHR5cGVvZiB2ICE9PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGlzTmFOKHYpKSB7XG4gICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYgPSBgJHt2fWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb09wdGlvbnMoKSB7XG4gICAgdGhpcy5vcHRpb25zJFN1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9ucyQuc3Vic2NyaWJlKG9wdGlvbnMgPT4ge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodik7XG4gIH1cblxuICBwcml2YXRlIHNldElucHV0VmFsdWVCYXNlZE9uSW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICBjb25zdCBvcHRpb24gPSB0aGlzLmdldE9wdGlvbkJhc2VkT25WYWx1ZSh2KTtcbiAgICBjb25zdCBsYWJlbCA9IHRoaXMuZXh0cmFjdExhYmVsKG9wdGlvbik7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5zZXRWYWx1ZShvcHRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25CYXNlZE9uVmFsdWUodjogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJPcHRpb25zLmZpbmQoaXRlbSA9PiB7XG4gICAgICBjb25zdCBpdGVtVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShpdGVtKTtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBc1N0cmluZyhpdGVtVmFsdWUsIHYpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbnB1dCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0ID0gdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKHt2YWx1ZTogdW5kZWZpbmVkLCBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCwgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWR9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpIHtcbiAgICB0aGlzLm9wdGlvbnMkID0gdGhpcy5hdXRvY29tcGxldGVJbnB1dC52YWx1ZUNoYW5nZXNcbiAgICAucGlwZShcbiAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBzd2l0Y2hNYXAoKHRleHRTZWFyY2g6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBpc1N0cmluZ1Rlcm0gPSB0eXBlb2YgdGV4dFNlYXJjaCA9PT0gJ3N0cmluZyc7XG4gICAgICAgIGlmIChpc1N0cmluZ1Rlcm0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh0ZXh0U2VhcmNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2YodGhpcy5pbm5lck9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHRleHRTZWFyY2gpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoSW5Mb2NhbE9wdGlvbnModGV4dFNlYXJjaCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24odGV4dFNlYXJjaClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKG9wdGlvbnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0ZXh0U2VhcmNoID8geyB0ZXh0U2VhcmNoIH0gOiB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldDxhbnlbXT4odGhpcy5lbmRwb2ludCwgYm9keSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChvcHRpb25zOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvT3B0aW9ucygpIHtcbiAgICB0aGlzLm9wdGlvbnMkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEluTG9jYWxPcHRpb25zKHRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHRlcm1TdHJpbmcgPSBgJHt0ZXJtfWA7XG5cbiAgICBsZXQgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnM7XG5cbiAgICBpZiAodGVybVN0cmluZykge1xuICAgICAgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnNcbiAgICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSB0aGlzLmV4dHJhY3RMYWJlbChpdGVtKTtcbiAgICAgICAgY29uc3QgbG93ZXJDYXNlTGFiZWwgPSBsYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBsb3dlckNhc2VUZXJtID0gdGVybVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbG93ZXJDYXNlTGFiZWwuc2VhcmNoKGxvd2VyQ2FzZVRlcm0pID49IDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YoZmlsdGVyZWREYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgcmFpc2VFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgRXJyb3I6OiBUaGUgYXV0b2NvbXBsZXRlIHdpdGggbmFtZSBcIiR7dGhpcy5uYW1lfVwiIGhhZCB0aGUgZm9sbG93IHByb2JsZW06ICR7ZXJyb3J9YCk7XG4gIH1cblxufVxuIl19