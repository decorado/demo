import { OnInit, EventEmitter } from '@angular/core';
import { DecMarksComponent } from './../dec-marks/dec-marks.component';
export declare class DecZoomAreaComponent implements OnInit {
    reference: any;
    render: any;
    save: EventEmitter<{}>;
    cancel: EventEmitter<{}>;
    private _reference;
    private _render;
    parentId: number;
    commentIndex: any;
    referenceQaMode: boolean;
    descripition: any;
    renderMarkdons: any[];
    renderZoom: DecMarksComponent;
    referenceZoom: DecMarksComponent;
    constructor();
    ngOnInit(): void;
    onSave(): void;
    onLinkTag(event: any): void;
    onReferenceQa($event: any): void;
    onCancel(): void;
}
