import { AfterViewInit, TemplateRef } from '@angular/core';
export declare class DecTabComponent implements AfterViewInit {
    label: string;
    name: string;
    total: string;
    content: TemplateRef<DecTabComponent>;
    disabled: boolean;
    constructor();
    ngAfterViewInit(): void;
    private ensureTabName;
}
