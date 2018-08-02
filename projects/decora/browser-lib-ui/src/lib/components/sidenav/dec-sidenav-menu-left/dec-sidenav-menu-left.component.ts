import { Component, ContentChildren, QueryList, Input, ContentChild, Output, EventEmitter } from '@angular/core';
import { DecSidenavMenuItemComponent } from './../dec-sidenav-menu-item/dec-sidenav-menu-item.component';
import { DecSidenavMenuTitleComponent } from './../dec-sidenav-menu-title/dec-sidenav-menu-title.component';
import { BehaviorSubject } from 'rxjs';
import { DecSidenavService } from './../sidenav.service';

@Component({
  selector: 'dec-sidenav-menu-left',
  templateUrl: './dec-sidenav-menu-left.component.html',
  styleUrls: ['./dec-sidenav-menu-left.component.scss']
})
export class DecSidenavMenuLeftComponent {

  readonly leftMenuVisible = new BehaviorSubject<boolean>(true);

  readonly leftMenuMode = new BehaviorSubject<string>('side');

  @Input()
  set open(v: any) {
    const currentValue = this.leftMenuVisible.value;
    if (v !== currentValue) {
      this.leftMenuVisible.next(v);
      this.decSidenavService.setSidenavVisibility('leftMenuHidden', !v);
    }
  }

  get open() {
    return this.leftMenuVisible.value;
  }

  @Input()
  set mode(v: any) {
    const currentValue = this.leftMenuMode.value;

    if (v !== currentValue) {
      this.leftMenuMode.next(v);
    }
  }

  get mode() {
    return this.leftMenuMode.value;
  }

  @Input() persistVisibilityMode: boolean;

  @ContentChildren(DecSidenavMenuItemComponent, {descendants: false}) items: QueryList<DecSidenavMenuItemComponent>;

  @ContentChild(DecSidenavMenuTitleComponent) customTitle: DecSidenavMenuTitleComponent;

  @Output() openedChange = new EventEmitter<boolean>();

  @Output() modeChange = new EventEmitter<string>();

  constructor(
    private decSidenavService: DecSidenavService
  ) {
    this.subscribeAndExposeSidenavEvents();
  }

  private subscribeAndExposeSidenavEvents() {

    this.leftMenuVisible.subscribe(value => {
      this.openedChange.emit(value);
    });

    this.leftMenuMode.subscribe(value => {
      this.modeChange.emit(value);
    });

  }

}
