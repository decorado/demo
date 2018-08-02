import { NguCarouselStore } from '@ngu/carousel/src/ngu-carousel/ngu-carousel.interface';
export declare class DecGalleryComponent {
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
    images: any[];
    private _images;
    constructor();
    onSelectImage: ($event: any, sysFile: any) => void;
    setExternalLink: () => void;
    onInitDataFn(event: NguCarouselStore): void;
    onMoveFn(event: NguCarouselStore): void;
    setPrevNextCheckers(first: boolean, last: boolean): void;
}
