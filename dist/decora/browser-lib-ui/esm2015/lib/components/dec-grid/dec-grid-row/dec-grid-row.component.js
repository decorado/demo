/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, QueryList, ViewChild, TemplateRef, forwardRef, Input } from '@angular/core';
export class DecGridColumnComponent {
    constructor() {
        this.span = 1;
    }
    /**
     * @return {?}
     */
    get columnWidth() {
        return (100 / 12) * this.span;
    }
}
DecGridColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-grid-column',
                template: `<ng-template #content let-gap="gap">

  <div class="dec-grid-column" fxFlex fxFill>

    <div *ngIf="(rows && rows.length) else innerContent" fxLayout="column" fxLayoutAlign="start" [fxLayoutGap]="gap">

      <div *ngFor="let row of rows">

        <ng-template [ngTemplateOutlet]="row.content" [ngTemplateOutletContext]="{gap: gap}"></ng-template>

      </div>

    </div>

  </div>


</ng-template>

<ng-template #innerContent>

  <ng-content></ng-content>

</ng-template>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecGridColumnComponent.ctorParameters = () => [];
DecGridColumnComponent.propDecorators = {
    span: [{ type: Input }],
    rows: [{ type: ContentChildren, args: [forwardRef(() => DecGridRowComponent),] }],
    content: [{ type: ViewChild, args: ['content',] }]
};
if (false) {
    /** @type {?} */
    DecGridColumnComponent.prototype.span;
    /** @type {?} */
    DecGridColumnComponent.prototype.rows;
    /** @type {?} */
    DecGridColumnComponent.prototype.content;
}
export class DecGridRowComponent {
    constructor() { }
}
DecGridRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-grid-row',
                template: `<ng-template #content let-gap="gap">

  <div class="dec-grid-row">

    <div *ngIf="(columns && columns.length) else innerContent" fxLayout="row" fxLayoutAlign="start" [fxLayoutGap]="gap">

      <div [fxFlex]="column.columnWidth" *ngFor="let column of columns">

        <ng-template [ngTemplateOutlet]="column.content" [ngTemplateOutletContext]="{gap: gap}"></ng-template>

      </div>

    </div>

  </div>

</ng-template>

<ng-template #innerContent>

  <ng-content></ng-content>

</ng-template>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecGridRowComponent.ctorParameters = () => [];
DecGridRowComponent.propDecorators = {
    columns: [{ type: ContentChildren, args: [DecGridColumnComponent,] }],
    content: [{ type: ViewChild, args: ['content',] }]
};
if (false) {
    /** @type {?} */
    DecGridRowComponent.prototype.columns;
    /** @type {?} */
    DecGridRowComponent.prototype.content;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdyaWQtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtZ3JpZC9kZWMtZ3JpZC1yb3cvZGVjLWdyaWQtcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRyxlQUFlLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQW1DbEgsTUFBTTtJQVFKO29CQU5rRSxDQUFDO0tBTWxEOzs7O0lBRWpCLElBQUksV0FBVztRQUNiLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQy9COzs7WUF6Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0JYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7OzttQkFHRSxLQUFLO21CQUVMLGVBQWUsU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7c0JBRXJELFNBQVMsU0FBQyxTQUFTOzs7Ozs7Ozs7O0FBcUN0QixNQUFNO0lBTUosaUJBQWlCOzs7WUFsQ2xCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVCWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7Ozs7c0JBR0UsZUFBZSxTQUFDLHNCQUFzQjtzQkFFdEMsU0FBUyxTQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsICBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBUZW1wbGF0ZVJlZiwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gSU1QT1JUQU5UIC8vXG4vLyBEZWNHcmlkQ29sdW1uQ29tcG9uZW50IGFuZCBEZWNHcmlkUm93Q29tcG9uZW50IGFyZSBpbiB0aGUgc2FtZSBmaWxlIHRvIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY3kgdXNpbmcgZm9yd2FyZFJlZlxuLy8gLi4uXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1ncmlkLWNvbHVtbicsXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlICNjb250ZW50IGxldC1nYXA9XCJnYXBcIj5cblxuICA8ZGl2IGNsYXNzPVwiZGVjLWdyaWQtY29sdW1uXCIgZnhGbGV4IGZ4RmlsbD5cblxuICAgIDxkaXYgKm5nSWY9XCIocm93cyAmJiByb3dzLmxlbmd0aCkgZWxzZSBpbm5lckNvbnRlbnRcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydFwiIFtmeExheW91dEdhcF09XCJnYXBcIj5cblxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcm93IG9mIHJvd3NcIj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicm93LmNvbnRlbnRcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2dhcDogZ2FwfVwiPjwvbmctdGVtcGxhdGU+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cblxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNpbm5lckNvbnRlbnQ+XG5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dyaWRDb2x1bW5Db21wb25lbnQge1xuXG4gIEBJbnB1dCgpIHNwYW46IDEgfCAyIHwgMyB8IDQgfCA1IHwgNiB8IDcgfCA4IHwgOSB8IDEwIHwgMTEgfCAxMiA9IDE7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IERlY0dyaWRSb3dDb21wb25lbnQpKSByb3dzOiBRdWVyeUxpc3Q8RGVjR3JpZFJvd0NvbXBvbmVudD47XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBnZXQgY29sdW1uV2lkdGgoKSB7XG4gICAgcmV0dXJuICgxMDAgLyAxMikgKiB0aGlzLnNwYW47XG4gIH1cblxufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWdyaWQtcm93JyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgI2NvbnRlbnQgbGV0LWdhcD1cImdhcFwiPlxuXG4gIDxkaXYgY2xhc3M9XCJkZWMtZ3JpZC1yb3dcIj5cblxuICAgIDxkaXYgKm5nSWY9XCIoY29sdW1ucyAmJiBjb2x1bW5zLmxlbmd0aCkgZWxzZSBpbm5lckNvbnRlbnRcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydFwiIFtmeExheW91dEdhcF09XCJnYXBcIj5cblxuICAgICAgPGRpdiBbZnhGbGV4XT1cImNvbHVtbi5jb2x1bW5XaWR0aFwiICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4uY29udGVudFwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7Z2FwOiBnYXB9XCI+PC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNpbm5lckNvbnRlbnQ+XG5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dyaWRSb3dDb21wb25lbnQge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjR3JpZENvbHVtbkNvbXBvbmVudCkgY29sdW1uczogUXVlcnlMaXN0PERlY0dyaWRDb2x1bW5Db21wb25lbnQ+O1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiJdfQ==