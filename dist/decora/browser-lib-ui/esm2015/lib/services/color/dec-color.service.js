/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DEC_COLOR_BY_STATUS } from './dec-colors.map';
export class DecColorService {
    constructor() { }
    /**
     * @param {?} status
     * @return {?}
     */
    getStatusColor(status) {
        return DEC_COLOR_BY_STATUS[status] || DEC_COLOR_BY_STATUS.DEFAULT;
    }
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @return {?}
     */
    rgbToHex(r, g, b) {
        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }
    /**
     * @param {?} hex
     * @param {?=} formated
     * @return {?}
     */
    hexToRgb(hex, formated = false) {
        /** @type {?} */
        const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
        return formated ? `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` : rgb;
    }
    /**
     * @param {?} rgbArray
     * @return {?}
     */
    rgbArrayToLinearArray(rgbArray) {
        // used to change colors in Sketchfab
        return rgbArray.map(subcolor => {
            return this.rgbToLinear(subcolor);
        });
    }
    /**
     * @param {?} c
     * @return {?}
     */
    rgbToLinear(c) {
        /** @type {?} */
        const proportion = c / 255;
        /** @type {?} */
        const gamma = 2.4;
        /** @type {?} */
        let v = 0.0;
        if (proportion < 0.04045) {
            if (proportion >= 0.0) {
                v = proportion * (1.0 / 12.92);
            }
        }
        else {
            v = Math.pow((proportion + 0.055) * (1.0 / 1.055), gamma);
        }
        return v;
    }
}
DecColorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecColorService.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbG9yL2RlYy1jb2xvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3ZELE1BQU07SUFFSixpQkFBaUI7Ozs7O0lBRWpCLGNBQWMsQ0FBQyxNQUFjO1FBQzNCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7S0FDbkU7Ozs7Ozs7SUFFRCxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQzNFOzs7Ozs7SUFFRCxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsR0FBRyxLQUFLOztRQUM1QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvSixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUM5RDs7Ozs7SUFFRCxxQkFBcUIsQ0FBRSxRQUFROztRQUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQyxDQUFDLENBQUM7S0FDSjs7Ozs7SUFFTSxXQUFXLENBQUUsQ0FBQzs7UUFDbkIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7UUFDM0IsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDOztRQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDWixFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQzthQUNoQztTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzRDtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7WUFuQ1osVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERFQ19DT0xPUl9CWV9TVEFUVVMgfSBmcm9tICcuL2RlYy1jb2xvcnMubWFwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0NvbG9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBnZXRTdGF0dXNDb2xvcihzdGF0dXM6IHN0cmluZykge1xuICAgIHJldHVybiBERUNfQ09MT1JfQllfU1RBVFVTW3N0YXR1c10gfHwgREVDX0NPTE9SX0JZX1NUQVRVUy5ERUZBVUxUO1xuICB9XG5cbiAgcmdiVG9IZXgociwgZywgYikge1xuICAgIHJldHVybiBgIyR7W3IsIGcsIGJdLm1hcCh4ID0+IHgudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpLmpvaW4oJycpfWA7XG4gIH1cblxuICBoZXhUb1JnYihoZXgsIGZvcm1hdGVkID0gZmFsc2UpIHtcbiAgICBjb25zdCByZ2IgPSBoZXgucmVwbGFjZSgvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pLCAobSwgciwgZywgYikgPT4gJyMnICsgciArIHIgKyBnICsgZyArIGIgKyBiKS5zdWJzdHJpbmcoMSkubWF0Y2goLy57Mn0vZykubWFwKHggPT4gcGFyc2VJbnQoeCwgMTYpKTtcbiAgICByZXR1cm4gZm9ybWF0ZWQgPyBgcmdiKCR7cmdiWzBdfSwke3JnYlsxXX0sJHtyZ2JbMl19KWAgOiByZ2I7XG4gIH1cblxuICByZ2JBcnJheVRvTGluZWFyQXJyYXkgKHJnYkFycmF5KSB7IC8vIHVzZWQgdG8gY2hhbmdlIGNvbG9ycyBpbiBTa2V0Y2hmYWJcbiAgICByZXR1cm4gcmdiQXJyYXkubWFwKHN1YmNvbG9yID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnJnYlRvTGluZWFyKHN1YmNvbG9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZ2JUb0xpbmVhciAoYykge1xuICAgIGNvbnN0IHByb3BvcnRpb24gPSBjIC8gMjU1O1xuICAgIGNvbnN0IGdhbW1hID0gMi40O1xuICAgIGxldCB2ID0gMC4wO1xuICAgIGlmIChwcm9wb3J0aW9uIDwgMC4wNDA0NSkge1xuICAgICAgaWYgKHByb3BvcnRpb24gPj0gMC4wKSB7XG4gICAgICAgIHYgPSBwcm9wb3J0aW9uICogKDEuMCAvIDEyLjkyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdiA9IE1hdGgucG93KChwcm9wb3J0aW9uICsgMC4wNTUpICogKDEuMCAvIDEuMDU1KSwgZ2FtbWEpO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxufVxuIl19