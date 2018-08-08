import { OnInit } from '@angular/core';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class DecStringArrayInputComponent implements OnInit {
    name: any;
    placeholder: any;
    mode: string;
    rows: number;
    value: string[];
    valueAsString: string;
    private innerArray;
    private onTouchedCallback;
    private onChangeCallback;
    constructor();
    ngOnInit(): void;
    getArrayAsString(): string;
    writeValue(value: string[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onValueChanged(event: any): void;
    private stringToArray(stringOfArray);
    private arrayToString(arrayOfstring);
}
