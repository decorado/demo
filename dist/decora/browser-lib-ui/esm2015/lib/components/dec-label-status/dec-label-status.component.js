/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DecColorService } from './../../services/color/dec-color.service';
export class DecLabelStatusComponent {
    /**
     * @param {?} decColorService
     */
    constructor(decColorService) {
        this.decColorService = decColorService;
    }
}
DecLabelStatusComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-label-status',
                template: `<dec-label [colorHex]="decColorService.getStatusColor(status)" [stretched]="stretched">
  <ng-content></ng-content>
  {{ 'label.'+status | translate }}
</dec-label>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecLabelStatusComponent.ctorParameters = () => [
    { type: DecColorService }
];
DecLabelStatusComponent.propDecorators = {
    status: [{ type: Input }],
    stretched: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecLabelStatusComponent.prototype.status;
    /** @type {?} */
    DecLabelStatusComponent.prototype.stretched;
    /** @type {?} */
    DecLabelStatusComponent.prototype.decColorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWxhYmVsLXN0YXR1cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWxhYmVsLXN0YXR1cy9kZWMtbGFiZWwtc3RhdHVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBVzNFLE1BQU07Ozs7SUFNSixZQUNTO1FBQUEsb0JBQWUsR0FBZixlQUFlO0tBQ25COzs7WUFqQk4sU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7OztDQUlYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7O1lBVlEsZUFBZTs7O3FCQWFyQixLQUFLO3dCQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNDb2xvclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2NvbG9yL2RlYy1jb2xvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxhYmVsLXN0YXR1cycsXG4gIHRlbXBsYXRlOiBgPGRlYy1sYWJlbCBbY29sb3JIZXhdPVwiZGVjQ29sb3JTZXJ2aWNlLmdldFN0YXR1c0NvbG9yKHN0YXR1cylcIiBbc3RyZXRjaGVkXT1cInN0cmV0Y2hlZFwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIHt7ICdsYWJlbC4nK3N0YXR1cyB8IHRyYW5zbGF0ZSB9fVxuPC9kZWMtbGFiZWw+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGFiZWxTdGF0dXNDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIHN0YXR1czogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHN0cmV0Y2hlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGVjQ29sb3JTZXJ2aWNlOiBEZWNDb2xvclNlcnZpY2VcbiAgKSB7IH1cblxufVxuIl19