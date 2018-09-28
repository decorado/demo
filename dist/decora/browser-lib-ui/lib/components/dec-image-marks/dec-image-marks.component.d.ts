import { ElementRef } from '@angular/core';
export declare class DecImageMarksComponent {
    render: any;
    marksWrapper: ElementRef;
    imgRef: ElementRef;
    constructor();
    drawMarks(): void;
    createPointTag(coordinates: number[], index: number, requestByClient: boolean): HTMLDivElement;
    createSquareTag(coordinates: number[], index: number, requestByClient: boolean): void;
    private addCommentNode;
    private removeCommentNode();
}
