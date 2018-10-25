import { ElementRef, DoCheck } from '@angular/core';
/**
 * Cotrast configuration
 *
 * Used to define some custom configuration as colors and breakpoint
 */
export interface DecContrastFontWithBgDirectiveConfig {
    lumaBreakPoint: string;
    lightColor: string;
    darkColor: string;
}
export declare function hexToRgbNew(hex: any): {
    r: number;
    g: number;
    b: number;
};
export declare function standardize_color(bgColor: any): string | CanvasGradient | CanvasPattern;
export declare class DecContrastFontWithBgDirective implements DoCheck {
    private el;
    private config;
    private bgColor;
    decContrastFontWithBg: DecContrastFontWithBgDirectiveConfig;
    constructor(el: ElementRef);
    ngDoCheck(): void;
    private doDecContrastFontWithBg();
}
