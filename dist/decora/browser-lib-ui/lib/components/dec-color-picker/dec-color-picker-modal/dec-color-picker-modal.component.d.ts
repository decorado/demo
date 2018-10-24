import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DecColorService } from './../../../services/color/dec-color.service';
import { ColorPickerService } from './../../../services/color-picker/color-picker.service';
export declare class DecColorPickerModalComponent implements OnInit {
    private dialogRef;
    private data;
    private decColorService;
    private colorPickerService;
    red: number;
    green: number;
    blue: number;
    hex: string;
    rgb: string;
    constructor(dialogRef: MatDialogRef<DecColorPickerModalComponent>, data: any, decColorService: DecColorService, colorPickerService: ColorPickerService);
    ngOnInit(): void;
    private load();
    private dragInit();
    changeRgbValue(): void;
    startColorPicker(): void;
    close(): void;
}
