/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { map } from 'rxjs/operators';
/** @type {?} */
const CATEGORY_ENDPOINT = '/legacy/product/category?language={i18n}';
export class CategoryPipeService {
    /**
     * @param {?} decApi
     */
    constructor(decApi) {
        this.decApi = decApi;
        this.get = (code) => {
            if (code && code.length > 0) {
                /** @type {?} */
                const codes = code.toUpperCase().split('');
                return this.getData().pipe(map(data => {
                    if (data) {
                        /** @type {?} */
                        let category = '';
                        /** @type {?} */
                        let map = data.sub;
                        for (let i in codes) {
                            if (category.length > 0) {
                                category += ' > ';
                            }
                            if (map[codes[i]]) {
                                category += map[codes[i]].name;
                                if (map[codes[i]].sub) {
                                    map = map[codes[i]].sub;
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
            return this.getData()
                .pipe(map(data => {
                /** @type {?} */
                const category = '';
                return category;
            }));
        };
    }
    /**
     * @param {?} i18n
     * @return {?}
     */
    formatI18n(i18n) {
        switch (i18n) {
            case 'PT_BR':
                return 'pt-br';
            case 'EN':
                return 'en';
        }
    }
    /**
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const user = this.decApi.user;
        /** @type {?} */
        const endpoint = CATEGORY_ENDPOINT.replace('{i18n}', this.formatI18n(user.i18n));
        return this.decApi.get(endpoint);
    }
}
CategoryPipeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CategoryPipeService.ctorParameters = () => [
    { type: DecApiService }
];
if (false) {
    /** @type {?} */
    CategoryPipeService.prototype.get;
    /** @type {?} */
    CategoryPipeService.prototype.decApi;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnktcGlwZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9jYXRlZ29yeS9jYXRlZ29yeS1waXBlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHckMsTUFBTSxpQkFBaUIsR0FBRywwQ0FBMEMsQ0FBQztBQUdyRSxNQUFNOzs7O0lBRUosWUFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTttQkFFbkMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUVULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O3dCQUNULElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7d0JBRWxCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ3BCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDeEIsUUFBUSxJQUFJLEtBQUssQ0FBQzs2QkFDbkI7NEJBRUQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FFbEIsUUFBUSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQy9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29DQUN0QixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztpQ0FDekI7NkJBRUY7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sUUFBUSxJQUFJLFNBQVMsQ0FBQzs2QkFDdkI7eUJBRUY7d0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztxQkFFakI7b0JBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztpQkFDWCxDQUFDLENBQ0gsQ0FBQzthQUNIO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7aUJBQ2xCLElBQUksQ0FDSCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7O2dCQUVULE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUNqQixDQUFDLENBQ0gsQ0FBQztTQUNMO0tBOUM2Qzs7Ozs7SUFnRDlDLFVBQVUsQ0FBQyxJQUFJO1FBQ2IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pCLEtBQUssSUFBSTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7S0FDRjs7OztJQUVPLE9BQU87O1FBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7O1FBQzlCLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7WUEvRHBDLFVBQVU7Ozs7WUFORixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IENBVEVHT1JZX0VORFBPSU5UID0gJy9sZWdhY3kvcHJvZHVjdC9jYXRlZ29yeT9sYW5ndWFnZT17aTE4bn0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcnlQaXBlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNBcGk6IERlY0FwaVNlcnZpY2UpIHsgfVxuXG4gIGdldCA9IChjb2RlKSA9PiB7XG4gICAgaWYgKGNvZGUgJiYgY29kZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjb2RlcyA9IGNvZGUudG9VcHBlckNhc2UoKS5zcGxpdCgnJyk7XG4gICAgICByZXR1cm4gdGhpcy5nZXREYXRhKCkucGlwZShcbiAgICAgICAgbWFwKGRhdGEgPT4ge1xuXG4gICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeSA9ICcnO1xuXG4gICAgICAgICAgICBsZXQgbWFwID0gZGF0YS5zdWI7XG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGNvZGVzKSB7XG4gICAgICAgICAgICAgIGlmIChjYXRlZ29yeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnkgKz0gJyA+ICc7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAobWFwW2NvZGVzW2ldXSkge1xuXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnkgKz0gbWFwW2NvZGVzW2ldXS5uYW1lO1xuICAgICAgICAgICAgICAgIGlmIChtYXBbY29kZXNbaV1dLnN1Yikge1xuICAgICAgICAgICAgICAgICAgbWFwID0gbWFwW2NvZGVzW2ldXS5zdWI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnkgKz0gJ0lOVkFMSUQnO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjYXRlZ29yeTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGRhdGEgPT4ge1xuXG4gICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSAnJztcbiAgICAgICAgICByZXR1cm4gY2F0ZWdvcnk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZm9ybWF0STE4bihpMThuKSB7XG4gICAgc3dpdGNoIChpMThuKSB7XG4gICAgICBjYXNlICdQVF9CUic6XG4gICAgICAgIHJldHVybiAncHQtYnInO1xuICAgICAgY2FzZSAnRU4nOlxuICAgICAgICByZXR1cm4gJ2VuJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERhdGEoKSB7XG4gICAgY29uc3QgdXNlciA9IHRoaXMuZGVjQXBpLnVzZXI7XG4gICAgY29uc3QgZW5kcG9pbnQgPSBDQVRFR09SWV9FTkRQT0lOVC5yZXBsYWNlKCd7aTE4bn0nLCB0aGlzLmZvcm1hdEkxOG4odXNlci5pMThuKSk7XG4gICAgcmV0dXJuIHRoaXMuZGVjQXBpLmdldChlbmRwb2ludCk7XG4gIH1cbn1cbiJdfQ==