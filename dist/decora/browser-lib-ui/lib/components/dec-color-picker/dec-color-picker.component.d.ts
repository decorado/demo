import { MatDialog } from '@angular/material';
import { ColorPickerService } from './../../services/color-picker/color-picker.service';
import { ControlValueAccessor } from '@angular/forms';
import { DecColorService } from './../../services/color/dec-color.service';
export declare class DecColorPickerComponent implements ControlValueAccessor {
    private dialog;
    private colorPickerService;
    colorService: DecColorService;
    disabled: boolean;
    colorFormat: string;
    placeholder: string;
    autocomplete: string;
    pattern: string;
    value: any;
    hexValue: any;
    private modelValueReference;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(dialog: MatDialog, colorPickerService: ColorPickerService, colorService: DecColorService);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    startColorPicker(): void;
    openColorBox(): void;
    setValueBasedOnColorFormat(): void;
    private updateHexValueBasedOnModelValueAndFormat();
}
