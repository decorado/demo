/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
export class DecListTableColumnComponent {
    constructor() {
        this.title = '';
        this._colSpan = 1;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set colSpan(v) {
        /** @type {?} */
        const number = +v;
        this._colSpan = isNaN(number) ? 1 : number;
    }
    /**
     * @return {?}
     */
    get colSpan() {
        return this._colSpan;
    }
}
DecListTableColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-table-column',
                template: `<ng-content></ng-content>
`,
                styles: [``]
            },] },
];
DecListTableColumnComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    prop: [{ type: Input }],
    title: [{ type: Input }],
    colSpan: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecListTableColumnComponent.prototype.template;
    /** @type {?} */
    DecListTableColumnComponent.prototype.prop;
    /** @type {?} */
    DecListTableColumnComponent.prototype.title;
    /** @type {?} */
    DecListTableColumnComponent.prototype._colSpan;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUTVFLE1BQU07O3FCQU1hLEVBQUU7d0JBV0EsQ0FBQzs7Ozs7O0lBVHBCLElBQWEsT0FBTyxDQUFDLENBQUM7O1FBQ3BCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM1Qzs7OztJQUVELElBQUksT0FBTztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7WUFyQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTtDQUNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7dUJBR0UsWUFBWSxTQUFDLFdBQVc7bUJBRXhCLEtBQUs7b0JBRUwsS0FBSztzQkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC10YWJsZS1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHByb3A7XG5cbiAgQElucHV0KCkgdGl0bGUgPSAnJztcblxuICBASW5wdXQoKSBzZXQgY29sU3Bhbih2KSB7XG4gICAgY29uc3QgbnVtYmVyID0gK3Y7XG4gICAgdGhpcy5fY29sU3BhbiA9IGlzTmFOKG51bWJlcikgPyAxIDogbnVtYmVyO1xuICB9XG5cbiAgZ2V0IGNvbFNwYW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29sU3BhbjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbFNwYW4gPSAxO1xufVxuIl19