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

  @Input()
  set job(v) {
    if (v) {
      if (v.rounds.length > 1) {
        v.rounds[0].status = 'DENIED';
        if (v.rounds.length > 2) {
          v.rounds[1].status = 'DENIED';
        }
      }
      this._job = v;
    }
  }

  get job() {
    return this._job;
  }

  private _job;
  roundsQnt = 3;

  constructor() { }

  ngOnInit() {
  }
}
