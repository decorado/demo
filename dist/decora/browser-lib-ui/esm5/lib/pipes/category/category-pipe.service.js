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
                    if (data) {
                        /** @type {?} */
                        var category = '';
                        /** @type {?} */
                        var map_1 = data.sub;
                        for (var i in codes_1) {
                            if (category.length > 0) {
                                category += ' > ';
                            }
                            if (map_1[codes_1[i]]) {
                                category += map_1[codes_1[i]].name;
                                if (map_1[codes_1[i]].sub) {
                                    map_1 = map_1[codes_1[i]].sub;
                                }
                            }
                            else {
                                category += 'INVALID';
                            }
                        }
                        return category;
                    }
                    return '';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnktcGlwZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9jYXRlZ29yeS9jYXRlZ29yeS1waXBlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHckMsSUFBTSxpQkFBaUIsR0FBRywwQ0FBMEMsQ0FBQzs7SUFLbkUsNkJBQW9CLE1BQXFCO1FBQXpDLGlCQUE4QztRQUExQixXQUFNLEdBQU4sTUFBTSxDQUFlO21CQUVuQyxVQUFDLElBQUk7WUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDNUIsSUFBTSxPQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQ3hCLEdBQUcsQ0FBQyxVQUFBLElBQUk7b0JBRU4sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7d0JBQ1QsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOzt3QkFFbEIsSUFBSSxLQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksT0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN4QixRQUFRLElBQUksS0FBSyxDQUFDOzZCQUNuQjs0QkFFRCxFQUFFLENBQUMsQ0FBQyxLQUFHLENBQUMsT0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUVsQixRQUFRLElBQUksS0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FDL0IsRUFBRSxDQUFDLENBQUMsS0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0NBQ3RCLEtBQUcsR0FBRyxLQUFHLENBQUMsT0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2lDQUN6Qjs2QkFFRjs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDTixRQUFRLElBQUksU0FBUyxDQUFDOzZCQUN2Qjt5QkFFRjt3QkFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO3FCQUVqQjtvQkFFRCxNQUFNLENBQUMsRUFBRSxDQUFDO2lCQUNYLENBQUMsQ0FDSCxDQUFDO2FBQ0g7WUFFRCxNQUFNLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRTtpQkFDbEIsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLElBQUk7O2dCQUVOLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUNqQixDQUFDLENBQ0gsQ0FBQztTQUNMO0tBOUM2Qzs7Ozs7SUFnRDlDLHdDQUFVOzs7O0lBQVYsVUFBVyxJQUFJO1FBQ2IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pCLEtBQUssSUFBSTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7S0FDRjs7OztJQUVPLHFDQUFPOzs7OztRQUNiLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDOztRQUM5QixJQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Z0JBL0RwQyxVQUFVOzs7O2dCQU5GLGFBQWE7OzhCQUR0Qjs7U0FRYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuY29uc3QgQ0FURUdPUllfRU5EUE9JTlQgPSAnL2xlZ2FjeS9wcm9kdWN0L2NhdGVnb3J5P2xhbmd1YWdlPXtpMThufSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeVBpcGVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY0FwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgZ2V0ID0gKGNvZGUpID0+IHtcbiAgICBpZiAoY29kZSAmJiBjb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNvZGVzID0gY29kZS50b1VwcGVyQ2FzZSgpLnNwbGl0KCcnKTtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGEoKS5waXBlKFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG5cbiAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgbGV0IGNhdGVnb3J5ID0gJyc7XG5cbiAgICAgICAgICAgIGxldCBtYXAgPSBkYXRhLnN1YjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gY29kZXMpIHtcbiAgICAgICAgICAgICAgaWYgKGNhdGVnb3J5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeSArPSAnID4gJztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChtYXBbY29kZXNbaV1dKSB7XG5cbiAgICAgICAgICAgICAgICBjYXRlZ29yeSArPSBtYXBbY29kZXNbaV1dLm5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKG1hcFtjb2Rlc1tpXV0uc3ViKSB7XG4gICAgICAgICAgICAgICAgICBtYXAgPSBtYXBbY29kZXNbaV1dLnN1YjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeSArPSAnSU5WQUxJRCc7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNhdGVnb3J5O1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXREYXRhKClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG5cbiAgICAgICAgICBjb25zdCBjYXRlZ29yeSA9ICcnO1xuICAgICAgICAgIHJldHVybiBjYXRlZ29yeTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBmb3JtYXRJMThuKGkxOG4pIHtcbiAgICBzd2l0Y2ggKGkxOG4pIHtcbiAgICAgIGNhc2UgJ1BUX0JSJzpcbiAgICAgICAgcmV0dXJuICdwdC1icic7XG4gICAgICBjYXNlICdFTic6XG4gICAgICAgIHJldHVybiAnZW4nO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0YSgpIHtcbiAgICBjb25zdCB1c2VyID0gdGhpcy5kZWNBcGkudXNlcjtcbiAgICBjb25zdCBlbmRwb2ludCA9IENBVEVHT1JZX0VORFBPSU5ULnJlcGxhY2UoJ3tpMThufScsIHRoaXMuZm9ybWF0STE4bih1c2VyLmkxOG4pKTtcbiAgICByZXR1cm4gdGhpcy5kZWNBcGkuZ2V0KGVuZHBvaW50KTtcbiAgfVxufVxuIl19