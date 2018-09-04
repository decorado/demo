/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { map } from 'rxjs/operators';
var /** @type {?} */ CATEGORY_ENDPOINT = '/legacy/product/category?language={i18n}';
var CategoryPipeService = /** @class */ (function () {
    function CategoryPipeService(decApi) {
        var _this = this;
        this.decApi = decApi;
        this.get = function (code) {
            if (code && code.length > 0) {
                var /** @type {?} */ codes_1 = code.toUpperCase().split('');
                return _this.getData().pipe(map(function (data) {
                    var /** @type {?} */ category = '';
                    var /** @type {?} */ map = data.sub;
                    for (var /** @type {?} */ i in codes_1) {
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
                var /** @type {?} */ category = '';
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
        var /** @type {?} */ user = this.decApi.user;
        var /** @type {?} */ endpoint = CATEGORY_ENDPOINT.replace('{i18n}', this.formatI18n(user.i18n));
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
function CategoryPipeService_tsickle_Closure_declarations() {
    /** @type {?} */
    CategoryPipeService.prototype.get;
    /** @type {?} */
    CategoryPipeService.prototype.decApi;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnktcGlwZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9jYXRlZ29yeS9jYXRlZ29yeS1waXBlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyQyxxQkFBTSxpQkFBaUIsR0FBRywwQ0FBMEMsQ0FBQzs7SUFLbkUsNkJBQW9CLE1BQXFCO1FBQXpDLGlCQUE4QztRQUExQixXQUFNLEdBQU4sTUFBTSxDQUFlO21CQUVuQyxVQUFDLElBQUk7WUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixxQkFBTSxPQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQ3hCLEdBQUcsQ0FBQyxVQUFBLElBQUk7b0JBRU4scUJBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFFbEIscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ25CLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsSUFBSSxPQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hCLFFBQVEsSUFBSSxLQUFLLENBQUM7eUJBQ25CO3dCQUVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRWxCLFFBQVEsSUFBSSxHQUFHLENBQUMsT0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUMvQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDdEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7NkJBQ3pCO3lCQUVGO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFFBQVEsSUFBSSxTQUFTLENBQUM7eUJBQ3ZCO3FCQUVGO29CQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7aUJBQ2pCLENBQUMsQ0FDSCxDQUFDO2FBQ0g7WUFFRCxNQUFNLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRTtpQkFDbEIsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLElBQUk7Z0JBRU4scUJBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUNqQixDQUFDLENBQ0gsQ0FBQztTQUNMO0tBekM2Qzs7Ozs7SUEyQzlDLHdDQUFVOzs7O0lBQVYsVUFBVyxJQUFJO1FBQ2IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pCLEtBQUssSUFBSTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7S0FDRjs7OztJQUVPLHFDQUFPOzs7O1FBQ2IscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzlCLHFCQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Z0JBMURwQyxVQUFVOzs7O2dCQU5GLGFBQWE7OzhCQUR0Qjs7U0FRYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuY29uc3QgQ0FURUdPUllfRU5EUE9JTlQgPSAnL2xlZ2FjeS9wcm9kdWN0L2NhdGVnb3J5P2xhbmd1YWdlPXtpMThufSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeVBpcGVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY0FwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgZ2V0ID0gKGNvZGUpID0+IHtcbiAgICBpZiAoY29kZSAmJiBjb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNvZGVzID0gY29kZS50b1VwcGVyQ2FzZSgpLnNwbGl0KCcnKTtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGEoKS5waXBlKFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG5cbiAgICAgICAgICBsZXQgY2F0ZWdvcnkgPSAnJztcblxuICAgICAgICAgIGxldCBtYXAgPSBkYXRhLnN1YjtcbiAgICAgICAgICBmb3IgKGxldCBpIGluIGNvZGVzKSB7XG4gICAgICAgICAgICBpZiAoY2F0ZWdvcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBjYXRlZ29yeSArPSAnID4gJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hcFtjb2Rlc1tpXV0pIHtcblxuICAgICAgICAgICAgICBjYXRlZ29yeSArPSBtYXBbY29kZXNbaV1dLm5hbWU7XG4gICAgICAgICAgICAgIGlmIChtYXBbY29kZXNbaV1dLnN1Yikge1xuICAgICAgICAgICAgICAgIG1hcCA9IG1hcFtjb2Rlc1tpXV0uc3ViO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5ICs9ICdJTlZBTElEJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2F0ZWdvcnk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldERhdGEoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChkYXRhID0+IHtcblxuICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gJyc7XG4gICAgICAgICAgcmV0dXJuIGNhdGVnb3J5O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGZvcm1hdEkxOG4oaTE4bikge1xuICAgIHN3aXRjaCAoaTE4bikge1xuICAgICAgY2FzZSAnUFRfQlInOlxuICAgICAgICByZXR1cm4gJ3B0LWJyJztcbiAgICAgIGNhc2UgJ0VOJzpcbiAgICAgICAgcmV0dXJuICdlbic7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXREYXRhKCkge1xuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmRlY0FwaS51c2VyO1xuICAgIGNvbnN0IGVuZHBvaW50ID0gQ0FURUdPUllfRU5EUE9JTlQucmVwbGFjZSgne2kxOG59JywgdGhpcy5mb3JtYXRJMThuKHVzZXIuaTE4bikpO1xuICAgIHJldHVybiB0aGlzLmRlY0FwaS5nZXQoZW5kcG9pbnQpO1xuICB9XG59XG4iXX0=