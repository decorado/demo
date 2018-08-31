/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DecStatusColorService } from './../../services/status-color/dec-status-color.service';
export class DecLabelStatusComponent {
    /**
     * @param {?} decStatusColorService
     */
    constructor(decStatusColorService) {
        this.decStatusColorService = decStatusColorService;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set status(v) {
        if (v !== this._status) {
            this.statusColor = this.decStatusColorService.getStatusColor(v);
        }
    }
    /**
     * @return {?}
     */
    get status() {
        return this._status;
    }
}
DecLabelStatusComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-label-status',
                template: `<dec-label [colorHex]="statusColor" [stretched]="stretched">
  <ng-content></ng-content>
</dec-label>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecLabelStatusComponent.ctorParameters = () => [
    { type: DecStatusColorService }
];
DecLabelStatusComponent.propDecorators = {
    status: [{ type: Input }],
    stretched: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecLabelStatusComponent.prototype.stretched;
    /** @type {?} */
    DecLabelStatusComponent.prototype._status;
    /** @type {?} */
    DecLabelStatusComponent.prototype.statusColor;
    /** @type {?} */
    DecLabelStatusComponent.prototype.decStatusColorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWxhYmVsLXN0YXR1cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWxhYmVsLXN0YXR1cy9kZWMtbGFiZWwtc3RhdHVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFVL0YsTUFBTTs7OztJQW1CSixZQUFtQixxQkFBNEM7UUFBNUMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtLQUFLOzs7OztJQWpCcEUsSUFDSSxNQUFNLENBQUMsQ0FBUztRQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO0tBQ0Y7Ozs7SUFFRCxJQUFJLE1BQU07UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjs7O1lBbkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7OztDQUdYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7O1lBVFEscUJBQXFCOzs7cUJBWTNCLEtBQUs7d0JBV0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1N0YXR1c0NvbG9yU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvc3RhdHVzLWNvbG9yL2RlYy1zdGF0dXMtY29sb3Iuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1sYWJlbC1zdGF0dXMnLFxuICB0ZW1wbGF0ZTogYDxkZWMtbGFiZWwgW2NvbG9ySGV4XT1cInN0YXR1c0NvbG9yXCIgW3N0cmV0Y2hlZF09XCJzdHJldGNoZWRcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kZWMtbGFiZWw+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGFiZWxTdGF0dXNDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzdGF0dXModjogc3RyaW5nKSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3N0YXR1cykge1xuICAgICAgdGhpcy5zdGF0dXNDb2xvciA9IHRoaXMuZGVjU3RhdHVzQ29sb3JTZXJ2aWNlLmdldFN0YXR1c0NvbG9yKHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzdGF0dXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcbiAgfVxuXG4gIEBJbnB1dCgpIHN0cmV0Y2hlZD86IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfc3RhdHVzOiBzdHJpbmc7XG5cbiAgc3RhdHVzQ29sb3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGVjU3RhdHVzQ29sb3JTZXJ2aWNlOiBEZWNTdGF0dXNDb2xvclNlcnZpY2UpIHsgfVxuXG59XG4iXX0=