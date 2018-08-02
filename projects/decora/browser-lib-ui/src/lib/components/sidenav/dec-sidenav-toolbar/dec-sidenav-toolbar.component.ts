import {Component, Input, Output, EventEmitter, ContentChild, AfterViewInit, OnInit} from '@angular/core';
import { DecSidenavToolbarTitleComponent } from './../dec-sidenav-toolbar-title/dec-sidenav-toolbar-title.component';

@Component({
  selector: 'dec-sidenav-toolbar',
  templateUrl: './dec-sidenav-toolbar.component.html',
  styleUrls: ['./dec-sidenav-toolbar.component.scss']
})
export class DecSidenavToolbarComponent implements AfterViewInit, OnInit {

  initialized;

  notProduction = true;
  ribbon = '';
  label = '';

  @Input() color;

  @Input() environment;

  @Input() leftMenuTriggerVisible = true;

  @Input() rightMenuTriggerVisible = true;

  @Output() toggleLeftMenu: EventEmitter<any> = new EventEmitter<any>();

  @Output() toggleRightMenu: EventEmitter<any> = new EventEmitter<any>();

  @ContentChild(DecSidenavToolbarTitleComponent) customTitle: DecSidenavToolbarTitleComponent;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;
    }, 1);
  }

  ngOnInit(): void {
    if (this.environment === 'local') {
      this.ribbon = 'ribbon-green';
      this.label = 'label.local';
    } else if (this.environment === 'development') {
      this.ribbon = 'ribbon-blue';
      this.label = 'label.development';
    } else if (this.environment === 'qa') {
      this.ribbon = 'ribbon-red';
      this.label = 'label.qa';
    } else if (this.environment === 'active') {
      this.ribbon = 'ribbon-green';
      this.label = 'label.active';
    } else {
      this.notProduction = false;
      this.ribbon = 'ribbon-hidden';
    }
  }
}
