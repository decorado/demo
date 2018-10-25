import { OnInit } from '@angular/core';
export declare class DecProductMeasuresComparisonComponent implements OnInit {
    measures: any;
    private _measures;
    formatedMeasures: any;
    constructor();
    ngOnInit(): void;
    formatMasures(measures: any): void;
    private printMeasure(measure);
    private printMeasureInches(measure);
}
