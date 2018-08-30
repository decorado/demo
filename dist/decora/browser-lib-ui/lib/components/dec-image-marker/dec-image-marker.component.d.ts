import { OnInit } from '@angular/core';
import { DecImageMarksComponent } from './../dec-image-marks/dec-image-marks.component';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
export declare class DecImageMarkerComponent implements OnInit {
    private dialog;
    private translateService;
    render: any;
    qaModeActive: boolean;
    private _qaModeActive;
    private existsEvents;
    decMarks: DecImageMarksComponent;
    constructor(dialog: MatDialog, translateService: TranslateService);
    ngOnInit(): void;
    deleteMark(target: any, commentIndex: any): void;
    addListeners(wrapperElement: HTMLDivElement, imageElement: HTMLImageElement): any;
}
