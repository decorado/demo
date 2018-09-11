/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            var /** @type {?} */ currentValue = this.decSidenavService.progressBarVisible.value;
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
    DecSidenavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav',
                    template: "<div class=\"dec-sidenav-wraper\">\n  <!-- TOOLBAR -->\n  <div *ngIf=\"toolbar\" class=\"dec-sidenav-toolbar-wrapper\" [ngClass]=\"{'full-screen': !(leftMenu.leftMenuVisible | async)}\">\n    <ng-content select=\"dec-sidenav-toolbar\"></ng-content>\n  </div>\n  <!-- / TOOLBAR -->\n\n  <!-- PROGRESS BAR -->\n  <div class=\"progress-bar-wrapper\" *ngIf=\"(decSidenavService.progressBarVisible | async) as progressMessage\">\n    <div class=\"progress-bar-message\">\n      <small *ngIf=\"progressMessage !== true\">{{ progressMessage }}</small>\n    </div>\n    <mat-progress-bar mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n  </div>\n  <!-- / PROGRESS BAR -->\n\n  <mat-sidenav-container [ngClass]=\"{'with-toolbar': toolbar, 'full-screen': !(leftMenu.leftMenuVisible | async)}\">\n\n    <!-- LEFT MENU -->\n    <mat-sidenav *ngIf=\"leftMenu\"\n    [mode]=\"leftMenu.leftMenuMode | async\"\n    [opened]=\"leftMenu.leftMenuVisible | async\"\n    position=\"start\"\n    (openedChange)=\"leftSidenavOpenedChange($event)\"\n    #leftSidenav>\n      <ng-content select=\"dec-sidenav-menu-left\"></ng-content>\n    </mat-sidenav>\n    <!-- / LEFT MENU -->\n\n    <!-- CONTENT -->\n    <ng-content select=\"dec-sidenav-content\"></ng-content>\n    <!-- / CONTENT -->\n\n    <!-- RIGHT MENU -->\n    <mat-sidenav *ngIf=\"rightMenu\"\n    [mode]=\"rightMenu.rightMenuMode | async\"\n    [opened]=\"rightMenu.rightMenuVisible | async\"\n    position=\"end\"\n    (openedChange)=\"rightSidenavOpenedChange($event)\"\n    #rightSidenav>\n      <ng-content select=\"dec-sidenav-menu-right\"></ng-content>\n    </mat-sidenav>\n    <!-- / RIGHT MENU -->\n\n  </mat-sidenav-container>\n\n</div>\n",
                    styles: [".dec-sidenav-wraper .dec-sidenav-toolbar-wrapper{min-width:1200px}.dec-sidenav-wraper .dec-sidenav-toolbar-wrapper.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container{min-width:1200px;height:100vh}.dec-sidenav-wraper .mat-sidenav-container.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 64px)}.dec-sidenav-wraper .mat-sidenav-container .mat-sidenav{width:256px}.dec-sidenav-wraper .progress-bar-wrapper{position:fixed;top:48px;left:0;width:100%;z-index:2;text-align:center}.dec-sidenav-wraper .progress-bar-wrapper .progress-bar-message{height:16px}@media screen and (max-width:1199px){.dec-sidenav-wraper .mat-sidenav-container{height:calc(100vh - 16px)}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 80px)}}@media (max-width:599px){.dec-sidenav-wraper .progress-bar-wrapper{top:40px}}"]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdEcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDekcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztJQW9HcEQsNkJBQ1M7UUFBQSxzQkFBaUIsR0FBakIsaUJBQWlCO0tBQ3RCO0lBNUNKLHNCQUNJLHlDQUFROzs7O1FBTVo7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2Qjs7Ozs7UUFURCxVQUNhLENBQThCO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7YUFDMUM7U0FDRjs7O09BQUE7SUFLRCxzQkFDSSwwQ0FBUzs7OztRQU1iO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7Ozs7O1FBVEQsVUFDYyxDQUErQjtZQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUks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QUMsTUFBTSxFQUFFLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1NBRUo7Ozs7O0lBSUssZ0VBQWtDOzs7O1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHaEcsK0RBQWlDOzs7O1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7OztnQkFuTnRHLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLHFxREErQ1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsNjNCQUE2M0IsQ0FBQztpQkFDeDRCOzs7O2dCQXJEUSxpQkFBaUI7OzswQkF3RHZCLFlBQVksU0FBQywwQkFBMEI7MkJBRXZDLFlBQVksU0FBQywyQkFBMkI7NEJBV3hDLFlBQVksU0FBQyw0QkFBNEI7OEJBV3pDLFNBQVMsU0FBQyxhQUFhOytCQUV2QixTQUFTLFNBQUMsY0FBYzswQkFNeEIsS0FBSzs7OEJBN0ZSOztTQTJEYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LXRvb2xiYXIvZGVjLXNpZGVuYXYtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LWxlZnQvZGVjLXNpZGVuYXYtbWVudS1sZWZ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdFNpZGVuYXYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vc2lkZW5hdi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtc2lkZW5hdi13cmFwZXJcIj5cbiAgPCEtLSBUT09MQkFSIC0tPlxuICA8ZGl2ICpuZ0lmPVwidG9vbGJhclwiIGNsYXNzPVwiZGVjLXNpZGVuYXYtdG9vbGJhci13cmFwcGVyXCIgW25nQ2xhc3NdPVwieydmdWxsLXNjcmVlbic6ICEobGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmMpfVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LXRvb2xiYXJcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8IS0tIC8gVE9PTEJBUiAtLT5cblxuICA8IS0tIFBST0dSRVNTIEJBUiAtLT5cbiAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhci13cmFwcGVyXCIgKm5nSWY9XCIoZGVjU2lkZW5hdlNlcnZpY2UucHJvZ3Jlc3NCYXJWaXNpYmxlIHwgYXN5bmMpIGFzIHByb2dyZXNzTWVzc2FnZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXItbWVzc2FnZVwiPlxuICAgICAgPHNtYWxsICpuZ0lmPVwicHJvZ3Jlc3NNZXNzYWdlICE9PSB0cnVlXCI+e3sgcHJvZ3Jlc3NNZXNzYWdlIH19PC9zbWFsbD5cbiAgICA8L2Rpdj5cbiAgICA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiIGNvbG9yPVwiYWNjZW50XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxuICA8L2Rpdj5cbiAgPCEtLSAvIFBST0dSRVNTIEJBUiAtLT5cblxuICA8bWF0LXNpZGVuYXYtY29udGFpbmVyIFtuZ0NsYXNzXT1cInsnd2l0aC10b29sYmFyJzogdG9vbGJhciwgJ2Z1bGwtc2NyZWVuJzogIShsZWZ0TWVudS5sZWZ0TWVudVZpc2libGUgfCBhc3luYyl9XCI+XG5cbiAgICA8IS0tIExFRlQgTUVOVSAtLT5cbiAgICA8bWF0LXNpZGVuYXYgKm5nSWY9XCJsZWZ0TWVudVwiXG4gICAgW21vZGVdPVwibGVmdE1lbnUubGVmdE1lbnVNb2RlIHwgYXN5bmNcIlxuICAgIFtvcGVuZWRdPVwibGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmNcIlxuICAgIHBvc2l0aW9uPVwic3RhcnRcIlxuICAgIChvcGVuZWRDaGFuZ2UpPVwibGVmdFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI2xlZnRTaWRlbmF2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtbWVudS1sZWZ0XCI+PC9uZy1jb250ZW50PlxuICAgIDwvbWF0LXNpZGVuYXY+XG4gICAgPCEtLSAvIExFRlQgTUVOVSAtLT5cblxuICAgIDwhLS0gQ09OVEVOVCAtLT5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgIDwhLS0gLyBDT05URU5UIC0tPlxuXG4gICAgPCEtLSBSSUdIVCBNRU5VIC0tPlxuICAgIDxtYXQtc2lkZW5hdiAqbmdJZj1cInJpZ2h0TWVudVwiXG4gICAgW21vZGVdPVwicmlnaHRNZW51LnJpZ2h0TWVudU1vZGUgfCBhc3luY1wiXG4gICAgW29wZW5lZF09XCJyaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZSB8IGFzeW5jXCJcbiAgICBwb3NpdGlvbj1cImVuZFwiXG4gICAgKG9wZW5lZENoYW5nZSk9XCJyaWdodFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI3JpZ2h0U2lkZW5hdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LW1lbnUtcmlnaHRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9tYXQtc2lkZW5hdj5cbiAgICA8IS0tIC8gUklHSFQgTUVOVSAtLT5cblxuICA8L21hdC1zaWRlbmF2LWNvbnRhaW5lcj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LXdyYXBlciAuZGVjLXNpZGVuYXYtdG9vbGJhci13cmFwcGVye21pbi13aWR0aDoxMjAwcHh9LmRlYy1zaWRlbmF2LXdyYXBlciAuZGVjLXNpZGVuYXYtdG9vbGJhci13cmFwcGVyLmZ1bGwtc2NyZWVue21pbi13aWR0aDo5NDRweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXJ7bWluLXdpZHRoOjEyMDBweDtoZWlnaHQ6MTAwdmh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLmZ1bGwtc2NyZWVue21pbi13aWR0aDo5NDRweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXIud2l0aC10b29sYmFye2hlaWdodDpjYWxjKDEwMHZoIC0gNjRweCl9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyIC5tYXQtc2lkZW5hdnt3aWR0aDoyNTZweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5wcm9ncmVzcy1iYXItd3JhcHBlcntwb3NpdGlvbjpmaXhlZDt0b3A6NDhweDtsZWZ0OjA7d2lkdGg6MTAwJTt6LWluZGV4OjI7dGV4dC1hbGlnbjpjZW50ZXJ9LmRlYy1zaWRlbmF2LXdyYXBlciAucHJvZ3Jlc3MtYmFyLXdyYXBwZXIgLnByb2dyZXNzLWJhci1tZXNzYWdle2hlaWdodDoxNnB4fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MTE5OXB4KXsuZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXJ7aGVpZ2h0OmNhbGMoMTAwdmggLSAxNnB4KX0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXIud2l0aC10b29sYmFye2hlaWdodDpjYWxjKDEwMHZoIC0gODBweCl9fUBtZWRpYSAobWF4LXdpZHRoOjU5OXB4KXsuZGVjLXNpZGVuYXYtd3JhcGVyIC5wcm9ncmVzcy1iYXItd3JhcHBlcnt0b3A6NDBweH19YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQpIHRvb2xiYXI6IERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50KVxuICBzZXQgbGVmdE1lbnUodjogRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5fbGVmdE1lbnUgPSB2O1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLnNldEluaXRpYWxMZWZ0TWVudVZpc2liaWxpdHlNb2RlcygpO1xuICAgIH1cbiAgfVxuICBnZXQgbGVmdE1lbnUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZnRNZW51O1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50KVxuICBzZXQgcmlnaHRNZW51KHY6IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQpIHtcbiAgICB0aGlzLl9yaWdodE1lbnUgPSB2O1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLnNldEluaXRpYWxSaWdodE1lbnVWaXNpYmlsaXR5TW9kZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHJpZ2h0TWVudSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmlnaHRNZW51O1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnbGVmdFNpZGVuYXYnKSBsZWZ0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBAVmlld0NoaWxkKCdyaWdodFNpZGVuYXYnKSByaWdodFNpZGVuYXY6IE1hdFNpZGVuYXY7XG5cbiAgcHJpdmF0ZSBfbGVmdE1lbnU6IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudDtcblxuICBwcml2YXRlIF9yaWdodE1lbnU6IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQ7XG5cbiAgQElucHV0KClcbiAgc2V0IGxvYWRpbmcodjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5kZWNTaWRlbmF2U2VydmljZS5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5kZWNTaWRlbmF2U2VydmljZS5wcm9ncmVzc0JhclZpc2libGUubmV4dCh2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgbG9hZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNTaWRlbmF2U2VydmljZS5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGVjU2lkZW5hdlNlcnZpY2U6IERlY1NpZGVuYXZTZXJ2aWNlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kZXRlY3RBbmRTaG93Q2hpbGRDb21wb25lbnRzKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVUb1Rvb2xiYXJFdmVudHMoKTtcbiAgfVxuXG4gIC8vIEFQSSAvL1xuICBvcGVuQm90aE1lbnVzKCkge1xuICAgIHRoaXMub3BlbkxlZnRNZW51KCk7XG4gICAgdGhpcy5vcGVuUmlnaHRNZW51KCk7XG4gIH1cblxuICBvcGVuTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIG9wZW5SaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgY2xvc2VCb3RoTWVudXMoKSB7XG4gICAgdGhpcy5jbG9zZUxlZnRNZW51KCk7XG4gICAgdGhpcy5jbG9zZVJpZ2h0TWVudSgpO1xuICB9XG5cbiAgY2xvc2VMZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIGNsb3NlUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICB0b2dnbGVCb3RoTWVudXMoKSB7XG4gICAgdGhpcy50b2dnbGVMZWZ0TWVudSgpO1xuICAgIHRoaXMudG9nZ2xlUmlnaHRNZW51KCk7XG4gIH1cblxuICB0b2dnbGVMZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51Lm9wZW4gPSAhdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICB0b2dnbGVSaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUub3BlbiA9ICF0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgc2V0Qm90aE1lbnVzTW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLnNldExlZnRNZW51TW9kZShtb2RlKTtcbiAgICB0aGlzLnNldFJpZ2h0TWVudU1vZGUobW9kZSk7XG4gIH1cblxuICBzZXRMZWZ0TWVudU1vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudU1vZGUubmV4dChtb2RlKTtcbiAgfVxuXG4gIHNldFJpZ2h0TWVudU1vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51TW9kZS5uZXh0KG1vZGUpO1xuICB9XG5cbiAgdG9nZ2xlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5kZWNTaWRlbmF2U2VydmljZS50b2dnbGVQcm9ncmVzc0JhcigpO1xuICB9XG5cbiAgc2hvd1Byb2dyZXNzQmFyKCkge1xuICAgIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2UucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBoaWRlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5kZWNTaWRlbmF2U2VydmljZS5wcm9ncmVzc0JhclZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICBsZWZ0U2lkZW5hdk9wZW5lZENoYW5nZShvcGVuZWRTdGF0dXMpIHtcbiAgICB0aGlzLmxlZnRNZW51Lm9wZW4gPSBvcGVuZWRTdGF0dXM7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dChvcGVuZWRTdGF0dXMpO1xuICB9XG5cbiAgcmlnaHRTaWRlbmF2T3BlbmVkQ2hhbmdlKG9wZW5lZFN0YXR1cykge1xuICAgIHRoaXMucmlnaHRNZW51Lm9wZW4gPSBvcGVuZWRTdGF0dXM7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KG9wZW5lZFN0YXR1cyk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdEFuZFNob3dDaGlsZENvbXBvbmVudHMoKSB7XG5cbiAgICB0aGlzLnRvb2xiYXIubGVmdE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRoaXMubGVmdE1lbnUgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB0aGlzLnRvb2xiYXIucmlnaHRNZW51VHJpZ2dlclZpc2libGUgPSB0aGlzLnJpZ2h0TWVudSA/IHRydWUgOiBmYWxzZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Rvb2xiYXJFdmVudHMoKSB7XG5cbiAgICBpZiAodGhpcy50b29sYmFyKSB7XG5cbiAgICAgIHRoaXMudG9vbGJhci50b2dnbGVMZWZ0TWVudS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxlZnRTaWRlbmF2LnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudG9vbGJhci50b2dnbGVSaWdodE1lbnUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yaWdodFNpZGVuYXYudG9nZ2xlKCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsUmlnaHRNZW51VmlzaWJpbGl0eU1vZGVzKCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dCghdGhpcy5kZWNTaWRlbmF2U2VydmljZS5nZXRTaWRlbmF2VmlzaWJpbGl0eSgncmlnaHRNZW51SGlkZGVuJykpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsTGVmdE1lbnVWaXNpYmlsaXR5TW9kZXMoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dCghdGhpcy5kZWNTaWRlbmF2U2VydmljZS5nZXRTaWRlbmF2VmlzaWJpbGl0eSgnbGVmdE1lbnVIaWRkZW4nKSk7XG4gIH1cblxufVxuIl19