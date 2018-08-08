/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ContentChild, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DecSidenavToolbarComponent } from './dec-sidenav-toolbar/dec-sidenav-toolbar.component';
import { DecSidenavMenuLeftComponent } from './dec-sidenav-menu-left/dec-sidenav-menu-left.component';
import { DecSidenavMenuRightComponent } from './dec-sidenav-menu-right/dec-sidenav-menu-right.component';
import { MatSidenav } from '@angular/material';
import { DecSidenavService } from './sidenav.service';
var DecSidenavComponent = /** @class */ (function () {
    function DecSidenavComponent(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.progressBarVisible = new BehaviorSubject(false);
    }
    Object.defineProperty(DecSidenavComponent.prototype, "leftMenu", {
        get: /**
         * @return {?}
         */
        function () {
            return this._leftMenu;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._leftMenu = v;
            if (v) {
                this.setInitialLeftMenuVisibilityModes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavComponent.prototype, "rightMenu", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rightMenu;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._rightMenu = v;
            if (v) {
                this.setInitialRightMenuVisibilityModes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavComponent.prototype, "loading", {
        get: /**
         * @return {?}
         */
        function () {
            return this.progressBarVisible.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.progressBarVisible.value;
            if (v !== currentValue) {
                this.progressBarVisible.next(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.detectAndShowChildComponents();
        this.subscribeToToolbarEvents();
    };
    // API //
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.openBothMenus = /**
     * @return {?}
     */
    function () {
        this.openLeftMenu();
        this.openRightMenu();
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.openLeftMenu = /**
     * @return {?}
     */
    function () {
        this.leftMenu.leftMenuVisible.next(true);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.openRightMenu = /**
     * @return {?}
     */
    function () {
        this.rightMenu.rightMenuVisible.next(true);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.closeBothMenus = /**
     * @return {?}
     */
    function () {
        this.closeLeftMenu();
        this.closeRightMenu();
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.closeLeftMenu = /**
     * @return {?}
     */
    function () {
        this.leftMenu.leftMenuVisible.next(false);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.closeRightMenu = /**
     * @return {?}
     */
    function () {
        this.rightMenu.rightMenuVisible.next(false);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.toggleBothMenus = /**
     * @return {?}
     */
    function () {
        this.toggleLeftMenu();
        this.toggleRightMenu();
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.toggleLeftMenu = /**
     * @return {?}
     */
    function () {
        this.leftMenu.open = !this.leftMenu.leftMenuVisible.value;
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.toggleRightMenu = /**
     * @return {?}
     */
    function () {
        this.rightMenu.open = !this.rightMenu.rightMenuVisible.value;
    };
    /**
     * @param {?=} mode
     * @return {?}
     */
    DecSidenavComponent.prototype.setBothMenusMode = /**
     * @param {?=} mode
     * @return {?}
     */
    function (mode) {
        if (mode === void 0) { mode = 'side'; }
        this.setLeftMenuMode(mode);
        this.setRightMenuMode(mode);
    };
    /**
     * @param {?=} mode
     * @return {?}
     */
    DecSidenavComponent.prototype.setLeftMenuMode = /**
     * @param {?=} mode
     * @return {?}
     */
    function (mode) {
        if (mode === void 0) { mode = 'side'; }
        this.leftMenu.leftMenuMode.next(mode);
    };
    /**
     * @param {?=} mode
     * @return {?}
     */
    DecSidenavComponent.prototype.setRightMenuMode = /**
     * @param {?=} mode
     * @return {?}
     */
    function (mode) {
        if (mode === void 0) { mode = 'side'; }
        this.rightMenu.rightMenuMode.next(mode);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.toggleProgressBar = /**
     * @return {?}
     */
    function () {
        this.loading = !this.progressBarVisible.value;
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.showProgressBar = /**
     * @return {?}
     */
    function () {
        this.progressBarVisible.next(true);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.hideProgressBar = /**
     * @return {?}
     */
    function () {
        this.progressBarVisible.next(false);
    };
    /**
     * @param {?} openedStatus
     * @return {?}
     */
    DecSidenavComponent.prototype.leftSidenavOpenedChange = /**
     * @param {?} openedStatus
     * @return {?}
     */
    function (openedStatus) {
        this.leftMenu.open = openedStatus;
        this.leftMenu.leftMenuVisible.next(openedStatus);
    };
    /**
     * @param {?} openedStatus
     * @return {?}
     */
    DecSidenavComponent.prototype.rightSidenavOpenedChange = /**
     * @param {?} openedStatus
     * @return {?}
     */
    function (openedStatus) {
        this.rightMenu.open = openedStatus;
        this.rightMenu.rightMenuVisible.next(openedStatus);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.detectAndShowChildComponents = /**
     * @return {?}
     */
    function () {
        this.toolbar.leftMenuTriggerVisible = this.leftMenu ? true : false;
        this.toolbar.rightMenuTriggerVisible = this.rightMenu ? true : false;
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.subscribeToToolbarEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.toolbar) {
            this.toolbar.toggleLeftMenu.subscribe(function () {
                _this.leftSidenav.toggle();
            });
            this.toolbar.toggleRightMenu.subscribe(function () {
                _this.rightSidenav.toggle();
            });
        }
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.setInitialRightMenuVisibilityModes = /**
     * @return {?}
     */
    function () {
        this.rightMenu.rightMenuVisible.next(!this.decSidenavService.getSidenavVisibility('rightMenuHidden'));
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.setInitialLeftMenuVisibilityModes = /**
     * @return {?}
     */
    function () {
        this.leftMenu.leftMenuVisible.next(!this.decSidenavService.getSidenavVisibility('leftMenuHidden'));
    };
    DecSidenavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav',
                    template: "<div class=\"dec-sidenav-wraper\">\n  <!-- TOOLBAR -->\n  <ng-container *ngIf=\"toolbar\">\n    <ng-content select=\"dec-sidenav-toolbar\"></ng-content>\n  </ng-container>\n  <!-- / TOOLBAR -->\n\n  <!-- PROGRESS BAR -->\n  <div class=\"progress-bar-wrapper\" *ngIf=\"progressBarVisible | async\">\n    <mat-progress-bar mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n  </div>\n  <!-- / PROGRESS BAR -->\n\n  <mat-sidenav-container [ngClass]=\"{'with-toolbar': toolbar}\">\n\n    <!-- LEFT MENU -->\n    <mat-sidenav *ngIf=\"leftMenu\"\n    [mode]=\"leftMenu.leftMenuMode | async\"\n    [opened]=\"leftMenu.leftMenuVisible | async\"\n    position=\"start\"\n    (openedChange)=\"leftSidenavOpenedChange($event)\"\n    #leftSidenav>\n      <ng-content select=\"dec-sidenav-menu-left\"></ng-content>\n    </mat-sidenav>\n    <!-- / LEFT MENU -->\n\n    <!-- CONTENT -->\n    <ng-content select=\"dec-sidenav-content\"></ng-content>\n    <!-- / CONTENT -->\n\n    <!-- RIGHT MENU -->\n    <mat-sidenav *ngIf=\"rightMenu\"\n    [mode]=\"rightMenu.rightMenuMode | async\"\n    [opened]=\"rightMenu.rightMenuVisible | async\"\n    position=\"end\"\n    (openedChange)=\"rightSidenavOpenedChange($event)\"\n    #rightSidenav>\n      <ng-content select=\"dec-sidenav-menu-right\"></ng-content>\n    </mat-sidenav>\n    <!-- / RIGHT MENU -->\n\n  </mat-sidenav-container>\n\n</div>\n",
                    styles: [".dec-sidenav-wraper .mat-sidenav-container{height:100vh}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 64px)}.dec-sidenav-wraper .mat-sidenav-container .mat-sidenav{width:256px}.dec-sidenav-wraper .progress-bar-wrapper{position:fixed;top:60px;left:0;width:100%}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavComponent.ctorParameters = function () { return [
        { type: DecSidenavService }
    ]; };
    DecSidenavComponent.propDecorators = {
        toolbar: [{ type: ContentChild, args: [DecSidenavToolbarComponent,] }],
        leftMenu: [{ type: ContentChild, args: [DecSidenavMenuLeftComponent,] }],
        rightMenu: [{ type: ContentChild, args: [DecSidenavMenuRightComponent,] }],
        leftSidenav: [{ type: ViewChild, args: ['leftSidenav',] }],
        rightSidenav: [{ type: ViewChild, args: ['rightSidenav',] }],
        loading: [{ type: Input }]
    };
    return DecSidenavComponent;
}());
export { DecSidenavComponent };
function DecSidenavComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSidenavComponent.prototype.progressBarVisible;
    /** @type {?} */
    DecSidenavComponent.prototype.toolbar;
    /** @type {?} */
    DecSidenavComponent.prototype.leftSidenav;
    /** @type {?} */
    DecSidenavComponent.prototype.rightSidenav;
    /** @type {?} */
    DecSidenavComponent.prototype._leftMenu;
    /** @type {?} */
    DecSidenavComponent.prototype._rightMenu;
    /** @type {?} */
    DecSidenavComponent.prototype.decSidenavService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0lBb0dwRCw2QkFDVTtRQUFBLHNCQUFpQixHQUFqQixpQkFBaUI7a0NBaERHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQztLQWlEN0Q7SUE3Q0osc0JBQ0kseUNBQVE7Ozs7UUFNWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7OztRQVRELFVBQ2EsQ0FBOEI7WUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsaUNBQWlDLEVBQUUsQ0FBQzthQUMxQztTQUNGOzs7T0FBQTtJQUtELHNCQUNJLDBDQUFTOzs7O1FBTWI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4Qjs7Ozs7UUFURCxVQUNjLENBQStCO1lBQzNDLElBQUksQ0FB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QVMsQ0FBQztnQkFDckMsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM1QixDQUFDLENBQUM7U0FFSjs7Ozs7SUFJSyxnRUFBa0M7Ozs7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7OztJQUdoRywrREFBaUM7Ozs7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7O2dCQXROdEcsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsODJDQTRDWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxvU0FBb1MsQ0FBQztpQkFDL1M7Ozs7Z0JBbERRLGlCQUFpQjs7OzBCQXVEdkIsWUFBWSxTQUFDLDBCQUEwQjsyQkFFdkMsWUFBWSxTQUFDLDJCQUEyQjs0QkFXeEMsWUFBWSxTQUFDLDRCQUE0Qjs4QkFXekMsU0FBUyxTQUFDLGFBQWE7K0JBRXZCLFNBQVMsU0FBQyxjQUFjOzBCQU14QixLQUFLOzs4QkE3RlI7O1NBeURhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1yaWdodC9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRTaWRlbmF2IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjLXNpZGVuYXYtd3JhcGVyXCI+XG4gIDwhLS0gVE9PTEJBUiAtLT5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRvb2xiYXJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi10b29sYmFyXCI+PC9uZy1jb250ZW50PlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPCEtLSAvIFRPT0xCQVIgLS0+XG5cbiAgPCEtLSBQUk9HUkVTUyBCQVIgLS0+XG4gIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXItd3JhcHBlclwiICpuZ0lmPVwicHJvZ3Jlc3NCYXJWaXNpYmxlIHwgYXN5bmNcIj5cbiAgICA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiIGNvbG9yPVwiYWNjZW50XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxuICA8L2Rpdj5cbiAgPCEtLSAvIFBST0dSRVNTIEJBUiAtLT5cblxuICA8bWF0LXNpZGVuYXYtY29udGFpbmVyIFtuZ0NsYXNzXT1cInsnd2l0aC10b29sYmFyJzogdG9vbGJhcn1cIj5cblxuICAgIDwhLS0gTEVGVCBNRU5VIC0tPlxuICAgIDxtYXQtc2lkZW5hdiAqbmdJZj1cImxlZnRNZW51XCJcbiAgICBbbW9kZV09XCJsZWZ0TWVudS5sZWZ0TWVudU1vZGUgfCBhc3luY1wiXG4gICAgW29wZW5lZF09XCJsZWZ0TWVudS5sZWZ0TWVudVZpc2libGUgfCBhc3luY1wiXG4gICAgcG9zaXRpb249XCJzdGFydFwiXG4gICAgKG9wZW5lZENoYW5nZSk9XCJsZWZ0U2lkZW5hdk9wZW5lZENoYW5nZSgkZXZlbnQpXCJcbiAgICAjbGVmdFNpZGVuYXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1tZW51LWxlZnRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9tYXQtc2lkZW5hdj5cbiAgICA8IS0tIC8gTEVGVCBNRU5VIC0tPlxuXG4gICAgPCEtLSBDT05URU5UIC0tPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgPCEtLSAvIENPTlRFTlQgLS0+XG5cbiAgICA8IS0tIFJJR0hUIE1FTlUgLS0+XG4gICAgPG1hdC1zaWRlbmF2ICpuZ0lmPVwicmlnaHRNZW51XCJcbiAgICBbbW9kZV09XCJyaWdodE1lbnUucmlnaHRNZW51TW9kZSB8IGFzeW5jXCJcbiAgICBbb3BlbmVkXT1cInJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlIHwgYXN5bmNcIlxuICAgIHBvc2l0aW9uPVwiZW5kXCJcbiAgICAob3BlbmVkQ2hhbmdlKT1cInJpZ2h0U2lkZW5hdk9wZW5lZENoYW5nZSgkZXZlbnQpXCJcbiAgICAjcmlnaHRTaWRlbmF2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtbWVudS1yaWdodFwiPjwvbmctY29udGVudD5cbiAgICA8L21hdC1zaWRlbmF2PlxuICAgIDwhLS0gLyBSSUdIVCBNRU5VIC0tPlxuXG4gIDwvbWF0LXNpZGVuYXYtY29udGFpbmVyPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXJ7aGVpZ2h0OjEwMHZofS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lci53aXRoLXRvb2xiYXJ7aGVpZ2h0OmNhbGMoMTAwdmggLSA2NHB4KX0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXIgLm1hdC1zaWRlbmF2e3dpZHRoOjI1NnB4fS5kZWMtc2lkZW5hdi13cmFwZXIgLnByb2dyZXNzLWJhci13cmFwcGVye3Bvc2l0aW9uOmZpeGVkO3RvcDo2MHB4O2xlZnQ6MDt3aWR0aDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICByZWFkb25seSBwcm9ncmVzc0JhclZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50KSB0b29sYmFyOiBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudClcbiAgc2V0IGxlZnRNZW51KHY6IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCkge1xuICAgIHRoaXMuX2xlZnRNZW51ID0gdjtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5zZXRJbml0aWFsTGVmdE1lbnVWaXNpYmlsaXR5TW9kZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGxlZnRNZW51KCkge1xuICAgIHJldHVybiB0aGlzLl9sZWZ0TWVudTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudClcbiAgc2V0IHJpZ2h0TWVudSh2OiBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5fcmlnaHRNZW51ID0gdjtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5zZXRJbml0aWFsUmlnaHRNZW51VmlzaWJpbGl0eU1vZGVzKCk7XG4gICAgfVxuICB9XG4gIGdldCByaWdodE1lbnUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JpZ2h0TWVudTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2xlZnRTaWRlbmF2JykgbGVmdFNpZGVuYXY6IE1hdFNpZGVuYXY7XG5cbiAgQFZpZXdDaGlsZCgncmlnaHRTaWRlbmF2JykgcmlnaHRTaWRlbmF2OiBNYXRTaWRlbmF2O1xuXG4gIHByaXZhdGUgX2xlZnRNZW51OiBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBfcmlnaHRNZW51OiBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBsb2FkaW5nKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUubmV4dCh2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgbG9hZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgdGhpcy5kZXRlY3RBbmRTaG93Q2hpbGRDb21wb25lbnRzKCk7XG5cbiAgICB0aGlzLnN1YnNjcmliZVRvVG9vbGJhckV2ZW50cygpO1xuXG4gIH1cblxuICAvLyBBUEkgLy9cbiAgb3BlbkJvdGhNZW51cygpIHtcbiAgICB0aGlzLm9wZW5MZWZ0TWVudSgpO1xuICAgIHRoaXMub3BlblJpZ2h0TWVudSgpO1xuICB9XG5cbiAgb3BlbkxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBvcGVuUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGNsb3NlQm90aE1lbnVzKCkge1xuICAgIHRoaXMuY2xvc2VMZWZ0TWVudSgpO1xuICAgIHRoaXMuY2xvc2VSaWdodE1lbnUoKTtcbiAgfVxuXG4gIGNsb3NlTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICBjbG9zZVJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgdG9nZ2xlQm90aE1lbnVzKCkge1xuICAgIHRoaXMudG9nZ2xlTGVmdE1lbnUoKTtcbiAgICB0aGlzLnRvZ2dsZVJpZ2h0TWVudSgpO1xuICB9XG5cbiAgdG9nZ2xlTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5vcGVuID0gIXRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgdG9nZ2xlUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51Lm9wZW4gPSAhdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIHNldEJvdGhNZW51c01vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5zZXRMZWZ0TWVudU1vZGUobW9kZSk7XG4gICAgdGhpcy5zZXRSaWdodE1lbnVNb2RlKG1vZGUpO1xuICB9XG5cbiAgc2V0TGVmdE1lbnVNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVNb2RlLm5leHQobW9kZSk7XG4gIH1cblxuICBzZXRSaWdodE1lbnVNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudU1vZGUubmV4dChtb2RlKTtcbiAgfVxuXG4gIHRvZ2dsZVByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMubG9hZGluZyA9ICF0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIHNob3dQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgaGlkZVByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgbGVmdFNpZGVuYXZPcGVuZWRDaGFuZ2Uob3BlbmVkU3RhdHVzKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5vcGVuID0gb3BlbmVkU3RhdHVzO1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQob3BlbmVkU3RhdHVzKTtcbiAgfVxuXG4gIHJpZ2h0U2lkZW5hdk9wZW5lZENoYW5nZShvcGVuZWRTdGF0dXMpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5vcGVuID0gb3BlbmVkU3RhdHVzO1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dChvcGVuZWRTdGF0dXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RBbmRTaG93Q2hpbGRDb21wb25lbnRzKCkge1xuXG4gICAgdGhpcy50b29sYmFyLmxlZnRNZW51VHJpZ2dlclZpc2libGUgPSB0aGlzLmxlZnRNZW51ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy50b29sYmFyLnJpZ2h0TWVudVRyaWdnZXJWaXNpYmxlID0gdGhpcy5yaWdodE1lbnUgPyB0cnVlIDogZmFsc2U7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Ub29sYmFyRXZlbnRzKCkge1xuXG4gICAgaWYgKHRoaXMudG9vbGJhcikge1xuXG4gICAgICB0aGlzLnRvb2xiYXIudG9nZ2xlTGVmdE1lbnUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5sZWZ0U2lkZW5hdi50b2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRvb2xiYXIudG9nZ2xlUmlnaHRNZW51LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmlnaHRTaWRlbmF2LnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbFJpZ2h0TWVudVZpc2liaWxpdHlNb2RlcygpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQoIXRoaXMuZGVjU2lkZW5hdlNlcnZpY2UuZ2V0U2lkZW5hdlZpc2liaWxpdHkoJ3JpZ2h0TWVudUhpZGRlbicpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbExlZnRNZW51VmlzaWJpbGl0eU1vZGVzKCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQoIXRoaXMuZGVjU2lkZW5hdlNlcnZpY2UuZ2V0U2lkZW5hdlZpc2liaWxpdHkoJ2xlZnRNZW51SGlkZGVuJykpO1xuICB9XG5cbn1cbiJdfQ==