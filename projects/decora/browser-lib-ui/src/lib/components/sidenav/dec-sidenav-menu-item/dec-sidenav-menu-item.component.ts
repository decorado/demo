import { Component, ViewChild, TemplateRef, ContentChildren, QueryList, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dec-sidenav-menu-item',
  templateUrl: './dec-sidenav-menu-item.component.html',
  styleUrls: ['./dec-sidenav-menu-item.component.scss']
})
export class DecSidenavMenuItemComponent implements AfterViewInit {

  @Input() routerLink;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @ContentChildren(DecSidenavMenuItemComponent, {descendants: false}) _subitems: QueryList<DecSidenavMenuItemComponent>;

  @Output() toggle = new EventEmitter();

  started;

  showSubmenu = false;

  constructor(
    private router: Router
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.started = true;
    }, 1);
  }

  get subitems() {
    const subitems = this._subitems.toArray();
    subitems.splice(0, 1); // removes itself
    return subitems;
  }

  toggleSubmenu() {
    this.showSubmenu = !this.showSubmenu;
    this.toggle.emit(this.showSubmenu);
  }

  closeSubmenu() {
    this.showSubmenu = false;
  }

  openLink() {
    if (this.routerLink) {
      if (typeof this.routerLink === 'string') {
        const isNaked = this.routerLink.startsWith('//');
        const isHttp = this.routerLink.startsWith('http://');
        const isHttps = this.routerLink.startsWith('https://');
        if (isNaked || isHttp || isHttps) {
          window.location.href = this.routerLink;
        } else {
          this.router.navigate([this.routerLink]);
        }
      } else if (Array.isArray(this.routerLink)) {
        this.router.navigate(this.routerLink);
      }
    }
  }

  getBackground(treeLevel) {
    return this.checkIfActive() ? 'mat-list-item-active' : 'mat-list-item-' + treeLevel;
  }

  checkIfActive() {
    if (this.isActive) {
      return true;
    } else if (this.showSubmenu) {
      return false;
    } else {
      const hasActiveChild = this.hasActiveChild;
      return hasActiveChild;
    }
  }

  protected get hasActiveChild() {
    if (!this.subitems) {
      return false;
    } else {
      return this.subitems.reduce((lastValue, item) => {
        return lastValue || item.isActive || item.hasActiveChild;
      }, false);
    }
  }

  protected get isActive() {
    return this.routerLink === window.location.pathname;
  }

}
