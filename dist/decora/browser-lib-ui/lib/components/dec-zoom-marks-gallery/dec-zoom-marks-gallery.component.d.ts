import { EventEmitter } from '@angular/core';
import { NguCarouselStore } from '@ngu/carousel';
import { DecZoomMarksComponent } from './../dec-zoom-marks/dec-zoom-marks.component';
export declare class DecZoomMarksGalleryComponent {
    carouselConfig: {
        grid: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            all: number;
        };
        slide: number;
        speed: number;
        interval: number;
        point: {
            visible: boolean;
        };
        custom: string;
    };
    markedObjs: any;
    showTags: boolean;
    imageIndex: number;
    qaModeActive: boolean;
    zoomMarks: DecZoomMarksComponent;
    openZoomArea: EventEmitter<{}>;
    markedObj: any;
    _markedObjs: any;
    _showTags: boolean;
    isFirst: boolean;
    isLast: boolean;
    constructor();
    onInitDataFn(event: NguCarouselStore): void;
    onMoveFn(event: NguCarouselStore): void;
    onSelectImage: ($event: any, sysFile: any, i: any) => void;
    setPrevNextCheckers(first: boolean, last: boolean): void;
    getFormatedPositionAndScale(): {
        file: any;
        position: {
            x: number;
            y: number;
        };
        zoomScale: number;
    };
    addNewZoomArea(addNewZoomArea: any): void;
    onOpenZoomArea($event: any): void;
    getImageIndex(): number;
}
