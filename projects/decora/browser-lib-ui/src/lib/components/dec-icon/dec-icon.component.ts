import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'dec-icon',
  templateUrl: './dec-icon.component.html',
  styleUrls: ['./dec-icon.component.scss']
})
export class DecIconComponent implements AfterViewInit {

  icon: string;

  dinamicHeight: string = 'inherit';

  @Input() font: 'dec' | 'mat' | 'fas';

  @ViewChild('text') textElement: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      const element = this.textElement.nativeElement;
      this.extractIconName(element);
      this.extractIconHeight(element);
    }, 0);
  }

  private extractIconName(element) {
    try {
      this.icon = element.textContent;
    } catch (error) { }
  }

  private extractIconHeight(element) {
    if (this.font === 'dec') {
      const elementStyles = getComputedStyle(element);
      this.dinamicHeight = elementStyles.fontSize;
    }
  }

}
