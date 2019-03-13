import { Component, Input, OnInit } from '@angular/core';
import { DEC_COLORS } from './../../enums/dec-colors.map';

@Component({
  selector: 'dec-label',
  templateUrl: './dec-label.component.html',
  styleUrls: ['./dec-label.component.scss']
})
export class DecLabelComponent {

  @Input() colorClass: string;

  @Input() stretched: boolean;

  @Input()
  get colorHex() { return this._colorHex; }
  set colorHex(v: string) {
    this._colorHex = v;
    this.setBorderToWhiteLabel();
  }

  borderColor;

  private _colorHex: string;

  private setBorderToWhiteLabel() {

    if (this.colorHex === DEC_COLORS.WHITE) {

      this.borderColor = DEC_COLORS.GREY;

    }

  }
}
