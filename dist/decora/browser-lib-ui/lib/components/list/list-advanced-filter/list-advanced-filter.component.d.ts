import { OnInit, TemplateRef } from '@angular/core';
export declare class DecListAdvancedFilterComponent implements OnInit {
    form: any;
    templateRef: TemplateRef<any>;
    onSearch: () => void;
    onClear: () => void;
    constructor();
    ngOnInit(): void;
    reset(): void;
    submit(): void;
}
