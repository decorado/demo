import { QueryList, TemplateRef } from '@angular/core';
export declare class DecGridColumnComponent {
    span: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    rows: QueryList<DecGridRowComponent>;
    content: TemplateRef<any>;
    constructor();
    readonly columnWidth: number;
}
export declare class DecGridRowComponent {
    columns: QueryList<DecGridColumnComponent>;
    content: TemplateRef<any>;
    constructor();
}
