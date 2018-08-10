import { Component, OnInit, Input } from '@angular/core';
import { DecConfigurationService } from '@projects/decora/browser-lib-ui/src/public_api';

export const TABS = {
  overview: 0,
  examples: 1,
};

@Component({
  selector: 'app-demo-container',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.scss']
})
export class DemoContainerComponent implements OnInit {

  baseHref;

  @Input() readmeSrc = '';

  @Input() name = 'DemoContainer';

  @Input() activeTab;

  constructor(private decConfig: DecConfigurationService) {
    console.log('this.decConfig', this.decConfig);
    this.baseHref = this.decConfig.config.host;
  }

  ngOnInit() {}

}
