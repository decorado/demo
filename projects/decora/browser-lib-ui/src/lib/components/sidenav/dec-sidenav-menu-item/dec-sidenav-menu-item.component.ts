import { Component, ViewChild, TemplateRef, ContentChildren, QueryList, AfterViewInit, Input } from '@angular/core';
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

}
