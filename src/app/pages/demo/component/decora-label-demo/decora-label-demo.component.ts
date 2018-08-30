import { Component } from '@angular/core';

@Component({
  selector: 'app-decora-label-demo',
  templateUrl: './decora-label-demo.component.html',
  styleUrls: ['./decora-label-demo.component.scss']
})
export class DecoraLabelDemoComponent {

  stretched: boolean;

  constructor() {
    this.stretched = true;
  }

}
