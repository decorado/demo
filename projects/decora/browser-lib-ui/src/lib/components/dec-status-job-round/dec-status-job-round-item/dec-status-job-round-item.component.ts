import { Component, Input} from '@angular/core';

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

  noInfos = [
    'PROFESSIONAL_CANCELED',
    'CORA_CANCELED',
    'DELETED',
    'TIME_EXPIRED'
  ]
  private _showReportedError: boolean;
  public get showReportedError(): boolean {
    return this._showReportedError;
  }
  @Input()
  public set showReportedError(v: boolean) {
    this._showReportedError = v;
  }


  constructor() { }

  toggleNegative() {
    this.negativeQA = true;
  }

  getDevInterval() {
    const now = new Date();
    const roundEnd = new Date(this.round.end);
    let diff = (roundEnd.getTime() - now.getTime()) / 1000;
    if (diff < 0) {
      const div = document.getElementById('devCountDown');
      div.classList.add('red-qa');
    }
    return parseInt(diff.toString().split('.')[0]);
  }

  getFinishQA() {
    if (this.round && this.round.qualityAssurance.lastCheck) {
      return this.round.qualityAssurance.lastCheck.finish;
    }
    return this.round.qualityAssurance.finish;
  }

  noShowInfos(status) {
    const exists = this.noInfos.find(s => s === status);
    if (exists) {
      return true;
    }
    return false;
  }

}
