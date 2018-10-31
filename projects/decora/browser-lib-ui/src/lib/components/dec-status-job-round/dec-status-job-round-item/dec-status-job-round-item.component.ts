import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-status-job-round-item',
  templateUrl: './dec-status-job-round-item.component.html',
  styleUrls: ['./dec-status-job-round-item.component.scss']
})
export class DecStatusJobRoundItemComponent {

  countdown: any;

  private _readonly: boolean;
  public get readonly(): boolean {
    return this._readonly;
  }
  @Input()
  public set readonly(v: boolean) {
    this._readonly = v;
  }

  @Input()
  showQaStatus: boolean;

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
