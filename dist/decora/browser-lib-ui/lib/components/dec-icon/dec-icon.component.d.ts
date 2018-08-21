import { AfterViewInit, ElementRef } from '@angular/core';
export declare class DecIconComponent implements AfterViewInit {
    icon: string;
    font: 'mat' | 'fas';
    textElement: ElementRef;
    constructor();
    ngAfterViewInit(): void;
}
