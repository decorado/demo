import { Component, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from 'events';

export class DecSectionScrollingStyle {
  behavior: 'auto' | 'smooth';
  block: 'start' | 'center' | 'end' | 'center';
  inline: 'start' | 'center' | 'end' | 'center';

  constructor(data: any = {}) {
    this.behavior = data.behavior || 'smooth';
    this.block = data.block || 'center';
    this.inline = data.inline || 'center';
  }
}

/** @description Dec List Table Column.
 *  @param data Property to be used to passa data along the view (like is the section content is valid so the navigator can point out this info)
 *  @param name: The name of the section.
 *  @event navigated: Event emitted when navigated to the section
 *  @method scrollIntoView Scrolls the view to the element based on https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
 */
@Component({
  selector: 'dec-section',
  templateUrl: './dec-section.component.html',
  styleUrls: ['./dec-section.component.scss']
})
export class DecSectionComponent {

  @Input() data: any;

  @Input() component: any;

  @Input() scrollingStyle = new DecSectionScrollingStyle();

  @Input() name: string;

  @Output() navigated = new EventEmitter();

  @ViewChild('decSectionElement') decSectionElement: ElementRef;

  constructor() { }

  scrollIntoView(scrollingStyle?: DecSectionScrollingStyle) {

    const parsedConfig = scrollingStyle ? new DecSectionScrollingStyle(scrollingStyle) : this.scrollingStyle;

    const element = this.decSectionElement.nativeElement;

    try {

      element.scrollIntoView(parsedConfig);

    } catch (error) { // fallback to browsers that not support full configuration

      element.scrollIntoView(true);

    }

  }

}
