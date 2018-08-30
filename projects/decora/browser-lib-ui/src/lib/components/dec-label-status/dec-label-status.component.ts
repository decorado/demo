import { Component, Input } from '@angular/core';
import { DecStatusColorService } from './../../services/status-color/dec-status-color.service';

@Component({
  selector: 'dec-label-status',
  templateUrl: './dec-label-status.component.html',
  styleUrls: ['./dec-label-status.component.scss']
})
export class DecLabelStatusComponent {

  @Input()
  set status(v: string) {
    if (v !== this._status) {
      this.statusColor = this.decStatusColorService.getStatusColor(v);
    }
  }

  get status() {
    return this._status;
  }

  @Input() stretched?: boolean;

  private _status: string;

  statusColor: string;

  constructor(public decStatusColorService: DecStatusColorService) { }

}
