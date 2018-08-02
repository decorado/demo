import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-sidenav-menu',
  templateUrl: './dec-sidenav-menu.component.html',
  styleUrls: ['./dec-sidenav-menu.component.scss']
})
export class DecSidenavMenuComponent {

  @Input() items = [];

  @Input() treeLevel = -1;

  constructor() { }

}
