import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const BASE_ENDPOINT = "companies/${companyId}/departments/options";
export declare const AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR: any;
export declare class DecAutocompleteDepartmentComponent implements ControlValueAccessor {
    endpoint: string;
    labelAttr: string;
    valueAttr: string;
    companyId: string;
    disabled: boolean;
    required: boolean;
    name: string;
    placeholder: string;
    blur: EventEmitter<any>;
    optionSelected: EventEmitter<any>;
    private _companyId;
    private innerValue;
    private onTouchedCallback;
    private onChangeCallback;
    constructor();
    value: any;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onValueChanged(event: any): void;
    writeValue(value: any): void;
    onAutocompleteBlur($event: any): void;
    setEndpointBasedOncompanyId(): void;
}
