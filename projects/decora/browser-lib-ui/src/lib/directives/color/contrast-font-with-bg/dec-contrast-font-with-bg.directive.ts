import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { DEC_COLORS } from './../../../enums/dec-colors.map';
import { Subscription, timer } from 'rxjs';

/**
 * Cotrast configuration
 *
 * Used to define some custom configuration as colors and breakpoint
 */
export interface DecContrastFontWithBgDirectiveConfig {
  lumaBreakPoint: string;
  lightColor: string;
  darkColor: string;
}

const DEFAULT_LUMA_BREAKPOINT = 195;

const ColorsMap: {[key: string]: string} = {};

/*
* Contrast Font With Background Directive
*
* Contrasts the text color with the background-color to avoid white color in ligh background and black color in darken ones.
* It can be used as attribute in any element with or without passing custom configuration
* Example without custom configuration: <div decContrastFontWithBg"></div>
* Example with custom configuration: <div [decContrastFontWithBg]="{darkColor: 'red'}"></div>
*
* Configuration params:
* lumaBreakPoint: the point where we should change the font color. This is the ligth feeling breakpoint.
* lightColor: the text color used in dark backgrounds
* darkColor: the text color used in ligth backgrounds
*/

export function hexToRgb(hex) {

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function anyToHex(bgColor = DEC_COLORS.CHARCOAL) {

  const isRgb = bgColor.search('rgb');

  if (!isRgb) {

    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgColor;

    return ctx.fillStyle;

  } else {

    return bgColor;

  }

}


@Directive({
  selector: '[decContrastFontWithBg]'
})
export class DecContrastFontWithBgDirective implements OnDestroy {

  private config;

  private bgColor;

  private changesSubscription: Subscription;

  @Input() set decContrastFontWithBg(config: DecContrastFontWithBgDirectiveConfig) {
    this.config = config;
  }

  constructor(private el: ElementRef) {
    this.subscribeToChanges();
  }

  ngOnDestroy() {
    this.unsubscribeToChanges();
  }

  private doDecContrastFontWithBg() {

    const lumaBreakPoint = (this.config && this.config.lumaBreakPoint) ? this.config.lumaBreakPoint : DEFAULT_LUMA_BREAKPOINT;

    const hexaBgColor = anyToHex(this.bgColor);

    const rgbColor = hexToRgb(hexaBgColor);

    const luma = 0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b; // per ITU-R BT.709

    let color: string;

    if (luma < lumaBreakPoint) {

      color = (this.config && this.config.lightColor) ? this.config.lightColor : DEC_COLORS.WHITE;

    } else {

      color = (this.config && this.config.darkColor) ? this.config.darkColor : DEC_COLORS.CHARCOAL;

    }

    this.setElementColor(color);

  }

  private getElementBgColor = () => {

    const element = this.el.nativeElement;

    const elementStyles = getComputedStyle(element);

    const bgColor = elementStyles.backgroundColor;

    if (this.bgColor !== bgColor) {

      this.bgColor = bgColor;

      const mappedColor = ColorsMap[this.bgColor];

      if (mappedColor) {

        this.setElementColor(mappedColor);

      } else {

        this.doDecContrastFontWithBg();

      }

    }

  }

  private setElementColor(color) {

    ColorsMap[this.bgColor] = color;

    this.el.nativeElement.style.color = color;

  }

  private subscribeToChanges() {

    this.changesSubscription = timer(100, 500)
    .subscribe(this.getElementBgColor);

  }

  private unsubscribeToChanges() {
    this.changesSubscription.unsubscribe();
  }
}


