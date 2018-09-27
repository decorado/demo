import { NguCarouselStore } from '@ngu/carousel/src/ngu-carousel/ngu-carousel.interface';
import { DecImageMarkerComponent } from './../dec-image-marker/dec-image-marker.component';
export declare class DecGalleryMarksComponent {
    imageHighlight: any;
    activeImage: Element;
    imgExternalLink: string;
    isFirst: boolean;
    isLast: boolean;
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
    imgMarker: DecImageMarkerComponent;
    qaModeActive?: boolean;
    images: any[];
    private _images;
    constructor();
    onSelectImage: ($event: any, sysFile: any) => void;
    setExternalLink: () => void;
    onInitDataFn(event: NguCarouselStore): void;
    onMoveFn(event: NguCarouselStore): void;
    setPrevNextCheckers(first: boolean, last: boolean): void;
    getClass(comment: any): string;
    deleteMark(target: any, commentIndex: any, renderIndex: any): void;
}
