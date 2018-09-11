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
export class DecSidenavComponent {
    /**
     * @param {?} decSidenavService
     */
    constructor(decSidenavService) {
        this.decSidenavService = decSidenavService;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set leftMenu(v) {
        this._leftMenu = v;
        if (v) {
            this.setInitialLeftMenuVisibilityModes();
        }
    }
    /**
     * @return {?}
     */
    get leftMenu() {
        return this._leftMenu;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set rightMenu(v) {
        this._rightMenu = v;
        if (v) {
            this.setInitialRightMenuVisibilityModes();
        }
    }
    /**
     * @return {?}
     */
    get rightMenu() {
        return this._rightMenu;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set loading(v) {
        const /** @type {?} */ currentValue = this.decSidenavService.progressBarVisible.value;
        if (v !== currentValue) {
            this.decSidenavService.progressBarVisible.next(v);
        }
    }
    /**
     * @return {?}
     */
    get loading() {
        return this.decSidenavService.progressBarVisible.value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.detectAndShowChildComponents();
        this.subscribeToToolbarEvents();
    }
    /**
     * @return {?}
     */
    openBothMenus() {
        this.openLeftMenu();
        this.openRightMenu();
    }
    /**
     * @return {?}
     */
    openLeftMenu() {
        this.leftMenu.leftMenuVisible.next(true);
    }
    /**
     * @return {?}
     */
    openRightMenu() {
        this.rightMenu.rightMenuVisible.next(true);
    }
    /**
     * @return {?}
     */
    closeBothMenus() {
        this.closeLeftMenu();
        this.closeRightMenu();
    }
    /**
     * @return {?}
     */
    closeLeftMenu() {
        this.leftMenu.leftMenuVisible.next(false);
    }
    /**
     * @return {?}
     */
    closeRightMenu() {
        this.rightMenu.rightMenuVisible.next(false);
    }
    /**
     * @return {?}
     */
    toggleBothMenus() {
        this.toggleLeftMenu();
        this.toggleRightMenu();
    }
    /**
     * @return {?}
     */
    toggleLeftMenu() {
        this.leftMenu.open = !this.leftMenu.leftMenuVisible.value;
    }
    /**
     * @return {?}
     */
    toggleRightMenu() {
        this.rightMenu.open = !this.rightMenu.rightMenuVisible.value;
    }
    /**
     * @param {?=} mode
     * @return {?}
     */
    setBothMenusMode(mode = 'side') {
        this.setLeftMenuMode(mode);
        this.setRightMenuMode(mode);
    }
    /**
     * @param {?=} mode
     * @return {?}
     */
    setLeftMenuMode(mode = 'side') {
        this.leftMenu.leftMenuMode.next(mode);
    }
    /**
     * @param {?=} mode
     * @return {?}
     */
    setRightMenuMode(mode = 'side') {
        this.rightMenu.rightMenuMode.next(mode);
    }
    /**
     * @return {?}
     */
    toggleProgressBar() {
        this.decSidenavService.toggleProgressBar();
    }
    /**
     * @return {?}
     */
    showProgressBar() {
        this.decSidenavService.progressBarVisible.next(true);
    }
    /**
     * @return {?}
     */
    hideProgressBar() {
        this.decSidenavService.progressBarVisible.next(false);
    }
    /**
     * @param {?} openedStatus
     * @return {?}
     */
    leftSidenavOpenedChange(openedStatus) {
        this.leftMenu.open = openedStatus;
        this.leftMenu.leftMenuVisible.next(openedStatus);
    }
    /**
     * @param {?} openedStatus
     * @return {?}
     */
    rightSidenavOpenedChange(openedStatus) {
        this.rightMenu.open = openedStatus;
        this.rightMenu.rightMenuVisible.next(openedStatus);
    }
    /**
     * @return {?}
     */
    detectAndShowChildComponents() {
        this.toolbar.leftMenuTriggerVisible = this.leftMenu ? true : false;
        this.toolbar.rightMenuTriggerVisible = this.rightMenu ? true : false;
    }
    /**
     * @return {?}
     */
    subscribeToToolbarEvents() {
        if (this.toolbar) {
            this.toolbar.toggleLeftMenu.subscribe(() => {
                this.leftSidenav.toggle();
            });
            this.toolbar.toggleRightMenu.subscribe(() => {
                this.rightSidenav.toggle();
            });
        }
    }
    /**
     * @return {?}
     */
    setInitialRightMenuVisibilityModes() {
        this.rightMenu.rightMenuVisible.next(!this.decSidenavService.getSidenavVisibility('rightMenuHidden'));
    }
    /**
     * @return {?}
     */
    setInitialLeftMenuVisibilityModes() {
        this.leftMenu.leftMenuVisible.next(!this.decSidenavService.getSidenavVisibility('leftMenuHidden'));
    }
}
DecSidenavComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav',
                template: `<div class="dec-sidenav-wraper">
  <!-- TOOLBAR -->
  <div *ngIf="toolbar" class="dec-sidenav-toolbar-wrapper" [ngClass]="{'full-screen': !(leftMenu.leftMenuVisible | async)}">
    <ng-content select="dec-sidenav-toolbar"></ng-content>
  </div>
  <!-- / TOOLBAR -->

  <!-- PROGRESS BAR -->
  <div class="progress-bar-wrapper" *ngIf="(decSidenavService.progressBarVisible | async) as progressMessage">
    <div class="progress-bar-message">
      <small *ngIf="progressMessage !== true">{{ progressMessage }}</small>
    </div>
    <mat-progress-bar mode="indeterminate" color="accent"></mat-progress-bar>
  </div>
  <!-- / PROGRESS BAR -->

  <mat-sidenav-container [ngClass]="{'with-toolbar': toolbar, 'full-screen': !(leftMenu.leftMenuVisible | async)}">

    <!-- LEFT MENU -->
    <mat-sidenav *ngIf="leftMenu"
    [mode]="leftMenu.leftMenuMode | async"
    [opened]="leftMenu.leftMenuVisible | async"
    position="start"
    (openedChange)="leftSidenavOpenedChange($event)"
    #leftSidenav>
      <ng-content select="dec-sidenav-menu-left"></ng-content>
    </mat-sidenav>
    <!-- / LEFT MENU -->

    <!-- CONTENT -->
    <ng-content select="dec-sidenav-content"></ng-content>
    <!-- / CONTENT -->

    <!-- RIGHT MENU -->
    <mat-sidenav *ngIf="rightMenu"
    [mode]="rightMenu.rightMenuMode | async"
    [opened]="rightMenu.rightMenuVisible | async"
    position="end"
    (openedChange)="rightSidenavOpenedChange($event)"
    #rightSidenav>
      <ng-content select="dec-sidenav-menu-right"></ng-content>
    </mat-sidenav>
    <!-- / RIGHT MENU -->

  </mat-sidenav-container>

</div>
`,
                styles: [`.dec-sidenav-wraper .dec-sidenav-toolbar-wrapper{min-width:1200px}.dec-sidenav-wraper .dec-sidenav-toolbar-wrapper.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container{min-width:1200px;height:100vh}.dec-sidenav-wraper .mat-sidenav-container.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 64px)}.dec-sidenav-wraper .mat-sidenav-container .mat-sidenav{width:256px}.dec-sidenav-wraper .progress-bar-wrapper{position:fixed;top:48px;left:0;width:100%;z-index:2;text-align:center}.dec-sidenav-wraper .progress-bar-wrapper .progress-bar-message{height:16px}@media screen and (max-width:1199px){.dec-sidenav-wraper .mat-sidenav-container{height:calc(100vh - 16px)}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 80px)}}@media (max-width:599px){.dec-sidenav-wraper .progress-bar-wrapper{top:40px}}`]
            },] },
];
/** @nocollapse */
DecSidenavComponent.ctorParameters = () => [
    { type: DecSidenavService }
];
DecSidenavComponent.propDecorators = {
    toolbar: [{ type: ContentChild, args: [DecSidenavToolbarComponent,] }],
    leftMenu: [{ type: ContentChild, args: [DecSidenavMenuLeftComponent,] }],
    rightMenu: [{ type: ContentChild, args: [DecSidenavMenuRightComponent,] }],
    leftSidenav: [{ type: ViewChild, args: ['leftSidenav',] }],
    rightSidenav: [{ type: ViewChild, args: ['rightSidenav',] }],
    loading: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdEcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDekcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBc0R0RCxNQUFNOzs7O0lBOENKLFlBQ1M7UUFBQSxzQkFBaUIsR0FBakIsaUJBQWlCO0tBQ3RCOzs7OztJQTVDSixJQUNJLFFBQVEsQ0FBQyxDQUE4QjtRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7U0FDMUM7S0FDRjs7OztJQUNELElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7OztJQUVELElBQ0ksU0FBUyxDQUFDLENBQStCO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztTQUMzQztLQUNGOzs7O0lBQ0QsSUFBSSxTQUFT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QUFlLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7OztZQW5OdEcsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBK0NYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLDYzQkFBNjNCLENBQUM7YUFDeDRCOzs7O1lBckRRLGlCQUFpQjs7O3NCQXdEdkIsWUFBWSxTQUFDLDBCQUEwQjt1QkFFdkMsWUFBWSxTQUFDLDJCQUEyQjt3QkFXeEMsWUFBWSxTQUFDLDRCQUE0QjswQkFXekMsU0FBUyxTQUFDLGFBQWE7MkJBRXZCLFNBQVMsU0FBQyxjQUFjO3NCQU14QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ29udGVudENoaWxkLCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1yaWdodC9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRTaWRlbmF2IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjLXNpZGVuYXYtd3JhcGVyXCI+XG4gIDwhLS0gVE9PTEJBUiAtLT5cbiAgPGRpdiAqbmdJZj1cInRvb2xiYXJcIiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXItd3JhcHBlclwiIFtuZ0NsYXNzXT1cInsnZnVsbC1zY3JlZW4nOiAhKGxlZnRNZW51LmxlZnRNZW51VmlzaWJsZSB8IGFzeW5jKX1cIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi10b29sYmFyXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbiAgPCEtLSAvIFRPT0xCQVIgLS0+XG5cbiAgPCEtLSBQUk9HUkVTUyBCQVIgLS0+XG4gIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXItd3JhcHBlclwiICpuZ0lmPVwiKGRlY1NpZGVuYXZTZXJ2aWNlLnByb2dyZXNzQmFyVmlzaWJsZSB8IGFzeW5jKSBhcyBwcm9ncmVzc01lc3NhZ2VcIj5cbiAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyLW1lc3NhZ2VcIj5cbiAgICAgIDxzbWFsbCAqbmdJZj1cInByb2dyZXNzTWVzc2FnZSAhPT0gdHJ1ZVwiPnt7IHByb2dyZXNzTWVzc2FnZSB9fTwvc21hbGw+XG4gICAgPC9kaXY+XG4gICAgPG1hdC1wcm9ncmVzcy1iYXIgbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBjb2xvcj1cImFjY2VudFwiPjwvbWF0LXByb2dyZXNzLWJhcj5cbiAgPC9kaXY+XG4gIDwhLS0gLyBQUk9HUkVTUyBCQVIgLS0+XG5cbiAgPG1hdC1zaWRlbmF2LWNvbnRhaW5lciBbbmdDbGFzc109XCJ7J3dpdGgtdG9vbGJhcic6IHRvb2xiYXIsICdmdWxsLXNjcmVlbic6ICEobGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmMpfVwiPlxuXG4gICAgPCEtLSBMRUZUIE1FTlUgLS0+XG4gICAgPG1hdC1zaWRlbmF2ICpuZ0lmPVwibGVmdE1lbnVcIlxuICAgIFttb2RlXT1cImxlZnRNZW51LmxlZnRNZW51TW9kZSB8IGFzeW5jXCJcbiAgICBbb3BlbmVkXT1cImxlZnRNZW51LmxlZnRNZW51VmlzaWJsZSB8IGFzeW5jXCJcbiAgICBwb3NpdGlvbj1cInN0YXJ0XCJcbiAgICAob3BlbmVkQ2hhbmdlKT1cImxlZnRTaWRlbmF2T3BlbmVkQ2hhbmdlKCRldmVudClcIlxuICAgICNsZWZ0U2lkZW5hdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LW1lbnUtbGVmdFwiPjwvbmctY29udGVudD5cbiAgICA8L21hdC1zaWRlbmF2PlxuICAgIDwhLS0gLyBMRUZUIE1FTlUgLS0+XG5cbiAgICA8IS0tIENPTlRFTlQgLS0+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICA8IS0tIC8gQ09OVEVOVCAtLT5cblxuICAgIDwhLS0gUklHSFQgTUVOVSAtLT5cbiAgICA8bWF0LXNpZGVuYXYgKm5nSWY9XCJyaWdodE1lbnVcIlxuICAgIFttb2RlXT1cInJpZ2h0TWVudS5yaWdodE1lbnVNb2RlIHwgYXN5bmNcIlxuICAgIFtvcGVuZWRdPVwicmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUgfCBhc3luY1wiXG4gICAgcG9zaXRpb249XCJlbmRcIlxuICAgIChvcGVuZWRDaGFuZ2UpPVwicmlnaHRTaWRlbmF2T3BlbmVkQ2hhbmdlKCRldmVudClcIlxuICAgICNyaWdodFNpZGVuYXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1tZW51LXJpZ2h0XCI+PC9uZy1jb250ZW50PlxuICAgIDwvbWF0LXNpZGVuYXY+XG4gICAgPCEtLSAvIFJJR0hUIE1FTlUgLS0+XG5cbiAgPC9tYXQtc2lkZW5hdi1jb250YWluZXI+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi13cmFwZXIgLmRlYy1zaWRlbmF2LXRvb2xiYXItd3JhcHBlcnttaW4td2lkdGg6MTIwMHB4fS5kZWMtc2lkZW5hdi13cmFwZXIgLmRlYy1zaWRlbmF2LXRvb2xiYXItd3JhcHBlci5mdWxsLXNjcmVlbnttaW4td2lkdGg6OTQ0cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVye21pbi13aWR0aDoxMjAwcHg7aGVpZ2h0OjEwMHZofS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lci5mdWxsLXNjcmVlbnttaW4td2lkdGg6OTQ0cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLndpdGgtdG9vbGJhcntoZWlnaHQ6Y2FsYygxMDB2aCAtIDY0cHgpfS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lciAubWF0LXNpZGVuYXZ7d2lkdGg6MjU2cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAucHJvZ3Jlc3MtYmFyLXdyYXBwZXJ7cG9zaXRpb246Zml4ZWQ7dG9wOjQ4cHg7bGVmdDowO3dpZHRoOjEwMCU7ei1pbmRleDoyO3RleHQtYWxpZ246Y2VudGVyfS5kZWMtc2lkZW5hdi13cmFwZXIgLnByb2dyZXNzLWJhci13cmFwcGVyIC5wcm9ncmVzcy1iYXItbWVzc2FnZXtoZWlnaHQ6MTZweH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjExOTlweCl7LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVye2hlaWdodDpjYWxjKDEwMHZoIC0gMTZweCl9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLndpdGgtdG9vbGJhcntoZWlnaHQ6Y2FsYygxMDB2aCAtIDgwcHgpfX1AbWVkaWEgKG1heC13aWR0aDo1OTlweCl7LmRlYy1zaWRlbmF2LXdyYXBlciAucHJvZ3Jlc3MtYmFyLXdyYXBwZXJ7dG9wOjQwcHh9fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50KSB0b29sYmFyOiBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudClcbiAgc2V0IGxlZnRNZW51KHY6IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCkge1xuICAgIHRoaXMuX2xlZnRNZW51ID0gdjtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5zZXRJbml0aWFsTGVmdE1lbnVWaXNpYmlsaXR5TW9kZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGxlZnRNZW51KCkge1xuICAgIHJldHVybiB0aGlzLl9sZWZ0TWVudTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudClcbiAgc2V0IHJpZ2h0TWVudSh2OiBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5fcmlnaHRNZW51ID0gdjtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5zZXRJbml0aWFsUmlnaHRNZW51VmlzaWJpbGl0eU1vZGVzKCk7XG4gICAgfVxuICB9XG4gIGdldCByaWdodE1lbnUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JpZ2h0TWVudTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2xlZnRTaWRlbmF2JykgbGVmdFNpZGVuYXY6IE1hdFNpZGVuYXY7XG5cbiAgQFZpZXdDaGlsZCgncmlnaHRTaWRlbmF2JykgcmlnaHRTaWRlbmF2OiBNYXRTaWRlbmF2O1xuXG4gIHByaXZhdGUgX2xlZnRNZW51OiBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBfcmlnaHRNZW51OiBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBsb2FkaW5nKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuZGVjU2lkZW5hdlNlcnZpY2UucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2UucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2UucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZGV0ZWN0QW5kU2hvd0NoaWxkQ29tcG9uZW50cygpO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Ub29sYmFyRXZlbnRzKCk7XG4gIH1cblxuICAvLyBBUEkgLy9cbiAgb3BlbkJvdGhNZW51cygpIHtcbiAgICB0aGlzLm9wZW5MZWZ0TWVudSgpO1xuICAgIHRoaXMub3BlblJpZ2h0TWVudSgpO1xuICB9XG5cbiAgb3BlbkxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBvcGVuUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGNsb3NlQm90aE1lbnVzKCkge1xuICAgIHRoaXMuY2xvc2VMZWZ0TWVudSgpO1xuICAgIHRoaXMuY2xvc2VSaWdodE1lbnUoKTtcbiAgfVxuXG4gIGNsb3NlTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICBjbG9zZVJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgdG9nZ2xlQm90aE1lbnVzKCkge1xuICAgIHRoaXMudG9nZ2xlTGVmdE1lbnUoKTtcbiAgICB0aGlzLnRvZ2dsZVJpZ2h0TWVudSgpO1xuICB9XG5cbiAgdG9nZ2xlTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5vcGVuID0gIXRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgdG9nZ2xlUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51Lm9wZW4gPSAhdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIHNldEJvdGhNZW51c01vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5zZXRMZWZ0TWVudU1vZGUobW9kZSk7XG4gICAgdGhpcy5zZXRSaWdodE1lbnVNb2RlKG1vZGUpO1xuICB9XG5cbiAgc2V0TGVmdE1lbnVNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVNb2RlLm5leHQobW9kZSk7XG4gIH1cblxuICBzZXRSaWdodE1lbnVNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudU1vZGUubmV4dChtb2RlKTtcbiAgfVxuXG4gIHRvZ2dsZVByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2UudG9nZ2xlUHJvZ3Jlc3NCYXIoKTtcbiAgfVxuXG4gIHNob3dQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgaGlkZVByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2UucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgbGVmdFNpZGVuYXZPcGVuZWRDaGFuZ2Uob3BlbmVkU3RhdHVzKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5vcGVuID0gb3BlbmVkU3RhdHVzO1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQob3BlbmVkU3RhdHVzKTtcbiAgfVxuXG4gIHJpZ2h0U2lkZW5hdk9wZW5lZENoYW5nZShvcGVuZWRTdGF0dXMpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5vcGVuID0gb3BlbmVkU3RhdHVzO1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dChvcGVuZWRTdGF0dXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RBbmRTaG93Q2hpbGRDb21wb25lbnRzKCkge1xuXG4gICAgdGhpcy50b29sYmFyLmxlZnRNZW51VHJpZ2dlclZpc2libGUgPSB0aGlzLmxlZnRNZW51ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy50b29sYmFyLnJpZ2h0TWVudVRyaWdnZXJWaXNpYmxlID0gdGhpcy5yaWdodE1lbnUgPyB0cnVlIDogZmFsc2U7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Ub29sYmFyRXZlbnRzKCkge1xuXG4gICAgaWYgKHRoaXMudG9vbGJhcikge1xuXG4gICAgICB0aGlzLnRvb2xiYXIudG9nZ2xlTGVmdE1lbnUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5sZWZ0U2lkZW5hdi50b2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRvb2xiYXIudG9nZ2xlUmlnaHRNZW51LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmlnaHRTaWRlbmF2LnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbFJpZ2h0TWVudVZpc2liaWxpdHlNb2RlcygpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQoIXRoaXMuZGVjU2lkZW5hdlNlcnZpY2UuZ2V0U2lkZW5hdlZpc2liaWxpdHkoJ3JpZ2h0TWVudUhpZGRlbicpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbExlZnRNZW51VmlzaWJpbGl0eU1vZGVzKCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQoIXRoaXMuZGVjU2lkZW5hdlNlcnZpY2UuZ2V0U2lkZW5hdlZpc2liaWxpdHkoJ2xlZnRNZW51SGlkZGVuJykpO1xuICB9XG5cbn1cbiJdfQ==