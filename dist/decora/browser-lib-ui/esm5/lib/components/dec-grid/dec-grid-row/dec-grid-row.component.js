/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, QueryList, ViewChild, TemplateRef, forwardRef, Input } from '@angular/core';
var DecGridColumnComponent = /** @class */ (function () {
    function DecGridColumnComponent() {
        this.span = 1;
    }
    Object.defineProperty(DecGridColumnComponent.prototype, "columnWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return (100 / 12) * this.span;
        },
        enumerable: true,
        configurable: true
    });
    DecGridColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-grid-column',
                    template: "<ng-template #content let-gap=\"gap\">\n\n  <div class=\"dec-grid-column\" fxFlex fxFill>\n\n    <div *ngIf=\"(rows && rows.length) else innerContent\" fxLayout=\"column\" fxLayoutAlign=\"start\" [fxLayoutGap]=\"gap\">\n\n      <div *ngFor=\"let row of rows\">\n\n        <ng-template [ngTemplateOutlet]=\"row.content\" [ngTemplateOutletContext]=\"{gap: gap}\"></ng-template>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n</ng-template>\n\n<ng-template #innerContent>\n\n  <ng-content></ng-content>\n\n</ng-template>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecGridColumnComponent.ctorParameters = function () { return []; };
    DecGridColumnComponent.propDecorators = {
        span: [{ type: Input }],
        rows: [{ type: ContentChildren, args: [forwardRef(function () { return DecGridRowComponent; }),] }],
        content: [{ type: ViewChild, args: ['content',] }]
    };
    return DecGridColumnComponent;
}());
export { DecGridColumnComponent };
if (false) {
    /** @type {?} */
    DecGridColumnComponent.prototype.span;
    /** @type {?} */
    DecGridColumnComponent.prototype.rows;
    /** @type {?} */
    DecGridColumnComponent.prototype.content;
}
var DecGridRowComponent = /** @class */ (function () {
    function DecGridRowComponent() {
    }
    DecGridRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-grid-row',
                    template: "<ng-template #content let-gap=\"gap\">\n\n  <div class=\"dec-grid-row\">\n\n    <div *ngIf=\"(columns && columns.length) else innerContent\" fxLayout=\"row\" fxLayoutAlign=\"start\" [fxLayoutGap]=\"gap\">\n\n      <div [fxFlex]=\"column.columnWidth\" *ngFor=\"let column of columns\">\n\n        <ng-template [ngTemplateOutlet]=\"column.content\" [ngTemplateOutletContext]=\"{gap: gap}\"></ng-template>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ng-template>\n\n<ng-template #innerContent>\n\n  <ng-content></ng-content>\n\n</ng-template>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecGridRowComponent.ctorParameters = function () { return []; };
    DecGridRowComponent.propDecorators = {
        columns: [{ type: ContentChildren, args: [DecGridColumnComponent,] }],
        content: [{ type: ViewChild, args: ['content',] }]
    };
    return DecGridRowComponent;
}());
export { DecGridRowComponent };
if (false) {
    /** @type {?} */
    DecGridRowComponent.prototype.columns;
    /** @type {?} */
    DecGridRowComponent.prototype.content;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdyaWQtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtZ3JpZC9kZWMtZ3JpZC1yb3cvZGVjLWdyaWQtcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRyxlQUFlLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUF3Q2hIO29CQU5rRSxDQUFDO0tBTWxEO0lBRWpCLHNCQUFJLCtDQUFXOzs7O1FBQWY7WUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUUvQjs7O09BQUE7O2dCQTFDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLHlnQkF3Qlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7Ozt1QkFHRSxLQUFLO3VCQUVMLGVBQWUsU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLG1CQUFtQixFQUFuQixDQUFtQixDQUFDOzBCQUVyRCxTQUFTLFNBQUMsU0FBUzs7aUNBdEN0Qjs7U0FnQ2Esc0JBQXNCOzs7Ozs7Ozs7O0lBa0RqQztLQUFpQjs7Z0JBbENsQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxraUJBdUJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7Ozs7MEJBR0UsZUFBZSxTQUFDLHNCQUFzQjswQkFFdEMsU0FBUyxTQUFDLFNBQVM7OzhCQWhGdEI7O1NBNEVhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBJbiB0aGUgc2FtZSBmaWxlIHRvIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY3kgdXNpbmcgZm9yd2FyZFJlZlxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWdyaWQtY29sdW1uJyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgI2NvbnRlbnQgbGV0LWdhcD1cImdhcFwiPlxuXG4gIDxkaXYgY2xhc3M9XCJkZWMtZ3JpZC1jb2x1bW5cIiBmeEZsZXggZnhGaWxsPlxuXG4gICAgPGRpdiAqbmdJZj1cIihyb3dzICYmIHJvd3MubGVuZ3RoKSBlbHNlIGlubmVyQ29udGVudFwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0XCIgW2Z4TGF5b3V0R2FwXT1cImdhcFwiPlxuXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCByb3cgb2Ygcm93c1wiPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJyb3cuY29udGVudFwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7Z2FwOiBnYXB9XCI+PC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuXG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2lubmVyQ29udGVudD5cblxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjR3JpZENvbHVtbkNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgc3BhbjogMSB8IDIgfCAzIHwgNCB8IDUgfCA2IHwgNyB8IDggfCA5IHwgMTAgfCAxMSB8IDEyID0gMTtcblxuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gRGVjR3JpZFJvd0NvbXBvbmVudCkpIHJvd3M6IFF1ZXJ5TGlzdDxEZWNHcmlkUm93Q29tcG9uZW50PjtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGdldCBjb2x1bW5XaWR0aCgpIHtcbiAgICByZXR1cm4gKDEwMCAvIDEyKSAqIHRoaXMuc3BhbjtcblxuICB9XG5cbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1ncmlkLXJvdycsXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlICNjb250ZW50IGxldC1nYXA9XCJnYXBcIj5cblxuICA8ZGl2IGNsYXNzPVwiZGVjLWdyaWQtcm93XCI+XG5cbiAgICA8ZGl2ICpuZ0lmPVwiKGNvbHVtbnMgJiYgY29sdW1ucy5sZW5ndGgpIGVsc2UgaW5uZXJDb250ZW50XCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnRcIiBbZnhMYXlvdXRHYXBdPVwiZ2FwXCI+XG5cbiAgICAgIDxkaXYgW2Z4RmxleF09XCJjb2x1bW4uY29sdW1uV2lkdGhcIiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmNvbnRlbnRcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2dhcDogZ2FwfVwiPjwvbmctdGVtcGxhdGU+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjaW5uZXJDb250ZW50PlxuXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHcmlkUm93Q29tcG9uZW50IHtcblxuICBAQ29udGVudENoaWxkcmVuKERlY0dyaWRDb2x1bW5Db21wb25lbnQpIGNvbHVtbnM6IFF1ZXJ5TGlzdDxEZWNHcmlkQ29sdW1uQ29tcG9uZW50PjtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=