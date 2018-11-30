import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-status-job-round',
  templateUrl: './dec-status-job-round.component.html',
  styleUrls: ['./dec-status-job-round.component.scss']
})
export class DecStatusJobRoundComponent implements OnInit {

  private _readonly: boolean;
  public get readonly(): boolean {
    return this._readonly;
  }
  @Input()
  public set readonly(v: boolean) {
    this._readonly = v;
  }

  private _showQaStatus: boolean;
  public get showQaStatus(): boolean {
    return this._showQaStatus;
  }
  @Input()
  public set showQaStatus(v: boolean) {
    this._showQaStatus = v;
  }

  @Input()
  set job(v) {
    if (v) {
      this.roundsQnt = v.rounds.length < 3 ? 3 : v.rounds.length;
      this._job = v;
    }
  }

  public get numberOfActualRound() {
    return this._job.rounds[this._job.rounds.length - 1].number;
  }

  get job() {
    return this._job;
  }

  private _job;
  roundsQnt: number;

  constructor() { }

  ngOnInit() {
  }
}
