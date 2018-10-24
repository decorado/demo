import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-job-round-item',
  templateUrl: './dec-job-round-item.component.html',
  styleUrls: ['./dec-job-round-item.component.scss']
})
export class DecJobRoundItemComponent {

  countdown: any;

  @Input()
  set round(v) {
    if (v) {
      if (v.status !== 'DENIED' && 'APPROVED') {
        v.status = 'IN_QA';
      }
      this._round = v;
    }
  }

  get round() {
    return this._round;
  }

  @Input() roundQnt: number;
  @Input() roundNumber: number;
  @Input() jobId: any;

  private _round;
  negativeQA = false;

  constructor() { }

  toggleNegative() {
    this.negativeQA = true;
  }

}
