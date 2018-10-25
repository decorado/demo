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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdyaWQtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtZ3JpZC9kZWMtZ3JpZC1yb3cvZGVjLWdyaWQtcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRyxlQUFlLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUEyQ2hIO29CQU5rRSxDQUFDO0tBTWxEO0lBRWpCLHNCQUFJLCtDQUFXOzs7O1FBQWY7WUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUMvQjs7O09BQUE7O2dCQXpDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLHlnQkF3Qlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7Ozt1QkFHRSxLQUFLO3VCQUVMLGVBQWUsU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLG1CQUFtQixFQUFuQixDQUFtQixDQUFDOzBCQUVyRCxTQUFTLFNBQUMsU0FBUzs7aUNBekN0Qjs7U0FtQ2Esc0JBQXNCOzs7Ozs7Ozs7O0lBaURqQztLQUFpQjs7Z0JBbENsQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxraUJBdUJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7Ozs7MEJBR0UsZUFBZSxTQUFDLHNCQUFzQjswQkFFdEMsU0FBUyxTQUFDLFNBQVM7OzhCQWxGdEI7O1NBOEVhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBJTVBPUlRBTlQgLy9cbi8vIERlY0dyaWRDb2x1bW5Db21wb25lbnQgYW5kIERlY0dyaWRSb3dDb21wb25lbnQgYXJlIGluIHRoZSBzYW1lIGZpbGUgdG8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jeSB1c2luZyBmb3J3YXJkUmVmXG4vLyAuLi5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWdyaWQtY29sdW1uJyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgI2NvbnRlbnQgbGV0LWdhcD1cImdhcFwiPlxuXG4gIDxkaXYgY2xhc3M9XCJkZWMtZ3JpZC1jb2x1bW5cIiBmeEZsZXggZnhGaWxsPlxuXG4gICAgPGRpdiAqbmdJZj1cIihyb3dzICYmIHJvd3MubGVuZ3RoKSBlbHNlIGlubmVyQ29udGVudFwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0XCIgW2Z4TGF5b3V0R2FwXT1cImdhcFwiPlxuXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCByb3cgb2Ygcm93c1wiPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJyb3cuY29udGVudFwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7Z2FwOiBnYXB9XCI+PC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuXG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2lubmVyQ29udGVudD5cblxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjR3JpZENvbHVtbkNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgc3BhbjogMSB8IDIgfCAzIHwgNCB8IDUgfCA2IHwgNyB8IDggfCA5IHwgMTAgfCAxMSB8IDEyID0gMTtcblxuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gRGVjR3JpZFJvd0NvbXBvbmVudCkpIHJvd3M6IFF1ZXJ5TGlzdDxEZWNHcmlkUm93Q29tcG9uZW50PjtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGdldCBjb2x1bW5XaWR0aCgpIHtcbiAgICByZXR1cm4gKDEwMCAvIDEyKSAqIHRoaXMuc3BhbjtcbiAgfVxuXG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZ3JpZC1yb3cnLFxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSAjY29udGVudCBsZXQtZ2FwPVwiZ2FwXCI+XG5cbiAgPGRpdiBjbGFzcz1cImRlYy1ncmlkLXJvd1wiPlxuXG4gICAgPGRpdiAqbmdJZj1cIihjb2x1bW5zICYmIGNvbHVtbnMubGVuZ3RoKSBlbHNlIGlubmVyQ29udGVudFwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0XCIgW2Z4TGF5b3V0R2FwXT1cImdhcFwiPlxuXG4gICAgICA8ZGl2IFtmeEZsZXhdPVwiY29sdW1uLmNvbHVtbldpZHRoXCIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCI+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi5jb250ZW50XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntnYXA6IGdhcH1cIj48L25nLXRlbXBsYXRlPlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2lubmVyQ29udGVudD5cblxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjR3JpZFJvd0NvbXBvbmVudCB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNHcmlkQ29sdW1uQ29tcG9uZW50KSBjb2x1bW5zOiBRdWVyeUxpc3Q8RGVjR3JpZENvbHVtbkNvbXBvbmVudD47XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIl19