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
}
DecColorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecColorService.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbG9yL2RlYy1jb2xvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3ZELE1BQU07SUFFSixpQkFBaUI7Ozs7O0lBRVYsY0FBYyxDQUFDLE1BQWM7UUFDbEMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7SUFHN0QsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7SUFHckUsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsS0FBSzs7UUFDbkMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Ozs7WUFmaEUsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERFQ19DT0xPUl9CWV9TVEFUVVMgfSBmcm9tICcuL2RlYy1jb2xvcnMubWFwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0NvbG9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgZ2V0U3RhdHVzQ29sb3Ioc3RhdHVzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gREVDX0NPTE9SX0JZX1NUQVRVU1tzdGF0dXNdIHx8IERFQ19DT0xPUl9CWV9TVEFUVVMuREVGQVVMVDtcbiAgfVxuXG4gIHB1YmxpYyByZ2JUb0hleChyLCBnLCBiKSB7XG4gICAgcmV0dXJuIGAjJHtbciwgZywgYl0ubWFwKHggPT4geC50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSkuam9pbignJyl9YDtcbiAgfVxuXG4gIHB1YmxpYyBoZXhUb1JnYihoZXgsIGZvcm1hdGVkID0gZmFsc2UpIHtcbiAgICBjb25zdCByZ2IgPSBoZXgucmVwbGFjZSgvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pLCAobSwgciwgZywgYikgPT4gJyMnICsgciArIHIgKyBnICsgZyArIGIgKyBiKS5zdWJzdHJpbmcoMSkubWF0Y2goLy57Mn0vZykubWFwKHggPT4gcGFyc2VJbnQoeCwgMTYpKTtcbiAgICByZXR1cm4gZm9ybWF0ZWQgPyBgcmdiKCR7cmdiWzBdfSwke3JnYlsxXX0sJHtyZ2JbMl19KWAgOiByZ2I7XG4gIH1cblxufVxuIl19