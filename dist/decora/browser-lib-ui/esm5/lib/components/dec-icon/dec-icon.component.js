/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
var DecIconComponent = /** @class */ (function () {
    function DecIconComponent() {
    }
    /**
     * @return {?}
     */
    DecIconComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            try {
                _this.icon = _this.textElement.nativeElement.textContent;
            }
            catch (/** @type {?} */ error) { }
        }, 0);
    };
    DecIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-icon',
                    template: "<ng-container [ngSwitch]=\"font\">\n  <ng-container *ngSwitchCase=\"'mat'\">\n    <i class=\"material-icons\">{{icon}}</i>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"'fas'\">\n    <i class=\"fa {{'fa-'+icon}}\" aria-hidden=\"true\"></i>\n  </ng-container>\n</ng-container>\n\n<span #text [hidden]=\"true\">\n  <ng-content></ng-content>\n</span>\n",
                    styles: [".material-icons{color:inherit;font-size:inherit;display:inline-block;-webkit-transform:translateY(16%);transform:translateY(16%);-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"]
                },] },
    ];
    /** @nocollapse */
    DecIconComponent.ctorParameters = function () { return []; };
    DecIconComponent.propDecorators = {
        font: [{ type: Input }],
        textElement: [{ type: ViewChild, args: ['text',] }]
    };
    return DecIconComponent;
}());
export { DecIconComponent };
function DecIconComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecIconComponent.prototype.icon;
    /** @type {?} */
    DecIconComponent.prototype.font;
    /** @type {?} */
    DecIconComponent.prototype.textElement;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pY29uL2RlYy1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBMkJyRjtLQUFpQjs7OztJQUVqQiwwQ0FBZTs7O0lBQWY7UUFBQSxpQkFNQztRQUxDLFVBQVUsQ0FBQztZQUNULElBQUksQ0FBQztnQkFDSCxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzthQUN4RDtZQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFBLEtBQUssRUFBRSxDQUFDLEVBQUU7U0FDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNQOztnQkFqQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUscVdBWVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsbVBBQW1QLENBQUM7aUJBQzlQOzs7Ozt1QkFLRSxLQUFLOzhCQUVMLFNBQVMsU0FBQyxNQUFNOzsyQkF6Qm5COztTQW1CYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWljb24nLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImZvbnRcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ21hdCdcIj5cbiAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+e3tpY29ufX08L2k+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInZmFzJ1wiPlxuICAgIDxpIGNsYXNzPVwiZmEge3snZmEtJytpY29ufX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG5cbjxzcGFuICN0ZXh0IFtoaWRkZW5dPVwidHJ1ZVwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L3NwYW4+XG5gLFxuICBzdHlsZXM6IFtgLm1hdGVyaWFsLWljb25ze2NvbG9yOmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgxNiUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDE2JSk7LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ljb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBpY29uOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZm9udDogJ21hdCcgfCAnZmFzJztcblxuICBAVmlld0NoaWxkKCd0ZXh0JykgdGV4dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmljb24gPSB0aGlzLnRleHRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG4gICAgfSwgMCk7XG4gIH1cblxufVxuIl19