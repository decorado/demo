/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { CategoryPipeService } from './category-pipe.service';
var CategoryPipe = /** @class */ (function () {
    function CategoryPipe(categoryPipeService) {
        this.categoryPipeService = categoryPipeService;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    CategoryPipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.categoryPipeService.get(value);
    };
    CategoryPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'decCategory'
                },] },
    ];
    /** @nocollapse */
    CategoryPipe.ctorParameters = function () { return [
        { type: CategoryPipeService }
    ]; };
    return CategoryPipe;
}());
export { CategoryPipe };
if (false) {
    /** @type {?} */
    CategoryPipe.prototype.categoryPipeService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvY2F0ZWdvcnkvY2F0ZWdvcnkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBVTVELHNCQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtLQUMzRDs7Ozs7SUFFRCxnQ0FBUzs7OztJQUFULFVBQVUsS0FBYTtRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qzs7Z0JBVkYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxhQUFhO2lCQUNwQjs7OztnQkFQUSxtQkFBbUI7O3VCQUQ1Qjs7U0FTYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlQaXBlU2VydmljZSB9IGZyb20gJy4vY2F0ZWdvcnktcGlwZS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RlY0NhdGVnb3J5J1xufSlcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhdGVnb3J5UGlwZVNlcnZpY2U6IENhdGVnb3J5UGlwZVNlcnZpY2UpIHtcbiAgfVxuXG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5jYXRlZ29yeVBpcGVTZXJ2aWNlLmdldCh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==