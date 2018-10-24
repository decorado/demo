import { Injectable } from '@angular/core';
import { DEC_COLOR_BY_STATUS } from './dec-colors.map';

@Injectable()
export class DecColorService {

  constructor() { }

  public getStatusColor(status: string) {
    return DEC_COLOR_BY_STATUS[status] || DEC_COLOR_BY_STATUS.DEFAULT;
  }

  public rgbToHex(r, g, b) {
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  }

  public hexToRgb(hex, formated = false) {
    const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
    return formated ? `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` : rgb;
  }

}
