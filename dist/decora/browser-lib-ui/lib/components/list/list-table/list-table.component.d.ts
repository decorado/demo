import { QueryList, EventEmitter } from '@angular/core';
import { DecListTableColumnComponent } from './../list-table-column/list-table-column.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
export declare class DecListTableComponent {
    rows: any[];
    selectable: boolean;
    selected: any[];
    tableComponent: DatatableComponent;
    columnsSortConfig: any;
    private _rows;
    columns: QueryList<DecListTableColumnComponent>;
    sort: EventEmitter<any>;
    rowClick: EventEmitter<any>;
    constructor();
    onSort(event: any): void;
    onSelect({selected}: {
        selected: any;
    }): void;
    onItemClick($event: any): void;
}
