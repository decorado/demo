/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DEC_COLOR_BY_STATUS } from './dec-colors.map';
var DecColorService = /** @class */ (function () {
    function DecColorService() {
    }
    /**
     * @param {?} status
     * @return {?}
     */
    DecColorService.prototype.getStatusColor = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        return DEC_COLOR_BY_STATUS[status] || DEC_COLOR_BY_STATUS.DEFAULT;
    };
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @return {?}
     */
    DecColorService.prototype.rgbToHex = /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @return {?}
     */
    function (r, g, b) {
        return "#" + [r, g, b].map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
    };
    /**
     * @param {?} hex
     * @param {?=} formated
     * @return {?}
     */
    DecColorService.prototype.hexToRgb = /**
     * @param {?} hex
     * @param {?=} formated
     * @return {?}
     */
    function (hex, formated) {
        if (formated === void 0) { formated = false; }
        /** @type {?} */
        var rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) { return '#' + r + r + g + g + b + b; }).substring(1).match(/.{2}/g).map(function (x) { return parseInt(x, 16); });
        return formated ? "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")" : rgb;
    };
    /**
     * @param {?} rgbArray
     * @return {?}
     */
    DecColorService.prototype.rgbArrayToLinearArray = /**
     * @param {?} rgbArray
     * @return {?}
     */
    function (rgbArray) {
        var _this = this;
        // used to change colors in Sketchfab
        return rgbArray.map(function (subcolor) {
            return _this.rgbToLinear(subcolor);
        });
    };
    /**
     * @param {?} c
     * @return {?}
     */
    DecColorService.prototype.rgbToLinear = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        /** @type {?} */
        var proportion = c / 255;
        /** @type {?} */
        var gamma = 2.4;
        /** @type {?} */
        var v = 0.0;
        if (proportion < 0.04045) {
            if (proportion >= 0.0) {
                v = proportion * (1.0 / 12.92);
            }
        }
        else {
            v = Math.pow((proportion + 0.055) * (1.0 / 1.055), gamma);
        }
        return v;
    };
    DecColorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecColorService.ctorParameters = function () { return []; };
    return DecColorService;
}());
export { DecColorService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbG9yL2RlYy1jb2xvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQUtyRDtLQUFpQjs7Ozs7SUFFakIsd0NBQWM7Ozs7SUFBZCxVQUFlLE1BQWM7UUFDM0IsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztLQUNuRTs7Ozs7OztJQUVELGtDQUFROzs7Ozs7SUFBUixVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNkLE1BQU0sQ0FBQyxNQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFHLENBQUM7S0FDM0U7Ozs7OztJQUVELGtDQUFROzs7OztJQUFSLFVBQVMsR0FBRyxFQUFFLFFBQWdCO1FBQWhCLHlCQUFBLEVBQUEsZ0JBQWdCOztRQUM1QixJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO1FBQy9KLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0tBQzlEOzs7OztJQUVELCtDQUFxQjs7OztJQUFyQixVQUF1QixRQUFRO1FBQS9CLGlCQUlDOztRQUhDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUTtZQUMxQixNQUFNLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQyxDQUFDLENBQUM7S0FDSjs7Ozs7SUFFTSxxQ0FBVzs7OztjQUFFLENBQUM7O1FBQ25CLElBQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7O1FBQzNCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQzs7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ1osRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7YUFDaEM7U0FDRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Z0JBbkNaLFVBQVU7Ozs7MEJBSFg7O1NBSWEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERFQ19DT0xPUl9CWV9TVEFUVVMgfSBmcm9tICcuL2RlYy1jb2xvcnMubWFwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0NvbG9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBnZXRTdGF0dXNDb2xvcihzdGF0dXM6IHN0cmluZykge1xuICAgIHJldHVybiBERUNfQ09MT1JfQllfU1RBVFVTW3N0YXR1c10gfHwgREVDX0NPTE9SX0JZX1NUQVRVUy5ERUZBVUxUO1xuICB9XG5cbiAgcmdiVG9IZXgociwgZywgYikge1xuICAgIHJldHVybiBgIyR7W3IsIGcsIGJdLm1hcCh4ID0+IHgudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpLmpvaW4oJycpfWA7XG4gIH1cblxuICBoZXhUb1JnYihoZXgsIGZvcm1hdGVkID0gZmFsc2UpIHtcbiAgICBjb25zdCByZ2IgPSBoZXgucmVwbGFjZSgvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pLCAobSwgciwgZywgYikgPT4gJyMnICsgciArIHIgKyBnICsgZyArIGIgKyBiKS5zdWJzdHJpbmcoMSkubWF0Y2goLy57Mn0vZykubWFwKHggPT4gcGFyc2VJbnQoeCwgMTYpKTtcbiAgICByZXR1cm4gZm9ybWF0ZWQgPyBgcmdiKCR7cmdiWzBdfSwke3JnYlsxXX0sJHtyZ2JbMl19KWAgOiByZ2I7XG4gIH1cblxuICByZ2JBcnJheVRvTGluZWFyQXJyYXkgKHJnYkFycmF5KSB7IC8vIHVzZWQgdG8gY2hhbmdlIGNvbG9ycyBpbiBTa2V0Y2hmYWJcbiAgICByZXR1cm4gcmdiQXJyYXkubWFwKHN1YmNvbG9yID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnJnYlRvTGluZWFyKHN1YmNvbG9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZ2JUb0xpbmVhciAoYykge1xuICAgIGNvbnN0IHByb3BvcnRpb24gPSBjIC8gMjU1O1xuICAgIGNvbnN0IGdhbW1hID0gMi40O1xuICAgIGxldCB2ID0gMC4wO1xuICAgIGlmIChwcm9wb3J0aW9uIDwgMC4wNDA0NSkge1xuICAgICAgaWYgKHByb3BvcnRpb24gPj0gMC4wKSB7XG4gICAgICAgIHYgPSBwcm9wb3J0aW9uICogKDEuMCAvIDEyLjkyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdiA9IE1hdGgucG93KChwcm9wb3J0aW9uICsgMC4wNTUpICogKDEuMCAvIDEuMDU1KSwgZ2FtbWEpO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxufVxuIl19