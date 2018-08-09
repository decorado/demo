import { OnInit } from '@angular/core';
export declare class DecZoomImageViewComponent implements OnInit {
    decImage: any;
    thumbImageSize: any;
    zoomMode: string;
    enableScrollZoom: Boolean;
    scrollStepSize: number;
    enableLens: Boolean;
    lensWidth: number;
    lensHeight: number;
    innerImage: any;
    imagePath: any;
    finalImageUrl: any;
    thumbImage: any;
    thumbSize: any;
    constructor();
    ngOnInit(): void;
    loadImage(): void;
    private extractImageUrlFromSysfile();
    private getImageSize(thumbSize);
    private getThumborUrl();
}
