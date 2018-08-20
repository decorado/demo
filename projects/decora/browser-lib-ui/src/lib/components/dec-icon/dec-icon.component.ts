import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'dec-icon',
  templateUrl: './dec-icon.component.html',
  styleUrls: ['./dec-icon.component.scss']
})
export class DecIconComponent implements AfterViewInit {

  icon: string;

  @Input() font: 'mat' | 'fas';

  @ViewChild('text') textElement: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        this.icon = this.textElement.nativeElement.textContent;
      } catch (error) { }
    }, 0);
  }

}
