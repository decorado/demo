import { Component, ContentChildren, QueryList, Input, ContentChild, Output, EventEmitter } from '@angular/core';
import { DecSidenavMenuItemComponent } from './../dec-sidenav-menu-item/dec-sidenav-menu-item.component';
import { DecSidenavMenuTitleComponent } from './../dec-sidenav-menu-title/dec-sidenav-menu-title.component';
import { BehaviorSubject } from 'rxjs';
import { DecSidenavService } from './../sidenav.service';

@Component({
  selector: 'dec-sidenav-menu-right',
  templateUrl: './dec-sidenav-menu-right.component.html',
  styleUrls: ['./dec-sidenav-menu-right.component.scss']
})
export class DecSidenavMenuRightComponent {

  readonly rightMenuVisible = new BehaviorSubject<boolean>(true);

  readonly rightMenuMode = new BehaviorSubject<string>('side');

  @Input()
  set open(v: any) {
    const currentValue = this.rightMenuVisible.value;

    if (v !== currentValue) {
      this.rightMenuVisible.next(v);
      this.decSidenavService.setSidenavVisibility('rightMenuHidden', !v);
    }
  }

  get open() {
    return this.rightMenuVisible.value;
  }

  @Input()
  set mode(v: any) {
    const currentValue = this.rightMenuMode.value;

    if (v !== currentValue) {
      this.rightMenuMode.next(v);
    }
  }

  get mode() {
    return this.rightMenuMode.value;
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

    this.rightMenuVisible.subscribe(value => {
      this.openedChange.emit(value);
    });

    this.rightMenuMode.subscribe(value => {
      this.modeChange.emit(value);
    });

  }

}
