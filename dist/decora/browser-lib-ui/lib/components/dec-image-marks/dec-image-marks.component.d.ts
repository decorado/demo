import { ElementRef } from '@angular/core';
export declare class DecImageMarksComponent {
    render: any;
    marksWrapper: ElementRef;
    imgRef: ElementRef;
    constructor();
    drawMarks(): void;
    createPointTag(x: number, y: number, index: number): HTMLDivElement;
    createSquareTag(x: number, y: number, x2: number, y2: number, index: number): void;
    removeCommentNode(): void;
}
