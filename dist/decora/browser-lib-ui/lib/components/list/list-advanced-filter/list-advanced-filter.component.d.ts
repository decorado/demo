import { OnInit, TemplateRef } from '@angular/core';
export declare class DecListAdvancedFilterComponent implements OnInit {
    form: any;
    opened: boolean;
    private _opened;
    templateRef: TemplateRef<any>;
    onSearch: () => void;
    onClear: () => void;
    constructor();
    ngOnInit(): void;
    private clearEmptyKeys();
    reset(): void;
    submit(): void;
}
