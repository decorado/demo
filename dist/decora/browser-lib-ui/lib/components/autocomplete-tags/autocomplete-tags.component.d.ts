import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class AutocompleteTagsComponent implements ControlValueAccessor {
    endpoint: string;
    valueAttr: string;
    labelAttr: string;
    disabled: boolean;
    required: boolean;
    name: string;
    placeholder: string;
    blur: EventEmitter<any>;
    optionSelected: EventEmitter<any>;
    enterButton: EventEmitter<any>;
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
