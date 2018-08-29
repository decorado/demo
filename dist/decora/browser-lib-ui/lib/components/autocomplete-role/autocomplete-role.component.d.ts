import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
export declare class DecAutocompleteRoleComponent implements ControlValueAccessor {
    private decoraApi;
    endpoint: string;
    labelAttr: string;
    valueAttr: string;
    types: string[];
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
    constructor(decoraApi: DecApiService);
    value: any;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onValueChanged(event: any): void;
    writeValue(value: any): void;
    onAutocompleteBlur($event: any): void;
}
