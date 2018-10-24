import { Component, Input } from '@angular/core';
import { DecColorService } from './../../services/color/dec-color.service';

@Component({
  selector: 'dec-label-status',
  templateUrl: './dec-label-status.component.html',
  styleUrls: ['./dec-label-status.component.scss']
})
export class DecLabelStatusComponent {

  @Input() status: string;

  @Input() stretched: boolean;

  constructor(
    public decColorService: DecColorService
  ) { }

}
