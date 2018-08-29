import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR: any;
export declare class DecAutocompleteCompanyComponent implements ControlValueAccessor {
    endpoint: string;
    valueAttr: string;
    disabled: boolean;
    required: boolean;
    name: string;
    placeholder: string;
    multi: boolean;
    repeat: boolean;
    blur: EventEmitter<any>;
    optionSelected: EventEmitter<any>;
    private innerValue;
    private onTouchedCallback;
    private onChangeCallback;
    constructor();
    value: any;
    labelFn(company: any): string;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onValueChanged(event: any): void;
    writeValue(value: any): void;
    onAutocompleteBlur($event: any): void;
}
