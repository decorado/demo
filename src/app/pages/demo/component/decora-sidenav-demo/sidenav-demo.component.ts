import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-demo',
  templateUrl: './sidenav-demo.component.html',
  styleUrls: ['./sidenav-demo.component.css']
})
export class SidenavDemoComponent implements OnInit {

  progressBarVisible: any;
  leftMenuVisible: any;
  rightMenuVisible: any;
  mainSidenav: any;
  leftMenuMode: any;
  rightMenuMode: any;

  constructor() { }

  ngOnInit() {
  }

}
