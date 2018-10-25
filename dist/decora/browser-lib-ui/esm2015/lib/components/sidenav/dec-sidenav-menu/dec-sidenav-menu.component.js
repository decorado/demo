/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class DecSidenavMenuComponent {
    constructor() {
        this.items = [];
        this.treeLevel = -1;
    }
}
DecSidenavMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-menu',
                template: `<mat-list>
  <ng-container *ngFor="let item of items">
    <ng-container *ngIf="item.started && item.template ? true : false">
      <ng-template
      [ngTemplateOutlet]="item.template"
      [ngTemplateOutletContext]="{treeLevel: treeLevel + 1}"
      ></ng-template>
    </ng-container>
  </ng-container>
</mat-list>
`,
                styles: [`.mat-list{padding-top:0}`]
            },] },
];
/** @nocollapse */
DecSidenavMenuComponent.ctorParameters = () => [];
DecSidenavMenuComponent.propDecorators = {
    items: [{ type: Input }],
    treeLevel: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecSidenavMenuComponent.prototype.items;
    /** @type {?} */
    DecSidenavMenuComponent.prototype.treeLevel;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNpZGVuYXYtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51L2RlYy1zaWRlbmF2LW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWlCakQsTUFBTTtJQU1KO3FCQUppQixFQUFFO3lCQUVFLENBQUMsQ0FBQztLQUVOOzs7WUFyQmxCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Q0FVWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQzthQUNyQzs7Ozs7b0JBR0UsS0FBSzt3QkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3Q+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbS5zdGFydGVkICYmIGl0ZW0udGVtcGxhdGUgPyB0cnVlIDogZmFsc2VcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS50ZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3RyZWVMZXZlbDogdHJlZUxldmVsICsgMX1cIlxuICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9tYXQtbGlzdD5cbmAsXG4gIHN0eWxlczogW2AubWF0LWxpc3R7cGFkZGluZy10b3A6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgaXRlbXMgPSBbXTtcblxuICBASW5wdXQoKSB0cmVlTGV2ZWwgPSAtMTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=