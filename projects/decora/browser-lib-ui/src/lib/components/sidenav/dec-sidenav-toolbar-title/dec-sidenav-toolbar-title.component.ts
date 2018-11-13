import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DecSidenavService } from './../../sidenav/sidenav.service';

@Component({
  selector: 'dec-sidenav-toolbar-title',
  templateUrl: './dec-sidenav-toolbar-title.component.html',
  styleUrls: ['./dec-sidenav-toolbar-title.component.scss']
})
export class DecSidenavToolbarTitleComponent implements OnInit {

  @Input() routerLink;

  @Input() openedPass = true;

  opened = true;

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

  constructor(private navService: DecSidenavService) { }

  ngOnInit() {
    setTimeout(() => {
      this.opened = this.navService.getSidenavVisibility('leftMenuHidden');
    }, 0)
  }


  @HostListener('document:mouseover', ['$event'])
  onHover($event) {
    if (!$event) {
      return;
    }
    const el = $event.target;
    if (this.verifyItemContent(el, this.classesIn)&& this.navService.getSidenavVisibility('leftMenuHidden')) {
      this.openedPass = true;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onOut($event) {
    if (!$event) {
      return;
    }
    const el = $event.target;
    if (!this.verifyItemContent(el, this.classesOut) && this.navService.getSidenavVisibility('leftMenuHidden')) {
      this.openedPass = false;
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
