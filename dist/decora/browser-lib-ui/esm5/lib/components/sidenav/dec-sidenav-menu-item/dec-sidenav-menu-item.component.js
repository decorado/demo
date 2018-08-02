/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ViewChild, TemplateRef, ContentChildren, QueryList, Input } from '@angular/core';
import { Router } from '@angular/router';
var DecSidenavMenuItemComponent = /** @class */ (function () {
    function DecSidenavMenuItemComponent(router) {
        this.router = router;
        this.showSubmenu = false;
    }
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.started = true;
        }, 1);
    };
    Object.defineProperty(DecSidenavMenuItemComponent.prototype, "subitems", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ subitems = this._subitems.toArray();
            subitems.splice(0, 1); // removes itself
            return subitems;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.toggleSubmenu = /**
     * @return {?}
     */
    function () {
        this.showSubmenu = !this.showSubmenu;
    };
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.openLink = /**
     * @return {?}
     */
    function () {
        if (this.routerLink) {
            if (typeof this.routerLink === 'string') {
                var /** @type {?} */ isNaked = this.routerLink.startsWith('//');
                var /** @type {?} */ isHttp = this.routerLink.startsWith('http://');
                var /** @type {?} */ isHttps = this.routerLink.startsWith('https://');
                if (isNaked || isHttp || isHttps) {
                    window.location.href = this.routerLink;
                }
                else {
                    this.router.navigate([this.routerLink]);
                }
            }
            else if (Array.isArray(this.routerLink)) {
                this.router.navigate(this.routerLink);
            }
        }
    };
    DecSidenavMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-item',
                    template: "<ng-template let-treeLevel=\"treeLevel\" #template>\n\n  <mat-list-item class=\"click dec-sidenav-menu-item\"\n  (click)=\"subitems.length ? toggleSubmenu() : openLink()\"\n  [ngStyle]=\"{backgroundColor: 'rgba(0, 0, 0, ' + treeLevel/6 + ')'}\">\n\n    <div class=\"item-wrapper\">\n\n      <div [ngStyle]=\"{paddingLeft: treeLevel * 16 + 'px'}\" class=\"item-content\">\n        <ng-content></ng-content>\n      </div>\n\n      <a *ngIf=\"subitems.length\" class=\"text-right\">\n        <ng-container [ngSwitch]=\"showSubmenu\">\n          <span *ngSwitchCase=\"false\"><i class=\"arrow down\"></i></span>\n          <span *ngSwitchCase=\"true\"><i class=\"arrow up\"></i></span>\n        </ng-container>\n      </a>\n    </div>\n\n  </mat-list-item>\n\n  <div class=\"subitem-menu\" *ngIf=\"showSubmenu\">\n\n    <dec-sidenav-menu [items]=\"subitems\" [treeLevel]=\"treeLevel\"></dec-sidenav-menu>\n\n  </div>\n\n</ng-template>\n",
                    styles: [".dec-sidenav-menu-item{height:56px!important;outline:0}.dec-sidenav-menu-item .item-wrapper{width:100%;display:flex;flex-flow:row no-wrap;justify-content:space-between}.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep .mat-icon,.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep i{vertical-align:middle;margin-bottom:5px;margin-right:8px}.dec-sidenav-menu-item .item-wrapper .right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.dec-sidenav-menu-item .item-wrapper .left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.dec-sidenav-menu-item .item-wrapper .up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg)}.dec-sidenav-menu-item .item-wrapper .down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.dec-sidenav-menu-item .text-right{text-align:right}.dec-sidenav-menu-item .click{cursor:pointer}.dec-sidenav-menu-item i{border:solid #000;border-width:0 2px 2px 0;display:inline-block;padding:4px}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuItemComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    DecSidenavMenuItemComponent.propDecorators = {
        routerLink: [{ type: Input }],
        template: [{ type: ViewChild, args: [TemplateRef,] }],
        _subitems: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }]
    };
    return DecSidenavMenuItemComponent;
}());
export { DecSidenavMenuItemComponent };
function DecSidenavMenuItemComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.routerLink;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.template;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype._subitems;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.started;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.showSubmenu;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LW1lbnUtaXRlbS9kZWMtc2lkZW5hdi1tZW51LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFnRHZDLHFDQUNVO1FBQUEsV0FBTSxHQUFOLE1BQU07MkJBSEYsS0FBSztLQUlkOzs7O0lBRUwscURBQWU7OztJQUFmO1FBQUEsaUJBSUM7UUFIQyxVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ1A7SUFFRCxzQkFBSSxpREFBUTs7OztRQUFaO1lBQ0UscUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNqQjs7O09BQUE7Ozs7SUFFRCxtREFBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUN0Qzs7OztJQUVELDhDQUFROzs7SUFBUjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pELHFCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckQscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2RCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7aUJBQ3hDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7aUJBQ3pDO2FBQ0Y7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdkM7U0FDRjtLQUNGOztnQkFqRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSxzNkJBNkJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLGs4QkFBazhCLENBQUM7aUJBQzc4Qjs7OztnQkFuQ1EsTUFBTTs7OzZCQXNDWixLQUFLOzJCQUVMLFNBQVMsU0FBQyxXQUFXOzRCQUVyQixlQUFlLFNBQUMsMkJBQTJCLEVBQUUsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDOztzQ0EzQ3BFOztTQXFDYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBBZnRlclZpZXdJbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS1pdGVtJyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgbGV0LXRyZWVMZXZlbD1cInRyZWVMZXZlbFwiICN0ZW1wbGF0ZT5cblxuICA8bWF0LWxpc3QtaXRlbSBjbGFzcz1cImNsaWNrIGRlYy1zaWRlbmF2LW1lbnUtaXRlbVwiXG4gIChjbGljayk9XCJzdWJpdGVtcy5sZW5ndGggPyB0b2dnbGVTdWJtZW51KCkgOiBvcGVuTGluaygpXCJcbiAgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgJyArIHRyZWVMZXZlbC82ICsgJyknfVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIml0ZW0td3JhcHBlclwiPlxuXG4gICAgICA8ZGl2IFtuZ1N0eWxlXT1cIntwYWRkaW5nTGVmdDogdHJlZUxldmVsICogMTYgKyAncHgnfVwiIGNsYXNzPVwiaXRlbS1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8YSAqbmdJZj1cInN1Yml0ZW1zLmxlbmd0aFwiIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJzaG93U3VibWVudVwiPlxuICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiPjxpIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvaT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cInRydWVcIj48aSBjbGFzcz1cImFycm93IHVwXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2E+XG4gICAgPC9kaXY+XG5cbiAgPC9tYXQtbGlzdC1pdGVtPlxuXG4gIDxkaXYgY2xhc3M9XCJzdWJpdGVtLW1lbnVcIiAqbmdJZj1cInNob3dTdWJtZW51XCI+XG5cbiAgICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwic3ViaXRlbXNcIiBbdHJlZUxldmVsXT1cInRyZWVMZXZlbFwiPjwvZGVjLXNpZGVuYXYtbWVudT5cblxuICA8L2Rpdj5cblxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtbWVudS1pdGVte2hlaWdodDo1NnB4IWltcG9ydGFudDtvdXRsaW5lOjB9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVye3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgbm8td3JhcDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLml0ZW0tY29udGVudCA6Om5nLWRlZXAgLm1hdC1pY29uLC5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuaXRlbS1jb250ZW50IDo6bmctZGVlcCBpe3ZlcnRpY2FsLWFsaWduOm1pZGRsZTttYXJnaW4tYm90dG9tOjVweDttYXJnaW4tcmlnaHQ6OHB4fS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAucmlnaHR7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAubGVmdHt0cmFuc2Zvcm06cm90YXRlKDEzNWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDEzNWRlZyl9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC51cHt0cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtMTM1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLmRvd257dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuY2xpY2t7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSBpe2JvcmRlcjpzb2xpZCAjMDAwO2JvcmRlci13aWR0aDowIDJweCAycHggMDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSByb3V0ZXJMaW5rO1xuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgX3N1Yml0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBzdGFydGVkO1xuXG4gIHNob3dTdWJtZW51ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgfSwgMSk7XG4gIH1cblxuICBnZXQgc3ViaXRlbXMoKSB7XG4gICAgY29uc3Qgc3ViaXRlbXMgPSB0aGlzLl9zdWJpdGVtcy50b0FycmF5KCk7XG4gICAgc3ViaXRlbXMuc3BsaWNlKDAsIDEpOyAvLyByZW1vdmVzIGl0c2VsZlxuICAgIHJldHVybiBzdWJpdGVtcztcbiAgfVxuXG4gIHRvZ2dsZVN1Ym1lbnUoKSB7XG4gICAgdGhpcy5zaG93U3VibWVudSA9ICF0aGlzLnNob3dTdWJtZW51O1xuICB9XG5cbiAgb3BlbkxpbmsoKSB7XG4gICAgaWYgKHRoaXMucm91dGVyTGluaykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnJvdXRlckxpbmsgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGlzTmFrZWQgPSB0aGlzLnJvdXRlckxpbmsuc3RhcnRzV2l0aCgnLy8nKTtcbiAgICAgICAgY29uc3QgaXNIdHRwID0gdGhpcy5yb3V0ZXJMaW5rLnN0YXJ0c1dpdGgoJ2h0dHA6Ly8nKTtcbiAgICAgICAgY29uc3QgaXNIdHRwcyA9IHRoaXMucm91dGVyTGluay5zdGFydHNXaXRoKCdodHRwczovLycpO1xuICAgICAgICBpZiAoaXNOYWtlZCB8fCBpc0h0dHAgfHwgaXNIdHRwcykge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5yb3V0ZXJMaW5rO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlckxpbmtdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMucm91dGVyTGluaykpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUodGhpcy5yb3V0ZXJMaW5rKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19