import { EventEmitter, OnInit } from '@angular/core';
export declare class DecListActiveFilterResumeComponent implements OnInit {
    filterGroups: any[];
    remove: EventEmitter<any>;
    edit: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    editDecFilterGroup($event: any, filterGroup: any): void;
    removeDecFilterGroup($event: any, filterGroup: any): void;
    getValuetype(value: any): any;
}
