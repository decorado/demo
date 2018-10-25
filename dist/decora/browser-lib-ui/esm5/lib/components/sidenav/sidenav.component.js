/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ContentChild, ViewChild } from '@angular/core';
import { DecSidenavToolbarComponent } from './dec-sidenav-toolbar/dec-sidenav-toolbar.component';
import { DecSidenavMenuLeftComponent } from './dec-sidenav-menu-left/dec-sidenav-menu-left.component';
import { DecSidenavMenuRightComponent } from './dec-sidenav-menu-right/dec-sidenav-menu-right.component';
import { MatSidenav } from '@angular/material';
import { DecSidenavService } from './sidenav.service';
var DecSidenavComponent = /** @class */ (function () {
    function DecSidenavComponent(decSidenavService) {
        this.decSidenavService = decSidenavService;
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
            return this.decSidenavService.progressBarVisible.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            /** @type {?} */
            var currentValue = this.decSidenavService.progressBarVisible.value;
            if (v !== currentValue) {
                this.decSidenavService.progressBarVisible.next(v);
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
        this.setToolbarLoadingState();
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
        this.decSidenavService.toggleProgressBar();
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.showProgressBar = /**
     * @return {?}
     */
    function () {
        this.decSidenavService.progressBarVisible.next(true);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.hideProgressBar = /**
     * @return {?}
     */
    function () {
        this.decSidenavService.progressBarVisible.next(false);
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
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.setToolbarLoadingState = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.decSidenavService.progressBarVisible.subscribe(function (state) {
            if (_this.toolbar) {
                _this.toolbar.progressBarVisible = state;
            }
        });
    };
    DecSidenavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav',
                    template: "<div class=\"dec-sidenav-wraper\">\n  <!-- TOOLBAR -->\n  <div *ngIf=\"toolbar\" class=\"dec-sidenav-toolbar-wrapper\" [ngClass]=\"{'full-screen': !(leftMenu.leftMenuVisible | async)}\">\n    <ng-content select=\"dec-sidenav-toolbar\"></ng-content>\n  </div>\n  <!-- / TOOLBAR -->\n\n  <mat-sidenav-container [ngClass]=\"{'with-toolbar': toolbar, 'full-screen': !(leftMenu.leftMenuVisible | async)}\">\n\n    <!-- LEFT MENU -->\n    <mat-sidenav *ngIf=\"leftMenu\"\n    [mode]=\"leftMenu.leftMenuMode | async\"\n    [opened]=\"leftMenu.leftMenuVisible | async\"\n    position=\"start\"\n    (openedChange)=\"leftSidenavOpenedChange($event)\"\n    #leftSidenav>\n      <ng-content select=\"dec-sidenav-menu-left\"></ng-content>\n    </mat-sidenav>\n    <!-- / LEFT MENU -->\n\n    <!-- CONTENT -->\n    <ng-content select=\"dec-sidenav-content\"></ng-content>\n    <!-- / CONTENT -->\n\n    <!-- RIGHT MENU -->\n    <mat-sidenav *ngIf=\"rightMenu\"\n    [mode]=\"rightMenu.rightMenuMode | async\"\n    [opened]=\"rightMenu.rightMenuVisible | async\"\n    position=\"end\"\n    (openedChange)=\"rightSidenavOpenedChange($event)\"\n    #rightSidenav>\n      <ng-content select=\"dec-sidenav-menu-right\"></ng-content>\n    </mat-sidenav>\n    <!-- / RIGHT MENU -->\n\n  </mat-sidenav-container>\n\n</div>\n",
                    styles: [".dec-sidenav-wraper .dec-sidenav-toolbar-wrapper{min-width:1200px}.dec-sidenav-wraper .dec-sidenav-toolbar-wrapper.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container{min-width:1200px;height:100vh}.dec-sidenav-wraper .mat-sidenav-container.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 64px)}.dec-sidenav-wraper .mat-sidenav-container .mat-sidenav{width:256px}@media screen and (max-width:1199px){.dec-sidenav-wraper .mat-sidenav-container{height:calc(100vh - 16px)}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 80px)}}"]
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdEcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDekcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztJQTJGcEQsNkJBQ1M7UUFBQSxzQkFBaUIsR0FBakIsaUJBQWlCO0tBQ3RCO0lBNUNKLHNCQUNJLHlDQUFROzs7O1FBTVo7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2Qjs7Ozs7UUFURCxVQUNhLENBQThCO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7YUFDMUM7U0FDRjs7O09BQUE7SUFLRCxzQkFDSSwwQ0FBUzs7OztRQU1iO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7Ozs7O1FBVEQsVUFDYyxDQUErQjtZQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUks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QUFTLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1NBRUo7Ozs7O0lBSUssZ0VBQWtDOzs7O1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHaEcsK0RBQWlDOzs7O1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRzdGLG9EQUFzQjs7Ozs7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDdkQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO2FBQ3pDO1NBQ0YsQ0FBQyxDQUFDOzs7Z0JBbk5OLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLHl4Q0FzQ1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsb25CQUFvbkIsQ0FBQztpQkFDL25COzs7O2dCQTVDUSxpQkFBaUI7OzswQkErQ3ZCLFlBQVksU0FBQywwQkFBMEI7MkJBRXZDLFlBQVksU0FBQywyQkFBMkI7NEJBV3hDLFlBQVksU0FBQyw0QkFBNEI7OEJBV3pDLFNBQVMsU0FBQyxhQUFhOytCQUV2QixTQUFTLFNBQUMsY0FBYzswQkFNeEIsS0FBSzs7OEJBcEZSOztTQWtEYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LXRvb2xiYXIvZGVjLXNpZGVuYXYtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LWxlZnQvZGVjLXNpZGVuYXYtbWVudS1sZWZ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdFNpZGVuYXYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vc2lkZW5hdi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtc2lkZW5hdi13cmFwZXJcIj5cbiAgPCEtLSBUT09MQkFSIC0tPlxuICA8ZGl2ICpuZ0lmPVwidG9vbGJhclwiIGNsYXNzPVwiZGVjLXNpZGVuYXYtdG9vbGJhci13cmFwcGVyXCIgW25nQ2xhc3NdPVwieydmdWxsLXNjcmVlbic6ICEobGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmMpfVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LXRvb2xiYXJcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8IS0tIC8gVE9PTEJBUiAtLT5cblxuICA8bWF0LXNpZGVuYXYtY29udGFpbmVyIFtuZ0NsYXNzXT1cInsnd2l0aC10b29sYmFyJzogdG9vbGJhciwgJ2Z1bGwtc2NyZWVuJzogIShsZWZ0TWVudS5sZWZ0TWVudVZpc2libGUgfCBhc3luYyl9XCI+XG5cbiAgICA8IS0tIExFRlQgTUVOVSAtLT5cbiAgICA8bWF0LXNpZGVuYXYgKm5nSWY9XCJsZWZ0TWVudVwiXG4gICAgW21vZGVdPVwibGVmdE1lbnUubGVmdE1lbnVNb2RlIHwgYXN5bmNcIlxuICAgIFtvcGVuZWRdPVwibGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmNcIlxuICAgIHBvc2l0aW9uPVwic3RhcnRcIlxuICAgIChvcGVuZWRDaGFuZ2UpPVwibGVmdFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI2xlZnRTaWRlbmF2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtbWVudS1sZWZ0XCI+PC9uZy1jb250ZW50PlxuICAgIDwvbWF0LXNpZGVuYXY+XG4gICAgPCEtLSAvIExFRlQgTUVOVSAtLT5cblxuICAgIDwhLS0gQ09OVEVOVCAtLT5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgIDwhLS0gLyBDT05URU5UIC0tPlxuXG4gICAgPCEtLSBSSUdIVCBNRU5VIC0tPlxuICAgIDxtYXQtc2lkZW5hdiAqbmdJZj1cInJpZ2h0TWVudVwiXG4gICAgW21vZGVdPVwicmlnaHRNZW51LnJpZ2h0TWVudU1vZGUgfCBhc3luY1wiXG4gICAgW29wZW5lZF09XCJyaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZSB8IGFzeW5jXCJcbiAgICBwb3NpdGlvbj1cImVuZFwiXG4gICAgKG9wZW5lZENoYW5nZSk9XCJyaWdodFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI3JpZ2h0U2lkZW5hdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LW1lbnUtcmlnaHRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9tYXQtc2lkZW5hdj5cbiAgICA8IS0tIC8gUklHSFQgTUVOVSAtLT5cblxuICA8L21hdC1zaWRlbmF2LWNvbnRhaW5lcj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LXdyYXBlciAuZGVjLXNpZGVuYXYtdG9vbGJhci13cmFwcGVye21pbi13aWR0aDoxMjAwcHh9LmRlYy1zaWRlbmF2LXdyYXBlciAuZGVjLXNpZGVuYXYtdG9vbGJhci13cmFwcGVyLmZ1bGwtc2NyZWVue21pbi13aWR0aDo5NDRweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXJ7bWluLXdpZHRoOjEyMDBweDtoZWlnaHQ6MTAwdmh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLmZ1bGwtc2NyZWVue21pbi13aWR0aDo5NDRweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXIud2l0aC10b29sYmFye2hlaWdodDpjYWxjKDEwMHZoIC0gNjRweCl9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyIC5tYXQtc2lkZW5hdnt3aWR0aDoyNTZweH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjExOTlweCl7LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVye2hlaWdodDpjYWxjKDEwMHZoIC0gMTZweCl9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLndpdGgtdG9vbGJhcntoZWlnaHQ6Y2FsYygxMDB2aCAtIDgwcHgpfX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCkgdG9vbGJhcjogRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQpXG4gIHNldCBsZWZ0TWVudSh2OiBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQpIHtcbiAgICB0aGlzLl9sZWZ0TWVudSA9IHY7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbExlZnRNZW51VmlzaWJpbGl0eU1vZGVzKCk7XG4gICAgfVxuICB9XG4gIGdldCBsZWZ0TWVudSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGVmdE1lbnU7XG4gIH1cblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQpXG4gIHNldCByaWdodE1lbnUodjogRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCkge1xuICAgIHRoaXMuX3JpZ2h0TWVudSA9IHY7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbFJpZ2h0TWVudVZpc2liaWxpdHlNb2RlcygpO1xuICAgIH1cbiAgfVxuICBnZXQgcmlnaHRNZW51KCkge1xuICAgIHJldHVybiB0aGlzLl9yaWdodE1lbnU7XG4gIH1cblxuICBAVmlld0NoaWxkKCdsZWZ0U2lkZW5hdicpIGxlZnRTaWRlbmF2OiBNYXRTaWRlbmF2O1xuXG4gIEBWaWV3Q2hpbGQoJ3JpZ2h0U2lkZW5hdicpIHJpZ2h0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBwcml2YXRlIF9sZWZ0TWVudTogRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50O1xuXG4gIHByaXZhdGUgX3JpZ2h0TWVudTogRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudDtcblxuICBASW5wdXQoKVxuICBzZXQgbG9hZGluZyh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRldGVjdEFuZFNob3dDaGlsZENvbXBvbmVudHMoKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvVG9vbGJhckV2ZW50cygpO1xuICAgIHRoaXMuc2V0VG9vbGJhckxvYWRpbmdTdGF0ZSgpO1xuICB9XG5cbiAgLy8gQVBJIC8vXG4gIG9wZW5Cb3RoTWVudXMoKSB7XG4gICAgdGhpcy5vcGVuTGVmdE1lbnUoKTtcbiAgICB0aGlzLm9wZW5SaWdodE1lbnUoKTtcbiAgfVxuXG4gIG9wZW5MZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgb3BlblJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBjbG9zZUJvdGhNZW51cygpIHtcbiAgICB0aGlzLmNsb3NlTGVmdE1lbnUoKTtcbiAgICB0aGlzLmNsb3NlUmlnaHRNZW51KCk7XG4gIH1cblxuICBjbG9zZUxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgY2xvc2VSaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIHRvZ2dsZUJvdGhNZW51cygpIHtcbiAgICB0aGlzLnRvZ2dsZUxlZnRNZW51KCk7XG4gICAgdGhpcy50b2dnbGVSaWdodE1lbnUoKTtcbiAgfVxuXG4gIHRvZ2dsZUxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUub3BlbiA9ICF0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIHRvZ2dsZVJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5vcGVuID0gIXRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBzZXRCb3RoTWVudXNNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMuc2V0TGVmdE1lbnVNb2RlKG1vZGUpO1xuICAgIHRoaXMuc2V0UmlnaHRNZW51TW9kZShtb2RlKTtcbiAgfVxuXG4gIHNldExlZnRNZW51TW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51TW9kZS5uZXh0KG1vZGUpO1xuICB9XG5cbiAgc2V0UmlnaHRNZW51TW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVNb2RlLm5leHQobW9kZSk7XG4gIH1cblxuICB0b2dnbGVQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnRvZ2dsZVByb2dyZXNzQmFyKCk7XG4gIH1cblxuICBzaG93UHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5kZWNTaWRlbmF2U2VydmljZS5wcm9ncmVzc0JhclZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGhpZGVQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIGxlZnRTaWRlbmF2T3BlbmVkQ2hhbmdlKG9wZW5lZFN0YXR1cykge1xuICAgIHRoaXMubGVmdE1lbnUub3BlbiA9IG9wZW5lZFN0YXR1cztcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KG9wZW5lZFN0YXR1cyk7XG4gIH1cblxuICByaWdodFNpZGVuYXZPcGVuZWRDaGFuZ2Uob3BlbmVkU3RhdHVzKSB7XG4gICAgdGhpcy5yaWdodE1lbnUub3BlbiA9IG9wZW5lZFN0YXR1cztcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQob3BlbmVkU3RhdHVzKTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0QW5kU2hvd0NoaWxkQ29tcG9uZW50cygpIHtcblxuICAgIHRoaXMudG9vbGJhci5sZWZ0TWVudVRyaWdnZXJWaXNpYmxlID0gdGhpcy5sZWZ0TWVudSA/IHRydWUgOiBmYWxzZTtcblxuICAgIHRoaXMudG9vbGJhci5yaWdodE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRoaXMucmlnaHRNZW51ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvVG9vbGJhckV2ZW50cygpIHtcblxuICAgIGlmICh0aGlzLnRvb2xiYXIpIHtcblxuICAgICAgdGhpcy50b29sYmFyLnRvZ2dsZUxlZnRNZW51LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubGVmdFNpZGVuYXYudG9nZ2xlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50b29sYmFyLnRvZ2dsZVJpZ2h0TWVudS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJpZ2h0U2lkZW5hdi50b2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxSaWdodE1lbnVWaXNpYmlsaXR5TW9kZXMoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KCF0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLmdldFNpZGVuYXZWaXNpYmlsaXR5KCdyaWdodE1lbnVIaWRkZW4nKSk7XG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxMZWZ0TWVudVZpc2liaWxpdHlNb2RlcygpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KCF0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLmdldFNpZGVuYXZWaXNpYmlsaXR5KCdsZWZ0TWVudUhpZGRlbicpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VG9vbGJhckxvYWRpbmdTdGF0ZSgpIHtcbiAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnByb2dyZXNzQmFyVmlzaWJsZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgaWYgKHRoaXMudG9vbGJhcikge1xuICAgICAgICB0aGlzLnRvb2xiYXIucHJvZ3Jlc3NCYXJWaXNpYmxlID0gc3RhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==