import { Component, OnInit } from '@angular/core';
import { DecConfigurationService } from '@projects/decora/browser-lib-ui/src/public_api';

@Component({
  selector: 'app-decora-tabs-demo',
  templateUrl: './decora-tabs-demo.component.html',
  styleUrls: ['./decora-tabs-demo.component.css']
})
export class DecoraTabsDemoComponent implements OnInit {

  baseHref;

  activeTab = 'tab-2';

  activeTab2;

  constructor(private decConfig: DecConfigurationService) {
    this.baseHref = this.decConfig.config.host;
  }

  ngOnInit() {
  }

}
