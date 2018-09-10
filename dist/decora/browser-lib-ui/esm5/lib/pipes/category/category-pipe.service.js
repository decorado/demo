/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { map } from 'rxjs/operators';
/** @type {?} */
var CATEGORY_ENDPOINT = '/legacy/product/category?language={i18n}';
var CategoryPipeService = /** @class */ (function () {
    function CategoryPipeService(decApi) {
        var _this = this;
        this.decApi = decApi;
        this.get = function (code) {
            if (code && code.length > 0) {
                /** @type {?} */
                var codes_1 = code.toUpperCase().split('');
                return _this.getData().pipe(map(function (data) {
                    /** @type {?} */
                    var category = '';
                    /** @type {?} */
                    var map = data.sub;
                    for (var i in codes_1) {
                        if (category.length > 0) {
                            category += ' > ';
                        }
                        if (map[codes_1[i]]) {
                            category += map[codes_1[i]].name;
                            if (map[codes_1[i]].sub) {
                                map = map[codes_1[i]].sub;
                            }
                        }
                        else {
                            category += 'INVALID';
                        }
                    }
                    return category;
                }));
            }
            return _this.getData()
                .pipe(map(function (data) {
                /** @type {?} */
                var category = '';
                return category;
            }));
        };
    }
    /**
     * @param {?} i18n
     * @return {?}
     */
    CategoryPipeService.prototype.formatI18n = /**
     * @param {?} i18n
     * @return {?}
     */
    function (i18n) {
        switch (i18n) {
            case 'PT_BR':
                return 'pt-br';
            case 'EN':
                return 'en';
        }
    };
    /**
     * @return {?}
     */
    CategoryPipeService.prototype.getData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var user = this.decApi.user;
        /** @type {?} */
        var endpoint = CATEGORY_ENDPOINT.replace('{i18n}', this.formatI18n(user.i18n));
        return this.decApi.get(endpoint);
    };
    CategoryPipeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CategoryPipeService.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    return CategoryPipeService;
}());
export { CategoryPipeService };
if (false) {
    /** @type {?} */
    CategoryPipeService.prototype.get;
    /** @type {?} */
    CategoryPipeService.prototype.decApi;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnktcGlwZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9jYXRlZ29yeS9jYXRlZ29yeS1waXBlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHckMsSUFBTSxpQkFBaUIsR0FBRywwQ0FBMEMsQ0FBQzs7SUFLbkUsNkJBQW9CLE1BQXFCO1FBQXpDLGlCQUE4QztRQUExQixXQUFNLEdBQU4sTUFBTSxDQUFlO21CQUVuQyxVQUFDLElBQUk7WUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDNUIsSUFBTSxPQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQ3hCLEdBQUcsQ0FBQyxVQUFBLElBQUk7O29CQUVOLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7b0JBRWxCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEIsUUFBUSxJQUFJLEtBQUssQ0FBQzt5QkFDbkI7d0JBRUQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFbEIsUUFBUSxJQUFJLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQy9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dDQUN0QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs2QkFDekI7eUJBRUY7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sUUFBUSxJQUFJLFNBQVMsQ0FBQzt5QkFDdkI7cUJBRUY7b0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztpQkFDakIsQ0FBQyxDQUNILENBQUM7YUFDSDtZQUVELE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFO2lCQUNsQixJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUEsSUFBSTs7Z0JBRU4sSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixNQUFNLENBQUMsUUFBUSxDQUFDO2FBQ2pCLENBQUMsQ0FDSCxDQUFDO1NBQ0w7S0F6QzZDOzs7OztJQTJDOUMsd0NBQVU7Ozs7SUFBVixVQUFXLElBQUk7UUFDYixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxPQUFPO2dCQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDakIsS0FBSyxJQUFJO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtLQUNGOzs7O0lBRU8scUNBQU87Ozs7O1FBQ2IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7O1FBQzlCLElBQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7OztnQkExRHBDLFVBQVU7Ozs7Z0JBTkYsYUFBYTs7OEJBRHRCOztTQVFhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5jb25zdCBDQVRFR09SWV9FTkRQT0lOVCA9ICcvbGVnYWN5L3Byb2R1Y3QvY2F0ZWdvcnk/bGFuZ3VhZ2U9e2kxOG59JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhdGVnb3J5UGlwZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICBnZXQgPSAoY29kZSkgPT4ge1xuICAgIGlmIChjb2RlICYmIGNvZGUubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY29kZXMgPSBjb2RlLnRvVXBwZXJDYXNlKCkuc3BsaXQoJycpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpLnBpcGUoXG4gICAgICAgIG1hcChkYXRhID0+IHtcblxuICAgICAgICAgIGxldCBjYXRlZ29yeSA9ICcnO1xuXG4gICAgICAgICAgbGV0IG1hcCA9IGRhdGEuc3ViO1xuICAgICAgICAgIGZvciAobGV0IGkgaW4gY29kZXMpIHtcbiAgICAgICAgICAgIGlmIChjYXRlZ29yeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5ICs9ICcgPiAnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWFwW2NvZGVzW2ldXSkge1xuXG4gICAgICAgICAgICAgIGNhdGVnb3J5ICs9IG1hcFtjb2Rlc1tpXV0ubmFtZTtcbiAgICAgICAgICAgICAgaWYgKG1hcFtjb2Rlc1tpXV0uc3ViKSB7XG4gICAgICAgICAgICAgICAgbWFwID0gbWFwW2NvZGVzW2ldXS5zdWI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2F0ZWdvcnkgKz0gJ0lOVkFMSUQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjYXRlZ29yeTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGRhdGEgPT4ge1xuXG4gICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSAnJztcbiAgICAgICAgICByZXR1cm4gY2F0ZWdvcnk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZm9ybWF0STE4bihpMThuKSB7XG4gICAgc3dpdGNoIChpMThuKSB7XG4gICAgICBjYXNlICdQVF9CUic6XG4gICAgICAgIHJldHVybiAncHQtYnInO1xuICAgICAgY2FzZSAnRU4nOlxuICAgICAgICByZXR1cm4gJ2VuJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERhdGEoKSB7XG4gICAgY29uc3QgdXNlciA9IHRoaXMuZGVjQXBpLnVzZXI7XG4gICAgY29uc3QgZW5kcG9pbnQgPSBDQVRFR09SWV9FTkRQT0lOVC5yZXBsYWNlKCd7aTE4bn0nLCB0aGlzLmZvcm1hdEkxOG4odXNlci5pMThuKSk7XG4gICAgcmV0dXJuIHRoaXMuZGVjQXBpLmdldChlbmRwb2ludCk7XG4gIH1cbn1cbiJdfQ==