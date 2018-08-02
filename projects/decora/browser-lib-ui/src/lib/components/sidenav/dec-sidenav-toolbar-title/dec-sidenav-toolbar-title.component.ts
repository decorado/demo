import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-sidenav-toolbar-title',
  templateUrl: './dec-sidenav-toolbar-title.component.html',
  styleUrls: ['./dec-sidenav-toolbar-title.component.scss']
})
export class DecSidenavToolbarTitleComponent implements OnInit {

  @Input() routerLink;

  constructor() { }

  ngOnInit() {
  }

}
