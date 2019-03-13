import { Injectable } from '@angular/core';
import { DEC_COLOR_BY_STATUS } from './../../enums/dec-status-colors.map';

@Injectable()
export class DecColorService {

  constructor() { }

  getStatusColor(status: string) {
    return DEC_COLOR_BY_STATUS[status] || DEC_COLOR_BY_STATUS.DEFAULT;
  }

  rgbToHex(r, g, b) {
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  }

  hexToRgb(hex, formated = false) {
    const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
    return formated ? `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` : rgb;
  }

  rgbArrayToLinearArray (rgbArray) { // used to change colors in Sketchfab
    return rgbArray.map(subcolor => {
      return this.rgbToLinear(subcolor);
    });
  }

  public rgbToLinear (c) {
    const proportion = c / 255;
    const gamma = 2.4;
    let v = 0.0;
    if (proportion < 0.04045) {
      if (proportion >= 0.0) {
        v = proportion * (1.0 / 12.92);
      }
    } else {
      v = Math.pow((proportion + 0.055) * (1.0 / 1.055), gamma);
    }
    return v;
  }
}
