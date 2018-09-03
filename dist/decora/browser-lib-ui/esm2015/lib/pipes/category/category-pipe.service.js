/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { map } from 'rxjs/operators';
const /** @type {?} */ CATEGORY_ENDPOINT = '/legacy/product/category?language={i18n}';
export class CategoryPipeService {
    /**
     * @param {?} decApi
     */
    constructor(decApi) {
        this.decApi = decApi;
        this.get = (code) => {
            if (code && code.length > 0) {
                const /** @type {?} */ codes = code.toUpperCase().split('');
                return this.getData().pipe(map(data => {
                    let /** @type {?} */ category = '';
                    let /** @type {?} */ map = data.sub;
                    for (let /** @type {?} */ i in codes) {
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
                }));
            }
            return this.getData()
                .pipe(map(data => {
                const /** @type {?} */ category = '';
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
        const /** @type {?} */ user = this.decApi.user;
        const /** @type {?} */ endpoint = CATEGORY_ENDPOINT.replace('{i18n}', this.formatI18n(user.i18n));
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
function CategoryPipeService_tsickle_Closure_declarations() {
    /** @type {?} */
    CategoryPipeService.prototype.get;
    /** @type {?} */
    CategoryPipeService.prototype.decApi;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnktcGlwZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9jYXRlZ29yeS9jYXRlZ29yeS1waXBlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyQyx1QkFBTSxpQkFBaUIsR0FBRywwQ0FBMEMsQ0FBQztBQUdyRSxNQUFNOzs7O0lBRUosWUFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTttQkFFbkMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLHVCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUVULHFCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBRWxCLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNuQixHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixRQUFRLElBQUksS0FBSyxDQUFDO3lCQUNuQjt3QkFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUVsQixRQUFRLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDL0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0NBQ3RCLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDOzZCQUN6Qjt5QkFFRjt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixRQUFRLElBQUksU0FBUyxDQUFDO3lCQUN2QjtxQkFFRjtvQkFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO2lCQUNqQixDQUFDLENBQ0gsQ0FBQzthQUNIO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7aUJBQ2xCLElBQUksQ0FDSCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBRVQsdUJBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUNqQixDQUFDLENBQ0gsQ0FBQztTQUNMO0tBekM2Qzs7Ozs7SUEyQzlDLFVBQVUsQ0FBQyxJQUFJO1FBQ2IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pCLEtBQUssSUFBSTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7S0FDRjs7OztJQUVPLE9BQU87UUFDYix1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDOUIsdUJBQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7WUExRHBDLFVBQVU7Ozs7WUFORixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IENBVEVHT1JZX0VORFBPSU5UID0gJy9sZWdhY3kvcHJvZHVjdC9jYXRlZ29yeT9sYW5ndWFnZT17aTE4bn0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcnlQaXBlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNBcGk6IERlY0FwaVNlcnZpY2UpIHsgfVxuXG4gIGdldCA9IChjb2RlKSA9PiB7XG4gICAgaWYgKGNvZGUgJiYgY29kZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjb2RlcyA9IGNvZGUudG9VcHBlckNhc2UoKS5zcGxpdCgnJyk7XG4gICAgICByZXR1cm4gdGhpcy5nZXREYXRhKCkucGlwZShcbiAgICAgICAgbWFwKGRhdGEgPT4ge1xuXG4gICAgICAgICAgbGV0IGNhdGVnb3J5ID0gJyc7XG5cbiAgICAgICAgICBsZXQgbWFwID0gZGF0YS5zdWI7XG4gICAgICAgICAgZm9yIChsZXQgaSBpbiBjb2Rlcykge1xuICAgICAgICAgICAgaWYgKGNhdGVnb3J5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgY2F0ZWdvcnkgKz0gJyA+ICc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXBbY29kZXNbaV1dKSB7XG5cbiAgICAgICAgICAgICAgY2F0ZWdvcnkgKz0gbWFwW2NvZGVzW2ldXS5uYW1lO1xuICAgICAgICAgICAgICBpZiAobWFwW2NvZGVzW2ldXS5zdWIpIHtcbiAgICAgICAgICAgICAgICBtYXAgPSBtYXBbY29kZXNbaV1dLnN1YjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjYXRlZ29yeSArPSAnSU5WQUxJRCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNhdGVnb3J5O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXREYXRhKClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG5cbiAgICAgICAgICBjb25zdCBjYXRlZ29yeSA9ICcnO1xuICAgICAgICAgIHJldHVybiBjYXRlZ29yeTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBmb3JtYXRJMThuKGkxOG4pIHtcbiAgICBzd2l0Y2ggKGkxOG4pIHtcbiAgICAgIGNhc2UgJ1BUX0JSJzpcbiAgICAgICAgcmV0dXJuICdwdC1icic7XG4gICAgICBjYXNlICdFTic6XG4gICAgICAgIHJldHVybiAnZW4nO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0YSgpIHtcbiAgICBjb25zdCB1c2VyID0gdGhpcy5kZWNBcGkudXNlcjtcbiAgICBjb25zdCBlbmRwb2ludCA9IENBVEVHT1JZX0VORFBPSU5ULnJlcGxhY2UoJ3tpMThufScsIHRoaXMuZm9ybWF0STE4bih1c2VyLmkxOG4pKTtcbiAgICByZXR1cm4gdGhpcy5kZWNBcGkuZ2V0KGVuZHBvaW50KTtcbiAgfVxufVxuIl19