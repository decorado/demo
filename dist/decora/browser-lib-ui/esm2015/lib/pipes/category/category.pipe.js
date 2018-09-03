/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
import { CategoryPipeService } from './category-pipe.service';
export class CategoryPipe {
    /**
     * @param {?} categoryPipeService
     */
    constructor(categoryPipeService) {
        this.categoryPipeService = categoryPipeService;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        return this.categoryPipeService.get(value);
    }
}
CategoryPipe.decorators = [
    { type: Pipe, args: [{
                name: 'decCategory'
            },] },
];
/** @nocollapse */
CategoryPipe.ctorParameters = () => [
    { type: CategoryPipeService }
];
function CategoryPipe_tsickle_Closure_declarations() {
    /** @type {?} */
    CategoryPipe.prototype.categoryPipeService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvY2F0ZWdvcnkvY2F0ZWdvcnkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFROUQsTUFBTTs7OztJQUVKLFlBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0tBQzNEOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFhO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVDOzs7WUFWRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLGFBQWE7YUFDcEI7Ozs7WUFQUSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXRlZ29yeVBpcGVTZXJ2aWNlIH0gZnJvbSAnLi9jYXRlZ29yeS1waXBlLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5cblxuQFBpcGUoe1xuICBuYW1lOiAnZGVjQ2F0ZWdvcnknXG59KVxuZXhwb3J0IGNsYXNzIENhdGVnb3J5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2F0ZWdvcnlQaXBlU2VydmljZTogQ2F0ZWdvcnlQaXBlU2VydmljZSkge1xuICB9XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmNhdGVnb3J5UGlwZVNlcnZpY2UuZ2V0KHZhbHVlKTtcbiAgfVxufVxuIl19