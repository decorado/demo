import { OnInit } from '@angular/core';
import { DecImageSize, SystemFileKey } from './../../directives/image/image.directive.models';
export declare type ZoomMode = 'hover' | 'click' | 'toggle' | 'hover-freeze';
export declare class DecImageZoomComponent implements OnInit {
    fullImagePath: any;
    fullImageUrl: any;
    resizedImageUrl: any;
    zoomMode: ZoomMode;
    enableScrollZoom: boolean;
    scrollStepSize: number;
    enableLens: boolean;
    lensWidth: number;
    lensHeight: number;
    systemFile: SystemFileKey;
    size: DecImageSize;
    private _systemFile;
    private _thumbSize;
    constructor();
    ngOnInit(): void;
    loadImage(): void;
    private setFinalImageUrl();
    private setOriginalImagePath();
    private setThumborlUrl();
    private extractImageUrlFromSysfile();
    private getImageSize();
    private getThumborUrl();
}
