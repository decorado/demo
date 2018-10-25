import { Component, Input, ContentChild, AfterViewInit, ViewChild } from '@angular/core';
import { DecSidenavToolbarComponent } from './dec-sidenav-toolbar/dec-sidenav-toolbar.component';
import { DecSidenavMenuLeftComponent } from './dec-sidenav-menu-left/dec-sidenav-menu-left.component';
import { DecSidenavMenuRightComponent } from './dec-sidenav-menu-right/dec-sidenav-menu-right.component';
import { MatSidenav } from '@angular/material';
import { DecSidenavService } from './sidenav.service';

@Component({
  selector: 'dec-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class DecSidenavComponent implements AfterViewInit {

  @ContentChild(DecSidenavToolbarComponent) toolbar: DecSidenavToolbarComponent;

  @ContentChild(DecSidenavMenuLeftComponent)
  set leftMenu(v: DecSidenavMenuLeftComponent) {
    this._leftMenu = v;
    if (v) {
      this.setInitialLeftMenuVisibilityModes();
    }
  }
  get leftMenu() {
    return this._leftMenu;
  }

  @ContentChild(DecSidenavMenuRightComponent)
  set rightMenu(v: DecSidenavMenuRightComponent) {
    this._rightMenu = v;
    if (v) {
      this.setInitialRightMenuVisibilityModes();
    }
  }
  get rightMenu() {
    return this._rightMenu;
  }

  @ViewChild('leftSidenav') leftSidenav: MatSidenav;

  @ViewChild('rightSidenav') rightSidenav: MatSidenav;

  private _leftMenu: DecSidenavMenuLeftComponent;

  private _rightMenu: DecSidenavMenuRightComponent;

  @Input()
  set loading(v: any) {
    const currentValue = this.decSidenavService.progressBarVisible.value;
    if (v !== currentValue) {
      this.decSidenavService.progressBarVisible.next(v);
    }
  }

  get loading() {
    return this.decSidenavService.progressBarVisible.value;
  }

  constructor(
    public decSidenavService: DecSidenavService
  ) {}

  ngAfterViewInit() {
    this.detectAndShowChildComponents();
    this.subscribeToToolbarEvents();
    this.setToolbarLoadingState();
  }

  // API //
  openBothMenus() {
    this.openLeftMenu();
    this.openRightMenu();
  }

  openLeftMenu() {
    this.leftMenu.leftMenuVisible.next(true);
  }

  openRightMenu() {
    this.rightMenu.rightMenuVisible.next(true);
  }

  closeBothMenus() {
    this.closeLeftMenu();
    this.closeRightMenu();
  }

  closeLeftMenu() {
    this.leftMenu.leftMenuVisible.next(false);
  }

  closeRightMenu() {
    this.rightMenu.rightMenuVisible.next(false);
  }

  toggleBothMenus() {
    this.toggleLeftMenu();
    this.toggleRightMenu();
  }

  toggleLeftMenu() {
    this.leftMenu.open = !this.leftMenu.leftMenuVisible.value;
  }

  toggleRightMenu() {
    this.rightMenu.open = !this.rightMenu.rightMenuVisible.value;
  }

  setBothMenusMode(mode: 'over' | 'push' | 'side' = 'side') {
    this.setLeftMenuMode(mode);
    this.setRightMenuMode(mode);
  }

  setLeftMenuMode(mode: 'over' | 'push' | 'side' = 'side') {
    this.leftMenu.leftMenuMode.next(mode);
  }

  setRightMenuMode(mode: 'over' | 'push' | 'side' = 'side') {
    this.rightMenu.rightMenuMode.next(mode);
  }

  toggleProgressBar() {
    this.decSidenavService.toggleProgressBar();
  }

  showProgressBar() {
    this.decSidenavService.progressBarVisible.next(true);
  }

  hideProgressBar() {
    this.decSidenavService.progressBarVisible.next(false);
  }

  leftSidenavOpenedChange(openedStatus) {
    this.leftMenu.open = openedStatus;
    this.leftMenu.leftMenuVisible.next(openedStatus);
  }

  rightSidenavOpenedChange(openedStatus) {
    this.rightMenu.open = openedStatus;
    this.rightMenu.rightMenuVisible.next(openedStatus);
  }

  private detectAndShowChildComponents() {

    this.toolbar.leftMenuTriggerVisible = this.leftMenu ? true : false;

    this.toolbar.rightMenuTriggerVisible = this.rightMenu ? true : false;

  }

  private subscribeToToolbarEvents() {

    if (this.toolbar) {

      this.toolbar.toggleLeftMenu.subscribe(() => {
        this.leftSidenav.toggle();
      });

      this.toolbar.toggleRightMenu.subscribe(() => {
        this.rightSidenav.toggle();
      });

    }

  }

  private setInitialRightMenuVisibilityModes() {
    this.rightMenu.rightMenuVisible.next(!this.decSidenavService.getSidenavVisibility('rightMenuHidden'));
  }

  private setInitialLeftMenuVisibilityModes() {
    this.leftMenu.leftMenuVisible.next(!this.decSidenavService.getSidenavVisibility('leftMenuHidden'));
  }

  private setToolbarLoadingState() {
    this.decSidenavService.progressBarVisible.subscribe(state => {
      if (this.toolbar) {
        this.toolbar.progressBarVisible = state;
      }
    });
  }
}
