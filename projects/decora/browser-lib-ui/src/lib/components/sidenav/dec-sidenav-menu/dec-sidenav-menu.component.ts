import { Component, Input, HostListener } from '@angular/core';
import { DecSidenavMenuItemComponent } from '../dec-sidenav-menu-item/dec-sidenav-menu-item.component';

@Component({
  selector: 'dec-sidenav-menu',
  templateUrl: './dec-sidenav-menu.component.html',
  styleUrls: ['./dec-sidenav-menu.component.scss']
})
export class DecSidenavMenuComponent {

  @Input() items: DecSidenavMenuItemComponent[] = [];

  @Input()
  set opened(v) {
    if (v !== this._opened) {
      this._opened = v;
      this.leftMenuVisible = JSON.parse(JSON.stringify(v));
    }
  }

  get opened() {
    return this._opened;
  }

  _opened = true;

  leftMenuVisible = true;

  @Input() treeLevel = -1;

  //
  classesOut = [
    'mat-list-item-content',
    'dec-icon',
    'material-icons',
    'item-content',
    'mat-list',
    'mat-drawer-inner-container',
    'dec-sidenav-toolbar-title',
    'dec-logo-toolbar',
    'item-icon-left',
    'item-left-arrow',
    'item-right-arrow',
    'fake-icon',
    'arrow',
    'right',
    'down',
    'arrows-container'
  ]

  classesIn = [
    'menuClass',
    'mat-list-item-content',
    'mat-drawer-inner-container',
    'dec-sidenav-toolbar-title',
    'dec-logo-toolbar',
    'item-icon-left',
    'item-left-arrow',
    'item-right-arrow',
    'fake-icon',
    'arrow',
    'right',
    'down',
    'arrows-container'
  ]

  constructor() { }


  @HostListener('document:mouseover', ['$event'])
  onHover($event) {
    if (!$event) {
      return;
    }
    const el = $event.target;
    if (this.verifyItemContent(el, this.classesIn)&& !this.opened) {
      this.leftMenuVisible = true;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onOut($event) {
    if (!$event) {
      return;
    }
    const el = $event.target;
    // console.log(el.classList);
    if (!this.verifyItemContent(el, this.classesOut) && !this.opened) {
      this.leftMenuVisible = false;
    }
  }

  verifyItemContent(div, array) {
    let exists = false;
    for (let i=0;i<array.length;i++) {
      if (div.classList.contains(array[i])) {
        exists = true;
      }
    }
    return exists;
  }

}
