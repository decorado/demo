import { Component, OnInit } from '@angular/core';
import { Permissions } from '@app/shared/permissions.constants';
import { DecConfigurationService } from '@projects/decora/browser-lib-ui/src/public_api';

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
  profile;

  constructor(
    private configService: DecConfigurationService
  ) {
    this.profile = this.configService.profile;
  }

  ngOnInit() {
  }

}
