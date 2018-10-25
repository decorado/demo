/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, TemplateRef, ContentChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
var DecSidenavMenuItemComponent = /** @class */ (function () {
    function DecSidenavMenuItemComponent(router) {
        this.router = router;
        this.toggle = new EventEmitter();
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
            /** @type {?} */
            var subitems = this._subitems.toArray();
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
        this.toggle.emit(this.showSubmenu);
    };
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.closeSubmenu = /**
     * @return {?}
     */
    function () {
        this.showSubmenu = false;
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
                /** @type {?} */
                var isNaked = this.routerLink.startsWith('//');
                /** @type {?} */
                var isHttp = this.routerLink.startsWith('http://');
                /** @type {?} */
                var isHttps = this.routerLink.startsWith('https://');
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
    /**
     * @param {?} treeLevel
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.getBackground = /**
     * @param {?} treeLevel
     * @return {?}
     */
    function (treeLevel) {
        return this.checkIfActive() ? 'mat-list-item-active' : 'mat-list-item-' + treeLevel;
    };
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.checkIfActive = /**
     * @return {?}
     */
    function () {
        if (this.isActive) {
            return true;
        }
        else if (this.showSubmenu) {
            return false;
        }
        else {
            /** @type {?} */
            var hasActiveChild = this.hasActiveChild;
            return hasActiveChild;
        }
    };
    Object.defineProperty(DecSidenavMenuItemComponent.prototype, "hasActiveChild", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.subitems) {
                return false;
            }
            else {
                return this.subitems.reduce(function (lastValue, item) {
                    return lastValue || item.isActive || item.hasActiveChild;
                }, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavMenuItemComponent.prototype, "isActive", {
        get: /**
         * @return {?}
         */
        function () {
            return this.routerLink === window.location.pathname;
        },
        enumerable: true,
        configurable: true
    });
    DecSidenavMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-item',
                    template: "<ng-template let-treeLevel=\"treeLevel\" #template>\n\n  <mat-list-item class=\"click dec-sidenav-menu-item\"\n  (click)=\"subitems.length ? toggleSubmenu() : openLink()\"\n  [ngClass]=\"getBackground(treeLevel)\">\n\n    <div class=\"item-wrapper\">\n\n      <div [ngStyle]=\"{paddingLeft: treeLevel * 16 + 'px'}\" class=\"item-content\">\n        <ng-content></ng-content>\n      </div>\n\n      <div *ngIf=\"subitems.length\" class=\"text-right\">\n        <ng-container [ngSwitch]=\"showSubmenu\">\n          <span *ngSwitchCase=\"true\"><i class=\"arrow down\"></i></span>\n          <span *ngSwitchCase=\"false\"><i class=\"arrow right\"></i></span>\n        </ng-container>\n      </div>\n    </div>\n\n  </mat-list-item>\n\n  <div class=\"subitem-menu\" *ngIf=\"showSubmenu\">\n\n    <dec-sidenav-menu [items]=\"subitems\" [treeLevel]=\"treeLevel\"></dec-sidenav-menu>\n\n  </div>\n\n</ng-template>\n",
                    styles: [".dec-sidenav-menu-item{height:56px!important;outline:0}.dec-sidenav-menu-item .item-wrapper{width:100%;display:flex;flex-flow:row no-wrap;justify-content:space-between}.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep .mat-icon,.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep i{vertical-align:middle;margin-bottom:5px;margin-right:8px}.dec-sidenav-menu-item .item-wrapper .arrow{margin-bottom:-4px}.dec-sidenav-menu-item .item-wrapper .arrow.right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.dec-sidenav-menu-item .item-wrapper .arrow.left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.dec-sidenav-menu-item .item-wrapper .arrow.up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg)}.dec-sidenav-menu-item .item-wrapper .arrow.down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.dec-sidenav-menu-item .text-right{text-align:right}.dec-sidenav-menu-item .click{cursor:pointer}.dec-sidenav-menu-item i{border:solid #000;border-width:0 2px 2px 0;display:inline-block;padding:4px}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuItemComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    DecSidenavMenuItemComponent.propDecorators = {
        routerLink: [{ type: Input }],
        template: [{ type: ViewChild, args: [TemplateRef,] }],
        _subitems: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
        toggle: [{ type: Output }]
    };
    return DecSidenavMenuItemComponent;
}());
export { DecSidenavMenuItemComponent };
if (false) {
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.routerLink;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.template;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype._subitems;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.toggle;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.started;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.showSubmenu;
    /** @type {?} */
    DecSidenavMenuItemComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LW1lbnUtaXRlbS9kZWMtc2lkZW5hdi1tZW51LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUksT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQWtEdkMscUNBQ1U7UUFBQSxXQUFNLEdBQU4sTUFBTTtzQkFQRyxJQUFJLFlBQVksRUFBRTsyQkFJdkIsS0FBSztLQUlkOzs7O0lBRUwscURBQWU7OztJQUFmO1FBQUEsaUJBSUM7UUFIQyxVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ1A7SUFFRCxzQkFBSSxpREFBUTs7OztRQUFaOztZQUNFLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNqQjs7O09BQUE7Ozs7SUFFRCxtREFBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDcEM7Ozs7SUFFRCxrREFBWTs7O0lBQVo7UUFDRSxJQUFJ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QVcsRUFBRSxLQUFLLEVBQUM7eUJBRWpFLE1BQU07O3NDQTdDVDs7U0FxQ2EsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBsZXQtdHJlZUxldmVsPVwidHJlZUxldmVsXCIgI3RlbXBsYXRlPlxuXG4gIDxtYXQtbGlzdC1pdGVtIGNsYXNzPVwiY2xpY2sgZGVjLXNpZGVuYXYtbWVudS1pdGVtXCJcbiAgKGNsaWNrKT1cInN1Yml0ZW1zLmxlbmd0aCA/IHRvZ2dsZVN1Ym1lbnUoKSA6IG9wZW5MaW5rKClcIlxuICBbbmdDbGFzc109XCJnZXRCYWNrZ3JvdW5kKHRyZWVMZXZlbClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJpdGVtLXdyYXBwZXJcIj5cblxuICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7cGFkZGluZ0xlZnQ6IHRyZWVMZXZlbCAqIDE2ICsgJ3B4J31cIiBjbGFzcz1cIml0ZW0tY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cInN1Yml0ZW1zLmxlbmd0aFwiIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJzaG93U3VibWVudVwiPlxuICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+PGkgY2xhc3M9XCJhcnJvdyBkb3duXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj48aSBjbGFzcz1cImFycm93IHJpZ2h0XCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICA8L21hdC1saXN0LWl0ZW0+XG5cbiAgPGRpdiBjbGFzcz1cInN1Yml0ZW0tbWVudVwiICpuZ0lmPVwic2hvd1N1Ym1lbnVcIj5cblxuICAgIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJzdWJpdGVtc1wiIFt0cmVlTGV2ZWxdPVwidHJlZUxldmVsXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuXG4gIDwvZGl2PlxuXG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi1tZW51LWl0ZW17aGVpZ2h0OjU2cHghaW1wb3J0YW50O291dGxpbmU6MH0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXJ7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvdyBuby13cmFwO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuaXRlbS1jb250ZW50IDo6bmctZGVlcCAubWF0LWljb24sLmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5pdGVtLWNvbnRlbnQgOjpuZy1kZWVwIGl7dmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1ib3R0b206NXB4O21hcmdpbi1yaWdodDo4cHh9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvd3ttYXJnaW4tYm90dG9tOi00cHh9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvdy5yaWdodHt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyl9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvdy5sZWZ0e3RyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLmFycm93LnVwe3RyYW5zZm9ybTpyb3RhdGUoLTEzNWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuYXJyb3cuZG93bnt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLnRleHQtcmlnaHR7dGV4dC1hbGlnbjpyaWdodH0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5jbGlja3tjdXJzb3I6cG9pbnRlcn0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIGl7Ym9yZGVyOnNvbGlkICMwMDA7Ym9yZGVyLXdpZHRoOjAgMnB4IDJweCAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6NHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHJvdXRlckxpbms7XG5cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBfc3ViaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBPdXRwdXQoKSB0b2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc3RhcnRlZDtcblxuICBzaG93U3VibWVudSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgZ2V0IHN1Yml0ZW1zKCkge1xuICAgIGNvbnN0IHN1Yml0ZW1zID0gdGhpcy5fc3ViaXRlbXMudG9BcnJheSgpO1xuICAgIHN1Yml0ZW1zLnNwbGljZSgwLCAxKTsgLy8gcmVtb3ZlcyBpdHNlbGZcbiAgICByZXR1cm4gc3ViaXRlbXM7XG4gIH1cblxuICB0b2dnbGVTdWJtZW51KCkge1xuICAgIHRoaXMuc2hvd1N1Ym1lbnUgPSAhdGhpcy5zaG93U3VibWVudTtcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHRoaXMuc2hvd1N1Ym1lbnUpO1xuICB9XG5cbiAgY2xvc2VTdWJtZW51KCkge1xuICAgIHRoaXMuc2hvd1N1Ym1lbnUgPSBmYWxzZTtcbiAgfVxuXG4gIG9wZW5MaW5rKCkge1xuICAgIGlmICh0aGlzLnJvdXRlckxpbmspIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5yb3V0ZXJMaW5rID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBpc05ha2VkID0gdGhpcy5yb3V0ZXJMaW5rLnN0YXJ0c1dpdGgoJy8vJyk7XG4gICAgICAgIGNvbnN0IGlzSHR0cCA9IHRoaXMucm91dGVyTGluay5zdGFydHNXaXRoKCdodHRwOi8vJyk7XG4gICAgICAgIGNvbnN0IGlzSHR0cHMgPSB0aGlzLnJvdXRlckxpbmsuc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKTtcbiAgICAgICAgaWYgKGlzTmFrZWQgfHwgaXNIdHRwIHx8IGlzSHR0cHMpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMucm91dGVyTGluaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZXJMaW5rXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnJvdXRlckxpbmspKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHRoaXMucm91dGVyTGluayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0QmFja2dyb3VuZCh0cmVlTGV2ZWwpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0lmQWN0aXZlKCkgPyAnbWF0LWxpc3QtaXRlbS1hY3RpdmUnIDogJ21hdC1saXN0LWl0ZW0tJyArIHRyZWVMZXZlbDtcbiAgfVxuXG4gIGNoZWNrSWZBY3RpdmUoKSB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zaG93U3VibWVudSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoYXNBY3RpdmVDaGlsZCA9IHRoaXMuaGFzQWN0aXZlQ2hpbGQ7XG4gICAgICByZXR1cm4gaGFzQWN0aXZlQ2hpbGQ7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBoYXNBY3RpdmVDaGlsZCgpIHtcbiAgICBpZiAoIXRoaXMuc3ViaXRlbXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViaXRlbXMucmVkdWNlKChsYXN0VmFsdWUsIGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGxhc3RWYWx1ZSB8fCBpdGVtLmlzQWN0aXZlIHx8IGl0ZW0uaGFzQWN0aXZlQ2hpbGQ7XG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXJMaW5rID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIH1cblxufVxuIl19