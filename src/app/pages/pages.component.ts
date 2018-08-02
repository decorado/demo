import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { Permissions } from '@app/shared/permissions.constants';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  permissions = Permissions;

  progressBarVisible = false;
  leftMenuVisible = true;
  rightMenuVisible = false;
  leftMenuMode = 'side';
  rightMenuMode = 'push';

  environment = environment;

  constructor() {
  }

  ngOnInit() {
  }

}
