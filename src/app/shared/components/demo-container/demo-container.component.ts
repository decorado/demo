import { Component, OnInit, Input } from '@angular/core';
import { environment } from '@env/environment';

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

  @Input() destroyOnBlur = false;

  @Input() readmeSrc = '';

  @Input() name = 'DemoContainer';

  @Input() activeTab;

  constructor() {}

  ngOnInit() {}

  get readmePath() {

    return `${environment.basePath}${this.readmeSrc}`;

  }

}
