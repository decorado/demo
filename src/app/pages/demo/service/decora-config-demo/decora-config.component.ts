import { Component } from '@angular/core';
import { DecConfigurationService } from '@projects/decora/browser-lib-ui/src/public_api';

@Component({
  selector: 'app-decora-config',
  templateUrl: './decora-config.component.html',
  styleUrls: ['./decora-config.component.scss']
})
export class DecConfigurationDemoComponent {

  constructor(
    public decConfig: DecConfigurationService,
  ) {}

}
