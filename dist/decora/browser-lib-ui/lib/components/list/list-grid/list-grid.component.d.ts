import { OnInit, TemplateRef, EventEmitter } from '@angular/core';
export declare class DecListGridComponent implements OnInit {
    selected: any[];
    templateRef: TemplateRef<any>;
    itemWidth: string;
    itemGap: string;
    rowClick: EventEmitter<any>;
    private _rows;
    constructor();
    rows: any;
    ngOnInit(): void;
    onItemClick(event: any, item: any, list: any, index: any): void;
}
