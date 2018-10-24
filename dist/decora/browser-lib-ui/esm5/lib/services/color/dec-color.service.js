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
    DecColorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecColorService.ctorParameters = function () { return []; };
    return DecColorService;
}());
export { DecColorService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbG9yL2RlYy1jb2xvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQUtyRDtLQUFpQjs7Ozs7SUFFVix3Q0FBYzs7OztjQUFDLE1BQWM7UUFDbEMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7SUFHN0Qsa0NBQVE7Ozs7OztjQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsTUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBRyxDQUFDOzs7Ozs7O0lBR3JFLGtDQUFROzs7OztjQUFDLEdBQUcsRUFBRSxRQUFnQjtRQUFoQix5QkFBQSxFQUFBLGdCQUFnQjs7UUFDbkMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQztRQUMvSixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs7O2dCQWZoRSxVQUFVOzs7OzBCQUhYOztTQUlhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBERUNfQ09MT1JfQllfU1RBVFVTIH0gZnJvbSAnLi9kZWMtY29sb3JzLm1hcCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNDb2xvclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIGdldFN0YXR1c0NvbG9yKHN0YXR1czogc3RyaW5nKSB7XG4gICAgcmV0dXJuIERFQ19DT0xPUl9CWV9TVEFUVVNbc3RhdHVzXSB8fCBERUNfQ09MT1JfQllfU1RBVFVTLkRFRkFVTFQ7XG4gIH1cblxuICBwdWJsaWMgcmdiVG9IZXgociwgZywgYikge1xuICAgIHJldHVybiBgIyR7W3IsIGcsIGJdLm1hcCh4ID0+IHgudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpLmpvaW4oJycpfWA7XG4gIH1cblxuICBwdWJsaWMgaGV4VG9SZ2IoaGV4LCBmb3JtYXRlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgcmdiID0gaGV4LnJlcGxhY2UoL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaSwgKG0sIHIsIGcsIGIpID0+ICcjJyArIHIgKyByICsgZyArIGcgKyBiICsgYikuc3Vic3RyaW5nKDEpLm1hdGNoKC8uezJ9L2cpLm1hcCh4ID0+IHBhcnNlSW50KHgsIDE2KSk7XG4gICAgcmV0dXJuIGZvcm1hdGVkID8gYHJnYigke3JnYlswXX0sJHtyZ2JbMV19LCR7cmdiWzJdfSlgIDogcmdiO1xuICB9XG5cbn1cbiJdfQ==