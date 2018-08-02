import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
export declare const AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR: any;
export declare class DecAutocompleteCountryComponent implements ControlValueAccessor {
    countries$: Observable<any>;
    lang: 'en' | 'pt-br';
    disabled: boolean;
    required: boolean;
    name: string;
    placeholder: string;
    blur: EventEmitter<any>;
    optionSelected: EventEmitter<any>;
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
    labelFn: (item: any) => any;
    valueFn: (item: any) => any;
}
