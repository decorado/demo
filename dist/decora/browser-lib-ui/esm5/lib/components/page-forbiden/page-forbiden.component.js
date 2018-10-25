/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
var DecPageForbidenComponent = /** @class */ (function () {
    function DecPageForbidenComponent(router) {
        var _this = this;
        this.router = router;
        this.router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function (e) {
            _this.previousUrl = document.referrer || e.url;
        });
    }
    DecPageForbidenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-page-forbiden',
                    template: "<div class=\"page-forbiden-wrapper\">\n  <h1>{{'label.page-forbiden' | translate}}</h1>\n  <p>{{'label.page-forbiden-help' | translate}}</p>\n  <p><small>Ref: {{previousUrl}}</small></p>\n  <img src=\"http://s3-sa-east-1.amazonaws.com/static-files-prod/platform/decora3.png\">\n</div>\n",
                    styles: [".page-forbiden-wrapper{padding-top:100px;text-align:center}img{width:100px}"]
                },] },
    ];
    /** @nocollapse */
    DecPageForbidenComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    return DecPageForbidenComponent;
}());
export { DecPageForbidenComponent };
if (false) {
    /** @type {?} */
    DecPageForbidenComponent.prototype.previousUrl;
    /** @type {?} */
    DecPageForbidenComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1mb3JiaWRlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcGFnZS1mb3JiaWRlbi9wYWdlLWZvcmJpZGVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFpQnRDLGtDQUFvQixNQUFjO1FBQWxDLGlCQVFDO1FBUm1CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ2pCLElBQUksQ0FDSCxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDLENBQ2hEO2FBQ0EsU0FBUyxDQUFDLFVBQUMsQ0FBZ0I7WUFDMUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDL0MsQ0FBQyxDQUFDO0tBQ0o7O2dCQXZCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLGdTQU1YO29CQUNDLE1BQU0sRUFBRSxDQUFDLDZFQUE2RSxDQUFDO2lCQUN4Rjs7OztnQkFiUSxNQUFNOzttQ0FEZjs7U0FlYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1wYWdlLWZvcmJpZGVuJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFnZS1mb3JiaWRlbi13cmFwcGVyXCI+XG4gIDxoMT57eydsYWJlbC5wYWdlLWZvcmJpZGVuJyB8IHRyYW5zbGF0ZX19PC9oMT5cbiAgPHA+e3snbGFiZWwucGFnZS1mb3JiaWRlbi1oZWxwJyB8IHRyYW5zbGF0ZX19PC9wPlxuICA8cD48c21hbGw+UmVmOiB7e3ByZXZpb3VzVXJsfX08L3NtYWxsPjwvcD5cbiAgPGltZyBzcmM9XCJodHRwOi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZGVjb3JhMy5wbmdcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wYWdlLWZvcmJpZGVuLXdyYXBwZXJ7cGFkZGluZy10b3A6MTAwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9aW1ne3dpZHRoOjEwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VGb3JiaWRlbkNvbXBvbmVudCB7XG5cbiAgcHJldmlvdXNVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgIClcbiAgICAuc3Vic2NyaWJlKChlOiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZG9jdW1lbnQucmVmZXJyZXIgfHwgZS51cmw7XG4gICAgfSk7XG4gIH1cblxufVxuIl19