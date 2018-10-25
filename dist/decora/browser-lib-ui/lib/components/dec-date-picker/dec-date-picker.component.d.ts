import { ControlValueAccessor } from '@angular/forms';
export declare class DecDatePickerComponent implements ControlValueAccessor {
    placeholder: string;
    mode: 'date' | 'timestamp';
    dateValue: Date;
    private innerDateValue;
    private innerValue;
    private onTouchedCallback;
    private onChangeCallback;
    constructor();
    writeValue(value: Date | number): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onInputBlur(event: any): void;
    private detectModeBasedOnInputType(value);
}
