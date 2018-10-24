/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { DecGridRowComponent } from './dec-grid-row/dec-grid-row.component';
export class DecGridComponent {
    constructor() {
        this.gap = '24px';
    }
}
DecGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-grid',
                template: `<div fxLayout="column" [fxLayoutGap]="gap">

  <div fxFlex *ngFor="let row of rows">

    <ng-template [ngTemplateOutlet]="row.content" [ngTemplateOutletContext]="{gap: gap}"></ng-template>

  </div>

</div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecGridComponent.ctorParameters = () => [];
DecGridComponent.propDecorators = {
    gap: [{ type: Input }],
    rows: [{ type: ContentChildren, args: [forwardRef(() => DecGridRowComponent),] }]
};
if (false) {
    /** @type {?} */
    DecGridComponent.prototype.gap;
    /** @type {?} */
    DecGridComponent.prototype.rows;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1ncmlkL2RlYy1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFpQjVFLE1BQU07SUFNSjttQkFKZSxNQUFNO0tBSUo7OztZQXBCbEIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUU7Ozs7Ozs7OztDQVNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7OztrQkFHRSxLQUFLO21CQUVMLGVBQWUsU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjR3JpZFJvd0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLWdyaWQtcm93L2RlYy1ncmlkLXJvdy5jb21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgW2Z4TGF5b3V0R2FwXT1cImdhcFwiPlxuXG4gIDxkaXYgZnhGbGV4ICpuZ0Zvcj1cImxldCByb3cgb2Ygcm93c1wiPlxuXG4gICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInJvdy5jb250ZW50XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntnYXA6IGdhcH1cIj48L25nLXRlbXBsYXRlPlxuXG4gIDwvZGl2PlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHcmlkQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBnYXAgPSAnMjRweCc7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IERlY0dyaWRSb3dDb21wb25lbnQpKSByb3dzOiBRdWVyeUxpc3Q8RGVjR3JpZFJvd0NvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIl19