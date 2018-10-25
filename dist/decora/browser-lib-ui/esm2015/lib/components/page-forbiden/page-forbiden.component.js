/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
export class DecPageForbidenComponent {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((e) => {
            this.previousUrl = document.referrer || e.url;
        });
    }
}
DecPageForbidenComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-page-forbiden',
                template: `<div class="page-forbiden-wrapper">
  <h1>{{'label.page-forbiden' | translate}}</h1>
  <p>{{'label.page-forbiden-help' | translate}}</p>
  <p><small>Ref: {{previousUrl}}</small></p>
  <img src="http://s3-sa-east-1.amazonaws.com/static-files-prod/platform/decora3.png">
</div>
`,
                styles: [`.page-forbiden-wrapper{padding-top:100px;text-align:center}img{width:100px}`]
            },] },
];
/** @nocollapse */
DecPageForbidenComponent.ctorParameters = () => [
    { type: Router }
];
if (false) {
    /** @type {?} */
    DecPageForbidenComponent.prototype.previousUrl;
    /** @type {?} */
    DecPageForbidenComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1mb3JiaWRlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcGFnZS1mb3JiaWRlbi9wYWdlLWZvcmJpZGVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWF4QyxNQUFNOzs7O0lBSUosWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ2pCLElBQUksQ0FDSCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFlBQVksYUFBYSxDQUFDLENBQ2hEO2FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQy9DLENBQUMsQ0FBQztLQUNKOzs7WUF2QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7O0NBTVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsNkVBQTZFLENBQUM7YUFDeEY7Ozs7WUFiUSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcGFnZS1mb3JiaWRlbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2UtZm9yYmlkZW4td3JhcHBlclwiPlxuICA8aDE+e3snbGFiZWwucGFnZS1mb3JiaWRlbicgfCB0cmFuc2xhdGV9fTwvaDE+XG4gIDxwPnt7J2xhYmVsLnBhZ2UtZm9yYmlkZW4taGVscCcgfCB0cmFuc2xhdGV9fTwvcD5cbiAgPHA+PHNtYWxsPlJlZjoge3twcmV2aW91c1VybH19PC9zbWFsbD48L3A+XG4gIDxpbWcgc3JjPVwiaHR0cDovL3MzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YXRpYy1maWxlcy1wcm9kL3BsYXRmb3JtL2RlY29yYTMucG5nXCI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AucGFnZS1mb3JiaWRlbi13cmFwcGVye3BhZGRpbmctdG9wOjEwMHB4O3RleHQtYWxpZ246Y2VudGVyfWltZ3t3aWR0aDoxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnQge1xuXG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZClcbiAgICApXG4gICAgLnN1YnNjcmliZSgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRvY3VtZW50LnJlZmVycmVyIHx8IGUudXJsO1xuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==