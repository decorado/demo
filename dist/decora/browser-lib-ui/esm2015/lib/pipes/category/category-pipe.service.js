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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnktcGlwZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9jYXRlZ29yeS9jYXRlZ29yeS1waXBlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHckMsTUFBTSxpQkFBaUIsR0FBRywwQ0FBMEMsQ0FBQztBQUdyRSxNQUFNOzs7O0lBRUosWUFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTttQkFFbkMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOztvQkFFVCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7O29CQUVsQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hCLFFBQVEsSUFBSSxLQUFLLENBQUM7eUJBQ25CO3dCQUVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRWxCLFFBQVEsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUMvQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDdEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7NkJBQ3pCO3lCQUVGO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFFBQVEsSUFBSSxTQUFTLENBQUM7eUJBQ3ZCO3FCQUVGO29CQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7aUJBQ2pCLENBQUMsQ0FDSCxDQUFDO2FBQ0g7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtpQkFDbEIsSUFBSSxDQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTs7Z0JBRVQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixNQUFNLENBQUMsUUFBUSxDQUFDO2FBQ2pCLENBQUMsQ0FDSCxDQUFDO1NBQ0w7S0F6QzZDOzs7OztJQTJDOUMsVUFBVSxDQUFDLElBQUk7UUFDYixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxPQUFPO2dCQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDakIsS0FBSyxJQUFJO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtLQUNGOzs7O0lBRU8sT0FBTzs7UUFDYixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzs7UUFDOUIsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztZQTFEcEMsVUFBVTs7OztZQU5GLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuY29uc3QgQ0FURUdPUllfRU5EUE9JTlQgPSAnL2xlZ2FjeS9wcm9kdWN0L2NhdGVnb3J5P2xhbmd1YWdlPXtpMThufSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeVBpcGVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY0FwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgZ2V0ID0gKGNvZGUpID0+IHtcbiAgICBpZiAoY29kZSAmJiBjb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNvZGVzID0gY29kZS50b1VwcGVyQ2FzZSgpLnNwbGl0KCcnKTtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGEoKS5waXBlKFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG5cbiAgICAgICAgICBsZXQgY2F0ZWdvcnkgPSAnJztcblxuICAgICAgICAgIGxldCBtYXAgPSBkYXRhLnN1YjtcbiAgICAgICAgICBmb3IgKGxldCBpIGluIGNvZGVzKSB7XG4gICAgICAgICAgICBpZiAoY2F0ZWdvcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBjYXRlZ29yeSArPSAnID4gJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hcFtjb2Rlc1tpXV0pIHtcblxuICAgICAgICAgICAgICBjYXRlZ29yeSArPSBtYXBbY29kZXNbaV1dLm5hbWU7XG4gICAgICAgICAgICAgIGlmIChtYXBbY29kZXNbaV1dLnN1Yikge1xuICAgICAgICAgICAgICAgIG1hcCA9IG1hcFtjb2Rlc1tpXV0uc3ViO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5ICs9ICdJTlZBTElEJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2F0ZWdvcnk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldERhdGEoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChkYXRhID0+IHtcblxuICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gJyc7XG4gICAgICAgICAgcmV0dXJuIGNhdGVnb3J5O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGZvcm1hdEkxOG4oaTE4bikge1xuICAgIHN3aXRjaCAoaTE4bikge1xuICAgICAgY2FzZSAnUFRfQlInOlxuICAgICAgICByZXR1cm4gJ3B0LWJyJztcbiAgICAgIGNhc2UgJ0VOJzpcbiAgICAgICAgcmV0dXJuICdlbic7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXREYXRhKCkge1xuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmRlY0FwaS51c2VyO1xuICAgIGNvbnN0IGVuZHBvaW50ID0gQ0FURUdPUllfRU5EUE9JTlQucmVwbGFjZSgne2kxOG59JywgdGhpcy5mb3JtYXRJMThuKHVzZXIuaTE4bikpO1xuICAgIHJldHVybiB0aGlzLmRlY0FwaS5nZXQoZW5kcG9pbnQpO1xuICB9XG59XG4iXX0=